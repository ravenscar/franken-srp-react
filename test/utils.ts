import { act, fireEvent, screen } from "@testing-library/react";

import { LoginProps } from "../src";

export const cognitoProps = {
  userPoolId: "USER_POOL_ID",
  clientId: "CLIENT_ID",
  region: "AWS_DEFAULT_REGION",
  autoConfirmDevice: true,
  autoRememberDevice: null,
};
export const username = "email@domain.com";
export const password = "correct_password";
export const mfaCode = "123456";

export const onComplete = jest.fn();
export const onError = jest.fn();

export const labels = {
  username: "username?",
  password: "password?",
  smsMFA: "sms code?",
  totpMFA: "totp code?",
  signIn: "sign in!",
  verify: "verify!",
};

export const title = "SignIn With Cognito";
export const defaultProps: LoginProps = {
  onComplete,
  onError,
  title,
  logo: "./logo.jpg",
  cognito: cognitoProps,
  deviceForUsername: () => undefined,
  labels,
};

beforeEach(() => {
  onComplete.mockReset();
  onError.mockReset();
});

export const fillAndClick = async (
  values: Record<string, any>,
  button: string
) => {
  for (const [key, value] of Object.entries(values)) {
    fireEvent.change(screen.getByLabelText(key), { target: { value } });
  }

  await act(async () => {
    fireEvent.click(screen.getByText(button));
  });
};
