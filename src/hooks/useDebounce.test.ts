import { act, renderHook } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { useDebounce } from "./useDebounce";

afterEach(() => {
  vi.useRealTimers();
});

describe("useDebounce", () => {
  it("returns the value immediately on mount", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useDebounce("a", 500));

    expect(result.current).toBe("a");
  });

  it("updates only after the delay elapses", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) =>
        useDebounce(value, delay),
      { initialProps: { value: "a", delay: 500 } },
    );

    rerender({ value: "b", delay: 500 });
    expect(result.current).toBe("a");

    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toBe("a");

    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toBe("b");
  });

  it("cancels the pending timer when the value changes again", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) =>
        useDebounce(value, delay),
      { initialProps: { value: "a", delay: 500 } },
    );

    rerender({ value: "b", delay: 500 });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    rerender({ value: "c", delay: 500 });

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe("a");

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe("c");
  });
});