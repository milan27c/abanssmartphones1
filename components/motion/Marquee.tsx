"use client";

import { motion } from "motion/react";
import { Children, type ReactNode } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full pass. */
  speed?: number;
  className?: string;
}

/**
 * Seamless horizontal loop. The track is duplicated and translated by exactly
 * -50%, so the seam never shows. Pauses on hover; frozen for reduced motion.
 */
export function Marquee({ children, speed = 40, className }: MarqueeProps) {
  const reduced = useReducedMotion();
  const items = Children.toArray(children);

  return (
    <div
      className={cn("group relative overflow-hidden", className)}
      aria-hidden="true"
    >
      <motion.div
        className="flex w-max shrink-0 gap-12 group-hover:[animation-play-state:paused]"
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={
          reduced
            ? undefined
            : { duration: speed, ease: "linear", repeat: Infinity }
        }
      >
        {[0, 1].map((pass) => (
          <div key={pass} className="flex shrink-0 items-center gap-12">
            {items}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
