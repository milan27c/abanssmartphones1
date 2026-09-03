"use client";

import Image from "next/image";
import { useState } from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { PlanDialog } from "@/components/product/PlanDialog";
import { cn } from "@/lib/cn";
import { banks, headlinePlan } from "@/lib/data/banks";
import { planMonthly } from "@/lib/data/payment";
import { splitLKR } from "@/lib/format";

/**
 * Plan pricing is withheld for now: the rail shows a bank and the tenor it
 * runs, nothing more. Flip this to `true` to bring back the monthly figure,
 * the "View Plans" action and the tenor dialog behind it — all three stay in
 * this file, and stay type-checked, so restoring them is a one-line change.
 */
const SHOW_PLAN_PRICING = false;

export interface CardPaymentsProps {
  /** Every figure on this section is priced against this product. */
  price: number;
  id?: string;
}

/**
 * What the phone costs per month on a bank card. The rail quotes each
 * partner's longest tenor; opening one prices every tenor it runs in a dialog.
 * Abans' own plans are a section of their own — see `AbansEasyPayments`.
 */
export function CardPayments({ price, id }: CardPaymentsProps) {
  const [openBankId, setOpenBankId] = useState<string | null>(null);

  const openBank = banks.find((bank) => bank.id === openBankId) ?? null;

  return (
    <Section
      id={id}
      aria-labelledby="card-payments-title"
      size="compact"
      className="scroll-anchor"
    >
      <Container>
        <Reveal className="rounded-xl bg-surface p-6 sm:p-8 lg:p-10">
          <h2 id="card-payments-title" className="text-h3 text-ink-1">
            Card Payments
          </h2>
          <p className="mt-3 text-body-sm text-ink-3">
            {SHOW_PLAN_PRICING
              ? "Pay by credit card, then convert to equal monthly instalments with your bank. Tap a card for every tenor it runs, priced against this product."
              : "Pay by credit card, then convert to equal monthly instalments with your bank. Here is the longest tenor each partner runs."}
          </p>

          {/* -- Bank rail -------------------------------------------------- */}
          <ul
            aria-label="Participating Banks"
            className="no-scrollbar mt-8 flex gap-4 overflow-x-auto pb-1"
          >
            {banks.map((bank) => {
              const plan = headlinePlan(bank);

              // Logo over tenor. With pricing off there is nothing to open, so
              // the plate is inert and the tenor centres under the mark.
              const content = (
                <>
                  <span className="flex h-9 items-center justify-center border-b border-line pb-3">
                    <Image
                      src={bank.logo}
                      alt={bank.name}
                      sizes="140px"
                      placeholder="blur"
                      className="max-h-full w-auto object-contain"
                    />
                  </span>

                  <span
                    className={cn(
                      "mt-4 block text-body-sm text-ink-3",
                      !SHOW_PLAN_PRICING && "text-center",
                    )}
                  >
                    Up To {plan.months} Months
                  </span>

                  {SHOW_PLAN_PRICING && (
                    <>
                      <Monthly
                        amount={planMonthly(price, plan)}
                        className="mt-1"
                      />

                      <span className="mt-3 block text-body-sm font-medium text-primary-600">
                        View Plans
                      </span>
                    </>
                  )}
                </>
              );

              const plate = cn(
                "flex h-full w-full flex-col rounded-lg border border-line bg-surface-alt p-4 text-left",
                // No lift and no scale — a card that jumps under the
                // cursor reads as a glitch. The plate simply gains a
                // firmer edge and a soft shadow, eased at both ends.
                "shadow-sm transition-[border-color,box-shadow] transition-smooth",
                SHOW_PLAN_PRICING && "hover:border-line-strong hover:shadow-md",
              );

              return (
                <li key={bank.id} className="bank-item">
                  {SHOW_PLAN_PRICING ? (
                    <button
                      type="button"
                      aria-haspopup="dialog"
                      onClick={() => setOpenBankId(bank.id)}
                      className={plate}
                    >
                      {content}
                    </button>
                  ) : (
                    <div className={plate}>{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>

      {SHOW_PLAN_PRICING && (
        <PlanDialog
          bank={openBank}
          price={price}
          onClose={() => setOpenBankId(null)}
        />
      )}
    </Section>
  );
}

/** `LKR 9,442 /mo` — the rupee mark and the term stay quiet beside the figure. */
function Monthly({ amount, className }: { amount: number; className?: string }) {
  const { currency, amount: digits } = splitLKR(amount);

  return (
    <span className={cn("flex items-baseline gap-1", className)}>
      <span className="text-body-sm text-ink-3">{currency}</span>
      <span className="text-body font-medium text-ink-1 tabular-nums">
        {digits}
      </span>
      <span className="text-body-sm text-ink-3">/mo</span>
    </span>
  );
}
