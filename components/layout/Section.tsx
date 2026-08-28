import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type SectionTone = "page" | "surface" | "tint" | "dark" | "dark-alt";
export type SectionSize = "default" | "compact" | "strip";

interface SectionProps {
  children: ReactNode;
  tone?: SectionTone;
  /**
   * Vertical rhythm. `compact` for the newsletter and brand marquee, `strip`
   * for a thin band that is a rule of its own rather than a section.
   */
  size?: SectionSize;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
}

const sizes: Record<SectionSize, string> = {
  default: "py-section",
  compact: "py-section-sm",
  strip: "py-section-strip",
};

const tones: Record<SectionTone, string> = {
  page: "bg-page",
  surface: "bg-surface",
  tint: "bg-primary-50",
  dark: "bg-dark",
  "dark-alt": "bg-dark-alt",
};

export function Section({
  children,
  tone = "page",
  size = "default",
  className,
  id,
  ...aria
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        tones[tone],
        sizes[size],
        className,
      )}
      {...aria}
    >
      {children}
    </section>
  );
}
