import type { Product } from "@/lib/types";

import iphone16e from "@/public/images/products/Apple iPhone 16e 128GB - White.jpg";
import iphoneAir from "@/public/images/products/Apple iPhone Air 256GB - Space Black.jpg";
import jblTune500 from "@/public/images/products/JBL Tune 500 Wired On-Ear Headphone - Black.jpg";
import mibroA2 from "@/public/images/products/Mibro A2 1.39 inch Round HD Screen Smart Watch - Black.jpg";
import mibroC4 from "@/public/images/products/Mibro C4 2.01 inch Square HD Screen Smart Watch - Black.jpg";
import motoG35 from "@/public/images/products/Motorola Moto G35 - Guava Red.jpg";
import motoG45 from "@/public/images/products/Motorola Moto G45 - Brilliant Green.jpg";
import renoTwilightBlue from "@/public/images/products/Oppo Reno 15F 12GB + 512GB - Twilight Blue.jpg";
import sudioA1 from "@/public/images/products/Sudio (Sweden) A1 True Wireless Earbuds with Wireless Charging Case (Sky Blue).jpg";
// NOTE: this file is misnamed in `public/images/products` — the artwork is the
// iPhone 17 Pro, not a second Reno 15F shot.
import iphone17Pro from "@/public/images/products/Oppo Reno 15F 12GB + 512GB - Twilight Blue-1.jpg";

const ABANS_STORE = "https://www.abansonline.com";

