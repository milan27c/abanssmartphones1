import { Container } from "@/components/layout/Container";

/**
 * Skeleton that mirrors the real layout: a hero frame, a brand row and a
 * product rail. Surface blocks, square for product tiles, pill for buttons.
 */
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading">
      {/* Full-bleed hero with its control cluster parked bottom-right. */}
      <div className="hero-frame shimmer relative w-full bg-surface">
        <div className="absolute right-4 bottom-4 flex items-center gap-2 md:right-6 md:bottom-6">
          <span className="h-9 w-24 rounded-pill bg-line" />
          {Array.from({ length: 3 }).map((_, index) => (
            <span key={index} className="size-9 rounded-pill bg-line" />
          ))}
        </div>
      </div>

      <Container className="py-section-sm">
        <div className="shimmer h-10 w-64 rounded-md bg-surface" />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="shimmer aspect-[3/2] rounded-lg bg-surface"
            />
          ))}
        </div>
      </Container>

      <Container className="py-section">
        <div className="shimmer h-10 w-72 rounded-md bg-surface" />
        <div className="mt-12 grid grid-cols-2 gap-grid-gap lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <div className="shimmer aspect-square rounded-none bg-surface" />
              <div className="shimmer mt-4 h-5 w-4/5 rounded-sm bg-surface" />
              <div className="shimmer mt-3 h-7 w-1/2 rounded-sm bg-surface" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
