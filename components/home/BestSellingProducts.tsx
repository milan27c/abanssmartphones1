import { BestSellingSection } from "@/components/home/BestSellingSection";
import { bestSellerFilters, bestSellers } from "@/lib/data/products";

export function BestSellingProducts() {
  return (
    <BestSellingSection
      title="Best Selling Smartphones"
      titleId="best-selling-title"
      filters={bestSellerFilters}
      products={bestSellers}
      viewAllHref="/products?sort=popular"
      viewAllLabel="View All Smartphones"
      // The marquee above closes on the compact rhythm and is a quiet band
      // rather than a wall of content, so from `md` this seam opens on the
      // half rhythm — a full section gap on top of it reads as a hole. The
      // bottom stays half everywhere: Accessories is the other half of a pair.
      className="pb-section-half md:pt-section-half"
    />
  );
}
