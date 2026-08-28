"use client";

import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useTransform,
  type PanInfo,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from "@/components/ui/Icons";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import { heroSlides } from "@/lib/data/banners";
import { duration, easeOut } from "@/lib/motion";

/** Seconds a slide holds before advancing. */
const SLIDE_SECONDS = 6;
/** Horizontal drag past this many pixels counts as a swipe. */
const SWIPE_PX = 60;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(true);
  const reduced = useReducedMotion();

  const frameRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start start", "end start"],
  });
  // Light parallax as the hero scrolls out of frame.
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["0%", "8%"],
  );

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + heroSlides.length) % heroSlides.length);
      progress.set(0);
    },
    [progress],
  );

  // Hover pauses the clock, the button stops it outright, and reduced motion
  // never starts it — the play glyph reflects all three.
  const running = playing && !reduced;

  // One rAF loop drives both the autoplay clock and the indicator fill, so
  // pausing freezes them together. Nothing here re-renders per frame.
  useAnimationFrame((_, delta) => {
    if (!running || hovered) return;

    const next = progress.get() + delta / 1000 / SLIDE_SECONDS;
    if (next >= 1) {
      progress.set(0);
      setIndex((current) => (current + 1) % heroSlides.length);
    } else {
      progress.set(next);
    }
  });

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x <= -SWIPE_PX) goTo(index + 1);
    else if (info.offset.x >= SWIPE_PX) goTo(index - 1);
  };

  const slide = heroSlides[index];

  return (
    <section aria-label="Featured Offers">
      <div
        ref={frameRef}
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setHovered(true)}
        onBlurCapture={() => setHovered(false)}
      >
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured Offers"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              goTo(index + 1);
            } else if (event.key === "ArrowLeft") {
              event.preventDefault();
              goTo(index - 1);
            }
          }}
          // Full-bleed: no gutter, no radius — the artwork runs edge to edge.
          className="hero-frame relative w-full overflow-hidden bg-surface"
        >
          <motion.div style={{ y: parallaxY }} className="absolute inset-0">
            <AnimatePresence initial={false}>
              <motion.div
                key={slide.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: duration.slow, ease: easeOut }}
                drag={reduced ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                dragMomentum={false}
                onDragEnd={onDragEnd}
              >
                <Link
                  href={slide.href}
                  aria-label={slide.indicatorLabel}
                  className="block h-full w-full"
                  draggable={false}
                >
                  {/* Ken Burns: a slow settle from 1.06 across the slide's hold. */}
                  <motion.div
                    className="relative h-full w-full"
                    initial={{ scale: reduced ? 1 : 1.06 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: reduced ? 0 : SLIDE_SECONDS,
                      ease: "linear",
                    }}
                  >
                    <Image
                      src={slide.desktop}
                      alt={slide.alt}
                      fill
                      priority={index === 0}
                      placeholder="blur"
                      sizes="100vw"
                      className="hidden object-cover md:block"
                      draggable={false}
                    />
                    <Image
                      src={slide.mobile}
                      alt={slide.alt}
                      fill
                      priority={index === 0}
                      placeholder="blur"
                      sizes="100vw"
                      className="object-cover md:hidden"
                      draggable={false}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Controls sit inside the frame, bottom-right: indicator pill, then
              previous · play/pause · next. */}
          <div className="absolute right-4 bottom-4 z-10 flex items-center gap-2 md:right-6 md:bottom-6">
            <ul
              className={cn(
                "flex items-center gap-1.5 rounded-pill px-3 py-2",
                "bg-surface-alt/72 backdrop-blur-[20px] shadow-sm",
              )}
            >
              {heroSlides.map((item, itemIndex) => {
                const active = itemIndex === index;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => goTo(itemIndex)}
                      aria-label={`Show Slide ${itemIndex + 1}: ${item.indicatorLabel}`}
                      aria-current={active ? "true" : undefined}
                      className="group/dot flex items-center"
                    >
                      {/* Fixed width per state — the fill grows on transform,
                          never on width. */}
                      <span
                        className={cn(
                          "relative block h-1.5 overflow-hidden rounded-pill",
                          "transition-colors transition-fast",
                          active
                            ? "w-6 bg-line-strong"
                            : "w-1.5 bg-line-strong group-hover/dot:bg-ink-4",
                        )}
                      >
                        {active ? (
                          <motion.span
                            className="absolute inset-0 origin-left rounded-pill bg-ink-1"
                            style={{ scaleX: reduced ? 1 : progress }}
                          />
                        ) : null}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <HeroControl
              label="Previous Slide"
              onClick={() => goTo(index - 1)}
              icon={<ChevronLeftIcon className="size-4" />}
            />
            <HeroControl
              label={running ? "Pause Slideshow" : "Play Slideshow"}
              onClick={() => setPlaying((value) => !value)}
              icon={
                running ? (
                  <PauseIcon className="size-4" />
                ) : (
                  <PlayIcon className="size-4" />
                )
              }
            />
            <HeroControl
              label="Next Slide"
              onClick={() => goTo(index + 1)}
              icon={<ChevronRightIcon className="size-4" />}
            />
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          Slide {index + 1} of {heroSlides.length}: {slide.indicatorLabel}
        </p>
      </div>
    </section>
  );
}

interface HeroControlProps {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
}

function HeroControl({ label, onClick, icon }: HeroControlProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-pill",
        "bg-surface-alt/72 text-ink-1 backdrop-blur-[20px] shadow-sm",
        "transition-[background-color,transform] transition-fast",
        "hover:bg-surface-alt hover:scale-[1.04] active:scale-[0.98]",
      )}
    >
      {icon}
    </button>
  );
}
