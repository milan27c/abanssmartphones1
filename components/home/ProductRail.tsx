"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import { newArrivals } from "@/lib/data/products";

const RAIL_SIZES =
  "(min-width: 1280px) 310px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 45vw";

/** Phones get a 2x2 block instead of a rail — four tiles, no sideways scroll. */
const MOBILE_TILES = 4;

export function ProductRail() {
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

  // The video that follows is a visual of its own, so the seam between them
  // runs on the tightened half rhythm rather than a full section gap.
  return (
    <Section aria-labelledby="new-arrivals-title" className="pb-section-half">
      <Container>
        <Reveal className="flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            titleId="new-arrivals-title"
            title="New Arrivals"
            className="w-full"
          />

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

      {/* Phones: a plain 2x2 block. Nothing scrolls sideways, nothing is cut
          off at the edge, and the View All below finishes the section. */}
      <Container className="md:hidden">
        <ProductGrid
          products={newArrivals.slice(0, MOBILE_TILES)}
          className="mt-10"
        />
      </Container>

      {/* Tablet up: the rail bleeds past the container so cards peek off the
          right edge and the arrows have somewhere to go. */}
      <ul
        ref={railRef}
        tabIndex={0}
        aria-label="New Arrivals"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollByCard(1);
          } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollByCard(-1);
          }
        }}
        className="no-scrollbar rail-scroller container-page mt-10 hidden snap-x snap-mandatory gap-grid-gap overflow-x-auto pb-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 md:flex"
      >
        {newArrivals.map((product) => (
          <li key={product.slug} className="rail-item snap-start">
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
