import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/** The single gutter + max-width owner. All content passes through here. */
export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return <Tag className={cn("container-page", className)}>{children}</Tag>;
}
