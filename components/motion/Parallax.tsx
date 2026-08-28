"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /**
   * Travel as a share of the element's height, applied symmetrically.
   * Capped at 10% — anything more reads as a glitch.
   */
  amount?: number;
}

export function Parallax({
  children,
  className,
  amount = 0.08,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const travel = Math.min(Math.abs(amount), 0.1) * 100;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : [`${travel}%`, `${-travel}%`],
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
