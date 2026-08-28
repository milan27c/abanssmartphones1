import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { Countdown } from "@/components/ui/Countdown";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { dealProducts, dealPromo } from "@/lib/data/deals";

const DEAL_SIZES =
  "(min-width: 1280px) 300px, (min-width: 1024px) 26vw, (min-width: 640px) 30vw, 62vw";

export function LimitedTimeDeals() {
  return (
    <Section
      tone="dark-alt"
      aria-labelledby="deals-title"
      className="relative overflow-hidden"
    >
      {/* Animated plate: two primary glows drifting behind the copy. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora-a absolute -top-1/3 -left-1/4 aspect-square w-3/4 rounded-pill glow-primary-deep opacity-40 will-change-transform" />
        <div className="aurora-b absolute -right-1/4 -bottom-1/2 aspect-square w-2/3 rounded-pill glow-primary-soft opacity-30 will-change-transform" />
      </div>

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          {/* Centred while the copy is the whole column width; left-aligned
              once it sits beside the tiles at lg. */}
          <div className="text-center lg:col-span-4 lg:text-left">
            <Reveal>
              <h2
                id="deals-title"
                className="mx-auto max-w-[12ch] text-h1 text-white lg:mx-0"
              >
                {dealPromo.title}
              </h2>
              <p className="mx-auto mt-6 max-w-[42ch] text-body-lg text-on-dark-2 lg:mx-0">
                {dealPromo.body}
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <Countdown
                endsAt={dealPromo.endsAt}
                className="mt-10 justify-center lg:justify-start"
              />
            </Reveal>

            <Reveal delay={0.12} className="mt-10 flex justify-center lg:block">
              <Button
                href={dealPromo.href}
                variant="on-dark-outline"
                className="group"
              >
                {dealPromo.ctaLabel}
                <ArrowRightIcon className="size-4 transition-transform transition-fast group-hover:translate-x-0.5" />
              </Button>
            </Reveal>
          </div>

          {/* A snapping rail with a card and a half in view on phones, bleeding
              to the screen edge so the peek invites the scroll. From lg the
              three deals settle into their own grid beside the copy. */}
          <Stagger
            as="ul"
            className={cn(
              "no-scrollbar rail-scroller -mx-5 flex snap-x snap-mandatory gap-grid-gap",
              "overflow-x-auto px-5 pb-2 md:-mx-8 md:px-8",
              "lg:col-span-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-x-visible lg:px-0 lg:pb-0",
            )}
          >
            {dealProducts.map((product) => (
              <StaggerItem
                as="li"
                key={product.slug}
                className="rail-item-peek snap-start"
              >
                <ProductCard
                  product={product}
                  tone="dark"
                  meta="inside"
                  sizes={DEAL_SIZES}
                  className="h-full"
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
