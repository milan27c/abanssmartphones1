/**
 * Sri Lankan rupees, always prefixed, comma grouped, no decimals.
 * `formatLKR(549999)` → `LKR 549,999`
 */
export function formatLKR(amount: number): string {
  return `LKR ${Math.round(amount).toLocaleString("en-US")}`;
}

/**
 * The same figure, split so a headline price can set `LKR` quieter and
 * smaller than the digits beside it. Never build this pair by hand.
 * `splitLKR(549999)` → `{ currency: "LKR", amount: "549,999" }`
 */
export function splitLKR(amount: number): {
  currency: string;
  amount: string;
} {
  return {
    currency: "LKR",
    amount: Math.round(amount).toLocaleString("en-US"),
  };
}

/**
 * Whole-percent saving, rounded down so we never overstate the discount.
 * Returns 0 when there is nothing to advertise.
 */
export function discountPercent(price: number, originalPrice?: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.floor(((originalPrice - price) / originalPrice) * 100);
}

export function titleCase(value: string): string {
  const minor = new Set([
    "a",
    "an",
    "and",
    "as",
    "at",
    "but",
    "by",
    "for",
    "in",
    "nor",
    "of",
    "on",
    "or",
    "the",
    "to",
    "with",
  ]);

  return value
    .split(/\s+/)
    .map((word, index, words) => {
      const lower = word.toLowerCase();
      const isEdge = index === 0 || index === words.length - 1;
      if (!isEdge && minor.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

/** `2026-02-18` → `18 February 2026` */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
