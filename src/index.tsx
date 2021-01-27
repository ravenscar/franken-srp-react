import * as React from "react";
import { TAuthStep } from "franken-srp";

import { Container, Error, Logo, Success, Title } from "./styles";
import { UsernamePassword } from "./components/username-password";
import { MFA } from "./components/mfa";
import { SignInEvents, SignInSRP, useAuthStep, useSRP } from "./hooks";

export type SignInProps = SignInEvents &
  SignInSRP & {
    title: string;
    logo?: string;
  };

const Forms = ({
  step,
  start,
  next,
}: { step?: TAuthStep } & ReturnType<typeof useSRP>) => {
  switch (step?.code) {
    case "TOKENS":
      return <Success role="alert">Signed in successfully.</Success>;
    case "ERROR":
      return <Error role="alert">{step?.error?.toString()}</Error>;
    case "SMS_MFA_REQUIRED":
      return <MFA label="SMS Code" onSubmit={next} />;
    case "SOFTWARE_MFA_REQUIRED":
      return <MFA label="MFA Code" onSubmit={next} />;
    case "NEW_PASSWORD_REQUIRED":
      return <MFA label="New Password" onSubmit={next} />;
  }

  return <UsernamePassword onSubmit={start} />;
};

export const SignIn = ({
  title,
  logo,
  initial,
  cognito,
  customGenerator,
  deviceForUsername,
  onComplete,
  onError,
}: SignInProps) => {
  const { step, setStep } = useAuthStep({ onComplete, onError });
  const srp = useSRP({
    initial,
    cognito,
    customGenerator,
    deviceForUsername,
    setStep,
  });

  return (
    <Container>
      {logo ? <Logo alt={title} src={logo} /> : <Title>{title}</Title>}
      <Forms {...srp} step={step} />
    </Container>
  );
};
