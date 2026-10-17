import { ArrowRight02Icon, GithubIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

import { PlaneArt } from "@/components/landing/illustrations"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/landing/motion"
import { GITHUB_URL, LANDING_BRAND } from "@/lib/site"

/**
 * One clear next step and a way to follow the project. The band is dark in both themes, so it's rendered in the dark theme.
 */
export function ClosingCta() {
  return (
    <section
      aria-labelledby="cta-title"
      className="mx-auto max-w-7xl px-4 pb-20 sm:px-8"
    >
      <Reveal className="dark flex flex-wrap items-center justify-between gap-8 rounded-[14px] border bg-card px-5 py-7 text-card-foreground sm:p-12">
        <div className="flex flex-[1_1_300px] flex-col gap-3">
          <h2
            id="cta-title"
            className="font-display text-[2rem] leading-10 font-bold tracking-normal sm:text-[2.5rem] sm:leading-12"
          >
            Make the default theme yours
          </h2>
          <p className="text-muted-foreground">
            Start from your brand color and leave with a complete, accessible
            theme in a few minutes. Free, no sign-up.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/design" />}
              className="h-10 px-4"
            >
              Build your theme
              <HugeiconsIcon icon={ArrowRight02Icon} data-icon="inline-end" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<a href={GITHUB_URL} target="_blank" rel="noreferrer" />}
              className="h-10 bg-transparent px-4 dark:bg-transparent"
            >
              <HugeiconsIcon icon={GithubIcon} data-icon="inline-start" />
              Star on GitHub
            </Button>
          </div>
        </div>
        <div className="shrink-0 max-md:hidden">
          <PlaneArt spot={LANDING_BRAND} />
        </div>
      </Reveal>
    </section>
  )
}
