import type { Transition, Variants } from "motion/react";

/** Mirrors the easing tokens in `app/globals.css`. */
export const easeOut = [0.16, 1, 0.3, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;
export const easeSpring = [0.34, 1.56, 0.64, 1] as const;

/** Mirrors the duration tokens, in seconds for Motion. */
export const duration = {
  fast: 0.2,
  base: 0.32,
  slow: 0.6,
  xl: 0.9,
} as const;

export const viewportOnce = { once: true, margin: "-80px" } as const;

/** The default entrance for every section. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easeOut },
  },
};

/**
 * Same entrance, minus the transform, for reduced-motion users. `y` is pinned
 * rather than omitted: the server renders the full `reveal` variant, so a
 * variant that never mentions `y` would leave that 24px offset in place once
 * the client swapped to this one.
 */
export const revealReduced: Variants = {
  hidden: { opacity: 0, y: 0 },
  show: { opacity: 1, y: 0, transition: { duration: 0.01 } },
};

/**
 * Parent that hands its children a staggered `show`. Cap groups at ~8 items —
 * beyond that the tail of the stagger drags.
 */
export const stagger = (
  staggerChildren = 0.06,
  delayChildren = 0.08,
): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Crossfade used by the hero carousel and the gallery. */
export const crossfade: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: duration.xl, ease: easeOut } },
  exit: { opacity: 0, transition: { duration: duration.slow, ease: easeOut } },
};

/** Mobile menu links, entering on a stagger behind the sheet. */
export const sheetLink: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easeOut },
  },
};

export const tabIndicator: Transition = {
  duration: duration.base,
  ease: easeInOut,
};

/**
 * Same crossfade, near-instant, for reduced-motion users. An opacity fade is
 * allowed to remain — it is the transform that goes.
 */
export const crossfadeReduced: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.01 } },
  exit: { opacity: 0, transition: { duration: 0.01 } },
};
