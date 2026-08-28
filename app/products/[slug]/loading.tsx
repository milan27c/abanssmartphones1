import { Container } from "@/components/layout/Container";

/** Mirrors the fold: a gallery tile with its rail, beside the buy block. */
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading Product">
      <Container className="pt-8 md:pt-12">
        <div className="shimmer h-4 w-72 max-w-full rounded-sm bg-surface" />
      </Container>

      <Container className="mt-8 lg:mt-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div className="mx-auto w-full max-w-lg lg:flex lg:max-w-none lg:flex-row-reverse lg:gap-4">
            <div className="shimmer aspect-square w-full rounded-none bg-surface lg:flex-1" />

            <div className="mt-4 flex gap-3 lg:mt-0 lg:w-20 lg:flex-col">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="shimmer aspect-square w-20 shrink-0 rounded-none bg-surface"
                />
              ))}
            </div>
          </div>

          <div>
            <div className="shimmer h-12 w-full rounded-md bg-surface" />
            <div className="shimmer mt-3 h-12 w-2/3 rounded-md bg-surface" />

            <div className="shimmer mt-8 h-9 w-56 rounded-md bg-surface" />
            <div className="shimmer mt-5 h-4 w-64 rounded-sm bg-surface" />

            <div className="mt-10 grid gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="shimmer h-4 w-80 max-w-full rounded-sm bg-surface"
                />
              ))}
            </div>

            <div className="shimmer mt-10 h-14 w-full rounded-pill bg-surface" />

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="shimmer h-14 rounded-pill bg-surface" />
              <div className="shimmer h-14 rounded-pill bg-surface" />
            </div>
          </div>
        </div>
      </Container>

      <Container className="mt-section-sm">
        <div className="shimmer h-64 rounded-xl bg-surface" />
      </Container>
    </div>
  );
}
