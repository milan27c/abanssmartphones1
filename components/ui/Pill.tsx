import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

/** Chips sit on a light plate by default, or on a dark/glass one. */
export type PillTone = "light" | "dark";

const toneStates: Record<PillTone, { active: string; idle: string }> = {
  light: {
    active: "bg-primary-600 text-white hover:bg-primary-700",
    idle: "bg-surface text-ink-3 hover:bg-line hover:text-ink-1",
  },
  // On dark the filled primary loses its edge against the plate, so the
  // active chip goes solid white — the same logic as `on-dark-solid`.
  dark: {
    active: "bg-white text-ink-1 hover:bg-surface",
    idle: "bg-white/10 text-on-dark-2 hover:bg-white/20 hover:text-white",
  },
};

/**
 * Shared chip styling. Exported so Tabs can wear the same skin without
 * inheriting Pill's `aria-pressed` semantics.
 */
export function pillClasses(
  active: boolean,
  className?: string,
  tone: PillTone = "light",
): string {
  const states = toneStates[tone];

  return cn(
    "inline-flex h-10 shrink-0 items-center justify-center rounded-pill px-5 text-body-sm font-medium",
    "transition-[background-color,color,transform] transition-fast",
    "hover:scale-[1.02] active:scale-[0.98]",
    active ? states.active : states.idle,
    className,
  );
}

interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  active?: boolean;
  tone?: PillTone;
  className?: string;
}

/** Filter chip. Active reads as primary filled, inactive as quiet. */
export function Pill({
  children,
  active = false,
  tone = "light",
  className,
  ...rest
}: PillProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={pillClasses(active, className, tone)}
      {...rest}
    >
      {children}
    </button>
  );
}
