import * as React from "react";

export const defaultLabels = {
  prompt: "",
  username: "Your username",
  password: "Your password",
  signIn: "Sign In",
  smsPrompt:
    "Your account is protected with multi-factor authentication using SMS. Enter the code sent to",
  smsMFA: "Your SMS Code",
  totpPrompt:
    "Your account is protected with multi-factor authentication using a one-time code. Enter the code from your authenticator app to continue.",
  totpMFA: "Your MFA code",
  verify: "Verify",
  newPasswordPrompt:
    "Your password has been reset. Enter a new password to continue.",
  newPassword: "New Password",
  success: "Signed in successfully.",
  mfaRescueHint: "Having trouble logging in with MFA?",
  mfaRescueButtonLabel: "Click here"
};
export type TLabels = typeof defaultLabels;

const context = React.createContext(defaultLabels);
context.displayName = "LabelProvider";

export const LabelProvider: React.FC<{ labels?: Partial<TLabels> }> = ({
  labels,
  children,
}) => (
  <context.Provider value={{ ...defaultLabels, ...labels }}>
    {children}
  </context.Provider>
);
export const useLabels = () => React.useContext(context);
