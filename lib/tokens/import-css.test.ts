import { describe, expect, it } from "vitest"

import { exportShadcn } from "@/lib/export/shadcn"
import { importThemeCss } from "@/lib/tokens/import-css"
import { PRESETS, presetSettings } from "@/lib/tokens/presets"
import { defaultSettings, generateTokens } from "@/lib/tokens/registry"

// shadcn's stock v4 globals.css (neutral), trimmed.
const SHADCN_V4 = `
@import "tailwindcss";
@theme inline { --font-sans: var(--font-geist-sans); }
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --primary: oklch(0.205 0 0);
  --secondary: oklch(0.97 0 0);
  --accent: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --destructive: oklch(0.577 0.245 27.325);
}
.dark { --primary: oklch(0.922 0 0); }
`

// shadcn v3 "blue" theme: bare HSL channels.
const SHADCN_V3_BLUE = `
@layer base {
  :root {
    --primary: 221.2 83.2% 53.3%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --radius: 0.5rem;
  }
}`

describe("importThemeCss", () => {
  it("reads shadcn's stock v4 theme", () => {
    const { settings, found } = importThemeCss(SHADCN_V4)
    expect(settings.color.primary).toBe("#171717")
    expect(settings.color.neutral).toBe("neutral")
    expect(settings.radius.base).toBe(0.625)
    // Gray secondary/accent are shadcn's defaults, not brand colors.
    expect(settings.color.secondary.hex).toBeNull()
    expect(found.map((f) => f.label)).toContain("Destructive")
  })

  it("reads v3 HSL channels and picks the closest neutral", () => {
    const { settings } = importThemeCss(SHADCN_V3_BLUE)
    expect(settings.color.primary).toBe("#2563eb")
    expect(settings.color.neutral).toBe("slate")
    expect(settings.radius.base).toBe(0.5)
  })

  it("takes brand-colored secondary/accent, px radius and catalog fonts", () => {
    const { settings, skipped } = importThemeCss(`:root {
      --primary: #7c3aed;
      --accent: #f97316;
      --radius: 12px;
      --spacing: 0.3rem;
      --font-sans: "Plus Jakarta Sans", sans-serif;
      --font-heading: "Unknown Display", serif;
    }`)
    expect(settings.color.accent).toEqual({
      auto: false,
      harmony: "analogous",
      hex: "#f97316",
    })
    expect(settings.radius.base).toBe(0.75)
    expect(settings.spacing.base).toBeCloseTo(4.8)
    expect(settings.typography.bodyFont).toBe("plus-jakarta-sans")
    expect(skipped).toEqual(["--font-heading"])
  })

  it("round-trips this app's own export", () => {
    const preset = presetSettings(PRESETS.find((p) => p.id === "editorial")!)
    const { settings } = importThemeCss(
      exportShadcn(generateTokens(preset)).code
    )
    expect(settings.color.primary).toBe(preset.color.primary)
    expect(settings.color.neutral).toBe(preset.color.neutral)
    expect(settings.radius.base).toBe(preset.radius.base)
    expect(settings.typography.bodyFont).toBe(preset.typography.bodyFont)
    expect(settings.typography.headingFont).toBe(preset.typography.headingFont)
  })

  it("finds nothing in unrelated text", () => {
    const { settings, found } = importThemeCss("body { color: red }")
    expect(found).toEqual([])
    expect(settings).toEqual(defaultSettings())
  })
})
