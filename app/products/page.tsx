import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { BrandBar } from "@/components/product/BrandBar";
import { FilterSheet } from "@/components/product/FilterSheet";
import { Pagination } from "@/components/product/Pagination";
import { ProductFilters } from "@/components/product/ProductFilters";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SortSelect } from "@/components/product/SortSelect";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { brandName } from "@/lib/data/brands";
import {
  PRICE_MAX,
  PRICE_MIN,
  activeFilterCount,
  buildFacets,
  categoryLabels,
  listingHref,
  parseQuery,
  queryToSearch,
  selectProducts,
} from "@/lib/filters";
import type { ProductQuery } from "@/lib/filters";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Every smartphone, smart watch and audio product Abans carries — filter by brand, price, RAM and storage, then buy from the Abans store.",
};

/** Everything a "Clear All" resets — sort and paging are not filters. */
const clearAllPatch: Partial<ProductQuery> = {
  category: "all",
  brand: "all",
  ram: [],
  storage: [],
  min: PRICE_MIN,
  max: PRICE_MAX,
  offersOnly: false,
};

export default async function ProductsPage(props: PageProps<"/products">) {
  const query = parseQuery(await props.searchParams);
  const facets = buildFacets(query);
  const page = selectProducts(query);
  const active = activeFilterCount(query);

  // A brand or category choice belongs in the page title, not just the chips.
  const heading =
    query.brand !== "all"
      ? `${brandName[query.brand]} ${query.category === "all" ? "Products" : categoryLabels[query.category]}`
      : categoryLabels[query.category] === "All Products"
        ? "Products"
        : categoryLabels[query.category];

  return (
    // Below `lg` the docked filter button owns the bottom of the viewport, so
    // the page carries enough tail padding to clear it.
    <div className="pb-28 lg:pb-section">
      <Container className="pt-10 md:pt-14">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Products" }]} />

        <h1 className="mt-6 text-h1 text-ink-1">{heading}</h1>
      </Container>

      <Container className="mt-12 lg:mt-16">
        <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:items-start lg:gap-12 xl:grid-cols-[18rem_1fr] xl:gap-16">
          {/* The rail pins under the nav. It is taller than a short viewport,
              so it carries its own scroll rather than stranding its tail. */}
          <aside
            aria-label="Product Filters"
            className="no-scrollbar hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100svh-8rem)] lg:overflow-y-auto lg:pb-4"
          >
            <ProductFilters query={query} facets={facets} idPrefix="rail" hideBrand />
          </aside>

          <div className="min-w-0">
            <BrandBar
              query={query}
              options={facets.brands}
              className="mb-8 hidden lg:block"
            />

            <div className="flex flex-col gap-4 rounded-lg bg-surface px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <p aria-live="polite" className="text-body-sm text-ink-3">
                {page.total === 0 ? (
                  "No products match these filters"
                ) : (
                  <>
                    Showing{" "}
                    <span className="font-medium text-ink-1 tabular-nums">
                      {page.from}–{page.to}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-ink-1 tabular-nums">
                      {page.total}
                    </span>{" "}
                    products
                  </>
                )}
              </p>

              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <SortSelect query={query} />
              </div>
            </div>

            {page.total === 0 ? (
              <EmptyState clearHref={listingHref(query, clearAllPatch)} />
            ) : (
              <>
                {/* Keyed on the query so a new page or filter re-runs the
                    stagger instead of swapping cards in place. */}
                <ProductGrid
                  key={`${queryToSearch(query)}|${page.page}`}
                  products={page.items}
                  columns={3}
                  step={0.04}
                  priorityCount={3}
                  className="mt-10"
                />

                <Pagination
                  query={query}
                  page={page.page}
                  pageCount={page.pageCount}
                  className="mt-16"
                />
              </>
            )}
          </div>
        </div>
      </Container>

      {/* Below `lg` the whole panel lives behind a button docked to the bottom
          of the viewport, so filters stay reachable at any scroll depth. */}
      <FilterSheet
        activeCount={active}
        resultCount={page.total}
        className="lg:hidden"
      >
        <ProductFilters
          query={query}
          facets={facets}
          idPrefix="sheet"
          headingHidden
        />
      </FilterSheet>
    </div>
  );
}

function EmptyState({ clearHref }: { clearHref: string }) {
  return (
    <div className="mt-10 rounded-lg bg-surface px-6 py-16 text-center">
      <h2 className="text-h3 text-ink-1">Nothing Matches Those Filters</h2>
      <p className="mx-auto mt-4 max-w-[46ch] text-body text-ink-3">
        Try widening the price range or clearing a filter or two — the full
        catalogue is 45 products deep.
      </p>
      <Button href={clearHref} variant="secondary" className="mt-8">
        Clear All Filters
      </Button>
    </div>
  );
}
