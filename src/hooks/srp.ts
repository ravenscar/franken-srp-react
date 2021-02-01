import * as React from "react";
import {
  srpLogin,
  TAuthStep,
  TAuthResponse,
  TSrpLoginParams,
} from "franken-srp";

export type LoginParams = {
  username: string;
  password: string;
};

export type MFAParams = {
  code: string;
};

export type LoginEvents = {
  onComplete: (response: TAuthResponse) => void;
  onError: (error: Error) => void;
};

export type LoginSRP = {
  initial?: Partial<LoginParams>;
  cognito: Omit<TSrpLoginParams, "username" | "password" | "device">;
  deviceForUsername: (username: string) => TSrpLoginParams["device"];
  customGenerator?: typeof srpLogin;
};

export const useAuthStep = ({ onComplete, onError }: LoginEvents) => {
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
  deviceForUsername,
  setStep,
}: LoginSRP & { setStep: (step: TAuthStep) => void }) => {
  const [loading, setLoading] = React.useState(false);
  const [generator, setGenerator] = React.useState<
    ReturnType<typeof srpLogin>
  >();
  const start = async ({ username, password }: LoginParams) => {
    setLoading(true);
    const device = deviceForUsername(username);
    const newGenerator = (customGenerator || srpLogin)({
      ...cognito,
      username,
      password,
      device,
    });
    const result = await newGenerator.next();
    setGenerator(newGenerator);
    setStep(result.value);
    setLoading(false);
  };
  const next = async ({ code }: { code?: string }) => {
    setLoading(true);
    if (generator) {
      const result = await (code ? generator.next(code) : generator.next());
      setStep(result.value);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (initial?.username && initial?.password) {
      start({ username: initial.username, password: initial.password });
    }
  }, [initial?.username, initial?.password]);

  return {
    start,
    next,
    loading,
    initial,
  };
};
