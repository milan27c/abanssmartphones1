import { catalog } from "@/lib/data/catalog";
import { brands } from "@/lib/data/brands";
import { discountPercent } from "@/lib/format";
import type { BrandSlug, Product } from "@/lib/types";

/**
 * Listing state. It lives entirely in `searchParams`, so the grid is
 * shareable, bookmarkable and works with the back button; the page parses it
 * once on the server and hands the result down as props.
 */

export const PAGE_SIZE = 15;
export const PRICE_STEP = 1000;

const prices = catalog.map((product) => product.price);
export const PRICE_MIN = Math.floor(Math.min(...prices) / 5000) * 5000;
export const PRICE_MAX = Math.ceil(Math.max(...prices) / 5000) * 5000;

export type CategoryId = "all" | "smartphones" | "accessories";
export type SortId =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "discount";

export interface ProductQuery {
  category: CategoryId;
  brand: BrandSlug | "all";
  ram: string[];
  storage: string[];
  min: number;
  max: number;
  offersOnly: boolean;
  sort: SortId;
  page: number;
}

export const defaultQuery: ProductQuery = {
  category: "all",
  brand: "all",
  ram: [],
  storage: [],
  min: PRICE_MIN,
  max: PRICE_MAX,
  offersOnly: false,
  sort: "featured",
  page: 1,
};

export const categoryLabels: Record<CategoryId, string> = {
  all: "All Products",
  smartphones: "Smartphones",
  accessories: "Accessories",
};

export const sortOptions: { id: SortId; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest First" },
  { id: "price-asc", label: "Price: Low To High" },
  { id: "price-desc", label: "Price: High To Low" },
  { id: "discount", label: "Biggest Discount" },
];

/* -- Reading a product ----------------------------------------------------- */

function categoryOf(product: Product): Exclude<CategoryId, "all"> {
  return product.category === "smartphone" ? "smartphones" : "accessories";
}

function specValue(product: Product, label: string): string | undefined {
  return product.specs.find((spec) => spec.label === label)?.value;
}

/** `512 GB` → 512, `1 TB` → 1024. Used only to order the chips. */
function capacity(value: string): number {
  const amount = Number.parseFloat(value);
  if (Number.isNaN(amount)) return 0;
  return /tb/i.test(value) ? amount * 1024 : amount;
}

/* -- Parsing --------------------------------------------------------------- */

type RawParams = Record<string, string | string[] | undefined>;

