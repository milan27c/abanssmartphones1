import type { HeroSlide, Offer } from "@/lib/types";

import hero1 from "@/public/images/hero/hero-section-2B.png";
import hero1m from "@/public/images/hero/hero-section-Mobile.png";
import hero2 from "@/public/images/hero/hero-section-3B.png";
import hero2m from "@/public/images/hero/hero-section-Mobile-2.png";
import hero3 from "@/public/images/hero/hero3.png";
import hero3m from "@/public/images/hero/hero3m.png";
import hero4 from "@/public/images/hero/hero4.png";
import hero4m from "@/public/images/hero/hero4m.png";

import offer1 from "@/public/images/banner1.png";
import offer2 from "@/public/images/banner2.png";
import offer3 from "@/public/images/banner3.png";

/**
 * Hero artwork ships with its headline baked in, so the slides carry no
 * overlaid copy — `alt` is what a screen reader gets instead.
 */
const allHeroSlides: HeroSlide[] = [
  {
    id: "easy-payment",
    alt: "Pay in easy instalments over 12 months. Walk into your nearest Abans for Apple, Redmi, TECNO, Motorola, realme, itel, vivo, Infinix and OPPO smartphones.",
    desktop: hero1,
    mobile: hero1m,
    href: "/products",
    indicatorLabel: "12-Month Instalments",
  },
  {
    id: "realme-15-pro",
    alt: "realme 15 Pro 5G. Live real in every shot — triple 50MP AI cameras, Snapdragon 7 Gen 4 and a 7000mAh battery with 80W SUPERVOOC charging.",
    desktop: hero2,
    mobile: hero2m,
    href: "/products?brand=realme",
    indicatorLabel: "realme 15 Pro",
  },
  {
    id: "redmi-15c",
    alt: "Rise beyond limits with the Xiaomi Redmi 15C, available at Abans Smartphones.",
    desktop: hero3,
    mobile: hero3m,
    href: "/products?brand=redmi",
    indicatorLabel: "Redmi 15C",
    hidden: true,
  },
  {
    id: "realme-c85",
    alt: "The power era begins. realme C85 — strength, speed, style.",
    desktop: hero4,
    mobile: hero4m,
    href: "/products?brand=realme",
    indicatorLabel: "realme C85",
    hidden: true,
  },
];

/** Flip a slide's `hidden` flag in `allHeroSlides` to bring it back. */
export const heroSlides: HeroSlide[] = allHeroSlides.filter(
  (slide) => !slide.hidden,
);

export const offers: Offer[] = [
  {
    id: "iphone-17-pro",
    title: "Buy The iPhone 17 Pro From An Authorized Dealer",
    ctaLabel: "View Product",
    href: "/products/apple-iphone-17-pro-256gb-deep-blue",
    image: offer1,
    imageAlt: "iPhone 17 Pro in Deep Blue",
  },
  {
    id: "easy-payments",
    title:
      "Get The Phone You Want And Spread The Cost Into Easy Monthly Payments",
    ctaLabel: "Learn More",
    href: "/products?filter=offers",
    image: offer2,
    imageAlt: "Pay for your smartphone in easy monthly instalments",
  },
  {
    id: "mibro-gs-explorer",
    title: "Now In Stock — The New Mibro GS Explorer",
    ctaLabel: "View Product",
    href: "/products?brand=mibro",
    image: offer3,
    imageAlt: "Mibro GS Explorer smart watch",
  },
];
