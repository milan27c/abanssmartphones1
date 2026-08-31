import { brands } from "@/lib/data/brands";
import type {
  FooterColumn,
  FooterContactItem,
  NavLink,
  SocialLink,
} from "@/lib/types";

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Smartphones", href: "/products?category=smartphones" },
  { label: "Accessories", href: "/products?category=accessories" },
  {
    label: "Pay Monthly",
    href: "https://abansmonthlypay.vercel.app/",
  },
  { label: "Offers", href: "/products?filter=offers" },
  { label: "Contact", href: "/contact" },
];

export const announcements: string[] = [
  "Free island-wide delivery on orders over LKR 25,000",
  "0% interest for 12 months with participating bank cards",
  "Trade in your old phone and save on your next one",
];

/** Handsets only — the audio and wearable labels live under Shop. */
const footerBrandSlugs = [
  "apple",
  "oppo",
  "motorola",
  "redmi",
  "vivo",
  "realme",
  "infinix",
  "tecno",
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Brands",
    links: footerBrandSlugs.map((slug) => ({
      label: brands.find((brand) => brand.slug === slug)!.name,
      href: `/products?brand=${slug}`,
    })),
  },
  {
    title: "Shop",
    links: [
      { label: "All Smartphones", href: "/products" },
      { label: "New Arrivals", href: "/products?sort=newest" },
      { label: "Best Sellers", href: "/products?sort=popular" },
      { label: "Offers", href: "/products?filter=offers" },
      { label: "Shop By Budget", href: "/products?sort=price-asc" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Warranty", href: "/support/warranty" },
      { label: "Service Centres", href: "/support/service-centres" },
      { label: "Delivery", href: "/support/delivery" },
      { label: "Payment Plans", href: "/support/payment-plans" },
      { label: "FAQs", href: "/support/faqs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Abans", href: "/about" },
      { label: "Showrooms", href: "/stores" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const footerContact: FooterContactItem[] = [
  {
    label: "General",
    icon: "phone",
    lines: [{ text: "011 22 22 888", href: "tel:+94112222888" }],
  },
  {
    label: "Email",
    icon: "mail",
    lines: [
      {
        text: "abansmobilemarketing@abansgroup.com",
        href: "mailto:abansmobilemarketing@abansgroup.com",
      },
    ],
  },
  {
    label: "Address",
    icon: "address",
    lines: [{ text: "498, Galle Road, Colombo 03, Sri Lanka" }],
  },
  {
    label: "Our Sites",
    icon: "sites",
    lines: [
      { text: "abansgroup.com", href: "https://www.abansgroup.com" },
      { text: "buyabans.com", href: "https://buyabans.com" },
    ],
  },
];

/**
 * The direct channels a product page offers beside the outbound buy handoff.
 * Same hotline as the footer — declared once so the two never drift.
 */
export const contactChannels = {
  hotline: { label: "011 22 22 888", href: "tel:+94112222888" },
  /** `wa.me` wants the number bare, country code first. */
  whatsapp: { number: "94112222888" },
  storeLocator: "/stores",
} as const;

export const footerLegal: NavLink[] = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms Of Use", href: "/legal/terms" },
  { label: "Returns", href: "/support/returns" },
];

export const socialLinks: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/abansgroup",
    icon: "facebook",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/abans_lk",
    icon: "instagram",
  },
  { label: "YouTube", href: "https://www.youtube.com/@abanslk", icon: "youtube" },
  { label: "TikTok", href: "https://www.tiktok.com/@abans.lk", icon: "tiktok" },
];
