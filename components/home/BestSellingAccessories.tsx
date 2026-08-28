import { BestSellingSection } from "@/components/home/BestSellingSection";
import {
  bestSellerAccessories,
  bestSellerAccessoryFilters,
} from "@/lib/data/products";

export function BestSellingAccessories() {
  return (
    <BestSellingSection
      title="Best Selling Accessories"
      titleId="best-selling-accessories-title"
      filters={bestSellerAccessoryFilters}
      products={bestSellerAccessories}
      viewAllHref="/products?category=accessories"
      viewAllLabel="View All Accessories"
      className="pt-section-half"
    />
  );
}
