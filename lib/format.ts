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

/**
 * The name a shopper would actually say out loud, taken off a full listing
 * title: the variant tail — colour, capacity, the spec chunk merchandising
 * bolts on — is dropped, so `Apple iPhone 17 Pro 256GB - Deep Blue` reads back
 * as `Apple iPhone 17 Pro`. Use it in running copy only; anywhere the exact
 * variant matters (order lines, the enquiry reference), print the full title.
 */
export function productShortName(title: string): string {
  return (
    title
      // Colour tail: "… - Deep Blue". Spaces on both sides, so "On-Ear" stays.
      .replace(/\s+[-–—]\s+[^-–—]*$/, "")
      // Colour tail again, parenthesised: "… (Sky Blue)".
      .replace(/\s*\([^)]*\)\s*$/, "")
      // Trailing feature clause: "… with Wireless Charging Case".
      .replace(/\s+with\s+.*$/i, "")
      // Capacity: "256GB", "12GB + 512GB".
      .replace(/\s*\b\d+\s*(GB|TB)\b(\s*\+\s*\d+\s*(GB|TB)\b)?/gi, "")
      // Screen spec: "1.39 inch Round HD Screen".
      .replace(/\s*\b\d+(\.\d+)?[- ]?inch\b.*?\bScreen\b/gi, "")
      // Anything left in brackets mid-title: "Sudio (Sweden) A1".
      .replace(/\s*\([^)]*\)/g, "")
      .replace(/\s{2,}/g, " ")
      .trim()
  );
}
