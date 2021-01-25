import * as React from "react";

import { Button } from "../styles";
import { Field } from "./field";

export type EmailPasswordObject = {
  email: string;
  password: string;
};

export type EmailPasswordProps = {
  initial?: Partial<EmailPasswordObject>;
  onSubmit: (params: EmailPasswordObject) => void;
};

export const EmailPassword = ({ initial, onSubmit }: EmailPasswordProps) => {
  const [email, setEmail] = React.useState(initial?.email || "");
  const [password, setPassword] = React.useState(initial?.password || "");

  return (
    <>
      <Field
        name="email"
        label="Email Address"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <Field
        name="password"
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <Button type="button" onClick={() => onSubmit({ email, password })}>
        Sign In
      </Button>
    </>
  );
};
