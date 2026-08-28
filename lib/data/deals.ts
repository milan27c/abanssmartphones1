import { getProduct } from "@/lib/data/products";
import type { DealPromo, Product } from "@/lib/types";

/** Copy for the limited-time offers band. The clock runs to Colombo midnight. */
export const dealPromo: DealPromo = {
  title: "Limited Time Deals",
  body: "Season-low pricing on our best sellers, held only until the timer hits zero. Stock is allocated per store, and once a store sells out it stays out.",
  ctaLabel: "Shop All Deals",
  href: "/products?sort=discount",
  endsAt: "2026-09-30T18:29:59.000Z",
};

/** The three sharpest markdowns on the shelf. */
export const dealProducts: Product[] = [
  "mibro-a2-smart-watch-black",
  "sudio-a1-true-wireless-earbuds-sky-blue",
  "motorola-moto-g45-brilliant-green",
].flatMap((slug) => getProduct(slug) ?? []);