export const products: Product[] = [
  {
    slug: "apple-iphone-17-pro-256gb-deep-blue",
    title: "Apple iPhone 17 Pro 256GB - Deep Blue",
    brand: "apple",
    category: "smartphone",
    price: 549999,
    tag: "new",
    image: iphone17Pro,
    imageAlt:
      "iPhone 17 Pro in Deep Blue, shown from the back and front alongside its key specifications",
    specs: [
      { label: "RAM", value: "12 GB" },
      { label: "Storage", value: "256 GB" },
      { label: "Display Size", value: "6.3-inch" },
    ],
    inStock: true,
    buyUrl: `${ABANS_STORE}/apple-iphone-17-pro-256gb-deep-blue`,
  },
  {
    slug: "oppo-reno-15f-12gb-512gb-twilight-blue",
    title: "Oppo Reno 15F 12GB + 512GB - Twilight Blue",
    brand: "oppo",
    category: "smartphone",
    price: 279999,
    originalPrice: 289999,
    tag: "sale",
    image: renoTwilightBlue,
    imageAlt:
      "Oppo Reno 15F in Twilight Blue, shown from the back and front alongside its key specifications",
    specs: [
      { label: "RAM", value: "12 GB" },
      { label: "Storage", value: "512 GB" },
      { label: "Battery", value: "6200 mAh" },
    ],
    inStock: true,
    buyUrl: `${ABANS_STORE}/oppo-reno-15f-12gb-512gb-twilight-blue`,
  },
  {
    slug: "motorola-moto-g45-brilliant-green",
    title: "Motorola Moto G45 - Brilliant Green",
    brand: "motorola",
    category: "smartphone",
    price: 59999,
    originalPrice: 69999,
    tag: "sale",
    image: motoG45,
    imageAlt:
      "Motorola Moto G45 in Brilliant Green, shown from the back and front alongside its key specifications",
    specs: [
      { label: "Storage", value: "128 GB" },
      { label: "Display Size", value: "6.72-inch" },
      { label: "Battery", value: "5000 mAh" },
    ],
    inStock: true,
    buyUrl: `${ABANS_STORE}/motorola-moto-g45-brilliant-green`,
  },
  {
    slug: "apple-iphone-air-256gb-space-black",
    title: "Apple iPhone Air 256GB - Space Black",
    brand: "apple",
    category: "smartphone",
    price: 421999,
    tag: "new",
    image: iphoneAir,
    imageAlt:
      "iPhone Air in Space Black, shown from the back and front alongside its key specifications",
    specs: [
      { label: "RAM", value: "12 GB" },
      { label: "Storage", value: "256 GB" },
      { label: "Display Size", value: "6.5-inch" },
    ],
    inStock: true,
    buyUrl: `${ABANS_STORE}/apple-iphone-air-256gb-space-black`,
  },
  {
    slug: "motorola-moto-g35-guava-red",
    title: "Motorola Moto G35 - Guava Red",
    brand: "motorola",
    category: "smartphone",
    price: 41999,
    image: motoG35,
    imageAlt:
      "Motorola Moto G35 in Guava Red, shown from the back and front alongside its key specifications",
    specs: [
      { label: "RAM", value: "4 GB" },
      { label: "Storage", value: "128 GB" },
      { label: "Display Size", value: "6.72-inch" },
    ],
    inStock: true,
    buyUrl: `${ABANS_STORE}/motorola-moto-g35-guava-red`,
  },
  {
    slug: "apple-iphone-16e-128gb-white",
    title: "Apple iPhone 16e 128GB - White",
    brand: "apple",
    category: "smartphone",
    price: 279999,
    originalPrice: 289999,
    image: iphone16e,
    imageAlt:
      "iPhone 16e in White, shown from the back and front alongside its key specifications",
    specs: [
      { label: "RAM", value: "12 GB" },
      { label: "Storage", value: "128 GB" },
      { label: "Display Size", value: "6.1-inch" },
    ],
    inStock: true,
    buyUrl: `${ABANS_STORE}/apple-iphone-16e-128gb-white`,
  },
  {
    slug: "mibro-a2-smart-watch-black",
    title: "Mibro A2 1.39 inch Round HD Screen Smart Watch - Black",
    brand: "mibro",
    category: "wearable",
    price: 10999,
    originalPrice: 26999,
    tag: "sale",
    image: mibroA2,
    imageAlt: "Mibro A2 smart watch in black with a round HD display",
    specs: [
      { label: "Screen", value: "1.39-inch" },
      { label: "Shape", value: "Round" },
      { label: "Water Resistance", value: "IP68" },
    ],
    inStock: true,
    buyUrl: `${ABANS_STORE}/mibro-a2-smart-watch-black`,
  },
  {
    slug: "sudio-a1-true-wireless-earbuds-sky-blue",
    title:
      "Sudio (Sweden) A1 True Wireless Earbuds with Wireless Charging Case (Sky Blue)",
    brand: "sudio",
    category: "audio",
    price: 6449,
    originalPrice: 11999,
    tag: "sale",
    image: sudioA1,
    imageAlt:
      "Sudio A1 true wireless earbuds in Sky Blue, resting in their open charging case",
    specs: [
      { label: "Type", value: "True Wireless" },
      { label: "Charging", value: "Wireless Case" },
      { label: "Playtime", value: "30 Hours" },
    ],
    inStock: true,
    buyUrl: `${ABANS_STORE}/sudio-a1-true-wireless-earbuds-sky-blue`,
  },
  {
    slug: "jbl-tune-500-wired-on-ear-headphone-black",
    title: "JBL Tune 500 Wired On-Ear Headphone - Black",
    brand: "jbl",
    category: "audio",
    price: 8999,
    image: jblTune500,
    imageAlt: "JBL Tune 500 wired on-ear headphones in black",
    specs: [
      { label: "Fit", value: "On-Ear" },
      { label: "Driver", value: "32 mm" },
      { label: "Sound", value: "Pure Bass" },
    ],
    inStock: true,
    buyUrl: `${ABANS_STORE}/jbl-tune-500-wired-on-ear-headphone-black`,
  },
  {
    slug: "mibro-c4-smart-watch-black",
    title: "Mibro C4 2.01 inch Square HD Screen Smart Watch - Black",
    brand: "mibro",
    category: "wearable",
    price: 15999,
    originalPrice: 26999,
    tag: "sale",
    image: mibroC4,
    imageAlt: "Mibro C4 smart watch in black with a square HD display",
    specs: [
      { label: "Screen", value: "2.01-inch" },
      { label: "Shape", value: "Square" },
      { label: "Battery", value: "7 Days" },
    ],
    inStock: true,
    buyUrl: `${ABANS_STORE}/mibro-c4-smart-watch-black`,
  },
];

