import Image from "next/image"

const ALT =
  "The csskit generator: brand color inputs, generated palettes and contrast checks"

/**
 * The generator on a tablet. Screenshots of the real app at its default
 * settings, one per app theme (public/landing, from .ds-sync/landing-shots.mjs);
 * the page's theme picks which one shows.
 */
export function DeviceMockups() {
  return (
    <section
      aria-label="csskit on a tablet"
      className="relative mx-auto -mt-36 flex max-w-7xl justify-center px-4 sm:px-8"
    >
      <div className="relative h-[clamp(240px,42vw,480px)] w-full max-w-280 overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[min(920px,100%)] -translate-x-1/2 rounded-[clamp(20px,3vw,36px)] bg-foreground p-[clamp(6px,1vw,12px)] shadow-lg dark:bg-muted dark:ring-1 dark:ring-border">
          <Image
            src="/landing/design-light.png"
            alt={ALT}
            width={1440}
            height={900}
            priority
            unoptimized
            className="block w-full rounded-[clamp(14px,2vw,24px)] dark:hidden"
          />
          <Image
            src="/landing/design-dark.png"
            alt={ALT}
            width={1440}
            height={900}
            unoptimized
            className="hidden w-full rounded-[clamp(14px,2vw,24px)] dark:block"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background"
        />
      </div>
    </section>
  )
}
