import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { discountPercent, formatLKR } from "@/lib/format";
import type { Product } from "@/lib/types";

export interface ProductCardProps {
  product: Product;
  /** Tiles flip to white when they sit on a dark section. */
  tone?: "light" | "dark";
  /** `inside` folds the title and price into the tile instead of below it. */
  meta?: "below" | "inside";
  /** Panel radius when the meta sits inside. Ignored for a `below` meta. */
  radius?: "md" | "lg";
  /** Emphasised line under the price — an instalment quote, say. */
  note?: string;
  /** Passed to next/image so the browser picks a sane candidate. */
  sizes?: string;
  /** Above-the-fold cards skip lazy loading. */
  priority?: boolean;
  className?: string;
}

const DEFAULT_SIZES =
  "(min-width: 1280px) 220px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 45vw";

export function ProductCard({
  product,
  tone = "light",
  meta = "below",
  radius = "md",
  note,
  sizes = DEFAULT_SIZES,
  priority = false,
  className,
}: ProductCardProps) {
  const dark = tone === "dark";
  const inside = meta === "inside";
  const saving = discountPercent(product.price, product.originalPrice);
  // The tile background moves to the card wrapper when the meta sits inside it,
  // so image and copy share one plate.
  const plate = dark ? "bg-surface-alt" : "bg-surface";
  // Copy on an inside meta always sits on that light plate, never on the
  // section behind it.
  const onDarkCopy = dark && !inside;

  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "group focus-visible:outline-offset-4",
        // An inside meta makes the card one panel, so it takes a radius and
        // clips the tile's square corners with it. It also fills its track, so
        // a row of panels shares one bottom edge however the price wraps.
        inside
          ? `flex h-full flex-col overflow-hidden ${radius === "lg" ? "rounded-lg" : "rounded-md"} ${plate}`
          : "block",
        className,
      )}
    >
      {/* Image tile — square corners, flat, never lifts. */}
      <div
        className={cn(
          // `isolate` pins the blending root here, so the plate multiplies against
          // this tile even while an ancestor is being animated.
          "product-tile relative isolate flex aspect-square shrink-0 items-center justify-center overflow-hidden rounded-none",
          // The tile background is fixed — only the shot moves on hover.
          !inside && plate,
        )}
      >
        {product.tag ? (
          <span
            // Every tag reads on the same black plate, whatever it says.
            className="absolute top-4 left-4 z-10 rounded-pill bg-ink-1 px-2.5 py-1 text-label uppercase text-white"
          >
            {product.tag === "new" ? "New" : "Sale"}
          </span>
        ) : null}

        {saving > 0 ? (
          <span
            className={cn(
              "deal-wash deal-tag absolute top-0 right-0 z-10 flex h-11 w-10",
              "flex-col items-center justify-center pb-2 text-ink-1 tabular-nums",
            )}
          >
            <span className="text-spec leading-none">{saving}%</span>
            <span className="mt-0.5 text-label uppercase leading-none opacity-70">
              Off
            </span>
          </span>
        ) : null}

        <div className="product-plate plate-blend relative transition-transform transition-base group-hover:scale-[1.02]">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes={sizes}
            priority={priority}
            placeholder="blur"
            className="object-contain"
          />
        </div>
      </div>

      {/* Meta — below the tile by default, folded into it when `inside`. */}
      <div className={inside ? "px-4 pb-5 sm:px-5" : "mt-4"}>
        <h3
          className={cn(
            "clamp-1-line text-body transition-colors transition-fast",
            onDarkCopy
              ? "text-white group-hover:text-primary-300"
              : "text-ink-1 group-hover:text-primary-600",
          )}
        >
          {product.title}
        </h3>

        <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className={cn("text-price", onDarkCopy ? "text-white" : "text-ink-1")}>
            {formatLKR(product.price)}
          </span>
          {product.originalPrice ? (
            <>
              <span
                className={cn(
                  // Steps down on narrow cards so it reads as secondary when
                  // it has to wrap under the current price.
                  "text-body-sm line-through sm:text-body",
                  onDarkCopy ? "text-on-dark-3" : "text-ink-4",
                )}
              >
                {formatLKR(product.originalPrice)}
              </span>
              <span className="sr-only">
                , reduced from {formatLKR(product.originalPrice)}
              </span>
            </>
          ) : null}
        </p>

        {note ? (
          <p
            className={cn(
              "mt-2 text-body-sm font-medium tabular-nums",
              onDarkCopy ? "text-primary-300" : "text-primary-600",
            )}
          >
            {note}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
