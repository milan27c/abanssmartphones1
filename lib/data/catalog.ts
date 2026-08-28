import { getProduct } from "@/lib/data/products";
import type { Product, ProductSpec, ProductTag } from "@/lib/types";

/**
 * The listing catalogue.
 *
 * The prototype ships ten product shots, so the 45-strong catalogue is built
 * from those ten as capacity and colour variants. Every variant borrows its
 * base product's artwork — which is why `imageAlt` keeps describing the shot
 * (the Deep Blue unit, say) even on a variant whose title reads Silver. When
 * real photography lands, each variant gets its own image and alt text.
 */

const ABANS_STORE = "https://www.abansonline.com";

interface Variant {
  slug: string;
  title: string;
  price: number;
  originalPrice?: number;
  tag?: ProductTag;
  specs: ProductSpec[];
}

interface VariantGroup {
  /** Slug of the product in `products.ts` this group borrows its artwork from. */
  base: string;
  variants: Variant[];
}

const groups: VariantGroup[] = [
  {
    base: "apple-iphone-17-pro-256gb-deep-blue",
    variants: [
      {
        slug: "apple-iphone-17-pro-256gb-deep-blue",
        title: "Apple iPhone 17 Pro 256GB - Deep Blue",
        price: 549999,
        tag: "new",
        specs: [
          { label: "RAM", value: "12 GB" },
          { label: "Storage", value: "256 GB" },
          { label: "Display Size", value: "6.3-inch" },
        ],
      },
      {
        slug: "apple-iphone-17-pro-512gb-deep-blue",
        title: "Apple iPhone 17 Pro 512GB - Deep Blue",
        price: 619999,
        tag: "new",
        specs: [
          { label: "RAM", value: "12 GB" },
          { label: "Storage", value: "512 GB" },
          { label: "Display Size", value: "6.3-inch" },
        ],
      },
      {
        slug: "apple-iphone-17-pro-256gb-silver",
        title: "Apple iPhone 17 Pro 256GB - Silver",
        price: 549999,
        specs: [
          { label: "RAM", value: "12 GB" },
          { label: "Storage", value: "256 GB" },
          { label: "Display Size", value: "6.3-inch" },
        ],
      },
      {
        slug: "apple-iphone-17-pro-512gb-cosmic-orange",
        title: "Apple iPhone 17 Pro 512GB - Cosmic Orange",
        price: 619999,
        tag: "new",
        specs: [
          { label: "RAM", value: "12 GB" },
          { label: "Storage", value: "512 GB" },
          { label: "Display Size", value: "6.3-inch" },
        ],
      },
      {
        slug: "apple-iphone-17-pro-1tb-deep-blue",
        title: "Apple iPhone 17 Pro 1TB - Deep Blue",
        price: 739999,
        specs: [
          { label: "RAM", value: "12 GB" },
          { label: "Storage", value: "1 TB" },
          { label: "Display Size", value: "6.3-inch" },
        ],
      },
    ],
  },
  {
    base: "oppo-reno-15f-12gb-512gb-twilight-blue",
    variants: [
      {
        slug: "oppo-reno-15f-12gb-512gb-twilight-blue",
        title: "Oppo Reno 15F 12GB + 512GB - Twilight Blue",
        price: 279999,
        originalPrice: 289999,
        tag: "sale",
        specs: [
          { label: "RAM", value: "12 GB" },
          { label: "Storage", value: "512 GB" },
          { label: "Battery", value: "6200 mAh" },
        ],
      },
      {
        slug: "oppo-reno-15f-8gb-256gb-twilight-blue",
        title: "Oppo Reno 15F 8GB + 256GB - Twilight Blue",
        price: 229999,
        originalPrice: 244999,
        tag: "sale",
        specs: [
          { label: "RAM", value: "8 GB" },
          { label: "Storage", value: "256 GB" },
          { label: "Battery", value: "6200 mAh" },
        ],
      },
      {
        slug: "oppo-reno-15f-12gb-256gb-mist-white",
        title: "Oppo Reno 15F 12GB + 256GB - Mist White",
        price: 249999,
        specs: [
          { label: "RAM", value: "12 GB" },
          { label: "Storage", value: "256 GB" },
          { label: "Battery", value: "6200 mAh" },
        ],
      },
      {
        slug: "oppo-reno-15f-8gb-128gb-mist-white",
        title: "Oppo Reno 15F 8GB + 128GB - Mist White",
        price: 199999,
        originalPrice: 214999,
        tag: "sale",
        specs: [
          { label: "RAM", value: "8 GB" },
          { label: "Storage", value: "128 GB" },
          { label: "Battery", value: "6200 mAh" },
        ],
      },
      {
        slug: "oppo-reno-15f-12gb-512gb-amber-gold",
        title: "Oppo Reno 15F 12GB + 512GB - Amber Gold",
        price: 279999,
        specs: [
          { label: "RAM", value: "12 GB" },
          { label: "Storage", value: "512 GB" },
          { label: "Battery", value: "6200 mAh" },
        ],
      },
    ],
  },
  {
    base: "motorola-moto-g45-brilliant-green",
    variants: [
      {
        slug: "motorola-moto-g45-brilliant-green",
        title: "Motorola Moto G45 - Brilliant Green",
        price: 59999,
        originalPrice: 69999,
        tag: "sale",
        specs: [
          { label: "RAM", value: "8 GB" },
          { label: "Storage", value: "128 GB" },
          { label: "Battery", value: "5000 mAh" },
        ],
      },
      {
        slug: "motorola-moto-g45-steel-grey",
        title: "Motorola Moto G45 - Steel Grey",
        price: 59999,
        specs: [
          { label: "RAM", value: "8 GB" },
          { label: "Storage", value: "128 GB" },
          { label: "Battery", value: "5000 mAh" },
        ],
      },
      {
        slug: "motorola-moto-g45-8gb-256gb-brilliant-green",
        title: "Motorola Moto G45 8GB + 256GB - Brilliant Green",
        price: 69999,
        originalPrice: 74999,
        tag: "sale",
        specs: [
          { label: "RAM", value: "8 GB" },
          { label: "Storage", value: "256 GB" },
          { label: "Battery", value: "5000 mAh" },
        ],
      },
      {
        slug: "motorola-moto-g45-4gb-128gb-viva-magenta",
        title: "Motorola Moto G45 4GB + 128GB - Viva Magenta",
        price: 54999,
        specs: [
          { label: "RAM", value: "4 GB" },
          { label: "Storage", value: "128 GB" },
          { label: "Battery", value: "5000 mAh" },
        ],
      },
      {
        slug: "motorola-moto-g45-8gb-256gb-steel-grey",
        title: "Motorola Moto G45 8GB + 256GB - Steel Grey",
        price: 69999,
        specs: [
          { label: "RAM", value: "8 GB" },
          { label: "Storage", value: "256 GB" },
          { label: "Battery", value: "5000 mAh" },
        ],
      },
    ],
  },
  {
    base: "apple-iphone-air-256gb-space-black",
    variants: [
      {
        slug: "apple-iphone-air-256gb-space-black",
        title: "Apple iPhone Air 256GB - Space Black",
        price: 421999,
        tag: "new",
        specs: [
          { label: "RAM", value: "12 GB" },
          { label: "Storage", value: "256 GB" },
          { label: "Display Size", value: "6.5-inch" },
        ],
      },
      {
        slug: "apple-iphone-air-512gb-space-black",
        title: "Apple iPhone Air 512GB - Space Black",
        price: 489999,
        tag: "new",
        specs: [
          { label: "RAM", value: "12 GB" },
          { label: "Storage", value: "512 GB" },
          { label: "Display Size", value: "6.5-inch" },
        ],
      },
      {
        slug: "apple-iphone-air-256gb-cloud-white",
        title: "Apple iPhone Air 256GB - Cloud White",
        price: 421999,
        specs: [
          { label: "RAM", value: "12 GB" },
          { label: "Storage", value: "256 GB" },
          { label: "Display Size", value: "6.5-inch" },
        ],
      },
      {
        slug: "apple-iphone-air-512gb-light-gold",
        title: "Apple iPhone Air 512GB - Light Gold",
        price: 489999,
        tag: "new",
        specs: [
          { label: "RAM", value: "12 GB" },
          { label: "Storage", value: "512 GB" },
          { label: "Display Size", value: "6.5-inch" },
        ],
      },
      {
        slug: "apple-iphone-air-1tb-sky-blue",
        title: "Apple iPhone Air 1TB - Sky Blue",
        price: 559999,
        specs: [
          { label: "RAM", value: "12 GB" },
          { label: "Storage", value: "1 TB" },
          { label: "Display Size", value: "6.5-inch" },
        ],
      },
    ],
  },
  {
    base: "motorola-moto-g35-guava-red",
    variants: [
      {
        slug: "motorola-moto-g35-guava-red",
        title: "Motorola Moto G35 - Guava Red",
        price: 41999,
        specs: [
          { label: "RAM", value: "4 GB" },
          { label: "Storage", value: "128 GB" },
          { label: "Display Size", value: "6.72-inch" },
        ],
      },
      {
        slug: "motorola-moto-g35-midnight-black",
        title: "Motorola Moto G35 - Midnight Black",
        price: 41999,
        specs: [
          { label: "RAM", value: "4 GB" },
          { label: "Storage", value: "128 GB" },
          { label: "Display Size", value: "6.72-inch" },
        ],
      },
      {
        slug: "motorola-moto-g35-8gb-128gb-guava-red",
        title: "Motorola Moto G35 8GB + 128GB - Guava Red",
        price: 47999,
        originalPrice: 52999,
        tag: "sale",
        specs: [
          { label: "RAM", value: "8 GB" },
          { label: "Storage", value: "128 GB" },
          { label: "Display Size", value: "6.72-inch" },
        ],
      },
      {
        slug: "motorola-moto-g35-4gb-64gb-leaf-green",
        title: "Motorola Moto G35 4GB + 64GB - Leaf Green",
        price: 36999,
        originalPrice: 39999,
        tag: "sale",
        specs: [
          { label: "RAM", value: "4 GB" },
          { label: "Storage", value: "64 GB" },
          { label: "Display Size", value: "6.72-inch" },
        ],
      },
      {
        slug: "motorola-moto-g35-8gb-256gb-midnight-black",
        title: "Motorola Moto G35 8GB + 256GB - Midnight Black",
        price: 52999,
        specs: [
          { label: "RAM", value: "8 GB" },
          { label: "Storage", value: "256 GB" },
          { label: "Display Size", value: "6.72-inch" },
        ],
      },
    ],
  },
  {
    base: "apple-iphone-16e-128gb-white",
    variants: [
      {
        slug: "apple-iphone-16e-128gb-white",
        title: "Apple iPhone 16e 128GB - White",
        price: 279999,
        originalPrice: 289999,
        specs: [
          { label: "RAM", value: "12 GB" },
          { label: "Storage", value: "128 GB" },
          { label: "Display Size", value: "6.1-inch" },
        ],
      },
      {
        slug: "apple-iphone-16e-256gb-white",
        title: "Apple iPhone 16e 256GB - White",
        price: 319999,
        specs: [
          { label: "RAM", value: "12 GB" },
          { label: "Storage", value: "256 GB" },
          { label: "Display Size", value: "6.1-inch" },
        ],
      },
      {
        slug: "apple-iphone-16e-128gb-black",
        title: "Apple iPhone 16e 128GB - Black",
        price: 279999,
        originalPrice: 289999,
        specs: [
          { label: "RAM", value: "12 GB" },
          { label: "Storage", value: "128 GB" },
          { label: "Display Size", value: "6.1-inch" },
        ],
      },
      {
        slug: "apple-iphone-16e-256gb-black",
        title: "Apple iPhone 16e 256GB - Black",
        price: 319999,
        originalPrice: 334999,
        tag: "sale",
        specs: [
          { label: "RAM", value: "12 GB" },
          { label: "Storage", value: "256 GB" },
          { label: "Display Size", value: "6.1-inch" },
        ],
      },
      {
        slug: "apple-iphone-16e-512gb-white",
        title: "Apple iPhone 16e 512GB - White",
        price: 379999,
        specs: [
          { label: "RAM", value: "12 GB" },
          { label: "Storage", value: "512 GB" },
          { label: "Display Size", value: "6.1-inch" },
        ],
      },
    ],
  },
  {
    base: "mibro-a2-smart-watch-black",
    variants: [
      {
        slug: "mibro-a2-smart-watch-black",
        title: "Mibro A2 1.39 inch Round HD Screen Smart Watch - Black",
        price: 10999,
        originalPrice: 26999,
        tag: "sale",
        specs: [
          { label: "Screen", value: "1.39-inch" },
          { label: "Shape", value: "Round" },
          { label: "Water Resistance", value: "IP68" },
        ],
      },
      {
        slug: "mibro-a2-smart-watch-blue",
        title: "Mibro A2 1.39 inch Round HD Screen Smart Watch - Blue",
        price: 10999,
        originalPrice: 26999,
        tag: "sale",
        specs: [
          { label: "Screen", value: "1.39-inch" },
          { label: "Shape", value: "Round" },
          { label: "Water Resistance", value: "IP68" },
        ],
      },
      {
        slug: "mibro-a2-smart-watch-pink",
        title: "Mibro A2 1.39 inch Round HD Screen Smart Watch - Pink",
        price: 11999,
        originalPrice: 26999,
        tag: "sale",
        specs: [
          { label: "Screen", value: "1.39-inch" },
          { label: "Shape", value: "Round" },
          { label: "Water Resistance", value: "IP68" },
        ],
      },
      {
        slug: "mibro-a2-smart-watch-silver",
        title: "Mibro A2 1.39 inch Round HD Screen Smart Watch - Silver",
        price: 12999,
        originalPrice: 26999,
        tag: "sale",
        specs: [
          { label: "Screen", value: "1.39-inch" },
          { label: "Shape", value: "Round" },
          { label: "Water Resistance", value: "IP68" },
        ],
      },
    ],
  },
  {
    base: "sudio-a1-true-wireless-earbuds-sky-blue",
    variants: [
      {
        slug: "sudio-a1-true-wireless-earbuds-sky-blue",
        title:
          "Sudio (Sweden) A1 True Wireless Earbuds with Wireless Charging Case (Sky Blue)",
        price: 6449,
        originalPrice: 11999,
        tag: "sale",
        specs: [
          { label: "Type", value: "True Wireless" },
          { label: "Charging", value: "Wireless Case" },
          { label: "Playtime", value: "30 Hours" },
        ],
      },
      {
        slug: "sudio-a1-true-wireless-earbuds-black",
        title:
          "Sudio (Sweden) A1 True Wireless Earbuds with Wireless Charging Case (Black)",
        price: 6449,
        originalPrice: 11999,
        tag: "sale",
        specs: [
          { label: "Type", value: "True Wireless" },
          { label: "Charging", value: "Wireless Case" },
          { label: "Playtime", value: "30 Hours" },
        ],
      },
      {
        slug: "sudio-a1-true-wireless-earbuds-white",
        title:
          "Sudio (Sweden) A1 True Wireless Earbuds with Wireless Charging Case (White)",
        price: 6999,
        originalPrice: 11999,
        tag: "sale",
        specs: [
          { label: "Type", value: "True Wireless" },
          { label: "Charging", value: "Wireless Case" },
          { label: "Playtime", value: "30 Hours" },
        ],
      },
      {
        slug: "sudio-a1-true-wireless-earbuds-sand",
        title:
          "Sudio (Sweden) A1 True Wireless Earbuds with Wireless Charging Case (Sand)",
        price: 6999,
        originalPrice: 11999,
        tag: "sale",
        specs: [
          { label: "Type", value: "True Wireless" },
          { label: "Charging", value: "Wireless Case" },
          { label: "Playtime", value: "30 Hours" },
        ],
      },
    ],
  },
  {
    base: "jbl-tune-500-wired-on-ear-headphone-black",
    variants: [
      {
        slug: "jbl-tune-500-wired-on-ear-headphone-black",
        title: "JBL Tune 500 Wired On-Ear Headphone - Black",
        price: 8999,
        specs: [
          { label: "Fit", value: "On-Ear" },
          { label: "Driver", value: "32 mm" },
          { label: "Sound", value: "Pure Bass" },
        ],
      },
      {
        slug: "jbl-tune-500-wired-on-ear-headphone-white",
        title: "JBL Tune 500 Wired On-Ear Headphone - White",
        price: 8999,
        specs: [
          { label: "Fit", value: "On-Ear" },
          { label: "Driver", value: "32 mm" },
          { label: "Sound", value: "Pure Bass" },
        ],
      },
      {
        slug: "jbl-tune-500-wired-on-ear-headphone-blue",
        title: "JBL Tune 500 Wired On-Ear Headphone - Blue",
        price: 9499,
        specs: [
          { label: "Fit", value: "On-Ear" },
          { label: "Driver", value: "32 mm" },
          { label: "Sound", value: "Pure Bass" },
        ],
      },
      {
        slug: "jbl-tune-500-wired-on-ear-headphone-pink",
        title: "JBL Tune 500 Wired On-Ear Headphone - Pink",
        price: 9499,
        originalPrice: 10999,
        tag: "sale",
        specs: [
          { label: "Fit", value: "On-Ear" },
          { label: "Driver", value: "32 mm" },
          { label: "Sound", value: "Pure Bass" },
        ],
      },
    ],
  },
  {
    base: "mibro-c4-smart-watch-black",
    variants: [
      {
        slug: "mibro-c4-smart-watch-black",
        title: "Mibro C4 2.01 inch Square HD Screen Smart Watch - Black",
        price: 15999,
        originalPrice: 26999,
        tag: "sale",
        specs: [
          { label: "Screen", value: "2.01-inch" },
          { label: "Shape", value: "Square" },
          { label: "Battery", value: "7 Days" },
        ],
      },
      {
        slug: "mibro-c4-smart-watch-blue",
        title: "Mibro C4 2.01 inch Square HD Screen Smart Watch - Blue",
        price: 15999,
        originalPrice: 26999,
        tag: "sale",
        specs: [
          { label: "Screen", value: "2.01-inch" },
          { label: "Shape", value: "Square" },
          { label: "Battery", value: "7 Days" },
        ],
      },
      {
        slug: "mibro-c4-smart-watch-gold",
        title: "Mibro C4 2.01 inch Square HD Screen Smart Watch - Gold",
        price: 17999,
        originalPrice: 26999,
        tag: "sale",
        specs: [
          { label: "Screen", value: "2.01-inch" },
          { label: "Shape", value: "Square" },
          { label: "Battery", value: "7 Days" },
        ],
      },
    ],
  },
];

