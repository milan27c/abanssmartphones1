/**
 * The jump targets on a product page. One list, used by both the sticky
 * sub-nav and the sections themselves, so a rename can never leave a link
 * pointing at nothing.
 */
export const productSectionIds = {
  cardPayments: "card-payments",
  abansEasyPayments: "abans-easy-payments",
  features: "features",
  specs: "specs",
  faq: "faq",
  inquiry: "inquiry",
} as const;

/**
 * How far below the viewport top a section heading comes to rest, clearing the
 * site navbar and the product sub-nav. Mirrors the `scroll-anchor` utility in
 * `app/globals.css` (10rem) — IntersectionObserver only accepts px and %, so
 * the two cannot share one declaration. Change them together.
 */
export const SECTION_ANCHOR_OFFSET = 160;

export interface ProductSectionLink {
  id: string;
  /** Title Case, short enough to hold one line in the bar. */
  label: string;
}

/**
 * The Abans Easy Payments section is withheld for now. This one flag governs
 * both the section on the product page and its link in the sub-nav, so the two
 * cannot drift — flip it to `true` to bring the section back.
 */
export const SHOW_ABANS_EASY_PAYMENTS = false;

export const productSections: ProductSectionLink[] = [
  { id: productSectionIds.cardPayments, label: "Card Payments" },
  ...(SHOW_ABANS_EASY_PAYMENTS
    ? [
        {
          id: productSectionIds.abansEasyPayments,
          label: "Abans Easy Payments",
        },
      ]
    : []),
  { id: productSectionIds.features, label: "Features" },
  { id: productSectionIds.specs, label: "Specs" },
  { id: productSectionIds.faq, label: "FAQ" },
  { id: productSectionIds.inquiry, label: "Inquiry" },
];
