import * as React from "react";

import { Container, Logo, Title } from "../styles";
import { LoginEvents, LoginSRP, useAuthStep, useSRP } from "../hooks";
import { UsernamePassword } from "./username-password";
import { Forms } from "./forms";

export type RootProps = LoginEvents &
  LoginSRP & {
    title?: string;
    logo?: string;
  };

export const Root = (props: RootProps) => {
  const { title, logo, initial } = props;
  const { step, setStep } = useAuthStep(props);
  const srp = useSRP({ ...props, setStep });

  return (
    <Container>
      {logo ? <Logo alt={title} src={logo} /> : null}
      {title ? <Title>{title}</Title> : null}
      <Forms {...srp} step={step} />
      <UsernamePassword
        onSubmit={srp.start}
        initial={initial}
        hidden={!!srp.loading || (!!step && step.code !== "ERROR")}
      />
    </Container>
  );
};
