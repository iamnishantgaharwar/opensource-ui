"use client"

import {
  Cancel01Icon,
  GithubIcon,
  Menu01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import { LogoWordmark } from "@/components/logo-wordmark"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { GITHUB_URL } from "@/lib/site"

const MENU_ITEM =
  "flex min-h-11 items-center rounded-lg px-3 outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"

/**
 * The bar sits on the dark top of the hero wash in either theme, so it's
 * rendered in the dark theme. On phones, GitHub and Open app fold into a
 * menu; its panel is outside that scope and follows the page's theme.
 */
export function LandingHeader() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLElement>(null)

  // Escape or a tap outside the header closes the menu.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onDown)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onDown)
    }
  }, [open])

  return (
    <header ref={ref} className="relative">
      <div className="dark border-b border-foreground/20 text-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-8">
          <Link
            href="/"
            className="flex items-center rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <LogoWordmark />
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-lg"
              aria-label="csskit on GitHub"
              nativeButton={false}
              render={<a href={GITHUB_URL} target="_blank" rel="noreferrer" />}
              className="max-md:hidden"
            >
              <HugeiconsIcon icon={GithubIcon} />
            </Button>
            <ThemeToggle variant="ghost" />
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/design" />}
              className="max-md:hidden"
            >
              Open app
            </Button>
            <Button
              variant="outline"
              size="icon-lg"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="landing-menu"
              onClick={() => setOpen(!open)}
              className="size-11 bg-transparent md:hidden dark:bg-transparent"
            >
              <HugeiconsIcon icon={open ? Cancel01Icon : Menu01Icon} />
            </Button>
          </div>
        </div>
      </div>
      {open && (
        <nav
          id="landing-menu"
          aria-label="Menu"
          className="absolute inset-x-4 top-full z-50 mt-2 flex flex-col rounded-[14px] border bg-popover p-2 text-popover-foreground shadow-md md:hidden"
        >
          <Link href="/design" className={`${MENU_ITEM} bg-muted font-medium`}>
            Open app
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className={MENU_ITEM}
          >
            GitHub
          </a>
        </nav>
      )}
    </header>
  )
}
