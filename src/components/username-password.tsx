import * as React from "react";

import { Button } from "../styles";
import { Field } from "./field";

export type UsernamePasswordObject = {
  username: string;
  password: string;
};

export type UsernamePasswordProps = {
  initial?: Partial<UsernamePasswordObject>;
  onSubmit: (params: UsernamePasswordObject) => void;
};

export const UsernamePassword = ({
  initial,
  onSubmit,
}: UsernamePasswordProps) => {
  const [username, setUsername] = React.useState(initial?.username || "");
  const [password, setPassword] = React.useState(initial?.password || "");

  return (
    <>
      <Field
        name="username"
        label="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <Field
        name="password"
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <Button type="button" onClick={() => onSubmit({ username, password })}>
        Sign In
      </Button>
    </>
  );
};
