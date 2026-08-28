import Link from "next/link";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { listingHref, type ProductQuery } from "@/lib/filters";

interface PaginationProps {
  query: ProductQuery;
  page: number;
  pageCount: number;
  className?: string;
}

/** First, last, the current page and its neighbours; `null` marks a gap. */
function pageWindow(page: number, pageCount: number): (number | null)[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const around = [page - 1, page, page + 1].filter(
    (candidate) => candidate > 1 && candidate < pageCount,
  );
  const pages = [1, ...around, pageCount];

  return pages.flatMap((value, index) => {
    const previous = pages[index - 1];
    return previous !== undefined && value - previous > 1 ? [null, value] : [value];
  });
}

const step =
  "inline-flex size-11 items-center justify-center rounded-pill border " +
  "transition-[background-color,border-color,color,transform] transition-fast";

export function Pagination({ query, page, pageCount, className }: PaginationProps) {
  if (pageCount <= 1) return null;

  const pages = pageWindow(page, pageCount);

  return (
    <nav aria-label="Pagination" className={className}>
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          <Step
            query={query}
            page={page - 1}
            disabled={page === 1}
            label="Previous Page"
            direction="previous"
          />
        </li>

        {pages.map((value, index) =>
          value === null ? (
            <li
              key={`gap-${index}`}
              aria-hidden="true"
              className="px-1 text-body-sm text-ink-4"
            >
              …
            </li>
          ) : (
            <li key={value}>
              <Link
                href={listingHref(query, { page: value })}
                aria-current={value === page ? "page" : undefined}
                aria-label={`Page ${value}`}
                className={cn(
                  step,
                  "text-body-sm tabular-nums hover:scale-[1.02] active:scale-[0.98]",
                  value === page
                    ? "border-primary-600 bg-primary-600 text-white hover:bg-primary-700"
                    : "border-line-strong text-ink-2 hover:border-ink-1 hover:bg-surface hover:text-ink-1",
                )}
              >
                {value}
              </Link>
            </li>
          ),
        )}

        <li>
          <Step
            query={query}
            page={page + 1}
            disabled={page === pageCount}
            label="Next Page"
            direction="next"
          />
        </li>
      </ul>
    </nav>
  );
}

interface StepProps {
  query: ProductQuery;
  page: number;
  disabled: boolean;
  label: string;
  direction: "previous" | "next";
}

function Step({ query, page, disabled, label, direction }: StepProps) {
  const Icon = direction === "next" ? ChevronRightIcon : ChevronLeftIcon;

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        aria-label={label}
        className={cn(step, "cursor-not-allowed border-line text-ink-4")}
      >
        <Icon className="size-5" />
      </span>
    );
  }

  return (
    <Link
      href={listingHref(query, { page })}
      aria-label={label}
      rel={direction === "next" ? "next" : "prev"}
      className={cn(
        step,
        "border-line-strong text-ink-1 hover:scale-[1.02] hover:border-ink-1 hover:bg-surface active:scale-[0.98]",
      )}
    >
      <Icon className="size-5" />
    </Link>
  );
}
