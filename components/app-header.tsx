import Link from "next/link"

import { AppNav } from "@/components/app-nav"
import { LogoWordmark } from "@/components/logo-wordmark"
import { ResetButton } from "@/components/reset-button"
import { ShareButton } from "@/components/share-link"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

/** `contained` centers the bar on the generator page's 1440px column. */
export function AppHeader({ contained = false }: { contained?: boolean }) {
  return (
    // A fixed 3.5rem from md up: the preview sidebar and controls panel are
    // positioned below it.
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div
        className={cn(
          "flex flex-wrap items-center gap-x-8 gap-y-1 px-4 py-2 md:h-14 md:flex-nowrap md:py-0 lg:px-8",
          contained && "mx-auto max-w-360"
        )}
      >
        <Link
          href="/"
          className="flex items-center rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <LogoWordmark />
        </Link>
        <AppNav />
        <div className="ml-auto flex items-center gap-2">
          <ShareButton />
          <ResetButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
