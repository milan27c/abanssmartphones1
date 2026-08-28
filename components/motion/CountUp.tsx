"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { duration, easeOut } from "@/lib/motion";

interface CountUpProps {
  to: number;
  /** Rendered around the number, e.g. `+` or `%`. */
  suffix?: string;
  prefix?: string;
  className?: string;
}

/** Counts from zero to `to` the first time it scrolls into view. */
export function CountUp({ to, suffix, prefix, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;

    // `animate` drives the value from outside React, so state only changes
    // from its callback — never synchronously inside the effect.
    const controls = animate(0, to, {
      duration: duration.xl,
      ease: easeOut,
      onUpdate: (latest) => setValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, reduced, to]);

  // Reduced motion skips the count and shows the figure outright.
  const display = reduced ? to : value;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
