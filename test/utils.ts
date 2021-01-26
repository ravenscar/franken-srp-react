import { act, fireEvent, screen } from "@testing-library/react";

import { SignInProps } from "../src";

export const cognitoProps = {
  userPoolId: "USER_POOL_ID",
  clientId: "CLIENT_ID",
  region: "AWS_DEFAULT_REGION",
  autoConfirmDevice: true,
};
export const username = "email@domain.com";
export const password = "correct_password";
export const mfaCode = "123456";

export const onComplete = jest.fn();
export const onError = jest.fn();

export const defaultProps: SignInProps = {
  onComplete,
  onError,
  title: "SignIn With Cognito",
  logo: "./logo.jpg",
  cognito: cognitoProps,
  deviceForUsername: () => undefined,
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
