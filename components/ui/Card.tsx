import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Content cards lift on hover; product tiles never do. */
  interactive?: boolean;
}

export function Card({ children, className, interactive = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg bg-surface-alt shadow-sm",
        "transition-[transform,box-shadow] transition-base",
        interactive && "hover:-translate-y-1 hover:shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
