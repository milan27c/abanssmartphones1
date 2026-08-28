import { cn } from "@/lib/cn";
import { discountPercent, formatLKR, splitLKR } from "@/lib/format";

export interface PriceBlockProps {
  price: number;
  originalPrice?: number;
  className?: string;
}

/**
 * The detail page's headline price. `LKR` sits quieter and smaller than the
 * digits, with the struck original and the saving beside it.
 */
export function PriceBlock({
  price,
  originalPrice,
  className,
}: PriceBlockProps) {
  const { currency, amount } = splitLKR(price);
  const saving = discountPercent(price, originalPrice);

  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-3 gap-y-2", className)}>
      <p className="flex items-baseline gap-1.5">
        <span className="text-body-lg text-ink-3">{currency}</span>
        <span className="text-h3 text-ink-1 tabular-nums">{amount}</span>
        <span className="sr-only">rupees</span>
      </p>

      {originalPrice ? (
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
          <span className="text-body-lg text-ink-4 line-through tabular-nums">
            {formatLKR(originalPrice)}
          </span>
          <span className="sr-only">, reduced from {formatLKR(originalPrice)}</span>

          {saving > 0 ? (
            <span className="rounded-pill bg-primary-600 px-2.5 py-1 text-label uppercase text-white tabular-nums">
              Save {saving}%
            </span>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}
