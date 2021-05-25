import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { lighten, readableColor, transparentize } from "polished";

export const Container = styled.div`
  color: ${(props) => props.theme.primaryColour};
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.fontSize};

  width: ${(props) => props.theme.width};
  max-width: 98%;
`;

export const Logo = styled.img`
  display: block;
  width: 10em;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 3.4em;
  font-weight: 600;
  margin: 0.2em 0;
  text-align: ${(props) => props.theme.textAlign};
`;

export const Subtitle = styled.h3`
  font-size: 1.6em;
  font-weight: 400;
  text-align: ${(props) => props.theme.textAlign};
`;

export const Error = styled.p`
  font-size: 1.6em;
  font-weight: 600;
  text-align: ${(props) => props.theme.textAlign};
  color: ${(props) => props.theme.dangerColour};
`;

export const Success = styled.p`
  font-size: 1.6em;
  font-weight: 600;
  text-align: ${(props) => props.theme.textAlign};
  color: ${(props) => props.theme.successColour};
`;

export const Hint = styled.p`
  font-size: 1.6em;
  font-weight: 400;
  margin: 0.4em 0;
  text-align: ${(props) => props.theme.textAlign};
`;

export const Form = styled.form<{ hidden?: boolean }>`
  width: 100%;
  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
`;

export const FieldContainer = styled.div`
  display: block;
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  font-size: 1.4em;
  font-weight: 600;
  padding: 0.4em;
  color: ${(props) => lighten(0.25, props.theme.primaryColour)};
`;

export const Input = styled.input<{ large?: boolean }>`
  border-radius: 3px;
  border: 1px solid ${(props) => lighten(0.5, props.theme.primaryColour)};

  font-size: 1.6em;
  padding: 0.4em;
  width: 100%;

  &:focus {
    outline: none;
    box-shadow: 0 0 3px 1px
      ${(props) => transparentize(0.4, props.theme.activeColour)};
  }
`;

export const Button = styled.button`
  background-color: ${(props) => props.theme.activeColour};
  color: ${(props) => readableColor(props.theme.activeColour)};
  border: 0;
  border-radius: 5px;
  display: block;
  margin: 1.8em auto;
  padding: 0.8em;
  width: 60%;
  cursor: pointer;

  font-size: 1.5em;
  font-weight: 500;

  &:focus {
    outline: none;
    box-shadow: 0 0 3px 1px
      ${(props) => transparentize(0.4, props.theme.activeColour)};
  }
`;

export const LoadingContainer = styled.div`
  display: block;
  width: 9em;
  height: 9em;
  margin: 3em auto;
`;

export const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const Spinner = styled.div`
  animation: ${spin} 1.6s infinite linear;
  border: 0.4em solid ${(props) => lighten(0.6, props.theme.primaryColour)};
  border-top-color: ${(props) => props.theme.activeColour};
  border-radius: 50%;
  height: 100%;
  width: 100%;
`;

export const Link = styled.a`
  text-decoration: none;
  color: #4a90e2;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &:focus {
    outline-style: none;
  }
`;
