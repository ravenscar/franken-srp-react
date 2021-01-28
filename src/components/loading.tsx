import * as React from "react";
import { LoadingContainer, Spinner } from "../styles";

export type LoadingProps = {};

export const Loading = ({}: LoadingProps) => (
  <LoadingContainer>
    <Spinner />
  </LoadingContainer>
);
