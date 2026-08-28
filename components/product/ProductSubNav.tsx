"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ExternalLinkIcon } from "@/components/ui/Icons";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import {
  SECTION_ANCHOR_OFFSET,
  productSections,
} from "@/lib/data/product-sections";
import { formatLKR } from "@/lib/format";
import { duration, easeOut } from "@/lib/motion";

/** The fold CTA the bar shadows — see `ProductSummary`. */
const BUY_CTA_ID = "product-buy-cta";

export interface ProductSubNavProps {
  productTitle: string;
  price: number;
  buyUrl: string;
  inStock: boolean;
}

/**
 * The bar that takes over once the fold has scrolled away: what you are
 * looking at, what it costs, and a jump list for the long page below.
 *
 * It sits in flow directly after the fold, so it simply arrives and pins under
 * the site navbar. The jump list shows from the start; the title, price and
 * Buy button only fade in once the fold's own Buy block has scrolled out of
 * sight, so the two are never on screen together.
 */
export function ProductSubNav({
  productTitle,
  price,
  buyUrl,
  inStock,
}: ProductSubNavProps) {
  const activeId = useActiveSection();
  const showBuyRow = useFoldCtaPassed();
  const reducedMotion = useReducedMotion();

  return (
    <div className="sticky top-14 z-30 border-b border-line bg-page/80 backdrop-blur-[20px]">
      <Container>
        <AnimatePresence initial={false}>
          {showBuyRow ? (
            <motion.div
              key="buy-row"
              initial={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
              transition={{
                duration: reducedMotion ? 0.01 : duration.fast,
                ease: easeOut,
              }}
              className="flex h-14 items-center justify-between gap-4 sm:h-16"
            >
              <p
                className="truncate text-body text-ink-1"
                title={productTitle}
              >
                {productTitle}
              </p>

              <div className="flex shrink-0 items-center gap-4">
                <p className="hidden text-body font-medium text-ink-1 tabular-nums sm:block">
                  {formatLKR(price)}
                </p>

                {inStock ? (
                  <Button href={buyUrl} external size="sm">
                    Buy Now
                    <ExternalLinkIcon className="size-3.5" />
                    <span className="sr-only">
                      — opens the Abans store in a new tab
                    </span>
                  </Button>
                ) : (
                  <Button disabled size="sm">
                    Out Of Stock
                  </Button>
                )}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <nav aria-label="On This Page">
          {/* The underline is the bar's own bottom hairline, so the list sits
              one pixel low and paints over it. */}
          <ul className="no-scrollbar -mb-px flex gap-6 overflow-x-auto sm:gap-8">
            {productSections.map((section) => {
              const active = section.id === activeId;

              return (
                <li key={section.id} className="shrink-0">
                  <a
                    href={`#${section.id}`}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "inline-block border-b-2 pb-3 text-body-sm whitespace-nowrap",
                      "transition-[color,border-color] transition-fast",
                      active
                        ? "border-ink-1 text-ink-1"
                        : "border-transparent text-ink-3 hover:text-ink-1",
                    )}
                  >
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </div>
  );
}

/**
 * `true` once the fold's Buy block has scrolled up past the top of the
 * viewport — the cue to let the bar carry the price and CTA itself. Flips
 * back to `false` when the reader scrolls the block back into view.
 */
function useFoldCtaPassed(): boolean {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const target = document.getElementById(BUY_CTA_ID);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Above the fold line, not merely off to one side.
        setPassed(
          !entry.isIntersecting && entry.boundingClientRect.top < 0,
        );
      },
      { threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return passed;
}

/**
 * Which section the reader is in. The observer's root is a thin band just
 * under the two sticky bars: whatever crosses it is what they are reading.
 * The last known answer is kept when nothing is in the band — at the foot of
 * the page nothing is, and blanking the bar there would read as a bug.
 */
function useActiveSection(): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const targets = productSections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (targets.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }

        // The deepest section in the band wins. Two only overlap it at the
        // seam between them, and the lower one is the one being entered.
        const current = productSections.findLast((section) =>
          visible.has(section.id),
        );
        if (current) setActiveId(current.id);
      },
      { rootMargin: `-${SECTION_ANCHOR_OFFSET}px 0px -65% 0px` },
    );

    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return activeId;
}
