import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import {
  BadgeCheckIcon,
  ShieldIcon,
  SignalIcon,
  TruckIcon,
} from "@/components/ui/Icons";
import { trustItems } from "@/lib/data/trust";
import type { TrustItem } from "@/lib/types";

const icons: Record<TrustItem["icon"], typeof ShieldIcon> = {
  dealer: BadgeCheckIcon,
  warranty: ShieldIcon,
  approved: SignalIcon,
  delivery: TruckIcon,
};

export function TrustBar() {
  return (
    <Section size="strip" tone="surface" aria-label="Why Buy From Abans">
      <Container>
        <Stagger
          as="ul"
          className="grid grid-cols-1 gap-x-6 gap-y-8 sm:gap-x-8 lg:grid-cols-4"
        >
          {trustItems.map((item) => {
            const Icon = icons[item.icon];
            return (
              <StaggerItem
                as="li"
                key={item.id}
                className="flex flex-col items-center gap-2 text-center lg:flex-row lg:justify-center lg:gap-3 lg:text-left"
              >
                <Icon className="size-7 shrink-0 text-ink-1 lg:size-5" />
                <h3 className="text-body font-semibold text-ink-1 lg:text-body-sm lg:font-medium">
                  {item.title}
                </h3>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
