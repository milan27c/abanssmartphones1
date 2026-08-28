import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
  tone?: "light" | "dark";
  /** Columns from `lg` up. Below that the grid is always 2-up. */
  columns?: 3 | 4;
  className?: string;
  priorityCount?: number;
  /** Seconds between reveals. Longer lists want a shorter step. */
  step?: number;
  sizes?: string;
}

const columnClasses = {
  3: "md:grid-cols-3",
  4: "lg:grid-cols-4",
} as const;

const columnSizes = {
  3: "(min-width: 1280px) 300px, (min-width: 1024px) 24vw, (min-width: 768px) 30vw, 45vw",
  4: "(min-width: 1280px) 220px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 45vw",
} as const;

/** Revealed on a stagger. 2-up on mobile, 3 or 4 across on desktop. */
export function ProductGrid({
  products,
  tone = "light",
  columns = 4,
  className,
  priorityCount = 0,
  step = 0.06,
  sizes,
}: ProductGridProps) {
  return (
    <Stagger
      as="ul"
      step={step}
      className={cn(
        "grid grid-cols-2 gap-x-grid-gap gap-y-10",
        columnClasses[columns],
        className,
      )}
    >
      {products.map((product, index) => (
        <StaggerItem as="li" key={product.slug}>
          <ProductCard
            product={product}
            tone={tone}
            sizes={sizes ?? columnSizes[columns]}
            priority={index < priorityCount}
          />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
