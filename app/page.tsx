import { BestSellingAccessories } from "@/components/home/BestSellingAccessories";
import { BestSellingProducts } from "@/components/home/BestSellingProducts";
import { BlogSection } from "@/components/home/BlogSection";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { Hero } from "@/components/home/Hero";
import { LimitedTimeDeals } from "@/components/home/LimitedTimeDeals";
import { OfferStrip } from "@/components/home/OfferStrip";
import { PayEasy } from "@/components/home/PayEasy";
import { ProductRail } from "@/components/home/ProductRail";

export default function Home() {
  return (
    <>
      {/* The page's only h1 — the hero artwork carries its own headline, so
          the accessible title lives here. */}
      <h1 className="sr-only">
        Abans Smartphones — Sri Lanka&rsquo;s Multi-Brand Smartphone Store
      </h1>

      <Hero />
      <BrandMarquee />
      <BestSellingProducts />
      <BestSellingAccessories />
      <LimitedTimeDeals />
      <OfferStrip />
      <ProductRail />
      <PayEasy />
      <BlogSection />
    </>
  );
}
