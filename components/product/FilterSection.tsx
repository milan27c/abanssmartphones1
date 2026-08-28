import type { ReactNode } from "react";

import { ChevronDownIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

interface FilterSectionProps {
  title: string;
  children: ReactNode;
  /** Sections start open; a long tail can start closed. */
  defaultOpen?: boolean;
  className?: string;
}

/**
 * Native disclosure, so the panel is keyboard operable and works before
 * hydration. Only the chevron animates — collapsing height is off the table.
 */
export function FilterSection({
  title,
  children,
  defaultOpen = true,
  className,
}: FilterSectionProps) {
  return (
    <details
      open={defaultOpen}
      className={cn("group border-b border-line py-6 last:border-b-0", className)}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-h4 text-ink-1 transition-colors transition-fast hover:text-primary-600 [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDownIcon className="size-5 shrink-0 text-ink-3 transition-transform transition-fast group-open:-rotate-180" />
      </summary>

      <div className="mt-5">{children}</div>
    </details>
  );
}
