"use client";

import { useState } from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ProductGrid } from "@/components/product/ProductGrid";
import { pillClasses } from "@/components/ui/Pill";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { BestSellerFilter } from "@/lib/data/products";
import type { Product } from "@/lib/types";

/** One row of the 4-up grid. */
const MAX_TILES = 4;

export interface BestSellingSectionProps {
  title: string;
  /** Ties the section's `aria-labelledby` to the heading. */
  titleId: string;
  /** Illustrative feature chips — cosmetic, they do not narrow the grid. */
  filters: BestSellerFilter[];
  products: Product[];
  viewAllHref: string;
  viewAllLabel: string;
  /** Passed to the outer `Section` — used to tighten the seam between a pair. */
  className?: string;
}

/**
 * Title, a wrapping row of feature chips, and a 4-up product grid. The chips
 * advertise what the range supports rather than filtering it; toggling one
 * just re-runs the grid stagger.
 */
export function BestSellingSection({
  title,
  titleId,
  filters,
  products,
  viewAllHref,
  viewAllLabel,
  className,
}: BestSellingSectionProps) {
  const [active, setActive] = useState<string[]>([]);

  const toggle = (id: string) =>
    setActive((current) =>
      current.includes(id)
        ? current.filter((entry) => entry !== id)
        : [...current, id],
    );

  const visible = products.slice(0, MAX_TILES);
  // Keyed on the selection so toggling a chip re-runs the stagger.
  const gridKey = active.join("|");

  return (
    <Section aria-labelledby={titleId} className={className}>
      <Container>
        <Reveal>
          <SectionHeader
            titleId={titleId}
            title={title}
            action={{ label: viewAllLabel, href: viewAllHref }}
            actionVariant="secondary"
            actionClassName="max-sm:hidden sm:inline-flex"
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-8">
          {/* Chips wrap to as many rows as they need — centred on phones,
              left-aligned from sm. */}
          <div
            role="group"
            aria-label={`Filter ${title} By Feature`}
            className="flex flex-wrap items-center justify-center gap-2 sm:justify-start"
          >
            {filters.map((filter) => {
              const on = active.includes(filter.id);
              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(filter.id)}
                  className={pillClasses(on)}
                >
                  {filter.label}
                </button>
              );
            })}

            {active.length > 0 && (
              <button
                type="button"
                onClick={() => setActive([])}
                className="ml-1 text-body-sm text-ink-3 underline-offset-4 transition-fast hover:text-primary-600 hover:underline"
              >
                Reset
              </button>
            )}
          </div>
        </Reveal>

        {visible.length > 0 ? (
          <ProductGrid key={gridKey} products={visible} className="mt-12" />
        ) : (
          <p className="mt-12 text-body text-ink-3">
            Nothing matches these filters yet. Try widening your selection.
          </p>
        )}
      </Container>
    </Section>
  );
}
