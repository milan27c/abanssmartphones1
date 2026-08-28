import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { brands } from "@/lib/data/brands";
import { listingHref, type FacetOption, type ProductQuery } from "@/lib/filters";
import type { BrandSlug } from "@/lib/types";

interface BrandBarProps {
  query: ProductQuery;
  /** `facets.brands` — the "All Brands" sentinel first, then one row per brand. */
  options: FacetOption<BrandSlug | "all">[];
  className?: string;
}

/** Brand marks keyed off the slug so each pill can wear its own logo. */
const logoBySlug = new Map(brands.map((brand) => [brand.slug, brand.logo]));

/**
 * A horizontal band of brand pills that sits above the grid on desktop: logo
 * beside name, the active brand ringed in primary, brands with nothing left to
 * show sitting muted. The sidebar and the mobile sheet still carry the brand
 * list in their own layout, so this is `lg`-only.
 */
export function BrandBar({ query, options, className }: BrandBarProps) {
  return (
    <nav aria-label="Filter By Brand" className={className}>
      <ul className="flex flex-wrap gap-2.5">
        {options.map((option) => (
          <li key={option.value}>
            <BrandPill query={query} option={option} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface BrandPillProps {
  query: ProductQuery;
  option: FacetOption<BrandSlug | "all">;
}

function BrandPill({ query, option }: BrandPillProps) {
  const active = option.value === query.brand;
  const empty = option.count === 0 && !active;
  const logo = option.value === "all" ? null : logoBySlug.get(option.value);

  const base =
    "inline-flex h-11 items-center gap-2.5 rounded-pill border px-5 text-body-sm font-medium transition-[background-color,border-color,color,transform] transition-fast";

  const tone = active
    ? "border-primary-600 bg-surface-alt text-primary-700"
    : empty
      ? "border-transparent bg-surface/60 text-ink-4"
      : "border-transparent bg-surface text-ink-1 hover:scale-[1.02] hover:bg-line active:scale-[0.98]";

  const mark = logo ? (
    <Image
      src={logo}
      alt=""
      sizes="32px"
      className={cn(
        "plate-blend h-5 w-7 shrink-0 object-contain transition-[filter,opacity] transition-fast",
        empty ? "opacity-40 grayscale" : "opacity-90",
      )}
    />
  ) : null;

  if (empty) {
    return (
      <span
        aria-disabled="true"
        title={`No ${option.label} products match the current filters`}
        className={cn(base, tone, "cursor-not-allowed")}
      >
        {mark}
        {option.label}
      </span>
    );
  }

  return (
    <Link
      href={listingHref(query, { brand: option.value })}
      scroll={false}
      aria-current={active ? "true" : undefined}
      className={cn(base, tone)}
    >
      {mark}
      {option.label}
    </Link>
  );
}
