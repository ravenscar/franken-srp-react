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

describe("sms mfa", () => {
  it("returns tokens", async () => {
    render(
      <SignIn {...defaultProps} customGenerator={mockGenerators.smsMfa} />
    );
    await fillAndClick({ Username: username, Password: password }, "Sign In");

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
    render(
      <SignIn {...defaultProps} customGenerator={mockGenerators.smsMfa} />
    );
    await fillAndClick({ Username: username, Password: password }, "Sign In");

    expect(screen.getByLabelText("SMS Code")).toHaveValue("");
    await fillAndClick({ "SMS Code": "incorrect" }, "Verify");

    expect(onError).toHaveBeenCalled();
    expect(onComplete).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(/incorrect/);
  });

  it("works with initial defaultProps", async () => {
    await act(async () => {
      render(
        <SignIn
          {...defaultProps}
          customGenerator={mockGenerators.smsMfa}
          initial={{ username, password }}
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
    render(
      <SignIn {...defaultProps} customGenerator={mockGenerators.softwareMfa} />
    );
    await fillAndClick({ Username: username, Password: password }, "Sign In");

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
