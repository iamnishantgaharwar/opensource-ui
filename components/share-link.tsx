"use client"

import { Link01Icon, Tick02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import { useCopy } from "@/hooks/use-copy"
import { settingsStore, useSettings } from "@/hooks/use-settings"
import { shareHref } from "@/lib/tokens/share"

const SYNC_DELAY_MS = 300

/**
 * Keeps `?s=` in the address bar in step with the settings, so the URL is
 * always a link to what's on screen. Debounced so dragging a color picker
 * doesn't rewrite history every frame.
 */
export function ShareUrlSync() {
  const settings = useSettings()
  const pathname = usePathname()

  useEffect(() => {
    const timer = setTimeout(() => {
      const href = shareHref(settings, pathname, window.location.hash)
      const current =
        window.location.pathname + window.location.search + window.location.hash
      if (href !== current)
        window.history.replaceState(window.history.state, "", href)
    }, SYNC_DELAY_MS)
    return () => clearTimeout(timer)
  }, [settings, pathname])

  return null
}

/** Copies a link to the current system (PRD L-5). */
export function ShareButton() {
  const { copied, copy } = useCopy()

  return (
    <Button
      variant="outline"
      size="lg"
      aria-label="Copy a link to this design system"
      onClick={() => {
        // Built fresh, so it's right even before the address bar catches up.
        const href = shareHref(settingsStore.get(), window.location.pathname)
        copy(window.location.origin + href, "link", "Share link")
      }}
    >
      <HugeiconsIcon
        icon={copied ? Tick02Icon : Link01Icon}
        data-icon="inline-start"
        className="text-muted-foreground"
      />
      <span className="max-sm:sr-only">Share</span>
    </Button>
  )
}
