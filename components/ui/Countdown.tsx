"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/cn";

interface CountdownProps {
  /** ISO instant to run down to. */
  endsAt: string;
  className?: string;
}

interface Remaining {
  days: number;
  hours: number;
  mins: number;
  secs: number;
}

function remaining(target: number): Remaining {
  const total = Math.max(0, Math.floor((target - Date.now()) / 1000));

  return {
    days: Math.floor(total / 86400),
    hours: Math.floor(total / 3600) % 24,
    mins: Math.floor(total / 60) % 60,
    secs: total % 60,
  };
}

const UNITS: Array<{ key: keyof Remaining; label: string }> = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "mins", label: "Mins" },
  { key: "secs", label: "Secs" },
];

/**
 * Ticking clock on a dark section. The digits are decorative — a per-second
 * live region would shout over a screen reader — so the deadline is announced
 * once as a sentence instead.
 */
export function Countdown({ endsAt, className }: CountdownProps) {
  const target = useMemo(() => new Date(endsAt).getTime(), [endsAt]);
  // Null until mounted: the server cannot know the visitor's clock, and
  // rendering a guess would mismatch on hydration.
  const [left, setLeft] = useState<Remaining | null>(null);

  useEffect(() => {
    const tick = () => setLeft(remaining(target));
    // The first tick is deferred a frame rather than run inline, so the state
    // update stays out of the effect body.
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);

    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [target]);

  const deadline = new Intl.DateTimeFormat("en-LK", {
    dateStyle: "long",
    timeZone: "Asia/Colombo",
  }).format(target);

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <ul className="flex gap-3" aria-hidden="true">
        {UNITS.map((unit) => (
          <li
            key={unit.key}
            className="flex size-18 flex-col items-center justify-center rounded-lg border border-on-dark-line bg-white/6"
          >
            <span className="text-h3 text-white tabular-nums">
              {left ? String(left[unit.key]).padStart(2, "0") : "--"}
            </span>
            <span className="mt-1 text-label uppercase text-on-dark-3">
              {unit.label}
            </span>
          </li>
        ))}
      </ul>

      <p className="sr-only">Offer ends {deadline}.</p>
    </div>
  );
}
