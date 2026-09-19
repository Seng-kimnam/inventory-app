// src/custom/hook.ts
import { useState, useEffect } from "react";

export interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}


export function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const executeFetch = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
       
        const result = (await res.json()) as T;
        setData(result);
      } catch (err: unknown) {
        // Audit: err is strictly 'unknown', not 'any'
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    executeFetch();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetch;