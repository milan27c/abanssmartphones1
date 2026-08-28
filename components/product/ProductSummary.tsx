import Link from "next/link";

import { BuyCta } from "@/components/product/BuyCta";
import { PriceBlock } from "@/components/product/PriceBlock";
import { cn } from "@/lib/cn";
import { brandName } from "@/lib/data/brands";
import type { Product, ProductDetail } from "@/lib/types";

export interface ProductSummaryProps {
  product: Product;
  detail: ProductDetail;
  className?: string;
}

/**
 * The right column of the detail page: what it is, what it costs, and the
 * three ways to act on that.
 */
export function ProductSummary({
  product,
  detail,
  className,
}: ProductSummaryProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <h1 className="text-h1 text-ink-1">{product.title}</h1>

      <PriceBlock
        price={product.price}
        originalPrice={product.originalPrice}
        className="mt-6"
      />

      <p className="mt-4 flex items-center gap-2 text-body-sm">
        <span
          aria-hidden="true"
          className={cn(
            "size-2 shrink-0 rounded-pill",
            product.inStock ? "bg-primary-600" : "bg-ink-4",
          )}
        />
        <span className={product.inStock ? "text-ink-3" : "text-ink-4"}>
          {product.inStock
            ? "In Stock — Islandwide Delivery"
            : "Out Of Stock — Notify Me When It Returns"}
        </span>
      </p>

      <dl className="mt-8 grid grid-cols-[minmax(7rem,10rem)_1fr] gap-x-6 gap-y-3 text-body-sm">
        <dt className="text-ink-3">Product Code</dt>
        <dd className="text-ink-1">{detail.productCode}</dd>

        <dt className="text-ink-3">Brand</dt>
        <dd>
          <Link
            href={`/products?brand=${product.brand}`}
            className="link-underline text-primary-600 transition-colors transition-fast hover:text-primary-700"
          >
            {brandName[product.brand]}
          </Link>
        </dd>

        <dt className="text-ink-3">Model No</dt>
        <dd className="text-ink-1">{detail.modelNo}</dd>
      </dl>

      <BuyCta
        id="product-buy-cta"
        buyUrl={product.buyUrl}
        productTitle={product.title}
        inStock={product.inStock}
        className="mt-10"
      />
    </div>
  );
}
