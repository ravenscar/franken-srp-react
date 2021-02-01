import * as React from "react";

import { Container, Logo, Title } from "../styles";
import {
  LoginEvents,
  LoginSRP,
  useAuthStep,
  useSRP,
  LabelProvider,
  TLabels,
} from "../hooks";
import { UsernamePassword } from "./username-password";
import { Forms } from "./forms";

export type LoginProps = LoginEvents &
  LoginSRP & {
    title: string;
    logo?: string;
    labels?: Partial<TLabels>;
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
