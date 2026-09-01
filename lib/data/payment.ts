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

/**
 * Monthly pay is pitched on phones, so the budget field only ever answers with
 * phones — accessories and wearables stay out of this section entirely.
 */
const payableDevices = products.filter(
  (product) => product.category === "smartphone",
);

/** The home shortlist is four cards wide — a shortlist, not the catalogue. */
export const PAY_EASY_SHORTLIST = 4;

/** The default is rounded to a step this coarse so it lands on a quick pick. */
const BUDGET_STEP = 2500;

/**
 * The budget a shopper starts on: the smallest round figure whose shortlist is
 * four phones deep, so the section opens on a full row. Derived rather than
 * typed in, so it follows the catalogue instead of going stale beside it.
 */
export const DEFAULT_MONTHLY_BUDGET = (() => {
  const instalments = payableDevices
    .map((product) => monthlyInstalment(product.price))
    .sort((a, b) => a - b);

  const fillsTheRow =
    instalments[PAY_EASY_SHORTLIST - 1] ?? instalments.at(-1) ?? 0;

  return Math.ceil(fillsTheRow / BUDGET_STEP) * BUDGET_STEP;
})();

/** The smallest phone instalment we run — the floor for the budget field. */
export const lowestInstalment = Math.min(
  ...payableDevices.map((product) => monthlyInstalment(product.price)),
);

/**
 * Every phone a monthly budget covers, most expensive first — a shopper wants
 * the best device the budget reaches, not the cheapest.
 */
export function devicesWithinBudget(monthlyBudget: number): Product[] {
  if (monthlyBudget <= 0) return [];

  return payableDevices
    .filter((product) => monthlyInstalment(product.price) <= monthlyBudget)
    .sort((a, b) => b.price - a.price);
}

/** The longest tenor any partner runs — the ceiling for a derived plan. */
export const MAX_PLAN_MONTHS = 60;

/** Where an enquiry lands: the Abans monthly-pay application. */
const MONTHLY_PAY_APPLY = "https://abansmonthlypay.vercel.app/apply";

/**
 * How long a monthly budget takes to clear a device, rounded up so the last
 * instalment is never short. Returns 0 when the budget cannot reach it inside
 * the longest tenor we run.
 */
export function monthsToClear(price: number, monthlyBudget: number): number {
  if (monthlyBudget <= 0) return 0;

  const months = Math.ceil(price / monthlyBudget);

  return months > MAX_PLAN_MONTHS ? 0 : months;
}

/** The smallest monthly figure that clears this device inside the longest tenor. */
export function minimumMonthlyFor(price: number): number {
  return monthlyOver(price, MAX_PLAN_MONTHS);
}

/** The application link for one device, one budget and the tenor it implies. */
export function monthlyPayApplyUrl(
  slug: string,
  months: number,
  budget: number,
): string {
  const query = new URLSearchParams({
    device: slug,
    months: String(months),
    budget: String(budget),
  });

  return `${MONTHLY_PAY_APPLY}?${query}`;
}
