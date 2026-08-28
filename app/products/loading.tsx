import { Container } from "@/components/layout/Container";

/** Mirrors the listing: a filter rail, a results bar, 3-up cards and the
    mobile filter dock. */
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading Products" className="pb-28 lg:pb-section">
      <Container className="pt-10 md:pt-14">
        <div className="shimmer h-4 w-40 rounded-sm bg-surface" />
        <div className="shimmer mt-6 h-12 w-64 rounded-md bg-surface" />
      </Container>

      <Container className="mt-12 lg:mt-16">
        <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:items-start lg:gap-12 xl:grid-cols-[18rem_1fr] xl:gap-16">
          <div className="hidden lg:block">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="border-b border-line py-6">
                <div className="shimmer h-6 w-32 rounded-sm bg-surface" />
                <div className="mt-5 flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((__, chip) => (
                    <div
                      key={chip}
                      className="shimmer h-10 w-24 rounded-pill bg-surface"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="min-w-0">
            <div className="shimmer h-[4.75rem] rounded-lg bg-surface" />

            <div className="mt-10 grid grid-cols-2 gap-x-grid-gap gap-y-10 md:grid-cols-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index}>
                  <div className="shimmer aspect-square rounded-none bg-surface" />
                  <div className="shimmer mt-4 h-5 w-4/5 rounded-sm bg-surface" />
                  <div className="shimmer mt-3 h-7 w-1/2 rounded-sm bg-surface" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <div className="fab-dock fixed inset-x-0 z-40 flex justify-center lg:hidden">
        <div className="shimmer h-14 w-36 rounded-pill bg-surface" />
      </div>
    </div>
  );
}
