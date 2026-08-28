import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { PlusIcon } from "@/components/ui/Icons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Faq } from "@/lib/types";

export interface FaqAccordionProps {
  faqs: Faq[];
  id?: string;
}

/**
 * Native `<details>` — it already carries the open/close behaviour, the
 * keyboard handling and the screen-reader state, so only the chrome is ours.
 */
export function FaqAccordion({ faqs, id }: FaqAccordionProps) {
  return (
    <Section
      id={id}
      aria-labelledby="faq-title"
      size="compact"
      className="scroll-anchor"
    >
      <Container>
        <SectionHeader
          titleId="faq-title"
          title="Frequently Asked Questions"
          align="center"
          titleClassName="lg:max-w-none lg:whitespace-nowrap"
        />

        <Reveal className="mt-10 overflow-hidden rounded-lg border border-line bg-surface-alt">
          {faqs.map((faq, index) => (
            <details
              key={faq.id}
              className={index === 0 ? undefined : "border-t border-line"}
            >
              <summary className="faq-summary flex items-center justify-between gap-6 px-5 py-4 text-body text-ink-1 transition-colors transition-fast hover:bg-surface sm:px-6">
                {faq.question}
                <PlusIcon className="faq-mark size-5 shrink-0 text-ink-3" />
              </summary>

              <p className="px-5 pt-2 pb-6 text-body-sm text-ink-2 sm:px-6">
                {faq.answer}
              </p>
            </details>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
