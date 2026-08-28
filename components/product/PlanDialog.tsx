"use client";

import { useEffect, useRef } from "react";

import { CloseIcon, PhoneIcon } from "@/components/ui/Icons";
import { planMonthly, planTotal } from "@/lib/data/payment";
import { formatLKR } from "@/lib/format";
import type { Bank } from "@/lib/types";

export interface PlanDialogProps {
  /** `null` closes the dialog; a bank opens it on that bank. */
  bank: Bank | null;
  price: number;
  onClose: () => void;
}

const headerCell = "py-3 text-left text-body-sm font-medium text-ink-3";
const cell = "py-3 text-body-sm text-ink-1 tabular-nums";

/**
 * Every tenor a bank runs, priced against this product. Native `<dialog>`,
 * so Escape, the focus trap and the top layer come for free.
 */
export function PlanDialog({ bank, price, onClose }: PlanDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (bank && !dialog.open) dialog.showModal();
    if (!bank && dialog.open) dialog.close();
  }, [bank]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="plan-dialog-title"
      onClose={onClose}
      // The backdrop is the dialog's own padding box, so a click that lands on
      // the element itself — never on the panel inside it — is a click outside.
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      className="plan-dialog m-auto w-[min(42rem,calc(100vw-2rem))] rounded-xl bg-surface-alt p-0 text-ink-2 shadow-lg"
    >
      {bank ? (
        <div className="max-h-[calc(100svh-4rem)] overflow-y-auto p-6 sm:p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 id="plan-dialog-title" className="text-h4 text-ink-1">
                {bank.fullName} Payment Plans
              </h2>
              <p className="mt-1.5 text-body-sm text-ink-3">
                Calculated On {formatLKR(price)} — Indicative, Confirmed By Your
                Bank.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close Payment Plans"
              className="-mt-1 -mr-1 inline-flex size-9 shrink-0 items-center justify-center rounded-pill text-ink-3 transition-[background-color,color] transition-fast hover:bg-surface hover:text-ink-1"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[26rem] border-collapse">
              <thead>
                <tr className="bg-surface">
                  <th scope="col" className={`${headerCell} rounded-l-md pl-4`}>
                    Month(s)
                  </th>
                  <th scope="col" className={headerCell}>
                    Handling Fee (%)
                  </th>
                  <th scope="col" className={`${headerCell} text-right`}>
                    Monthly (Approx)
                  </th>
                  <th
                    scope="col"
                    className={`${headerCell} rounded-r-md pr-4 text-right`}
                  >
                    Total (Approx)
                  </th>
                </tr>
              </thead>

              <tbody>
                {bank.plans.map((plan) => (
                  <tr key={plan.months} className="border-b border-line">
                    <th scope="row" className={`${cell} pl-4 font-normal`}>
                      {plan.months}
                    </th>
                    <td className={cell}>{plan.feePercent.toFixed(2)}%</td>
                    <td className={`${cell} text-right`}>
                      {formatLKR(planMonthly(price, plan))}
                    </td>
                    <td className={`${cell} pr-4 text-right`}>
                      {formatLKR(planTotal(price, plan))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-8 text-body-sm font-medium text-ink-3">
            Terms &amp; Conditions
          </h3>

          <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-body-sm text-ink-2">
            <PhoneIcon className="size-4 shrink-0 text-primary-600" />
            To Call &amp; Convert:
            <a
              href={bank.hotline.href}
              className="link-underline font-medium text-primary-600"
            >
              {bank.hotline.label}
            </a>
          </p>

          <div className="mt-4 grid gap-3 text-body-sm text-ink-2">
            <p>
              Easy payment plans from {bank.name} apply to transactions between
              LKR 25,000 and LKR 2,000,000.
            </p>
            <p>
              After your payment, contact your credit card bank to convert it
              into Equal Monthly Instalments (EMI). Bank handling charges may
              apply, possibly as a one-time fee. Confirm details with your bank
              before purchasing. This plan is available for single or multiple
              purchases within your balance and credit limit.
            </p>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
