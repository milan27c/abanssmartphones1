"use client";

import { useRouter } from "next/navigation";
import { useId } from "react";

import { ChevronDownIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { listingHref, sortOptions, type ProductQuery, type SortId } from "@/lib/filters";

interface SortSelectProps {
  query: ProductQuery;
  className?: string;
}

/** A real `<select>` — the platform control keyboards and scales better than
    anything we would build, so only its chrome is ours. */
export function SortSelect({ query, className }: SortSelectProps) {
  const router = useRouter();
  const id = useId();

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <label htmlFor={id} className="shrink-0 text-body-sm text-ink-3">
        Sort By
      </label>

      <div className="relative">
        <select
          id={id}
          value={query.sort}
          onChange={(event) =>
            router.push(listingHref(query, { sort: event.target.value as SortId }), {
              scroll: false,
            })
          }
          className={cn(
            "select-reset h-11 w-full cursor-pointer rounded-pill border border-line-strong bg-surface-alt",
            "py-0 pr-11 pl-5 text-body-sm text-ink-1",
            "transition-[border-color] transition-fast hover:border-ink-1",
          )}
        >
          {sortOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-3" />
      </div>
    </div>
  );
}
