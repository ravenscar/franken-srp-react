import { srpLogin } from "franken-srp";
import {
  TAuthStep,
  TSrpLoginParams,
  TSrpLoginResponse,
} from "../src/funky_types";

export const returnTokens = async (device?: boolean): Promise<TAuthStep> => {
  const authResponse = {
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
        }
      : undefined,
  };

  return {
    code: "TOKENS",
    response: authResponse,
  };
};

export const cognitoProps = {
  userPoolId: "USER_POOL_ID",
  clientId: "CLIENT_ID",
  region: "AWS_DEFAULT_REGION",
  autoConfirmDevice: true,
};
export const email = "email@domain.com";
export const password = "correct_password";
export const mfaCode = "123456";

export const mockGenerators = {
  basic: async function* (opts: TSrpLoginParams): TSrpLoginResponse {
    if (opts.username === email && opts.password === password) {
      return returnTokens();
    } else {
      return {
        code: "ERROR",
        error: new Error("Username or password incorrect"),
      };
    }
  },
  smsMfa: async function* (opts: TSrpLoginParams): TSrpLoginResponse {
    if (opts.username === email && opts.password === password) {
      const mfaCodeIn = yield { code: "SMS_MFA_REQUIRED" };
      if (mfaCodeIn === mfaCode) {
        return returnTokens();
      } else {
        return {
          code: "ERROR",
          error: new Error("MFA Code incorrect"),
        };
      }
    } else {
      return {
        code: "ERROR",
        error: new Error("Username or password incorrect"),
      };
    }
  },
  softwareMfa: async function* (opts: TSrpLoginParams): TSrpLoginResponse {
    if (opts.username === email && opts.password === password) {
      const mfaCodeIn = yield { code: "SOFTWARE_MFA_REQUIRED" };
      if (mfaCodeIn === mfaCode) {
        return returnTokens();
      } else {
        return {
          code: "ERROR",
          error: new Error("MFA Code incorrect"),
        };
      }
    } else {
      return {
        code: "ERROR",
        error: new Error("Username or password incorrect"),
      };
    }
  },
};
