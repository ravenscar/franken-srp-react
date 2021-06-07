import { TAuthStep, TSrpLoginParams, TSrpLoginResponse } from "franken-srp";

import { mfaCode as expectedMfaCode, mfaCodeHint, password, username } from "./utils";

export const returnTokens = async (
  username: string,
  device?: boolean
): Promise<TAuthStep> => {
  const authResponse = {
    username,
    tokens: {
      accessToken: "ACCESS_TOKEN",
      idToken: "ID_TOKEN",
      refreshToken: "REFRESH_TOKEN",
      tokenType: "TOKEN_TYPE",
      expiresIn: 60000,
    },
    newDevice: device
      ? {
          key: "DEVICE_KEY",
          groupKey: "DEVICE_GROUP_KEY",
          deviceAutoConfirmed: true,
        }
      : undefined,
  };

  return {
    code: "TOKENS",
    response: authResponse,
  };
};

export const mockGenerators = {
  basic: async function* (opts: TSrpLoginParams): TSrpLoginResponse {
    if (opts.username === username && opts.password === password) {
      return returnTokens(username);
    } else {
      return {
        code: "ERROR",
        error: new Error("Username or password incorrect"),
      };
    }
  },
  smsMfa: async function* (opts: TSrpLoginParams): TSrpLoginResponse {
    if (opts.username === username && opts.password === password) {
      let valid = false;
      let errorResponse: Error | undefined;

      while (!valid) {
        const mfaCodeIn = yield {
          code: "SMS_MFA_REQUIRED",
          hint: mfaCodeHint,
          error: errorResponse,
        };
        const mfaCode = mfaCodeIn.match(/^[0-9]+$/)?.[0];
        if (mfaCode !== expectedMfaCode) {
          errorResponse = new Error("MFA Code incorrect");
        } else {
          valid = true;
        }
      }

      return returnTokens(username);
    } else {
      return {
        code: "ERROR",
        error: new Error("Username or password incorrect"),
      };
    }
  },
  softwareMfa: async function* (opts: TSrpLoginParams): TSrpLoginResponse {
    if (opts.username === username && opts.password === password) {
      let valid = false;
      let errorResponse: Error | undefined;
      
      while (!valid) {
        const mfaCodeIn = yield {
          code: "SOFTWARE_MFA_REQUIRED",
          error: errorResponse,
        };
        const mfaCode = mfaCodeIn.match(/^[0-9]+$/)?.[0];

        if (mfaCode !== expectedMfaCode) {
          errorResponse = new Error("MFA Code incorrect");
        } else {
          valid = true;
        }
      }

      return returnTokens(username);
    } else {
      return {
        code: "ERROR",
        error: new Error("Username or password incorrect"),
      };
    }
  },
};
