import * as React from "react";
import { TAuthStep } from "franken-srp";

import { Container, Error, Logo, Subtitle, Success, Title } from "./styles";
import { UsernamePassword } from "./components/username-password";
import { MFA } from "./components/mfa";
import { Loading } from "./components/loading";
import { LoginEvents, LoginSRP, useAuthStep, useSRP } from "./hooks";
import { LabelProvider, TLabels, useLabels } from "./labels";

export type LoginProps = LoginEvents &
  LoginSRP & {
    title: string;
    logo?: string;
    labels?: Partial<TLabels>;
  };

const Forms = ({
  step,
  next,
  loading,
}: { step?: TAuthStep } & ReturnType<typeof useSRP>) => {
  const { smsMFA, totpMFA, newPassword, success } = useLabels();
  if (loading) return <Loading />;

  switch (step?.code) {
    case "ERROR":
      return <Error role="alert">{step.error?.message}</Error>;
    case "TOKENS":
      return <Success role="alert">{success}</Success>;
    case "SMS_MFA_REQUIRED":
      return <MFA label={smsMFA} onSubmit={next} />;
    case "SOFTWARE_MFA_REQUIRED":
      return <MFA label={totpMFA} onSubmit={next} />;
    case "NEW_PASSWORD_REQUIRED":
      return <MFA label={newPassword} onSubmit={next} />;
  }

  return null;
};

export const Login = (props: LoginProps) => {
  const { title, logo, initial } = props;
  const { step, setStep } = useAuthStep(props);
  const srp = useSRP({ ...props, setStep });

  return (
    <LabelProvider labels={props.labels}>
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
    </LabelProvider>
  );
};
