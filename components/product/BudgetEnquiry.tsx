"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";
import {
  DEFAULT_MONTHLY_BUDGET,
  MAX_PLAN_MONTHS,
  budgetQuickPicks,
  minimumMonthlyFor,
  monthlyPayApplyUrl,
  monthsToClear,
} from "@/lib/data/payment";
import { formatLKR } from "@/lib/format";

export interface BudgetEnquiryProps {
  /** The device the enquiry is raised against. */
  slug: string;
  price: number;
  className?: string;
}

/** Digits only, no leading zeros, capped at a sane rupee amount. */
function toDigits(value: string): string {
  return value.replace(/\D/g, "").replace(/^0+(?=\d)/, "").slice(0, 7);
}

/**
 * The compact sibling of the home page budget field: a shopper names what they
 * can pay a month, we quote the tenor that clears this device, and the enquiry
 * hands both figures to the Abans monthly-pay application.
 */
export function BudgetEnquiry({ slug, price, className }: BudgetEnquiryProps) {
  const [entered, setEntered] = useState(String(DEFAULT_MONTHLY_BUDGET));
  const rail = useRef<HTMLDivElement>(null);

  const budget = Number(entered || 0);
  const display = entered === "" ? "" : budget.toLocaleString("en-US");
  const months = monthsToClear(price, budget);
  const minimum = minimumMonthlyFor(price);

  // On a phone the chips scroll, so the picked one has to be brought back into
  // view — a selection the shopper cannot see reads as no selection at all.
  useEffect(() => {
    const track = rail.current;
    const chip = track?.querySelector<HTMLElement>('[aria-pressed="true"]');

    if (!track || !chip || track.scrollWidth <= track.clientWidth) return;

    track.scrollLeft = chip.offsetLeft - (track.clientWidth - chip.offsetWidth) / 2;
  }, [budget]);

  return (
    <div
      className={cn(
        "rounded-lg border border-line bg-surface-alt p-5 sm:p-6",
        className,
      )}
    >
      <h4 className="text-h4 text-ink-1">What&rsquo;s Your Monthly Budget?</h4>

      <label htmlFor="device-budget" className="sr-only">
        Monthly Budget In Rupees
      </label>
      <div
        className={cn(
          "mt-4 flex items-center gap-3 rounded-md border border-line bg-surface px-4 py-2.5 sm:gap-4 sm:px-5",
          "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2",
          "has-[:focus-visible]:outline-primary-400",
        )}
      >
        <span className="shrink-0 text-h4 text-ink-3">LKR</span>
        <input
          id="device-budget"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="0"
          value={display}
          onChange={(event) => setEntered(toDigits(event.target.value))}
          className="w-full min-w-0 bg-transparent text-h3 text-ink-1 tabular-nums outline-none placeholder:text-ink-4"
        />
        <span className="shrink-0 text-body-sm text-ink-3">/ month</span>
      </div>

      {/* Seven chips wrap into four ragged rows on a phone, so below sm they
          run as one quiet scroll rail instead. */}
      <div
        ref={rail}
        className={cn(
          "no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1",
          "sm:flex-wrap sm:overflow-x-visible sm:pb-0",
        )}
      >
        {budgetQuickPicks.map((amount) => (
          <Pill
            key={amount}
            active={amount === budget}
            onClick={() => setEntered(String(amount))}
          >
            {amount.toLocaleString("en-US")}
          </Pill>
        ))}
      </div>

      {/* The verdict and the action share a row: the shopper reads the tenor
          on the left and reaches the button on the right without a hop. */}
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p
          aria-live="polite"
          className={cn(
            "text-body-sm",
            // A budget that cannot reach the device is a dead end, not a
            // quieter version of the same answer — it says so in red.
            months > 0 ? "text-ink-3" : "text-sale",
          )}
        >
          {months > 0 ? (
            <>
              <span className="font-medium text-ink-1">{formatLKR(budget)}</span>{" "}
              a month clears this device in{" "}
              <span className="font-medium text-ink-1 tabular-nums">
                {months}
              </span>{" "}
              {months === 1 ? "month" : "months"}. Figures are indicative and
              confirmed on application.
            </>
          ) : (
            <>
              That budget will not reach this device. Over our longest{" "}
              {MAX_PLAN_MONTHS}-month term it needs at least{" "}
              <button
                type="button"
                onClick={() => setEntered(String(minimum))}
                className="font-medium link-underline"
              >
                {formatLKR(minimum)} a month
              </button>
              .
            </>
          )}
        </p>

        {months > 0 ? (
          <Button
            href={monthlyPayApplyUrl(slug, months, budget)}
            external
            className="w-full shrink-0 sm:w-auto"
          >
            Enquire For This Device
          </Button>
        ) : null}
      </div>
    </div>
  );
}
