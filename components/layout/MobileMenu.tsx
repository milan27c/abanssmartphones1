"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { CloseIcon } from "@/components/ui/Icons";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { brands } from "@/lib/data/brands";
import { primaryNav } from "@/lib/data/nav";
import { duration, easeOut, sheetLink, stagger } from "@/lib/motion";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/** Audio and wearable labels — kept out of the handset quick-filter. */
const nonPhoneBrands = new Set(["jbl", "sudio", "mibro"]);

/** Handset makers only, in grid order: a clean 3 x 3 under Smartphones. */
const phoneBrands = brands.filter((brand) => !nonPhoneBrands.has(brand.slug));

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
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="block border-b border-line py-5 text-h3 text-ink-1 transition-colors transition-fast hover:text-primary-600"
                >
                  {link.label}
                </Link>

                {link.label === "Smartphones" ? (
                  <MobileBrandGrid onNavigate={onClose} />
                ) : null}
              </motion.div>
            ))}
          </motion.nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

interface MobileBrandGridProps {
  onNavigate: () => void;
}

/**
 * A 3-per-row plate of handset logos below the Smartphones link, so a shopper
 * can jump straight into a brand-filtered listing from the sheet.
 */
function MobileBrandGrid({ onNavigate }: MobileBrandGridProps) {
  return (
    <div className="border-b border-line py-5">
      <p className="text-label uppercase text-ink-3">Shop By Brand</p>
      <ul className="mt-4 grid grid-cols-3 gap-2">
        {phoneBrands.map((brand) => (
          <li key={brand.slug}>
            <Link
              href={`/products?brand=${brand.slug}`}
              onClick={onNavigate}
              aria-label={brand.name}
              className="flex aspect-[3/2] items-center justify-center rounded-lg bg-surface p-4 transition-[background-color] transition-fast active:bg-line"
            >
              <Image
                src={brand.logo}
                alt=""
                placeholder="blur"
                sizes="120px"
                className="plate-blend h-full w-full object-contain"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
