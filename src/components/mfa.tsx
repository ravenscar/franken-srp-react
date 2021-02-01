import * as React from "react";

import { useLabels, MFAParams } from "../hooks";
import { Hint, Button, Form } from "../styles";
import { Field } from "./field";

export type MFAProps = {
  label: string;
  hint?: string;
  onSubmit: (params: MFAParams) => void;
};

export const MFA = ({ label, hint, onSubmit }: MFAProps) => {
  const { verify } = useLabels();
  const [code, setCode] = React.useState("");
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ code });
  };

  return (
    <Form onSubmit={submitHandler}>
      {hint && <Hint>{hint}</Hint>}
      <Field
        name="code"
        label={label}
        onChange={(e) => setCode(e.target.value)}
        value={code}
        autoFocus
      />
      <Button type="submit">{verify}</Button>
    </Form>
  );
};
