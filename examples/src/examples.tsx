import * as React from "react";
import { Login, LoginProps } from "franken-srp-react";

import { getDevice, setDevice } from "./device-storage";

import {
  AWS_DEFAULT_REGION,
  CLIENT_ID,
  USER_POOL_ID,
  USERNAME,
  PASSWORD,
} from "./_cognito-test-config";

const defaultProps = {
  title: "Login to Cognito",
  logo: require("./logo.jpg"),
  deviceForUsername: () => undefined,
  cognito: {
    region: AWS_DEFAULT_REGION,
    clientId: CLIENT_ID,
    userPoolId: USER_POOL_ID,
    autoConfirmDevice: true,
    autoRememberDevice: "remembered" as const,
  },
  labels: {
    username: "Your email address",
  },
};

type TStandardLoginProps = Pick<LoginProps, "onComplete" | "onError">;

export const examples: Record<
  string,
  (opts: TStandardLoginProps) => JSX.Element
> = {
  Standard: (opts) => <Login {...defaultProps} {...opts} />,
  "Title Only": (opts) => (
    <Login {...opts} {...defaultProps} logo={undefined} />
  ),
  Preloaded: (opts) => (
    <Login
      {...opts}
      {...defaultProps}
      initial={{ username: USERNAME, password: PASSWORD }}
    />
  ),
  Erroring: (opts) => (
    <Login
      {...opts}
      {...defaultProps}
      initial={{ username: USERNAME, password: "incorrect" }}
    />
  ),
  "With Devices": (opts) => (
    <Login
      {...opts}
      {...defaultProps}
      deviceForUsername={getDevice}
      onComplete={(response) => {
        if (response.newDevice?.password)
          setDevice(response.username, {
            ...response.newDevice,
            password: response.newDevice.password,
          });
        opts.onComplete(response);
      }}
    />
  ),
  "With MFA Rescue Link": (opts) => (
    <Login
      {...opts}
      {...defaultProps}
      initial={{ username: USERNAME, password: PASSWORD }}
      onRescueMFA={() => console.log('implement MFA rescue logic here..')}
    />
  ),
};

export type ExampleKeys = keyof typeof examples;
export const exampleKeys = Object.keys(examples) as ExampleKeys[];
