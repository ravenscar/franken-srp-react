import * as React from "react";
import { act, render, screen } from "@testing-library/react";

import { Login } from "../src";
import { mockGenerators } from "./mock-generator";
import {
  defaultProps,
  title,
  labels,
  password,
  username,
  onComplete,
  onError,
  fillAndClick,
} from "./utils";

describe("default component", () => {
  it("renders initial sign in screen", () => {
    render(<Login {...defaultProps} />);
    expect(screen.getByText(title)).toBeDefined();
    expect(screen.getByAltText(title)).toHaveAttribute(
      "src",
      defaultProps.logo
    );
    expect(screen.getByLabelText(labels.username)).toHaveValue("");
    expect(screen.getByLabelText(labels.password)).toHaveValue("");
    expect(screen.getByText(labels.signIn)).toBeDefined();
  });

  it("shows title if logo is undefined", () => {
    render(<Login {...defaultProps} logo={undefined} />);
    expect(screen.getByText(title)).toHaveTextContent(title);
  });
});

describe("basic login", () => {
  it("returns tokens", async () => {
    render(<Login {...defaultProps} customGenerator={mockGenerators.basic} />);
    await fillAndClick(
      { [labels.username]: username, [labels.password]: password },
      labels.signIn
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
    render(<Login {...defaultProps} customGenerator={mockGenerators.basic} />);
    await fillAndClick(
      { [labels.username]: username, [labels.password]: "incorrect" },
      labels.signIn
    );

    expect(onError).toHaveBeenCalled();
    expect(onComplete).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(/incorrect/);
  });

  it("works with initial defaultProps", async () => {
    await act(async () => {
      render(
        <Login
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
