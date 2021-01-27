import * as React from "react";
import * as ReactDOM from "react-dom";
import { SignIn, SignInProps } from "franken-srp-react";

import { Container, List, Item, Example, Display, Output } from "./styles";
import {
  AWS_DEFAULT_REGION,
  CLIENT_ID,
  USER_POOL_ID,
  USERNAME,
  PASSWORD,
} from "./_cognito-test-config";
const logo = require("./logo.jpg");

const cognito = {
  region: AWS_DEFAULT_REGION,
  clientId: CLIENT_ID,
  userPoolId: USER_POOL_ID,
  autoConfirmDevice: true,
};

type TStandardSignInProps = Pick<SignInProps, "onComplete" | "onError">;

const examples: Record<string, (opts: TStandardSignInProps) => JSX.Element> = {
  Title: (opts) => (
    <SignIn
      {...opts}
      title="Cognito Login"
      cognito={cognito}
      deviceForUsername={() => undefined}
    />
  ),
  Logo: (opts) => (
    <SignIn
      {...opts}
      title="Cognito Login"
      logo={logo}
      cognito={cognito}
      deviceForUsername={() => undefined}
    />
  ),
  Initial: (opts) => (
    <SignIn
      {...opts}
      title="Cognito Login"
      logo={logo}
      cognito={cognito}
      deviceForUsername={() => undefined}
      initial={{ username: USERNAME, password: PASSWORD }}
    />
  ),
};
type ExampleKeys = keyof typeof examples;
const keys = Object.keys(examples) as ExampleKeys[];

const Root = () => {
  const [example, setExample] = React.useState<keyof typeof examples>("Title");
  const [complete, setComplete] = React.useState<string>();
  const [error, setError] = React.useState<string>();

  const Component = example && examples[example];

  return (
    <Container>
      <List>
        {keys.map((key) => (
          <Item
            key={key}
            selected={example === key}
            onClick={() => {
              setExample(key);
              setComplete(undefined);
              setError(undefined);
            }}
          >
            {key}
          </Item>
        ))}
      </List>
      <Display>
        <Example>
          {Component && (
            <Component
              onComplete={(r) => setComplete(JSON.stringify(r, null, 2))}
              onError={(e) => setError(JSON.stringify(e, null, 2))}
            />
          )}
        </Example>
        <Output>{complete}</Output>
        <Output>{error}</Output>
      </Display>
    </Container>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
