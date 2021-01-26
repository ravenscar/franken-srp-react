import * as React from "react";
import { act, render, screen } from "@testing-library/react";

import { SignIn } from "../src";
import { mockGenerators } from "./mock-generator";
import {
  defaultProps,
  password,
  username,
  mfaCode,
  onComplete,
  onError,
  fillAndClick,
} from "./utils";

describe("default component", () => {
  it("renders initial sign in screen", () => {
    render(<SignIn {...defaultProps} />);
    expect(screen.queryByText(defaultProps.title)).toBeNull();
    expect(screen.getByAltText(defaultProps.title)).toHaveAttribute(
      "src",
      defaultProps.logo
    );
    expect(screen.getByLabelText("Username")).toHaveValue("");
    expect(screen.getByLabelText("Password")).toHaveValue("");
    expect(screen.getByText("Sign In")).toBeDefined();
  });

  it("shows title if logo is undefined", () => {
    render(<SignIn {...defaultProps} logo={undefined} />);
    expect(screen.getByText(defaultProps.title)).toHaveTextContent(
      defaultProps.title
    );
  });
});

describe("basic login", () => {
  it("returns tokens", async () => {
    render(<SignIn {...defaultProps} customGenerator={mockGenerators.basic} />);
    await fillAndClick({ Username: username, Password: password }, "Sign In");

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
    render(<SignIn {...defaultProps} customGenerator={mockGenerators.basic} />);
    await fillAndClick(
      { Username: username, Password: "incorrect" },
      "Sign In"
    );

    expect(onError).toHaveBeenCalled();
    expect(onComplete).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(/incorrect/);
  });

  it("works with initial defaultProps", async () => {
    await act(async () => {
      render(
        <SignIn
          {...defaultProps}
          customGenerator={mockGenerators.basic}
          initial={{ username, password }}
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
