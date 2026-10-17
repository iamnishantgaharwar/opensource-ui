import { ArrowRight02Icon, GithubIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

import { LandingHeader } from "@/components/landing/landing-header"
import { Beam, FadeIn, FadeUp } from "@/components/landing/motion"
import { Button } from "@/components/ui/button"
import { GITHUB_URL } from "@/lib/site"

// Soft light stripes over the wash (dark-scoped, so foreground is near
// white): [left %, width %, opacity %].
const BEAMS = [
  [4, 7, 10],
  [13, 3, 16],
  [22, 9, 8],
  [33, 4, 14],
  [46, 8, 10],
  [58, 3, 16],
  [67, 9, 8],
  [79, 4, 14],
  [90, 6, 10],
] as const

// Every second stripe breathes slower, every third in between, so they
// drift out of step.
const beamSeconds = (n: number) => (n % 3 === 0 ? 7 : n % 2 === 0 ? 8 : 6)

// Dark neutral at the top fading to the page background, in both themes.
const WASH =
  "linear-gradient(180deg, var(--hero-tint) 0%, color-mix(in oklch, var(--hero-tint) 55%, var(--background)) 34%, color-mix(in oklch, var(--hero-tint) 18%, var(--background)) 58%, var(--background) 86%)"

/**
 * Header and hero on a neutral wash.
 */
export function Hero() {
  return (
    <div className="relative overflow-hidden" style={{ background: WASH }}>
      <div aria-hidden className="dark pointer-events-none absolute inset-0">
        {BEAMS.map(([left, width, opacity], i) => (
          <Beam
            key={left}
            left={left}
            width={width}
            opacity={opacity / 100}
            duration={beamSeconds(i + 1)}
          />
        ))}
      </div>

      <FadeIn className="relative">
        <LandingHeader />
      </FadeIn>

      <section
        aria-labelledby="hero-title"
        className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 pt-12 pb-44 text-center sm:px-8 sm:pb-52"
      >
        <FadeUp delay={0.08}>
          <h1
            id="hero-title"
            className="max-w-4xl font-display text-[2.5rem] leading-[3rem] font-bold tracking-normal sm:text-[4rem] sm:leading-[4.5rem]"
          >
            One brand color in.
            <br />A complete design system out.
          </h1>
        </FadeUp>
        <FadeUp delay={0.18}>
          <p className="max-w-xl text-lg text-foreground/75">
            Palettes, contrast checks in light and dark, a type scale, radius,
            shadows and spacing, exported as tokens for shadcn and Tailwind.
          </p>
        </FadeUp>
        <FadeUp delay={0.28}>
          <HeroActions />
        </FadeUp>
      </section>
    </div>
  )
}

/** Straight into the generator; GitHub for people who want the code. */
function HeroActions() {
  return (
    <div className="mt-2 flex flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          size="lg"
          nativeButton={false}
          render={<Link href="/design" />}
          className="h-11 px-5.5 shadow-md"
        >
          Start with your color
          <HugeiconsIcon icon={ArrowRight02Icon} data-icon="inline-end" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          render={<a href={GITHUB_URL} target="_blank" rel="noreferrer" />}
          className="h-11 bg-background/70 px-5"
        >
          <HugeiconsIcon icon={GithubIcon} data-icon="inline-start" />
          Star on GitHub
        </Button>
      </div>
      <p className="text-[13px] text-foreground/70">
        Free and open source. No sign-up, everything runs in your browser.
      </p>
    </div>
  )
}
