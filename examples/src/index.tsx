import * as React from "react";
import * as ReactDOM from "react-dom";

import { GlobalStyles, Container, List, Item, Example, Output } from "./styles";
import { exampleKeys, ExampleKeys, examples } from "./examples";

const Root = () => {
  const [example, setExampleKey] = React.useState<ExampleKeys>("Standard");
  const [complete, setComplete] = React.useState<string>();
  const [error, setError] = React.useState<string>();
  const setExample = (key: ExampleKeys) => {
    setExampleKey(key);
    setComplete(undefined);
    setError(undefined);
  };

  const Component = example && examples[example];

  return (
    <Container>
      <GlobalStyles />
      <List>
        {exampleKeys.map((key) => (
          <Item
            key={key}
            selected={example === key}
            onClick={() => setExample(key)}
          >
            {key}
          </Item>
        ))}
      </List>
      <Example>
        {Component && (
          <Component
            onComplete={(r) => setComplete(JSON.stringify(r, null, 2))}
            onError={(e) => {
              setError(e.toString());
            }}
          />
        )}
      </Example>
      <Output>{complete}</Output>
      <Output>{error}</Output>
    </Container>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
