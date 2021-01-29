import styled from "@emotion/styled";

export const Container = styled.div``;

export const Logo = styled.img``;

export const Title = styled.h1``;

export const Subtitle = styled.h3``;

export const Error = styled.p``;

export const Success = styled.p``;

export const Form = styled.form<{ hidden?: boolean }>`
  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
`;

export const FieldContainer = styled.div``;

export const Input = styled.input``;

export const Label = styled.label``;

export const Button = styled.button``;

export const LoadingContainer = styled.div``;

export const Spinner = styled.div``;
