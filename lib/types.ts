import type { StaticImageData } from "next/image";

export type BrandSlug =
  | "apple"
  | "redmi"
  | "motorola"
  | "oppo"
  | "vivo"
  | "realme"
  | "itel"
  | "tecno"
  | "infinix"
  | "jbl"
  | "sudio"
  | "mibro";

export interface Brand {
  slug: BrandSlug;
  /** Manufacturer's own casing. */
  name: string;
  logo: StaticImageData;
}

export type ProductCategory = "smartphone" | "wearable" | "audio";

export type ProductTag = "new" | "sale";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  title: string;
  brand: BrandSlug;
  category: ProductCategory;
  /** Cents-free rupee amount. */
  price: number;
  /** Pre-discount rupee amount, when the item is on offer. */
  originalPrice?: number;
  tag?: ProductTag;
  image: StaticImageData;
  /** Alt text describing the shot, not the listing. */
  imageAlt: string;
  specs: ProductSpec[];
  inStock: boolean;
  /** Outbound handoff to the Abans storefront. */
  buyUrl: string;
}

export interface HeroSlide {
  id: string;
  /** Copy is baked into the artwork, so this is what a screen reader hears. */
  alt: string;
  desktop: StaticImageData;
  mobile: StaticImageData;
  href: string;
  /** Short label for the carousel's progress indicator. */
  indicatorLabel: string;
  /** Kept in the data but withheld from the carousel. */
  hidden?: boolean;
}

export interface Offer {
  id: string;
  /** Overlaid heading — a short line the gradient wash sits behind. */
  title: string;
  ctaLabel: string;
  href: string;
  /** Full-bleed 4:5 artwork behind the copy. */
  image: StaticImageData;
  imageAlt: string;
}

export interface DealPromo {
  title: string;
  /** Sentence case, one short paragraph. */
  body: string;
  ctaLabel: string;
  href: string;
  /** ISO instant the countdown runs down to. */
  endsAt: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  /** ISO date. */
  date: string;
  excerpt: string;
  cover: StaticImageData;
  coverAlt: string;
  readingMinutes: number;
}

export interface TrustItem {
  id: string;
  title: string;
  body: string;
  /** Key into the icon map in TrustBar. */
  icon: "dealer" | "warranty" | "approved" | "delivery";
}

export interface NavLink {
  label: string;
  href: string;
  /** Absolute URL to an external site — opens in a new tab. */
  external?: boolean;
  /** Kept in the data but withheld from the nav it belongs to. */
  hidden?: boolean;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface SocialLink {
  label: string;
  href: string;
  /** Key into the icon map in Footer. */
  icon: "facebook" | "instagram" | "youtube" | "tiktok";
}

export interface FooterContactItem {
  label: string;
  /** Key into the icon map in Footer. */
  icon: "phone" | "mail" | "address" | "sites";
  /** One row per line; a href turns the line into a link. */
  lines: { text: string; href?: string }[];
}

export interface PaymentPartner {
  id: string;
  /** Partner's own casing. */
  name: string;
  /** Sentence-fragment pitch, Title Case, three words at most. */
  tagline: string;
  logo: StaticImageData;
  /**
   * The artwork ships with its own coloured plate, so it fills the tile edge
   * to edge instead of sitting letterboxed on white.
   */
  bleed?: boolean;
}

/* ---------------------------------------------------------------------------
   Product detail page
   ------------------------------------------------------------------------ */

export interface GalleryImage {
  id: string;
  src: StaticImageData;
  /** Describes the shot, not the listing. */
  alt: string;
  /** Short label for the thumbnail rail's accessible name. */
  label: string;
}

/** One tenor a card runs, and what the bank charges to convert to it. */
export interface InstalmentPlan {
  months: number;
  /** Bank handling charge on the purchase, as a percentage. 0 is interest-free. */
  feePercent: number;
}

/** A card partner running instalment plans on Abans stock. */
export interface Bank {
  id: string;
  /** Partner's own casing, short enough for a card. */
  name: string;
  /** The legal name, for the plan dialog's title. */
  fullName: string;
  logo: StaticImageData;
  /** The card centre that converts a payment to instalments. */
  hotline: { label: string; href: string };
  /** Every tenor the card runs, ascending. The last one is the headline. */
  plans: InstalmentPlan[];
}

/** One card in the Key Features row: a label over a figure over a note. */
export interface KeyFeature {
  id: string;
  /** UPPERCASE eyebrow. */
  label: string;
  /** The figure itself — kept short enough to hold one line. */
  value: string;
  /** Sentence case, one line. */
  note: string;
}

/** A full-width story panel: centred copy over a wide image. */
export interface FeatureStory {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  image: StaticImageData;
  imageAlt: string;
  /** `dark` drops the panel onto the deepest plate and flips the copy white. */
  tone?: "light" | "dark";
  /**
   * How the artwork fills its 16:9 frame. `cover` (the default) suits a shot
   * already cut to that ratio; `contain` is for artwork of another shape whose
   * own background matches the panel, so the letterbox never shows.
   */
  fit?: "cover" | "contain";
}

/** One row of the full specification table. One value per line. */
export interface SpecRow {
  label: string;
  values: string[];
}

export interface SpecGroup {
  id: string;
  title: string;
  rows: SpecRow[];
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

/**
 * Everything the detail page shows beyond the listing record. Keyed off a
 * product, never duplicated from it — title, price and tag still come from
 * `Product`.
 */
export interface ProductDetail {
  productCode: string;
  modelNo: string;
  gallery: GalleryImage[];
  /** Sentence case, one short paragraph under the title. */
  summary: string;
  keyFeatures: KeyFeature[];
  stories: FeatureStory[];
  specGroups: SpecGroup[];
  faqs: Faq[];
}

/**
 * A YouTube feature embedded on a page. The poster is a local asset so the
 * facade paints from our own origin — nothing loads from YouTube until the
 * visitor actually asks to play.
 */
export interface VideoFeature {
  /** The `v` parameter from the watch URL. */
  youtubeId: string;
  /** The video's own title, used for the iframe and the play control. */
  title: string;
  poster: StaticImageData;
  posterAlt: string;
}
