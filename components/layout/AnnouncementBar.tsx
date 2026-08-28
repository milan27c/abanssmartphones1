"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { CloseIcon } from "@/components/ui/Icons";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { announcements } from "@/lib/data/nav";
import { duration, easeOut } from "@/lib/motion";

const ROTATE_MS = 5000;

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (dismissed || reduced || announcements.length < 2) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % announcements.length);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [dismissed, reduced]);

  if (dismissed) return null;

  return (
    <div className="relative bg-primary-600 text-white">
      <div className="container-page flex min-h-11 items-center justify-center py-2 sm:min-h-10 sm:py-0">
        {/* Fixed height + absolutely placed children keep the crossfade from
            shifting the page. Two lines fit on narrow screens. */}
        <p
          className="relative h-9 w-full overflow-hidden text-center sm:h-6"
          aria-live="polite"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={index}
              className="absolute inset-0 flex items-center justify-center px-10 text-body-sm"
              initial={{ opacity: 0, y: reduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -8 }}
              transition={{ duration: duration.base, ease: easeOut }}
            >
              {announcements[index]}
            </motion.span>
          </AnimatePresence>
        </p>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss Announcement"
          className="absolute right-4 inline-flex size-7 items-center justify-center rounded-pill text-white/80 transition-[background-color,color] transition-fast hover:bg-white/15 hover:text-white lg:right-8"
        >
          <CloseIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
