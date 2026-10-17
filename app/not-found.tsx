import { ArrowLeft02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { Metadata } from "next"
import Link from "next/link"

import { BritneyFont } from "@/components/britney-font"
import { FadeUp } from "@/components/landing/motion"
import { LogoWordmark } from "@/components/logo-wordmark"
import { NotFoundArt } from "@/components/not-found-art"
import { Button } from "@/components/ui/button"
import { GITHUB_URL, ISSUES_URL, LANDING_BRAND } from "@/lib/site"

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn't exist or has moved.",
  // Overrides the root's "index, follow" so the tags don't contradict.
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col">
      <BritneyFont />
      <header className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-8">
          <Link
            href="/"
            className="flex items-center rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <LogoWordmark />
          </Link>
          <Button nativeButton={false} render={<Link href="/design" />}>
            Open app
          </Button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-270 flex-1 flex-wrap items-center justify-center gap-x-16 gap-y-12 px-4 pt-16 pb-20 sm:px-8">
        <FadeUp delay={0.06} className="max-w-105 flex-[1_1_320px]">
          <NotFoundArt spot={LANDING_BRAND} />
        </FadeUp>

        <div className="flex max-w-120 flex-[1_1_360px] flex-col gap-5">
          <FadeUp delay={0.16} className="relative self-start">
            {/* The number with a brand-colored offset copy behind it, like
                the misregistered accents in the drawings. */}
            <span
              aria-hidden
              className="absolute top-1.5 left-1.5 font-display text-[6rem] leading-24 font-bold tracking-normal sm:text-[8.75rem] sm:leading-33"
              style={{ color: LANDING_BRAND }}
            >
              404
            </span>
            <span className="relative block font-display text-[6rem] leading-24 font-bold tracking-normal sm:text-[8.75rem] sm:leading-33">
              404
            </span>
          </FadeUp>
          <FadeUp delay={0.16} className="flex flex-col gap-2">
            <h1 className="font-display text-[2rem] leading-10 font-bold tracking-normal">
              This swatch is blank
            </h1>
            <p className="text-muted-foreground">
              The page you&apos;re looking for doesn&apos;t exist or has moved.
              Check the address, or head back and pick up where you left off.
            </p>
          </FadeUp>
          <FadeUp delay={0.26} className="flex flex-wrap gap-2 pt-1">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/" />}
              className="h-11 px-5"
            >
              <HugeiconsIcon icon={ArrowLeft02Icon} data-icon="inline-start" />
              Back to home
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/design" />}
              className="h-11 px-5"
            >
              Open the generator
            </Button>
          </FadeUp>
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-x-6 gap-y-2 px-4 py-5 text-[13px] text-muted-foreground sm:px-8">
          <span>© 2026 csskit</span>
          <span className="flex gap-5">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href={ISSUES_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              Report a broken link
            </a>
          </span>
        </div>
      </footer>
    </div>
  )
}
