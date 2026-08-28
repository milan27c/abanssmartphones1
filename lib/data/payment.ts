import { products } from "@/lib/data/products";
import type { InstalmentPlan, PaymentPartner, Product } from "@/lib/types";

import fintrex from "@/public/images/abanseasy/fintrex.png";
import snappay from "@/public/images/abanseasy/snappay.png";
import tikenTika from "@/public/images/abanseasy/tikentika.jpg";

/** The three ways to pay monthly at Abans. */
export const paymentPartners: PaymentPartner[] = [
  {
    id: "tiken-tika",
    name: "Abans Tiken Tika Pay",
    tagline: "Pay In Small Steps",
    logo: tikenTika,
    bleed: true,
  },
  {
    id: "snappay",
    name: "SnapPay",
    tagline: "Buy Now, Pay Later",
    logo: snappay,
  },
  {
    id: "fintrex",
    name: "Fintrex Mobile Loan",
    tagline: "Instant Mobile Loan",
    logo: fintrex,
  },
];

/** Every plan above runs to the same standard term. */
export const INSTALMENT_MONTHS = 12;

export const DEFAULT_MONTHLY_BUDGET = 10000;

/** Rupee amounts a shopper is most likely to reach for. */
export const budgetQuickPicks = [
  2000, 5000, 7500, 10000, 15000, 20000, 25000,
];

/**
 * What a device costs per month over an arbitrary tenor. Rounded up, so the
 * quoted instalment never undershoots the shelf price.
 */
export function monthlyOver(price: number, months: number): number {
  return Math.ceil(price / months);
}

/** The same figure over the standard term. */
export function monthlyInstalment(price: number): number {
  return monthlyOver(price, INSTALMENT_MONTHS);
}

/** The shelf price plus the bank's handling charge for this tenor. */
export function planTotal(price: number, plan: InstalmentPlan): number {
  return Math.round(price * (1 + plan.feePercent / 100));
}

/** That total spread across the tenor, rounded up so it never undershoots. */
export function planMonthly(price: number, plan: InstalmentPlan): number {
  return monthlyOver(planTotal(price, plan), plan.months);
}

/** The smallest instalment in the catalogue — the floor for the budget field. */
export const lowestInstalment = Math.min(
  ...products.map((product) => monthlyInstalment(product.price)),
);

/**
 * Everything a monthly budget covers, most expensive first — a shopper wants
 * the best device the budget reaches, not the cheapest.
 */
export function devicesWithinBudget(monthlyBudget: number): Product[] {
  if (monthlyBudget <= 0) return [];

  return products
    .filter((product) => monthlyInstalment(product.price) <= monthlyBudget)
    .sort((a, b) => b.price - a.price);
}
