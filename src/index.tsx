import * as React from "react";

import { LabelProvider, TLabels, ThemeProvider, TTheme } from "./hooks";
import { Root, RootProps } from "./components/login";

export type LoginProps = RootProps & {
  labels?: Partial<TLabels>;
  theme?: Partial<TTheme>;
};

export const Login = ({ labels, theme, ...props }: LoginProps) => (
  <LabelProvider labels={labels}>
    <ThemeProvider theme={theme}>
      <Root {...props} />
    </ThemeProvider>
  </LabelProvider>
);