function expand(group: VariantGroup): Product[] {
  const base = getProduct(group.base);
  if (!base) return [];

  return group.variants.map((variant) => ({
    ...base,
    slug: variant.slug,
    title: variant.title,
    price: variant.price,
    // Spread alone would leak the base's offer state onto a variant that has
    // none, so both fields are written every time.
    originalPrice: variant.originalPrice,
    tag: variant.tag,
    specs: variant.specs,
    buyUrl: `${ABANS_STORE}/${variant.slug}`,
  }));
}

/**
 * Round-robin across the groups so the default order alternates brands
 * instead of running six near-identical iPhones down the first two rows.
 */
function interleave(lists: Product[][]): Product[] {
  const depth = Math.max(...lists.map((list) => list.length));
  const out: Product[] = [];

  for (let index = 0; index < depth; index += 1) {
    for (const list of lists) {
      const product = list[index];
      if (product) out.push(product);
    }
  }

  return out;
}

/** 45 products in Featured order. */
export const catalog: Product[] = interleave(groups.map(expand));

const bySlug = new Map(catalog.map((product) => [product.slug, product]));

export function getCatalogProduct(slug: string): Product | undefined {
  return bySlug.get(slug);
}

/**
 * More of the same, for the foot of a detail page: the brand first, then the
 * rest of the category.
 *
 * Variants of the same handset share one photograph, so anything wearing the
 * current product's artwork is dropped — a rail of five identical tiles reads
 * as a bug, not a recommendation.
 */
export function relatedProducts(product: Product, limit = 8): Product[] {
  const pool = catalog.filter(
    (item) => item.image.src !== product.image.src,
  );

  const sameBrand = pool.filter(
    (item) => item.brand === product.brand && item.category === product.category,
  );
  const sameCategory = pool.filter(
    (item) => item.brand !== product.brand && item.category === product.category,
  );

  return dedupeByImage([...sameBrand, ...sameCategory]).slice(0, limit);
}

/** Things that go with the product rather than replace it. */
export function accessoryProducts(product: Product, limit = 8): Product[] {
  const pool = catalog.filter((item) => item.category !== product.category);

  return dedupeByImage(pool).slice(0, limit);
}

/** One card per photograph — capacity variants add nothing to a rail. */
function dedupeByImage(items: Product[]): Product[] {
  const seen = new Set<string>();

  return items.filter((item) => {
    if (seen.has(item.image.src)) return false;
    seen.add(item.image.src);
    return true;
  });
}
