import { useEffect, useRef, useState } from "react";

export function useAutoFetch<T = any>(url: string | null, intervalMs = 1000) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!url || typeof window === "undefined") return; // client-only

    isMounted.current = true;

    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const json: T = await res.json();
        if (isMounted.current) setData(json);
      } catch (err: any) {
        console.error(err);
        if (isMounted.current) setError(err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, intervalMs);

    return () => {
      isMounted.current = false;
      clearInterval(interval);
    };
  }, [url, intervalMs]);

  return { data, error };
}
