import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import type { FeatureStory } from "@/lib/types";

export interface FeatureStoriesProps {
  stories: FeatureStory[];
}

const STORY_SIZES = "(min-width: 1440px) 1280px, 92vw";

/**
 * The long read. One idea per panel: centred copy, then a wide image that
 * carries it, every panel framed to the same 16:9 box. Panels alternate plate
 * so the rhythm never flattens out, and a `dark` story breaks that rhythm
 * outright — deepest plate, white copy.
 */
export function FeatureStories({ stories }: FeatureStoriesProps) {
  return (
    <>
      {stories.map((story, index) => {
        const dark = story.tone === "dark";

        return (
          <Section
            key={story.id}
            tone={dark ? "dark-alt" : index % 2 === 0 ? "page" : "surface"}
            aria-labelledby={`story-${story.id}-title`}
          >
            <Container>
              {/* Each measure sits on the element it governs, so `ch` is counted
                  in that element's own size. Capping the wrapper instead counts
                  every child in the 16px body size, which quietly squeezed the
                  18px paragraph down to about 58 characters. */}
              <Reveal className="text-center">
                <p
                  className={cn(
                    "text-label uppercase",
                    dark ? "text-on-dark-3" : "text-ink-3",
                  )}
                >
                  {story.eyebrow}
                </p>

                <h2
                  id={`story-${story.id}-title`}
                  className={cn(
                    "mx-auto mt-4 max-w-[26ch] text-h2",
                    dark ? "text-white" : "text-ink-1",
                  )}
                >
                  {story.title}
                </h2>

                <p
                  className={cn(
                    "mx-auto mt-6 max-w-[65ch] text-body-lg",
                    dark ? "text-on-dark-2" : "text-ink-3",
                  )}
                >
                  {story.body}
                </p>
              </Reveal>

              <Reveal delay={0.08} as="figure" className="mt-12 lg:mt-16">
                <div
                  className={cn(
                    "relative aspect-[16/9] overflow-hidden rounded-xl",
                    // The plate a `contain` fit letterboxes against, so it has
                    // to be the section's own, not the light default.
                    dark ? "bg-dark-alt" : "bg-surface",
                  )}
                >
                  <Image
                    src={story.image}
                    alt={story.imageAlt}
                    fill
                    sizes={STORY_SIZES}
                    placeholder="blur"
                    className={
                      story.fit === "contain" ? "object-contain" : "object-cover"
                    }
                  />
                </div>
              </Reveal>
            </Container>
          </Section>
        );
      })}
    </>
  );
}
