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
      className="pb-section-half"
    />
  );
}
