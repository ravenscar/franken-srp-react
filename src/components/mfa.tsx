import * as React from "react";

import { Button } from "../styles";
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

  return (
    <>
      <Field
        name="code"
        label={label}
        onChange={(e) => setCode(e.target.value)}
        value={code}
      />
      <Button type="button" onClick={() => onSubmit({ code })}>
        Verify
      </Button>
    </>
  );
};
