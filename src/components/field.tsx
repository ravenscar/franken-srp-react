import * as React from "react";
import { FieldContainer, Input, Label } from "../styles";

export type FieldProps = {
  name: string;
  label: string;
  large?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "name">;

export const Field = ({ name, label, ...rest }: FieldProps) => (
  <FieldContainer>
    <Label htmlFor={name}>{label}</Label>
    <Input id={name} name={name} {...rest} />
  </FieldContainer>
);
