"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Returns `false` during SSR and hydration, then the real match. Prefer CSS
 * for layout; reach for this only when a behaviour has to change.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
