"use client";

import { useId, useState } from "react";
import type { FormEvent } from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CheckIcon, MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { contactChannels } from "@/lib/data/nav";

export interface InquiryFormProps {
  /** Named back to the visitor so they can see what the message is about. */
  productTitle: string;
  productCode: string;
  id?: string;
}

const field =
  "h-12 w-full rounded-md border border-line-strong bg-surface-alt px-4 text-body text-ink-1 " +
  "transition-colors transition-fast placeholder:text-ink-4 hover:border-ink-4 focus:border-ink-1 focus:outline-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400";

const label = "block text-body-sm text-ink-3";

/**
 * A question about this specific product. No backend in the prototype — the
 * form validates, then acknowledges.
 */
export function InquiryForm({
  productTitle,
  productCode,
  id,
}: InquiryFormProps) {
  const [sent, setSent] = useState(false);
  const ids = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <Section
      id={id}
      tone="dark"
      aria-labelledby="inquiry-title"
      className="scroll-anchor relative overflow-hidden bg-linear-to-b from-dark to-dark-alt"
    >
      {/* Soft blurred wash of dark primary shades behind the section. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-32 size-[28rem] rounded-pill bg-primary-800 opacity-40 blur-3xl" />
        <div className="absolute -bottom-40 -right-16 size-[32rem] rounded-pill bg-primary-950 opacity-60 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 size-[22rem] -translate-x-1/2 rounded-pill bg-primary-900 opacity-40 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <Reveal>
            <h2 id="inquiry-title" className="text-h2 text-white">
              Have An Inquiry Regarding This Product?
            </h2>

            <p className="mt-5 max-w-[55ch] text-body-lg text-on-dark-2">
              Stock at a particular showroom, trade-in value, instalment tenors,
              or which variant suits you — send it across and a product
              specialist replies within one working day.
            </p>

            <dl className="mt-10 grid gap-4 text-body-sm">
              <div className="flex items-center gap-3">
                <PhoneIcon className="size-5 shrink-0 text-on-dark-3" />
                <dt className="sr-only">Hotline</dt>
                <dd>
                  <a
                    href={contactChannels.hotline.href}
                    className="link-underline text-white"
                  >
                    {contactChannels.hotline.label}
                  </a>
                </dd>
              </div>

              <div className="flex items-center gap-3">
                <MailIcon className="size-5 shrink-0 text-on-dark-3" />
                <dt className="sr-only">Email</dt>
                <dd>
                  <a
                    href="mailto:abansmobilemarketing@abansgroup.com"
                    className="link-underline break-all text-white"
                  >
                    abansmobilemarketing@abansgroup.com
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="rounded-xl bg-surface-alt p-6 shadow-sm sm:p-8">
              <p className="text-body-sm text-ink-3">
                Regarding{" "}
                <span className="text-ink-1">{productTitle}</span>{" "}
                <span className="text-ink-4">({productCode})</span>
              </p>

              {sent ? (
                <div
                  role="status"
                  className="mt-6 flex items-start gap-3 rounded-lg bg-primary-50 p-5"
                >
                  <CheckIcon className="mt-0.5 size-5 shrink-0 text-primary-600" />
                  <p className="text-body-sm text-ink-2">
                    Thank you — your inquiry is with the team. Expect a reply
                    within one working day, or call the hotline if it is
                    urgent.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
                  <div>
                    <label htmlFor={`${ids}-name`} className={label}>
                      Full Name
                    </label>
                    <input
                      id={`${ids}-name`}
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Nimal Perera"
                      className={cn(field, "mt-2")}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor={`${ids}-email`} className={label}>
                        Email
                      </label>
                      <input
                        id={`${ids}-email`}
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={cn(field, "mt-2")}
                      />
                    </div>

                    <div>
                      <label htmlFor={`${ids}-phone`} className={label}>
                        Phone
                      </label>
                      <input
                        id={`${ids}-phone`}
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="07X XXX XXXX"
                        className={cn(field, "mt-2")}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${ids}-message`} className={label}>
                      Your Question
                    </label>
                    <textarea
                      id={`${ids}-message`}
                      name="message"
                      required
                      rows={4}
                      placeholder="Is this in stock at the Kandy showroom?"
                      className={cn(
                        field,
                        "mt-2 h-auto resize-y py-3 leading-relaxed",
                      )}
                    />
                  </div>

                  <Button type="submit" className="justify-self-start">
                    Send Inquiry
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
