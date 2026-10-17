import Link from "next/link"

import { AppNav } from "@/components/app-nav"
import { HistoryControls } from "@/components/history-controls"
import { LogoWordmark } from "@/components/logo-wordmark"
import { ResetButton } from "@/components/reset-button"
import { ShareButton } from "@/components/share-link"
import { ThemeToggle } from "@/components/theme-toggle"

/** Centered on the same 1440px column as every page, so it never moves. */
export function AppHeader() {
  return (
    // A fixed 3.5rem from md up: the preview sidebar and controls panel are
    // positioned below it.
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-360 flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2 md:h-14 md:flex-nowrap md:gap-x-8 md:py-0 lg:px-8">
        <Link
          href="/"
          className="flex items-center rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <LogoWordmark className="max-sm:h-4" />
        </Link>
        <AppNav />
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <div className="flex items-center gap-1">
            <HistoryControls />
            <ResetButton />
          </div>
          <ShareButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
