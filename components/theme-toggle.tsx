"use client"

import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle({
  variant = "outline",
}: {
  variant?: "outline" | "ghost"
}) {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Button
      variant={variant}
      size="icon-lg"
      aria-label="Toggle light and dark mode"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {/* Both icons render; CSS picks one, so there's no hydration mismatch.
          Keyed to <html>, not `dark:`, so a dark-scoped header still shows
          the page's real theme. */}
      <HugeiconsIcon icon={Moon02Icon} className="[html.dark_&]:hidden" />
      <HugeiconsIcon icon={Sun03Icon} className="hidden [html.dark_&]:block" />
    </Button>
  )
}
