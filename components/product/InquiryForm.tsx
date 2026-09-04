"use client";

import { useId, useState } from "react";
import type { FormEvent } from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import {
  CheckIcon,
  ChevronDownIcon,
  MailIcon,
  PhoneIcon,
} from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { districts } from "@/lib/data/locations";
import { contactChannels } from "@/lib/data/nav";
import { productShortName } from "@/lib/format";

export interface InquiryFormProps {
  /** Named back to the visitor so they can see what the message is about. */
  productTitle: string;
  productCode: string;
  id?: string;
}

// Split so the district select can set its own text colour — an empty select
// greys out — without two colour utilities fighting over the same element.
const fieldBase =
  "h-12 w-full rounded-md border border-line-strong bg-surface-alt px-4 text-body " +
  "transition-colors transition-fast placeholder:text-ink-4 hover:border-ink-4 focus:border-ink-1 focus:outline-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400";

const field = `${fieldBase} text-ink-1`;

const label = "block text-body-sm text-ink-3";

/**
 * A call-back request for this specific product: the shopper leaves a number
 * and where they are, a specialist rings them. Every line of copy here promises
 * that call, because the fold's "Get A Call" button is what sends people down
 * to it. No backend in the prototype — the form validates, then acknowledges.
 */
export function InquiryForm({
  productTitle,
  productCode,
  id,
}: InquiryFormProps) {
  const [sent, setSent] = useState(false);
  // An unselected district has to look unselected, so the placeholder option
  // greys out the way a text placeholder does.
  const [district, setDistrict] = useState("");
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
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <h2
              id="inquiry-title"
              className="max-w-[20ch] text-balance text-h2 text-white"
            >
              Would You Like A Call About The {productShortName(productTitle)}?
            </h2>

            <p className="mt-5 max-w-[55ch] text-body-lg text-on-dark-2">
              Leave your number and a product specialist calls you back within
              one working day — stock at your nearest showroom, trade-in value,
              instalment tenors, or which variant suits you.
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
                A Call Back Regarding{" "}
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
                    Thank you — a product specialist will call you on the
                    number you left, within one working day. In a hurry? Ring
                    the hotline on {contactChannels.hotline.label}.
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
                      <label htmlFor={`${ids}-phone`} className={label}>
                        Phone Number
                      </label>
                      <input
                        id={`${ids}-phone`}
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder="07X XXX XXXX"
                        className={cn(field, "mt-2")}
                      />
                    </div>

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
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor={`${ids}-district`} className={label}>
                        District
                      </label>
                      <div className="relative mt-2">
                        <select
                          id={`${ids}-district`}
                          name="district"
                          required
                          value={district}
                          onChange={(event) => setDistrict(event.target.value)}
                          className={cn(
                            fieldBase,
                            "select-reset cursor-pointer pr-11",
                            district ? "text-ink-1" : "text-ink-4",
                          )}
                        >
                          <option value="" disabled>
                            Select A District
                          </option>
                          {districts.map((name) => (
                            <option key={name} value={name}>
                              {name}
                            </option>
                          ))}
                        </select>

                        <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-3" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor={`${ids}-city`} className={label}>
                        City
                      </label>
                      <input
                        id={`${ids}-city`}
                        name="city"
                        type="text"
                        required
                        autoComplete="address-level2"
                        placeholder="Nugegoda"
                        className={cn(field, "mt-2")}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                    <Button type="submit">
                      <PhoneIcon className="size-5" />
                      Request A Call
                    </Button>
                    <p className="text-body-sm text-ink-3">
                      We call within one working day.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
