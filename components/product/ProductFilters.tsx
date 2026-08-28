import Image from "next/image";
import Link from "next/link";

import { FilterSection } from "@/components/product/FilterSection";
import { PriceRange } from "@/components/product/PriceRange";
import { CheckIcon } from "@/components/ui/Icons";
import { pillClasses } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";
import { brands } from "@/lib/data/brands";
import {
  PRICE_MAX,
  PRICE_MIN,
  listingHref,
  toggle,
  activeFilterCount,
  type CategoryId,
  type FacetOption,
  type Facets,
  type ProductQuery,
} from "@/lib/filters";
import type { BrandSlug } from "@/lib/types";

interface ProductFiltersProps {
  query: ProductQuery;
  facets: Facets;
  /** Namespaces input ids — the panel renders twice, sidebar and mobile sheet. */
  idPrefix: string;
  /** The mobile sheet titles itself, so the panel's own heading goes silent. */
  headingHidden?: boolean;
  /** Desktop moves brand into its own bar above the grid, so the rail drops it. */
  hideBrand?: boolean;
  className?: string;
}

/** Brand marks are keyed off the slug so a facet row can wear its own logo. */
const logoBySlug = new Map(brands.map((brand) => [brand.slug, brand.logo]));

const clearAll: Partial<ProductQuery> = {
  category: "all",
  brand: "all",
  ram: [],
  storage: [],
  min: PRICE_MIN,
  max: PRICE_MAX,
  offersOnly: false,
};

/**
 * The whole filter panel. Every control is a link carrying the next URL, so
 * filtering survives a hard refresh, prefetches, and stays shareable; only the
 * price slider needs client state.
 */
export function ProductFilters({
  query,
  facets,
  idPrefix,
  headingHidden = false,
  hideBrand = false,
  className,
}: ProductFiltersProps) {
  const active = activeFilterCount(query);
  const showCapacity =
    facets.ram.some((option) => option.count > 0) ||
    facets.storage.some((option) => option.count > 0);

  return (
    <div className={className}>
      <div
        className={cn(
          "flex items-baseline gap-4",
          headingHidden ? "justify-end" : "justify-between",
        )}
      >
        <h2 className={cn("text-h3 text-ink-1", headingHidden && "sr-only")}>
          Filters
        </h2>
        {active > 0 ? (
          <Link
            href={listingHref(query, clearAll)}
            scroll={false}
            className="link-underline text-body-sm text-primary-600 transition-colors transition-fast hover:text-primary-700"
          >
            Clear All
          </Link>
        ) : null}
      </div>

      <div className="mt-2">
        <FilterSection title="Category">
          <ul>
            {facets.categories.map((option) => (
              <li key={option.value}>
                <CategoryOption query={query} option={option} />
              </li>
            ))}
          </ul>
        </FilterSection>

        {hideBrand ? null : (
          <FilterSection title="Brand">
            <ul>
              {facets.brands.map((option) => (
                <li key={option.value}>
                  <BrandOption query={query} option={option} />
                </li>
              ))}
            </ul>
          </FilterSection>
        )}

        <FilterSection title="Price (LKR)">
          <PriceRange query={query} idPrefix={idPrefix} />
        </FilterSection>

        {showCapacity ? (
          <>
            <FilterSection title="RAM">
              <ChipList
                query={query}
                options={facets.ram}
                selected={query.ram}
                patch={(values) => ({ ram: values })}
                name="RAM"
              />
            </FilterSection>

            <FilterSection title="Storage">
              <ChipList
                query={query}
                options={facets.storage}
                selected={query.storage}
                patch={(values) => ({ storage: values })}
                name="Storage"
              />
            </FilterSection>
          </>
        ) : null}

        <FilterSection title="Offers">
          <Link
            href={listingHref(query, { offersOnly: !query.offersOnly })}
            scroll={false}
            aria-pressed={query.offersOnly}
            role="button"
            className="group flex items-center gap-3 py-1"
          >
            <Marker checked={query.offersOnly} shape="square" />
            <span
              className={cn(
                "text-body transition-colors transition-fast",
                query.offersOnly ? "text-ink-1" : "text-ink-2 group-hover:text-ink-1",
              )}
            >
              On Offer Only
            </span>
            <span className="ml-auto text-body-sm text-ink-4 tabular-nums">
              {facets.offers}
            </span>
          </Link>
        </FilterSection>
      </div>
    </div>
  );
}

interface CategoryOptionProps {
  query: ProductQuery;
  option: FacetOption<CategoryId>;
}

