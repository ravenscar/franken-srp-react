import * as React from "react";
import { act, render, screen } from "@testing-library/react";

import { Login } from "../src";
import { mockGenerators } from "./mock-generator";
import {
  defaultProps,
  labels,
  password,
  username,
  mfaCode,
  onComplete,
  onError,
  fillAndClick,
} from "./utils";

describe("sms mfa", () => {
  it("returns tokens", async () => {
    render(<Login {...defaultProps} customGenerator={mockGenerators.smsMfa} />);
    await fillAndClick(
      { [labels.username]: username, [labels.password]: password },
      labels.signIn
    );

    expect(screen.getByLabelText(labels.smsMFA)).toHaveValue("");
    await fillAndClick({ [labels.smsMFA]: mfaCode }, labels.verify);

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
    render(<Login {...defaultProps} customGenerator={mockGenerators.smsMfa} />);
    await fillAndClick(
      { [labels.username]: username, [labels.password]: password },
      labels.signIn
    );

    expect(screen.getByLabelText(labels.smsMFA)).toHaveValue("");
    await fillAndClick({ [labels.smsMFA]: "incorrect" }, labels.verify);

    expect(onError).not.toHaveBeenCalled();
    expect(onComplete).not.toHaveBeenCalled();

    expect(screen.getByRole("alert")).toHaveTextContent(/incorrect/);
    expect(screen.getByLabelText(labels.smsMFA)).toHaveValue("");
    await fillAndClick({ [labels.smsMFA]: mfaCode }, labels.verify);

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

  it("works with initial defaultProps", async () => {
    await act(async () => {
      render(
        <Login
          {...defaultProps}
          customGenerator={mockGenerators.smsMfa}
          initial={{ username, password }}
        />
      );
    });

    expect(screen.getByLabelText(labels.smsMFA)).toHaveValue("");
    await fillAndClick({ [labels.smsMFA]: mfaCode }, labels.verify);

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
      <Login {...defaultProps} customGenerator={mockGenerators.softwareMfa} />
    );
    await fillAndClick(
      { [labels.username]: username, [labels.password]: password },
      labels.signIn
    );

    expect(screen.getByLabelText(labels.totpMFA)).toHaveValue("");
    await fillAndClick({ [labels.totpMFA]: mfaCode }, labels.verify);

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
