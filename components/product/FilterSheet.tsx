"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { CloseIcon, SlidersIcon } from "@/components/ui/Icons";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import { duration, easeOut } from "@/lib/motion";

interface FilterSheetProps {
  /** The same `<ProductFilters>` the desktop rail renders, passed as a slot. */
  children: ReactNode;
  activeCount: number;
  resultCount: number;
  className?: string;
}

/**
 * Below `lg` the filter rail moves into a full-screen sheet, opened by a button
 * that floats over the bottom of the grid — filters stay one thumb-reach away
 * however far the user has scrolled. The sheet deliberately stays open while
 * filters are applied: the panel re-renders with the new counts on each
 * navigation, so the user can stack choices and read the running total off the
 * footer button before returning to the grid.
 */
export function FilterSheet({
  children,
  activeCount,
  resultCount,
  className,
}: FilterSheetProps) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      {/* A centring wrapper rather than a translate on the button itself: the
          entrance animates `y`, and an inline transform would eat the class.
          The sheet is `z-50` and opaque, so the dock simply sits underneath it
          while open instead of animating out of the way. */}
      <div
        className={cn(
          "fab-dock pointer-events-none fixed inset-x-0 z-40 flex justify-center",
          className,
        )}
      >
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-haspopup="dialog"
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.base, ease: easeOut, delay: 0.2 }}
          whileTap={reduced ? undefined : { scale: 0.98 }}
          className={cn(
            "pointer-events-auto inline-flex h-14 items-center gap-2 rounded-pill",
            "bg-primary-600 px-7 text-body font-medium whitespace-nowrap text-white shadow-lg",
            "transition-[background-color] transition-fast hover:bg-primary-700",
          )}
        >
          <SlidersIcon className="size-5" />
          Filters
          {activeCount > 0 ? (
            <span className="inline-flex size-6 items-center justify-center rounded-pill bg-white text-body-sm font-medium text-primary-700 tabular-nums">
              {activeCount}
            </span>
          ) : null}
        </motion.button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            className="fixed inset-0 z-50 flex flex-col bg-page lg:hidden"
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : 12 }}
            transition={{ duration: duration.base, ease: easeOut }}
          >
            <div className="container-page flex h-16 shrink-0 items-center justify-between border-b border-line">
              <span className="text-h4 text-ink-1">Filters</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close Filters"
                autoFocus
                className="inline-flex size-10 items-center justify-center rounded-pill text-ink-1 transition-[background-color] transition-fast hover:bg-surface"
              >
                <CloseIcon className="size-6" />
              </button>
            </div>

            <div className="container-page flex-1 overflow-y-auto pt-2 pb-6">
              {children}
            </div>

            <div className="container-page shrink-0 border-t border-line py-4">
              <Button
                onClick={() => setOpen(false)}
                size="lg"
                className="w-full"
              >
                Show {resultCount} {resultCount === 1 ? "Product" : "Products"}
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
