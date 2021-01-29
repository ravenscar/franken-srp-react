import * as React from "react";

export const defaultLabels = {
  prompt: "",
  username: "Username",
  password: "Password",
  signIn: "Sign In",
  smsMFA: "SMS Code",
  totpMFA: "MFA Code",
  verify: "Verify",
  newPassword: "New Password",
  success: "Signed in successfully.",
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
