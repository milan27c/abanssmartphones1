import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { AbansEasyPayments } from "@/components/product/AbansEasyPayments";
import { CardPayments } from "@/components/product/CardPayments";
import { FaqAccordion } from "@/components/product/FaqAccordion";
import { FeatureStories } from "@/components/product/FeatureStories";
import { InquiryForm } from "@/components/product/InquiryForm";
import { KeyFeatures } from "@/components/product/KeyFeatures";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductSubNav } from "@/components/product/ProductSubNav";
import { ProductSummary } from "@/components/product/ProductSummary";
import { RelatedRail } from "@/components/product/RelatedRail";
import { SpecTable } from "@/components/product/SpecTable";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { brandName } from "@/lib/data/brands";
import {
  accessoryProducts,
  catalog,
  getCatalogProduct,
  relatedProducts,
} from "@/lib/data/catalog";
import { getProductDetail } from "@/lib/data/product-detail";
import {
  productSectionIds,
  SHOW_ABANS_EASY_PAYMENTS,
} from "@/lib/data/product-sections";

export function generateStaticParams() {
  return catalog.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(
  props: PageProps<"/products/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getCatalogProduct(slug);

  if (!product) return { title: "Product Not Found" };

  return {
    title: product.title,
    description: getProductDetail(slug).summary,
    openGraph: {
      title: product.title,
      images: [{ url: product.image.src }],
    },
  };
}

export default async function ProductPage(
  props: PageProps<"/products/[slug]">,
) {
  const { slug } = await props.params;
  const product = getCatalogProduct(slug);

  if (!product) notFound();

  const detail = getProductDetail(slug);
  const related = relatedProducts(product);
  const accessories = accessoryProducts(product);

  return (
    <>
      {/* -- Fold: gallery beside the buy block --------------------------- */}
      <Container className="pt-8 md:pt-12">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            {
              label: brandName[product.brand],
              href: `/products?brand=${product.brand}`,
            },
            { label: product.title },
          ]}
        />
      </Container>

      <Container className="mt-8 lg:mt-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          {/* Stacked, a full-width square tile would push the price off a
              tablet screen, so the gallery is capped until the columns split. */}
          <ProductGallery
            images={detail.gallery}
            tag={product.tag}
            className="mx-auto w-full max-w-lg lg:max-w-none"
          />

          {/* The gallery is the taller column once its rail is beside it, so
              the buy block holds its place while the images scroll. */}
          <ProductSummary
            product={product}
            detail={detail}
            className="lg:sticky lg:top-24"
          />
        </div>
      </Container>

      {/* Everything below the fold is one long read, so it gets its own bar. */}
      <ProductSubNav
        productTitle={product.title}
        price={product.price}
        buyUrl={product.buyUrl}
        inStock={product.inStock}
      />

      <CardPayments
        id={productSectionIds.cardPayments}
        price={product.price}
      />

      {SHOW_ABANS_EASY_PAYMENTS && (
        <AbansEasyPayments
          id={productSectionIds.abansEasyPayments}
          price={product.price}
          slug={product.slug}
        />
      )}

      <KeyFeatures
        id={productSectionIds.features}
        features={detail.keyFeatures}
      />

      <FeatureStories stories={detail.stories} />

      <SpecTable id={productSectionIds.specs} groups={detail.specGroups} />

      <FaqAccordion id={productSectionIds.faq} faqs={detail.faqs} />

      <InquiryForm
        id={productSectionIds.inquiry}
        productTitle={product.title}
        productCode={detail.productCode}
      />

      <RelatedRail
        titleId="related-title"
        title="You May Also Like"
        products={related}
      />

      <RelatedRail
        titleId="accessories-title"
        title="Accessories You May Like"
        products={accessories}
      />
    </>
  );
}
