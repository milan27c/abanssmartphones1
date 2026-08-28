"use client";

import { useState, type FormEvent } from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { MailIcon } from "@/components/ui/Icons";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Prototype only — there is no backend behind this.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <Section size="compact" tone="tint" aria-labelledby="newsletter-title">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <MailIcon className="mx-auto size-7 text-primary-600" />

          <h2 id="newsletter-title" className="mt-5 text-h2">
            Get The Drop Before It Lands
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-body-lg text-ink-3">
            New arrivals, price drops and instalment offers — one email a week,
            never more.
          </p>

          {submitted ? (
            <p
              role="status"
              className="mt-8 text-body text-primary-700"
            >
              Thanks. Check your inbox to confirm your subscription.
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mx-auto mt-8 flex w-full max-w-lg flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email Address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="h-12 flex-1 rounded-pill border border-line-strong bg-surface-alt px-6 text-body text-ink-1 placeholder:text-ink-4 transition-[border-color] transition-fast hover:border-ink-4 focus:border-primary-400 focus:outline-none"
              />
              <Button type="submit" size="md">
                Subscribe
              </Button>
            </form>
          )}

          <p className="mt-4 text-body-sm text-ink-4">
            Unsubscribe any time. We never share your address.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
