import * as React from "react";
import { TAuthStep } from "franken-srp";

import { Container, Error, Logo, Success, Title } from "./styles";
import { UsernamePassword } from "./components/username-password";
import { MFA } from "./components/mfa";
import { Loading } from "./components/loading";
import { LoginEvents, LoginSRP, useAuthStep, useSRP } from "./hooks";

export type LoginProps = LoginEvents &
  LoginSRP & {
    title: string;
    logo?: string;
  };

const Forms = ({
  step,
  next,
  loading,
}: { step?: TAuthStep } & ReturnType<typeof useSRP>) => {
  if (loading) return <Loading />;

  switch (step?.code) {
    case "ERROR":
      return <Error role="alert">{step.error?.message}</Error>;
    case "TOKENS":
      return <Success role="alert">Signed in successfully.</Success>;
    case "SMS_MFA_REQUIRED":
      return <MFA label="SMS Code" onSubmit={next} />;
    case "SOFTWARE_MFA_REQUIRED":
      return <MFA label="MFA Code" onSubmit={next} />;
    case "NEW_PASSWORD_REQUIRED":
      return <MFA label="New Password" onSubmit={next} />;
  }

  return null;
};

export const Login = ({
  title,
  logo,
  initial,
  cognito,
  customGenerator,
  deviceForUsername,
  onComplete,
  onError,
}: LoginProps) => {
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
      {logo ? <Logo alt={title} src={logo} /> : null}
      <Title>{title}</Title>
      <Forms {...srp} step={step} />
      <UsernamePassword
        onSubmit={srp.start}
        initial={initial}
        hidden={!!srp.loading || (!!step && step.code !== "ERROR")}
      />
    </Container>
  );
};
