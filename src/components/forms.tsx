import * as React from "react";
import { TAuthStep } from "franken-srp";

import { Error, Success } from "../styles";
import { MFA } from "./mfa";
import { Loading } from "./loading";
import { useSRP, useLabels } from "../hooks";

export const Forms = ({
  step,
  next,
  loading,
}: { step?: TAuthStep } & ReturnType<typeof useSRP>) => {
  const {
    smsMFA,
    smsPrompt,
    totpMFA,
    totpPrompt,
    newPassword,
    newPasswordPrompt,
    success,
  } = useLabels();
  if (loading) return <Loading />;

  switch (step?.code) {
    case "ERROR":
      return <Error role="alert">{step.error?.message}</Error>;
    case "TOKENS":
      return <Success role="alert">{success}</Success>;
    case "SMS_MFA_REQUIRED":
      return (
        <MFA
          label={smsMFA}
          hint={`${smsPrompt} ${step.hint}`}
          onSubmit={next}
        />
      );
    case "SOFTWARE_MFA_REQUIRED":
      return <MFA label={totpMFA} hint={totpPrompt} onSubmit={next} />;
    case "NEW_PASSWORD_REQUIRED":
      return (
        <MFA
          label={newPassword}
          hint={newPasswordPrompt}
          type="password"
          onSubmit={next}
        />
      );
  }

  return null;
};
