import * as React from "react";
import { useLabels, LoginParams } from "../hooks";

import { Button, Form, Subtitle } from "../styles";
import { Field } from "./field";

export type UsernamePasswordProps = {
  initial?: Partial<LoginParams>;
  onSubmit: (params: LoginParams) => void;
  hidden: boolean;
};

export const UsernamePassword = ({
  initial,
  onSubmit,
  hidden,
}: UsernamePasswordProps) => {
  const labels = useLabels();
  const [username, setUsername] = React.useState(initial?.username || "");
  const [password, setPassword] = React.useState(initial?.password || "");
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <Form onSubmit={submitHandler} hidden={hidden}>
      <Subtitle>{labels.prompt}</Subtitle>
      <Field
        name="username"
        label={labels.username}
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        autoFocus
      />
      <Field
        name="password"
        type="password"
        label={labels.password}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <Button type="submit">{labels.signIn}</Button>
    </Form>
  );
};
