"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { reveal, revealReduced, stagger, viewportOnce } from "@/lib/motion";

const elements = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
} as const;

const itemElements = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
} as const;

interface StaggerProps {
  children: ReactNode;
  className?: string;
  as?: keyof typeof elements;
  /** Seconds between children. Cap groups at ~8 items. */
  step?: number;
  delayChildren?: number;
}

/** Parent that hands each <StaggerItem> a delayed entrance. */
export function Stagger({
  children,
  className,
  as = "div",
  step = 0.06,
  delayChildren = 0.08,
}: StaggerProps) {
  const reduced = useReducedMotion();
  const Component = elements[as];

  return (
    <Component
      className={className}
      variants={reduced ? stagger(0, 0) : stagger(step, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </Component>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: keyof typeof itemElements;
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: StaggerItemProps) {
  const reduced = useReducedMotion();
  const Component = itemElements[as];

  return (
    <Component className={className} variants={reduced ? revealReduced : reveal}>
      {children}
    </Component>
  );
}
