import styled from "@emotion/styled";

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: row;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  padding: 10px;
  overflow: auto;
  min-width: 100px;
`;

export const Item = styled.button<{ selected: boolean }>`
  background: none;
  border: none;
  font-size: 16px;
  margin: 5px 0;
  padding: 5px 10px;
  text-align: left;
  cursor: pointer;

  background-color: ${(props) => (props.selected ? "#eeeeee" : "transparent")};
  &:hover {
    background-color: #eeeeee;
  }
  &:focus {
    outline: none;
  }
`;

export const Display = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
`;

export const Example = styled.div`
  flex: 1;
  overflow: auto;
  min-height: 500px;
`;

export const Output = styled.pre`
  height: 250px;
  margin: 10px;
  padding: 5px;
  border-radius: 2px;
  background: #eee;
  border: 1px solid #ccc;
  overflow: auto;
`;
