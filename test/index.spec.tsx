import * as React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";

import { SignIn, SignInProps } from "../src";
import {
  cognitoProps,
  email,
  mfaCode,
  mockGenerators,
  password,
} from "./mock-generator";

const onComplete = jest.fn();
const onError = jest.fn();

const props: SignInProps = {
  onComplete,
  onError,
  title: "SignIn With Cognito",
  logo: "./logo.jpg",
  cognito: cognitoProps,
};

beforeEach(() => {
  onComplete.mockReset();
  onError.mockReset();
});

const fillAndClick = async (values: Record<string, any>, button: string) => {
  for (const [key, value] of Object.entries(values)) {
    fireEvent.change(screen.getByLabelText(key), { target: { value } });
  }

  await act(async () => {
    fireEvent.click(screen.getByText(button));
  });
};

describe("default component", () => {
  it("renders initial sign in screen", () => {
    render(<SignIn {...props} />);
    expect(screen.queryByText(props.title)).toBeNull();
    expect(screen.getByAltText(props.title)).toHaveAttribute("src", props.logo);
    expect(screen.getByLabelText("Email Address")).toHaveValue("");
    expect(screen.getByLabelText("Password")).toHaveValue("");
    expect(screen.getByText("Sign In")).toBeDefined();
  });

  it("shows title if logo is undefined", () => {
    render(<SignIn {...props} logo={undefined} />);
    expect(screen.getByText(props.title)).toHaveTextContent(props.title);
  });
});

describe("basic login", () => {
  it("returns tokens", async () => {
    render(<SignIn {...props} customGenerator={mockGenerators.basic} />);
    await fillAndClick(
      { "Email Address": email, Password: password },
      "Sign In"
    );

    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        tokens: expect.objectContaining({
          accessToken: "ACCESS_TOKEN",
          refreshToken: "REFRESH_TOKEN",
        }),
      })
    );
    expect(onError).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(/success/);
  });

  it("shows error", async () => {
    render(<SignIn {...props} customGenerator={mockGenerators.basic} />);
    await fillAndClick(
      { "Email Address": email, Password: "incorrect" },
      "Sign In"
    );

    expect(onError).toHaveBeenCalled();
    expect(onComplete).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(/incorrect/);
  });

  it("works with initial props", async () => {
    await act(async () => {
      render(
        <SignIn
          {...props}
          customGenerator={mockGenerators.basic}
          initial={{ email, password }}
        />
      );
    });

    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        tokens: expect.objectContaining({
          accessToken: "ACCESS_TOKEN",
          refreshToken: "REFRESH_TOKEN",
        }),
      })
    );
    expect(onError).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(/success/);
  });
});

describe("sms mfa", () => {
  it("returns tokens", async () => {
    render(<SignIn {...props} customGenerator={mockGenerators.smsMfa} />);
    await fillAndClick(
      { "Email Address": email, Password: password },
      "Sign In"
    );

    expect(screen.getByLabelText("SMS Code")).toHaveValue("");
    await fillAndClick({ "SMS Code": mfaCode }, "Verify");

    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        tokens: expect.objectContaining({
          accessToken: "ACCESS_TOKEN",
          refreshToken: "REFRESH_TOKEN",
        }),
      })
    );
    expect(onError).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(/success/);
  });

  it("shows error", async () => {
    render(<SignIn {...props} customGenerator={mockGenerators.smsMfa} />);
    await fillAndClick(
      { "Email Address": email, Password: password },
      "Sign In"
    );

    expect(screen.getByLabelText("SMS Code")).toHaveValue("");
    await fillAndClick({ "SMS Code": "incorrect" }, "Verify");

    expect(onError).toHaveBeenCalled();
    expect(onComplete).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(/incorrect/);
  });

  it("works with initial props", async () => {
    await act(async () => {
      render(
        <SignIn
          {...props}
          customGenerator={mockGenerators.smsMfa}
          initial={{ email, password }}
        />
      );
    });

    expect(screen.getByLabelText("SMS Code")).toHaveValue("");
    await fillAndClick({ "SMS Code": mfaCode }, "Verify");

    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        tokens: expect.objectContaining({
          accessToken: "ACCESS_TOKEN",
          refreshToken: "REFRESH_TOKEN",
        }),
      })
    );
    expect(onError).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(/success/);
  });
});

describe("software mfa", () => {
  it("returns tokens", async () => {
    render(<SignIn {...props} customGenerator={mockGenerators.softwareMfa} />);
    await fillAndClick(
      { "Email Address": email, Password: password },
      "Sign In"
    );

    expect(screen.getByLabelText("MFA Code")).toHaveValue("");
    await fillAndClick({ "MFA Code": mfaCode }, "Verify");

    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        tokens: expect.objectContaining({
          accessToken: "ACCESS_TOKEN",
          refreshToken: "REFRESH_TOKEN",
        }),
      })
    );
    expect(onError).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(/success/);
  });
});