const bySlug = new Map(products.map((product) => [product.slug, product]));

export function getProduct(slug: string): Product | undefined {
  return bySlug.get(slug);
}

/** Ordered for the Best Sellers rail. */
export const bestSellers: Product[] = [
  "apple-iphone-17-pro-256gb-deep-blue",
  "oppo-reno-15f-12gb-512gb-twilight-blue",
  "mibro-a2-smart-watch-black",
  "motorola-moto-g45-brilliant-green",
  "apple-iphone-air-256gb-space-black",
  "sudio-a1-true-wireless-earbuds-sky-blue",
  "apple-iphone-16e-128gb-white",
  "mibro-c4-smart-watch-black",
  "motorola-moto-g35-guava-red",
  "jbl-tune-500-wired-on-ear-headphone-black",
].flatMap((slug) => bySlug.get(slug) ?? []);

/** Ordered for the Best Selling Accessories grid — watches, then audio. */
export const bestSellerAccessories: Product[] = [
  "mibro-a2-smart-watch-black",
  "mibro-c4-smart-watch-black",
  "sudio-a1-true-wireless-earbuds-sky-blue",
  "jbl-tune-500-wired-on-ear-headphone-black",
].flatMap((slug) => bySlug.get(slug) ?? []);

/** Ordered newest-first for the New Arrivals rail. */
export const newArrivals: Product[] = [
  "apple-iphone-17-pro-256gb-deep-blue",
  "apple-iphone-air-256gb-space-black",
  "oppo-reno-15f-12gb-512gb-twilight-blue",
  "motorola-moto-g45-brilliant-green",
  "apple-iphone-16e-128gb-white",
  "mibro-a2-smart-watch-black",
  "sudio-a1-true-wireless-earbuds-sky-blue",
  "motorola-moto-g35-guava-red",
  "mibro-c4-smart-watch-black",
  "jbl-tune-500-wired-on-ear-headphone-black",
].flatMap((slug) => bySlug.get(slug) ?? []);

export interface BestSellerFilter {
  /** Stable key for the selected set. */
  id: string;
  /** Title Case chip label. */
  label: string;
}

/**
 * Advanced-tech chips for the Best Sellers grid — the capabilities shoppers
 * actually screen for. They advertise what the range supports rather than
 * narrowing it, so there is no `match`; the picker is illustrative.
 */
export const bestSellerFilters: BestSellerFilter[] = [
  { id: "5g", label: "5G" },
  { id: "fast-charging", label: "Fast Charging" },
  { id: "8k", label: "8K" },
  { id: "4k-60fps", label: "4K 60fps" },
  { id: "48mp", label: "48MP+" },
  { id: "50mp", label: "50MP+" },
  { id: "108mp", label: "108MP+" },
  { id: "200mp", label: "200MP" },
  { id: "ai-camera", label: "AI Camera" },
];

/** The same illustrative-chip idea, tuned for wearables and audio. */
export const bestSellerAccessoryFilters: BestSellerFilter[] = [
  { id: "bluetooth-53", label: "Bluetooth 5.3" },
  { id: "anc", label: "ANC" },
  { id: "ip68", label: "IP68" },
  { id: "wireless-charging", label: "Wireless Charging" },
  { id: "amoled", label: "AMOLED" },
  { id: "heart-rate", label: "Heart Rate" },
  { id: "fast-charge", label: "Fast Charge" },
  { id: "voice-assistant", label: "Voice Assistant" },
];
