"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/product/ProductCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/types";

const RAIL_SIZES =
  "(min-width: 1280px) 310px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 62vw";

export interface RelatedRailProps {
  title: string;
  /** Ties the section's `aria-labelledby` to the heading. */
  titleId: string;
  products: Product[];
}

/**
 * A titled rail of product cards, arrow- and keyboard-driven. Used twice at
 * the foot of a detail page: more of the same, then things that go with it.
 */
export function RelatedRail({ title, titleId, products }: RelatedRailProps) {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const railRef = useRef<HTMLUListElement>(null);
  const reduced = useReducedMotion();

  const measure = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    setAtStart(rail.scrollLeft <= 1);
    setAtEnd(rail.scrollLeft >= max - 1);
  }, []);

  useEffect(() => {
    measure();
    const rail = railRef.current;
    if (!rail) return;

    rail.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      rail.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const scrollByCard = useCallback(
    (direction: -1 | 1) => {
      const rail = railRef.current;
      if (!rail) return;
      const card = rail.querySelector("li");
      const step = card ? card.clientWidth + 24 : rail.clientWidth * 0.8;
      rail.scrollBy({
        left: step * direction,
        behavior: reduced ? "auto" : "smooth",
      });
    },
    [reduced],
  );

  if (products.length === 0) return null;

  return (
    <Section aria-labelledby={titleId} size="compact">
      <Container>
        <Reveal className="flex items-end justify-between gap-6">
          <SectionHeader titleId={titleId} title={title} />

          <div className="hidden shrink-0 gap-2 md:flex">
            <RailArrow
              direction="previous"
              disabled={atStart}
              onClick={() => scrollByCard(-1)}
            />
            <RailArrow
              direction="next"
              disabled={atEnd}
              onClick={() => scrollByCard(1)}
            />
          </div>
        </Reveal>
      </Container>

      {/* The rail bleeds past the container so cards peek off the right edge. */}
      <ul
        ref={railRef}
        tabIndex={0}
        aria-label={title}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollByCard(1);
          } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollByCard(-1);
          }
        }}
        className="no-scrollbar rail-scroller container-page mt-10 flex snap-x snap-mandatory gap-grid-gap overflow-x-auto pb-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
      >
        {products.map((product) => (
          <li key={product.slug} className="rail-item-peek-quad snap-start">
            <ProductCard product={product} sizes={RAIL_SIZES} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

interface RailArrowProps {
  direction: "previous" | "next";
  disabled: boolean;
  onClick: () => void;
}

function RailArrow({ direction, disabled, onClick }: RailArrowProps) {
  const Icon = direction === "next" ? ChevronRightIcon : ChevronLeftIcon;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "next" ? "Scroll Right" : "Scroll Left"}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-pill border border-line-strong",
        "transition-[background-color,border-color,color,transform] transition-fast",
        "hover:scale-[1.02] active:scale-[0.98]",
        disabled
          ? "cursor-not-allowed border-line text-ink-4 hover:scale-100"
          : "text-ink-1 hover:border-ink-1 hover:bg-surface",
      )}
    >
      <Icon className="size-5" />
    </button>
  );
}
