import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/layout/Section";
import { brands } from "@/lib/data/brands";

export function BrandMarquee() {
  return (
    // The marquee closes straight into Best Sellers, whose own top rhythm
    // carries most of that seam — so the band's bottom sits a step tighter
    // on mobile.
    <Section
      size="compact"
      aria-label="Brands We Carry"
      className="max-md:pb-10"
    >
      {/* The visual track is decorative and duplicated, so it stays out of the
          accessibility tree — the real list of brands follows below it. */}
      <div className="marquee-fade group relative overflow-hidden" aria-hidden="true">
        <div className="marquee-track flex w-max group-hover:[animation-play-state:paused]">
          {[0, 1].map((pass) => (
            <div key={pass} className="flex shrink-0">
              {brands.map((brand) => (
                <div
                  key={brand.slug}
                  className="group/tile mr-3 flex aspect-[3/2] w-36 shrink-0 items-center justify-center rounded-lg bg-surface p-5 sm:w-44"
                >
                  <Image
                    src={brand.logo}
                    alt=""
                    placeholder="blur"
                    sizes="176px"
                    className="h-full w-full object-contain transition-[filter,opacity] transition-base lg:opacity-60 lg:grayscale lg:group-hover/tile:opacity-100 lg:group-hover/tile:grayscale-0"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <ul className="sr-only">
        {brands.map((brand) => (
          <li key={brand.slug}>
            <Link href={`/products?brand=${brand.slug}`}>{brand.name}</Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
