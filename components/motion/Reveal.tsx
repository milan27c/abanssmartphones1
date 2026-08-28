"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { reveal, revealReduced, viewportOnce } from "@/lib/motion";

/** Pre-created so a re-render never remounts the subtree. */
const elements = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  header: motion.header,
  figure: motion.figure,
} as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds. Use sparingly — prefer <Stagger> for lists. */
  delay?: number;
  as?: keyof typeof elements;
}

/** The default section entrance: 24px rise + fade, once, on scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Component = elements[as];

  return (
    <Component
      className={className}
      variants={reduced ? revealReduced : reveal}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Component>
  );
}
