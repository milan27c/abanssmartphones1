"use client";

import Image from "next/image";
import { useState } from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { PlayIcon } from "@/components/ui/Icons";
import { homeVideo } from "@/lib/data/video";

/**
 * A poster-first YouTube embed. The tile paints from our own thumbnail and
 * loads nothing from YouTube until the visitor presses play — so the section
 * costs one image on first paint instead of the player's whole bundle.
 */
export function VideoFeature() {
  const [playing, setPlaying] = useState(false);
  const { youtubeId, title, poster, posterAlt } = homeVideo;

  // No top padding: New Arrivals already closes on the half rhythm, and that
  // gap alone separates the two.
  return (
    <Section size="compact" aria-label={title} className="pt-0">
      <Container>
        <Reveal>
          <div className="relative aspect-video overflow-hidden rounded-xl bg-dark">
            {playing ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play Video: ${title}`}
                className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
              >
                <Image
                  src={poster}
                  alt={posterAlt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1280px) 1216px, 100vw"
                  className="object-cover transition-transform transition-base group-hover:scale-[1.02]"
                />

                {/* A soft floor under the control so it holds against a bright
                    frame; the poster stays legible through it. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-dark-alt/15 transition-[background-color] transition-base group-hover:bg-dark-alt/25"
                />

                <span
                  aria-hidden="true"
                  className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-pill bg-surface-alt shadow-md transition-transform transition-base group-hover:scale-105 sm:size-20"
                >
                  {/* Nudged right so the triangle looks centred in the disc. */}
                  <PlayIcon className="size-7 translate-x-px text-ink-1 sm:size-8" />
                </span>
              </button>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
