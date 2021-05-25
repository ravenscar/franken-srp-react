import * as React from "react";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";

export const defaultTheme = {
  primaryColour: "#333",
  activeColour: "#0277bd",
  successColour: "#388e3c",
  dangerColour: "#c62828",

  fontFamily: "inherit",
  fontSize: "10px",
  textAlign: "center",
  width: "50em",
};

export type TTheme = typeof defaultTheme;

declare module "@emotion/react" {
  export interface Theme extends TTheme {}
}

export const ThemeProvider: React.FC<{ theme?: Partial<TTheme> }> = ({
  theme,
  children,
}) => (
  <EmotionThemeProvider theme={{ ...defaultTheme, ...theme }}>
    {children}
  </EmotionThemeProvider>
);
