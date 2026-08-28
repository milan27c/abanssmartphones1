import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface HoverLiftProps {
  children: ReactNode;
  className?: string;
}

/**
 * CSS-only lift for content cards. Tailwind's `hover:` already scopes itself
 * to `(hover: hover)`, so touch devices get nothing.
 */
export function HoverLift({ children, className }: HoverLiftProps) {
  return (
    <div
      className={cn(
        "transition-[transform,box-shadow] transition-base",
        "hover:-translate-y-1 hover:shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
