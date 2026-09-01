import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { BudgetEnquiry } from "@/components/product/BudgetEnquiry";
import { cn } from "@/lib/cn";
import { paymentPartners } from "@/lib/data/payment";

export interface AbansEasyPaymentsProps {
  /** The budget quote is priced against this product. */
  price: number;
  /** Carried into the monthly-pay enquiry so it opens on this device. */
  slug: string;
  id?: string;
}

/**
 * Abans' own way to pay monthly — no bank card needed. The three partner
 * plans, then the budget field that turns a monthly figure into a term and
 * hands both to the application.
 */
export function AbansEasyPayments({
  price,
  slug,
  id,
}: AbansEasyPaymentsProps) {
  return (
    <Section
      id={id}
      aria-labelledby="abans-easy-title"
      size="compact"
      className="scroll-anchor pt-0"
    >
      <Container>
        <Reveal className="rounded-xl bg-surface p-6 sm:p-8 lg:p-10">
          <h2 id="abans-easy-title" className="text-h3 text-ink-1">
            Abans Easy Payments
          </h2>
          <p className="mt-3 text-body-sm text-ink-3">
            No card, no bank paperwork. Tell us what you can pay a month and we
            will quote the term that clears this device.
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {paymentPartners.map((partner) => (
              <li
                key={partner.id}
                className="flex items-center gap-4 rounded-lg border border-line bg-surface-alt p-4"
              >
                <span
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-surface",
                    !partner.bleed && "p-1.5",
                  )}
                >
                  <Image
                    src={partner.logo}
                    alt=""
                    sizes="48px"
                    placeholder="blur"
                    className={cn(
                      "h-full w-full",
                      partner.bleed ? "object-cover" : "object-contain",
                    )}
                  />
                </span>

                <span className="min-w-0">
                  <span className="block text-body text-ink-1">
                    {partner.name}
                  </span>
                  <span className="block text-body-sm text-ink-3">
                    {partner.tagline}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <BudgetEnquiry slug={slug} price={price} className="mt-4" />
        </Reveal>
      </Container>
    </Section>
  );
}
