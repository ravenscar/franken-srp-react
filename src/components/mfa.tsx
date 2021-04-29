import * as React from "react";

import { useLabels, MFAParams } from "../hooks";
import { Hint, Error, Button, Form, Link } from "../styles";
import { Field } from "./field";

export type MFAProps = {
  label: string;
  type?: HTMLInputElement["type"];
  hint?: string;
  error?: Error;
  onSubmit: (params: MFAParams) => void;
  onRescueMFA?: () => void;
};

export const MFA = ({ label, type, hint, error, onSubmit, onRescueMFA }: MFAProps) => {
  const { verify, mfaRescueHint, mfaRescueButtonLabel } = useLabels();
  const [code, setCode] = React.useState("");
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ code });
  };

  return (
    <Form onSubmit={submitHandler}>
      {hint && <Hint>{hint}</Hint>}
      {error && <Error role="alert">{error.message}</Error>}
      <Field
        name="code"
        label={label}
        onChange={(e) => setCode(e.target.value)}
        value={code}
        type={type}
        autoFocus
      />
      <Button type="submit">{verify}</Button>
      {onRescueMFA && (
        <Hint>
          {mfaRescueHint}{' '}
          <Link id="mfa-rescue" onClick={() => onRescueMFA()}>{mfaRescueButtonLabel}</Link>
        </Hint>
      )}
    </Form>
  );
};
