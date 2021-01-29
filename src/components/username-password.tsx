import * as React from "react";

import { Button, Form } from "../styles";
import { Field } from "./field";

export type UsernamePasswordObject = {
  username: string;
  password: string;
};

export type UsernamePasswordProps = {
  initial?: Partial<UsernamePasswordObject>;
  onSubmit: (params: UsernamePasswordObject) => void;
  hidden: boolean;
};

export const UsernamePassword = ({
  initial,
  onSubmit,
  hidden,
}: UsernamePasswordProps) => {
  const [username, setUsername] = React.useState(initial?.username || "");
  const [password, setPassword] = React.useState(initial?.password || "");
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <Form onSubmit={submitHandler} hidden={hidden}>
      <Field
        name="username"
        label="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        autoFocus
      />
      <Field
        name="password"
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <Button type="submit">Sign In</Button>
    </Form>
  );
};
