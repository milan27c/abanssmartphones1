"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect } from "react";

import { CloseIcon } from "@/components/ui/Icons";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { primaryNav } from "@/lib/data/nav";
import { duration, easeOut, sheetLink, stagger } from "@/lib/motion";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/** Full-screen sheet. Links enter on a stagger behind the panel. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 bg-page lg:hidden"
          initial={{ opacity: 0, y: reduced ? 0 : -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduced ? 0 : -12 }}
          transition={{ duration: duration.base, ease: easeOut }}
        >
          <div className="container-page flex h-16 items-center justify-end">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Menu"
              autoFocus
              className="inline-flex size-10 items-center justify-center rounded-pill text-ink-1 transition-[background-color] transition-fast hover:bg-surface"
            >
              <CloseIcon className="size-6" />
            </button>
          </div>

          <motion.nav
            className="container-page mt-4 flex flex-col"
            variants={reduced ? stagger(0, 0) : stagger(0.06, 0.12)}
            initial="hidden"
            animate="show"
            aria-label="Mobile"
          >
            {primaryNav.map((link) => (
              <motion.div key={link.href} variants={sheetLink}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block border-b border-line py-5 text-h3 text-ink-1 transition-colors transition-fast hover:text-primary-600"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
