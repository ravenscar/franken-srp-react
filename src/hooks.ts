import * as React from "react";
import { srpLogin, TAuthStep, TSrpLoginParams } from "franken-srp";

import { EmailPasswordObject } from "./components/email-password";

type TAuthResponse = Required<TAuthStep>["response"];

export type SignInEvents = {
  onComplete: (response: TAuthResponse) => void;
  onError: (error: Error) => void;
};

export type SignInSRP = {
  initial?: Partial<EmailPasswordObject>;
  cognito: Omit<TSrpLoginParams, "username" | "password" | "device">;
  customGenerator?: typeof srpLogin;
};

export const useAuthStep = ({ onComplete, onError }: SignInEvents) => {
  const [step, setStep] = React.useState<TAuthStep | undefined>();
  return {
    step,
    setStep: (newStep: TAuthStep | undefined) => {
      setStep(newStep);
      if (newStep?.code === "TOKENS" && newStep.response) {
        onComplete(newStep.response);
      }
      if (newStep?.error) {
        onError(newStep.error);
      }
    },
  };
};
export const useSRP = ({
  initial,
  cognito,
  customGenerator,
  setStep,
}: SignInSRP & { setStep: (step: TAuthStep) => void }) => {
  const [generator, setGenerator] = React.useState<
    ReturnType<typeof srpLogin>
  >();
  const start = async ({ email, password }: EmailPasswordObject) => {
    const newGenerator = (customGenerator || srpLogin)({
      ...cognito,
      username: email,
      password,
      device: undefined,
    });
    const result = await newGenerator.next();
    setGenerator(newGenerator);
    setStep(result.value);
  };
  const next = async ({ code }: { code?: string }) => {
    if (generator) {
      const result = await (code ? generator.next(code) : generator.next());
      setStep(result.value);
    }
  };

  React.useEffect(() => {
    if (initial?.email && initial?.password) {
      start({ email: initial.email, password: initial.password });
    }
  }, [initial?.email, initial?.password]);

  return {
    start,
    next,
  };
};
