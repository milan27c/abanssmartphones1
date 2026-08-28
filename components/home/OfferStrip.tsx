import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { offers } from "@/lib/data/banners";
import type { Offer } from "@/lib/types";

export function OfferStrip() {
  return (
    <Section size="compact" aria-label="Current Offers">
      <Container>
        <Stagger as="ul" className="grid gap-grid-gap lg:grid-cols-3">
          {offers.map((offer) => (
            <StaggerItem as="li" key={offer.id}>
              <OfferCard offer={offer} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <Link
      href={offer.href}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-lg p-7"
    >
      <Image
        src={offer.image}
        alt={offer.imageAlt}
        fill
        placeholder="blur"
        sizes="(min-width: 1024px) 400px, 100vw"
        className="object-cover transition-transform transition-base group-hover:scale-[1.03]"
      />

      {/* Legibility wash — keeps the top of the frame clean, darkens under the copy. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-dark-alt/80 via-dark-alt/25 to-transparent"
      />

      <div className="relative">
        <h3 className="text-pretty text-[1.25rem] leading-[1.25] font-semibold tracking-[-0.01em] text-white">
          {offer.title}
        </h3>
        <span className="mt-5 inline-flex rounded-pill bg-white px-5 py-2.5 text-body-sm font-medium text-ink-1 transition-colors transition-fast group-hover:bg-surface">
          {offer.ctaLabel}
        </span>
      </div>
    </Link>
  );
}
