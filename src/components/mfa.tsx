import * as React from "react";

import { Button, Form } from "../styles";
import { Field } from "./field";

export type MFAObject = {
  code: string;
};

export type MFAProps = {
  label: string;
  onSubmit: (params: MFAObject) => void;
};

export const MFA = ({ label, onSubmit }: MFAProps) => {
  const [code, setCode] = React.useState("");
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ code });
  };

  return (
    <Form onSubmit={submitHandler}>
      <Field
        name="code"
        label={label}
        onChange={(e) => setCode(e.target.value)}
        value={code}
      />
      <Button type="submit">Verify</Button>
    </Form>
  );
};
