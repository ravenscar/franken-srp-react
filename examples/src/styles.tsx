import * as React from "react";
import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";

const globalCss = css`
  html {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
  }
`;

export const GlobalStyles = () => <Global styles={globalCss} />;

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
`;

export const List = styled.div`
  flex: 0 0 38px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 5px;
  overflow: auto;
  min-width: 100px;
`;

export const Item = styled.button<{ selected: boolean }>`
  background: none;
  border: none;
  font-size: 16px;
  margin: 0 5px;
  padding: 5px 10px;
  text-align: left;
  cursor: pointer;
  text-decoration: underline;

  background-color: ${(props) => (props.selected ? "#eeeeee" : "transparent")};
  &:hover {
    background-color: #eeeeee;
  }
  &:focus {
    outline: none;
  }
`;

export const Example = styled.div`
  flex: 4 1;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Output = styled.pre`
  flex: 1 8 20px;
  margin: 10px;
  padding: 5px;
  border-radius: 2px;
  background: #eee;
  border: 1px solid #ccc;
  overflow: auto;
`;
