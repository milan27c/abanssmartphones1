import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { KeyFeature } from "@/lib/types";

export interface KeyFeaturesProps {
  features: KeyFeature[];
  id?: string;
}

/** Five figures a shopper checks before reading anything else. */
export function KeyFeatures({ features, id }: KeyFeaturesProps) {
  return (
    <Section
      id={id}
      aria-labelledby="key-features-title"
      size="compact"
      className="scroll-anchor"
    >
      <Container>
        <SectionHeader
          titleId="key-features-title"
          title="Key Features"
          align="center"
        />

        <Stagger
          as="ul"
          className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5"
        >
          {features.map((feature) => (
            <StaggerItem
              as="li"
              key={feature.id}
              className="flex flex-col items-center rounded-lg border border-line bg-surface-alt px-4 py-6 text-center shadow-sm"
            >
              <p className="text-label uppercase text-ink-3">{feature.label}</p>
              <p className="mt-3 text-h4 text-ink-1">{feature.value}</p>
              <p className="mt-3 text-body-sm text-ink-3">{feature.note}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
