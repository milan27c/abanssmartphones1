"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";

/** `true` when the visitor has asked the OS to reduce motion. */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
