import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

import SignInPage from "./SignInPage";
import { AuthProvider } from "../../custom/AuthContext";

const renderSignIn = () =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <SignInPage />
      </AuthProvider>
    </MemoryRouter>,
  );

describe("SignInPage", () => {
  it("renders the email field by its label", () => {
    renderSignIn();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });

  it("shows a validation error when submitted empty", async () => {
    const user = userEvent.setup();
    renderSignIn();

    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(
      screen.getByText(/please enter your email address/i),
    ).toBeInTheDocument();
  });

  it("clears the validation error once the user starts typing", async () => {
    const user = userEvent.setup();
    renderSignIn();

    await user.click(screen.getByRole("button", { name: /sign in/i }));
    expect(screen.getByText(/please enter your email address/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/email address/i), "a@gmail.com");

    expect(
      screen.queryByText(/please enter your email address/i),
    ).not.toBeInTheDocument();
  });

  it("async: types, submits, and finds the access denied error", async () => {
    const user = userEvent.setup();
    renderSignIn();

    await user.type(
      screen.getByLabelText(/email address/i),
      "wrong@example.com",
    );
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText(/access denied/i)).toBeInTheDocument();
  });
});