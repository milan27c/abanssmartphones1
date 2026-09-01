"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";

import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import {
  DEFAULT_MONTHLY_BUDGET,
  INSTALMENT_MONTHS,
  PAY_EASY_SHORTLIST,
  budgetQuickPicks,
  devicesWithinBudget,
  lowestInstalment,
  monthlyInstalment,
  paymentPartners,
} from "@/lib/data/payment";
import { formatLKR } from "@/lib/format";
import { duration, easeOut } from "@/lib/motion";

import payEasyBackdrop from "@/public/images/payeasy.jpg";

const GRID_SIZES =
  "(min-width: 1280px) 302px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 62vw";

/** Digits only, no leading zeros, capped at a sane rupee amount. */
function toDigits(value: string): string {
  return value.replace(/\D/g, "").replace(/^0+(?=\d)/, "").slice(0, 7);
}

/**
 * The dark break in the page's light rhythm. The pitch and the three Abans
 * Easy plans sit beside the budget field, so the section stays two rows deep:
 * one row of controls, one row of devices.
 */
export function PayEasy() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [entered, setEntered] = useState(String(DEFAULT_MONTHLY_BUDGET));

  const budget = Number(entered || 0);
  const display = entered === "" ? "" : budget.toLocaleString("en-US");

  const affordable = useMemo(() => devicesWithinBudget(budget), [budget]);
  const shortlist = affordable.slice(0, PAY_EASY_SHORTLIST);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const backdropY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["5%", "-5%"],
  );

  return (
    <section
      ref={ref}
      aria-labelledby="pay-easy-title"
      className="relative overflow-hidden bg-dark-alt py-section-sm"
    >
      {/* The plate is taller than the section so the parallax never exposes an
          edge; the artwork drifts inside it on its own slow loop. */}
      <motion.div
        aria-hidden="true"
        style={{ y: backdropY }}
        className="pointer-events-none absolute -top-[12%] right-0 left-0 h-[124%] will-change-transform"
      >
        <div className="payeasy-drift relative h-full w-full will-change-transform">
          <Image
            src={payEasyBackdrop}
            alt=""
            fill
            sizes="100vw"
            placeholder="blur"
            className="object-cover"
          />
        </div>
      </motion.div>
      <div
        aria-hidden="true"
        className="payeasy-scrim pointer-events-none absolute inset-0"
      />

      <Container className="relative">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* -- Pitch and plans ------------------------------------------- */}
          <div className="text-center lg:col-span-5 lg:text-left">
            <Reveal>
              <h2
                id="pay-easy-title"
                className="mx-auto max-w-[14ch] text-h2 text-white lg:mx-0"
              >
                Pay Easy With Abans
              </h2>
              <p className="mx-auto mt-4 max-w-[44ch] text-body text-on-dark-2 lg:mx-0">
                Split any device across {INSTALMENT_MONTHS} monthly instalments
                with one of our three partners.
              </p>
            </Reveal>

            <Stagger
              as="ul"
              className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3 lg:mx-0"
            >
              {paymentPartners.map((partner) => (
                <StaggerItem as="li" key={partner.id}>
                  <div
                    className={cn(
                      "flex aspect-[3/2] items-center justify-center overflow-hidden rounded-lg bg-surface-alt",
                      "transition-transform transition-base hover:-translate-y-1",
                      !partner.bleed && "p-3 sm:p-4",
                    )}
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      placeholder="blur"
                      sizes="176px"
                      className={cn(
                        "h-full w-full",
                        partner.bleed ? "object-cover" : "object-contain",
                      )}
                    />
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* -- Budget field ---------------------------------------------- */}
          <Reveal delay={0.06} className="lg:col-span-7">
            <div className="rounded-xl border border-white/15 bg-white/8 p-6 backdrop-blur-xl sm:p-8">
              <h3 className="text-center text-h3 text-white">
                What&rsquo;s Your Monthly Budget?
              </h3>

              <label htmlFor="monthly-budget" className="sr-only">
                Monthly Budget In Rupees
              </label>
              <div
                className={cn(
                  "mt-5 flex items-center gap-3 rounded-lg border border-white/10 bg-white/12 px-5 py-3 sm:gap-5 sm:px-7",
                  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2",
                  "has-[:focus-visible]:outline-primary-300",
                )}
              >
                <span className="shrink-0 text-h3 text-on-dark-2">LKR</span>
                <input
                  id="monthly-budget"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="0"
                  value={display}
                  onChange={(event) => setEntered(toDigits(event.target.value))}
                  className="w-full min-w-0 bg-transparent text-h2 text-white tabular-nums outline-none placeholder:text-on-dark-3"
                />
                <span className="shrink-0 text-body-sm text-on-dark-2">/ month</span>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {budgetQuickPicks.map((amount) => (
                  <Pill
                    key={amount}
                    tone="dark"
                    active={amount === budget}
                    onClick={() => setEntered(String(amount))}
                  >
                    {amount.toLocaleString("en-US")}
                  </Pill>
                ))}
              </div>

              <p
                aria-live="polite"
                className="mt-5 text-center text-body-sm text-on-dark-2"
              >
                {affordable.length > 0 ? (
                  <>
                    <span className="font-medium text-white tabular-nums">
                      {affordable.length}
                    </span>{" "}
                    {affordable.length === 1 ? "device fits" : "devices fit"}{" "}
                    this budget — that is{" "}
                    <span className="font-medium text-white">
                      {formatLKR(budget * INSTALMENT_MONTHS)}
                    </span>{" "}
                    over {INSTALMENT_MONTHS} months.
                  </>
                ) : (
                  <>
                    Nothing fits that yet. Our lowest instalment starts at{" "}
                    <button
                      type="button"
                      onClick={() => setEntered(String(lowestInstalment))}
                      className="font-medium text-primary-200 link-underline hover:text-white"
                    >
                      {formatLKR(lowestInstalment)} a month
                    </button>
                    .
                  </>
                )}
              </p>
            </div>
          </Reveal>
        </div>

        {/* -- What the budget reaches -------------------------------------- */}
        {shortlist.length > 0 ? (
          <Reveal delay={0.12} className="mt-10">
            {/* Below lg the shortlist is a snapping rail with a card and a half
                in view, bleeding to the screen edge so the peek reads as an
                invitation to scroll. From lg it settles into a 4-up grid. */}
            <ul
              className={cn(
                "no-scrollbar rail-scroller -mx-5 flex snap-x snap-mandatory gap-grid-gap",
                "overflow-x-auto px-5 pb-2 md:-mx-8 md:px-8",
                "lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-x-visible lg:px-0 lg:pb-0",
              )}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {shortlist.map((product) => (
                  <motion.li
                    key={product.slug}
                    layout={!reduced}
                    initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                    transition={{ duration: duration.base, ease: easeOut }}
                    className="rail-item-peek snap-start"
                  >
                    <ProductCard
                      product={product}
                      tone="dark"
                      meta="inside"
                      radius="lg"
                      sizes={GRID_SIZES}
                      className="h-full"
                      note={`${formatLKR(monthlyInstalment(product.price))} / month`}
                    />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </Reveal>
        ) : null}

        <Reveal delay={0.18} className="mt-8 flex justify-center">
          <Button href="/products" variant="on-dark-solid">
            View All Devices
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