function CategoryOption({ query, option }: CategoryOptionProps) {
  const active = option.value === query.category;
  const empty = option.count === 0 && !active;

  const body = (
    <>
      <Marker checked={active} shape="circle" muted={empty} />
      <span
        className={cn(
          "text-body transition-colors transition-fast",
          empty
            ? "text-ink-4"
            : active
              ? "text-ink-1"
              : "text-ink-2 group-hover:text-ink-1",
        )}
      >
        {option.label}
      </span>
      <span className="ml-auto text-body-sm text-ink-4 tabular-nums">
        {option.count}
      </span>
    </>
  );

  if (empty) {
    return (
      <span aria-disabled="true" className="flex cursor-not-allowed items-center gap-3 py-2">
        {body}
      </span>
    );
  }

  return (
    <Link
      href={listingHref(query, { category: option.value })}
      scroll={false}
      aria-current={active ? "true" : undefined}
      className="group flex items-center gap-3 py-2"
    >
      {body}
    </Link>
  );
}

interface BrandOptionProps {
  query: ProductQuery;
  option: FacetOption<BrandSlug | "all">;
}

/**
 * One brand per row. Brand is a single choice, so it wears the same circular
 * marker as Category — the logo sits in a fixed slot beside it, which keeps the
 * names on one vertical edge and lets the list be scanned by mark alone.
 */
function BrandOption({ query, option }: BrandOptionProps) {
  const active = option.value === query.brand;
  const empty = option.count === 0 && !active;
  const logo = option.value === "all" ? null : logoBySlug.get(option.value);

  const body = (
    <>
      <Marker checked={active} shape="circle" muted={empty} />
      <span className="flex w-9 shrink-0 items-center justify-center">
        {logo ? (
          <Image
            src={logo}
            alt=""
            sizes="40px"
            className={cn(
              "plate-blend h-4 w-9 object-contain transition-[filter,opacity] transition-fast",
              empty ? "opacity-40 grayscale" : active ? "" : "opacity-80 group-hover:opacity-100",
            )}
          />
        ) : null}
      </span>
      <span
        className={cn(
          "text-body transition-colors transition-fast",
          empty
            ? "text-ink-4"
            : active
              ? "text-ink-1"
              : "text-ink-2 group-hover:text-ink-1",
        )}
      >
        {option.label}
      </span>
      <span className="ml-auto text-body-sm text-ink-4 tabular-nums">
        {option.count}
      </span>
    </>
  );

  if (empty) {
    return (
      <span
        aria-disabled="true"
        title={`No ${option.label} products match the current filters`}
        className="flex cursor-not-allowed items-center gap-3 py-2"
      >
        {body}
      </span>
    );
  }

  return (
    <Link
      href={listingHref(query, { brand: option.value })}
      scroll={false}
      aria-current={active ? "true" : undefined}
      className="group flex items-center gap-3 py-2"
    >
      {body}
    </Link>
  );
}

interface MarkerProps {
  checked: boolean;
  shape: "circle" | "square";
  muted?: boolean;
}

/** The tick that stands in for a radio or a checkbox. */
function Marker({ checked, shape, muted = false }: MarkerProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-5 shrink-0 items-center justify-center border",
        "transition-[background-color,border-color,color] transition-fast",
        shape === "circle" ? "rounded-pill" : "rounded-sm",
        checked
          ? "border-primary-600 bg-primary-600 text-white"
          : cn(
              "bg-surface-alt text-transparent",
              muted ? "border-line" : "border-line-strong group-hover:border-ink-3",
            ),
      )}
    >
      <CheckIcon className="size-3" />
    </span>
  );
}

interface ChipListProps {
  query: ProductQuery;
  options: FacetOption[];
  selected: string[];
  patch: (values: string[]) => Partial<ProductQuery>;
  /** Used for the screen-reader label on each chip. */
  name: string;
}

function ChipList({ query, options, selected, patch, name }: ChipListProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = selected.includes(option.value);
        const empty = option.count === 0 && !active;

        return (
          <li key={option.value}>
            {empty ? (
              <span
                aria-disabled="true"
                className={cn(
                  pillClasses(false),
                  "cursor-not-allowed bg-surface/60 text-ink-4 hover:scale-100 hover:bg-surface/60 hover:text-ink-4",
                )}
              >
                {option.label}
              </span>
            ) : (
              <Link
                href={listingHref(query, patch(toggle(selected, option.value)))}
                scroll={false}
                aria-pressed={active}
                role="button"
                aria-label={`${name} ${option.label}`}
                className={pillClasses(active)}
              >
                {option.label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
