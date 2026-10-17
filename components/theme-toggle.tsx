"use client"

import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

// The icon shows the current theme: a half-lit sun in light, a moon with
// sparkles in dark. Drawn for the design (Hugeicons has no equivalents).
const ICON = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const

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
      <svg {...ICON} className="size-5 [html.dark_&]:hidden">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 8a4 4 0 0 1 0 8z" fill="currentColor" />
        <path d="M12 2.75v1.5M12 19.75v1.5M2.75 12h1.5M19.75 12h1.5M5.46 5.46l1.06 1.06M17.48 17.48l1.06 1.06M5.46 18.54l1.06-1.06M17.48 6.52l1.06-1.06" />
      </svg>
      <svg {...ICON} className="hidden size-5 [html.dark_&]:block">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
        <path d="M16 3.5v3M14.5 5h3" />
        <path d="M20 8.5v2M19 9.5h2" />
      </svg>
    </Button>
  )
}
