import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type BadgeTone = "primary" | "sale" | "ink" | "success" | "on-dark";

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

const tones: Record<BadgeTone, string> = {
  primary: "bg-primary-600 text-white",
  sale: "bg-ink-1 text-white",
  ink: "bg-ink-1 text-white",
  success: "bg-success/12 text-success",
  "on-dark": "bg-white/12 text-white",
};

/** Small pill for status: New, Sale, In Stock, a discount figure. */
export function Badge({ children, tone = "primary", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill px-2.5 py-1 text-label uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