function first(params: RawParams, key: string): string | undefined {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

function list(params: RawParams, key: string, allowed: string[]): string[] {
  const raw = first(params, key);
  if (!raw) return [];
  return raw
    .split(",")
    .map((entry) => entry.trim())
    .filter((entry) => allowed.includes(entry));
}

function clampPrice(raw: string | undefined, fallback: number): number {
  const value = Number.parseInt(raw ?? "", 10);
  if (Number.isNaN(value)) return fallback;
  return Math.min(PRICE_MAX, Math.max(PRICE_MIN, value));
}

const ramValues = orderedSpecValues("RAM");
const storageValues = orderedSpecValues("Storage");

function orderedSpecValues(label: string): string[] {
  const seen = new Set<string>();
  for (const product of catalog) {
    const value = specValue(product, label);
    if (value) seen.add(value);
  }
  return [...seen].sort((a, b) => capacity(a) - capacity(b));
}

const brandSlugs = new Set<string>(brands.map((brand) => brand.slug));

export function parseQuery(params: RawParams): ProductQuery {
  const rawCategory = first(params, "category");
  // The footer points at `category=wearable` and `category=audio`; both live
  // under Accessories here, so they resolve rather than 404 into an empty grid.
  const category: CategoryId =
    rawCategory === "smartphones" || rawCategory === "smartphone"
      ? "smartphones"
      : rawCategory === "accessories" ||
          rawCategory === "wearable" ||
          rawCategory === "audio"
        ? "accessories"
        : "all";

  const rawBrand = first(params, "brand");
  const brand = rawBrand && brandSlugs.has(rawBrand) ? (rawBrand as BrandSlug) : "all";

  const rawSort = first(params, "sort");
  const sort =
    sortOptions.find((option) => option.id === rawSort)?.id ?? "featured";

  const page = Math.max(1, Number.parseInt(first(params, "page") ?? "1", 10) || 1);

  const min = clampPrice(first(params, "min"), PRICE_MIN);
  const max = clampPrice(first(params, "max"), PRICE_MAX);

  return {
    category,
    brand,
    ram: list(params, "ram", ramValues),
    storage: list(params, "storage", storageValues),
    // Keep the pair ordered however it arrives.
    min: Math.min(min, max),
    max: Math.max(min, max),
    offersOnly: first(params, "filter") === "offers",
    sort,
    page,
  };
}

/* -- Serialising ----------------------------------------------------------- */

/** Only non-default state reaches the URL, so a clean listing stays `/products`. */
export function queryToSearch(query: ProductQuery): string {
  const params = new URLSearchParams();

  if (query.category !== "all") params.set("category", query.category);
  if (query.brand !== "all") params.set("brand", query.brand);
  if (query.ram.length) params.set("ram", query.ram.join(","));
  if (query.storage.length) params.set("storage", query.storage.join(","));
  if (query.min !== PRICE_MIN) params.set("min", String(query.min));
  if (query.max !== PRICE_MAX) params.set("max", String(query.max));
  if (query.offersOnly) params.set("filter", "offers");
  if (query.sort !== "featured") params.set("sort", query.sort);
  if (query.page > 1) params.set("page", String(query.page));

  const search = params.toString();
  return search ? `?${search}` : "";
}

/**
 * Href for the listing with `patch` applied. Every change except an explicit
 * page move returns to page one — otherwise a filter can strand the user on a
 * page that no longer exists.
 */
export function listingHref(
  query: ProductQuery,
  patch: Partial<ProductQuery>,
): string {
  const next: ProductQuery = {
    ...query,
    page: patch.page ?? 1,
    ...patch,
  };
  return `/products${queryToSearch(next)}`;
}

/** Adds or removes one value from a multi-select facet. */
export function toggle(values: string[], value: string): string[] {
  return values.includes(value)
    ? values.filter((entry) => entry !== value)
    : [...values, value];
}

export function activeFilterCount(query: ProductQuery): number {
  return (
    (query.category !== "all" ? 1 : 0) +
    (query.brand !== "all" ? 1 : 0) +
    query.ram.length +
    query.storage.length +
    (query.min !== PRICE_MIN || query.max !== PRICE_MAX ? 1 : 0) +
    (query.offersOnly ? 1 : 0)
  );
}

/* -- Filtering, sorting, paging -------------------------------------------- */

type FacetKey = "category" | "brand" | "ram" | "storage" | "price" | "offers";

function predicates(
  query: ProductQuery,
): Record<FacetKey, (product: Product) => boolean> {
  return {
    category: (product) =>
      query.category === "all" || categoryOf(product) === query.category,
    brand: (product) => query.brand === "all" || product.brand === query.brand,
    ram: (product) =>
      query.ram.length === 0 ||
      query.ram.includes(specValue(product, "RAM") ?? ""),
    storage: (product) =>
      query.storage.length === 0 ||
      query.storage.includes(specValue(product, "Storage") ?? ""),
    price: (product) => product.price >= query.min && product.price <= query.max,
    offers: (product) =>
      !query.offersOnly || discountPercent(product.price, product.originalPrice) > 0,
  };
}

function matching(query: ProductQuery, except?: FacetKey): Product[] {
  const tests = predicates(query);
  const keys = (Object.keys(tests) as FacetKey[]).filter((key) => key !== except);
  return catalog.filter((product) => keys.every((key) => tests[key](product)));
}

const comparators: Record<SortId, (a: Product, b: Product) => number> = {
  featured: () => 0,
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  newest: (a, b) => Number(b.tag === "new") - Number(a.tag === "new"),
  discount: (a, b) =>
    discountPercent(b.price, b.originalPrice) -
    discountPercent(a.price, a.originalPrice),
};

export interface ProductPage {
  items: Product[];
  total: number;
  page: number;
  pageCount: number;
  /** 1-based, inclusive, for the "Showing 1–15 of 45" line. */
  from: number;
  to: number;
}

export function selectProducts(query: ProductQuery): ProductPage {
  // `toSorted` is stable, so every comparator falls back to Featured order.
  const matched = matching(query).toSorted(comparators[query.sort]);

  const total = matched.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(query.page, pageCount);
  const start = (page - 1) * PAGE_SIZE;

  return {
    items: matched.slice(start, start + PAGE_SIZE),
    total,
    page,
    pageCount,
    from: total === 0 ? 0 : start + 1,
    to: Math.min(start + PAGE_SIZE, total),
  };
}

/* -- Facet counts ---------------------------------------------------------- */

export interface FacetOption<T extends string = string> {
  value: T;
  label: string;
  count: number;
}

export interface Facets {
  categories: FacetOption<CategoryId>[];
  brands: FacetOption<BrandSlug | "all">[];
  ram: FacetOption[];
  storage: FacetOption[];
  offers: number;
}

/**
 * Each facet is counted against every *other* active filter, so the numbers
 * answer "how many would I get if I picked this" rather than restating the
 * current result.
 */
export function buildFacets(query: ProductQuery): Facets {
  const forCategory = matching(query, "category");
  const forBrand = matching(query, "brand");
  const forRam = matching(query, "ram");
  const forStorage = matching(query, "storage");
  const forOffers = matching(query, "offers");

  const countBySpec = (pool: Product[], label: string, value: string) =>
    pool.filter((product) => specValue(product, label) === value).length;

  return {
    categories: (["all", "smartphones", "accessories"] as CategoryId[]).map(
      (value) => ({
        value,
        label: categoryLabels[value],
        count:
          value === "all"
            ? forCategory.length
            : forCategory.filter((product) => categoryOf(product) === value).length,
      }),
    ),
    brands: [
      { value: "all" as const, label: "All Brands", count: forBrand.length },
      ...brands.map((brand) => ({
        value: brand.slug,
        label: brand.name,
        count: forBrand.filter((product) => product.brand === brand.slug).length,
      })),
    ],
    ram: ramValues.map((value) => ({
      value,
      label: value,
      count: countBySpec(forRam, "RAM", value),
    })),
    storage: storageValues.map((value) => ({
      value,
      label: value,
      count: countBySpec(forStorage, "Storage", value),
    })),
    offers: forOffers.filter(
      (product) => discountPercent(product.price, product.originalPrice) > 0,
    ).length,
  };
}
