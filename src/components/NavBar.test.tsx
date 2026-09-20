import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

import NavBar from "./NavBar";
import { AuthProvider } from "../custom/AuthContext";
import { CartProvider } from "../custom/CartContext";

const renderNavBar = () =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <CartProvider>
          <NavBar />
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>,
  );

describe("NavBar", () => {
  it("renders the navigation links", () => {
    renderNavBar();
    expect(
      screen.getByRole("link", { name: /user directory/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /^inventory$/i }),
    ).toBeInTheDocument();
  });

  it("shows a Sign In button when logged out", () => {
    renderNavBar();
    expect(screen.getByText("Hi, Guest")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });
});