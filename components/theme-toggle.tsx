"use client"

import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon-lg"
      aria-label="Toggle light and dark mode"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {/* Both icons render; CSS picks one, so there's no hydration mismatch. */}
      <HugeiconsIcon icon={Moon02Icon} className="dark:hidden" />
      <HugeiconsIcon icon={Sun03Icon} className="hidden dark:block" />
    </Button>
  )
}
