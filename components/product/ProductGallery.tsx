"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import { crossfade, crossfadeReduced } from "@/lib/motion";
import type { GalleryImage, ProductTag } from "@/lib/types";

export interface ProductGalleryProps {
  images: GalleryImage[];
  /** Sits on the tile, top left, exactly as it does on a product card. */
  tag?: ProductTag;
  className?: string;
}

const MAIN_SIZES = "(min-width: 1024px) 46vw, (min-width: 640px) 80vw, 92vw";

/**
 * The left column of the detail page. Square tile, square corners — the same
 * plate as a product card — with a thumbnail rail that runs vertically beside
 * it on desktop and under it on mobile.
 */
export function ProductGallery({ images, tag, className }: ProductGalleryProps) {
  const [activeId, setActiveId] = useState(images[0]?.id);
  const reduced = useReducedMotion();

  const active = images.find((image) => image.id === activeId) ?? images[0];

  const step = (direction: -1 | 1) => {
    const index = images.findIndex((image) => image.id === active.id);
    const next = (index + direction + images.length) % images.length;
    setActiveId(images[next].id);
  };

  return (
    <div className={cn("lg:flex lg:flex-row-reverse lg:gap-4", className)}>
      {/* -- Main tile ------------------------------------------------------ */}
      <div
        role="group"
        aria-label="Product Images"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            event.preventDefault();
            step(1);
          } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            event.preventDefault();
            step(-1);
          }
        }}
        className={cn(
          "product-tile relative isolate aspect-square w-full overflow-hidden rounded-none bg-surface lg:min-w-0 lg:flex-1",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400",
        )}
      >
        {tag ? (
          <span className="absolute top-4 left-4 z-10 rounded-pill bg-ink-1 px-2.5 py-1 text-label uppercase text-white">
            {tag === "new" ? "New" : "Sale"}
          </span>
        ) : null}

        <AnimatePresence initial={false}>
          <motion.div
            key={active.id}
            variants={reduced ? crossfadeReduced : crossfade}
            initial="enter"
            animate="center"
            exit="exit"
            className="product-tile absolute inset-0 flex items-center justify-center"
          >
            <div className="plate-blend relative h-full w-full">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes={MAIN_SIZES}
                priority
                placeholder="blur"
                className="object-contain"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* -- Thumbnail rail -------------------------------------------------- */}
      <ul
        aria-label="Product Image Thumbnails"
        className="no-scrollbar mt-4 flex gap-3 overflow-x-auto lg:mt-0 lg:w-20 lg:flex-col lg:overflow-visible"
      >
        {images.map((image) => {
          const selected = image.id === active.id;

          return (
            <li key={image.id} className="shrink-0">
              <button
                type="button"
                aria-pressed={selected}
                aria-label={image.label}
                onClick={() => setActiveId(image.id)}
                className={cn(
                  // A ring, not a shadow — the selected thumb is a state, and
                  // product tiles never carry elevation.
                  "relative block aspect-square w-20 overflow-hidden rounded-none bg-surface p-2",
                  "transition-[background-color,box-shadow] transition-fast",
                  selected ? "ring-2 ring-ink-1 ring-inset" : "hover:bg-line",
                )}
              >
                <div className="plate-blend relative h-full w-full">
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="80px"
                    placeholder="blur"
                    className="object-contain"
                  />
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
