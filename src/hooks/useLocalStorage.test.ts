import { act, renderHook } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";

import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns the initial value when nothing is stored", () => {
    const { result } = renderHook(() => useLocalStorage("name", "Guest"));

    expect(result.current[0]).toBe("Guest");
  });

  it("reads and parses an existing stored value", () => {
    localStorage.setItem("name", JSON.stringify({ first: "Alex" }));

    const { result } = renderHook(() =>
      useLocalStorage("name", { first: "Guest" }),
    );

    expect(result.current[0]).toEqual({ first: "Alex" });
  });

  it("writes the value to localStorage when it changes", () => {
    const { result } = renderHook(() => useLocalStorage("name", "Guest"));

    act(() => {
      result.current[1]("Alice");
    });

    expect(localStorage.getItem("name")).toBe(JSON.stringify("Alice"));
    expect(result.current[0]).toBe("Alice");
  });

  it("falls back to the initial value when the stored JSON is invalid", () => {
    localStorage.setItem("name", "{not-valid-json");

    const { result } = renderHook(() => useLocalStorage("name", "Guest"));

    expect(result.current[0]).toBe("Guest");
  });
});