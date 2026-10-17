import type { TokenGroup, TokenModule } from "@/lib/tokens/types"

/**
 * Tailwind v4 derives every spacing utility (p-4, gap-2, h-8…) from one
 * variable: `calc(var(--spacing) * n)`. So one base unit sets the density of
 * the whole UI, shadcn's control heights included.
 */

export const SPACING_PRESETS = [
  { value: 3.5, label: "Compact" },
  { value: 4, label: "Default" },
  { value: 4.5, label: "Comfortable" },
  { value: 5, label: "Spacious" },
] as const

/** Base unit in px. 4px is Tailwind's (0.25rem). */
export const SPACING_RANGE = { min: 3, max: 6, step: 0.25 } as const

/** Steps listed in JSON for design tools (utility multipliers). */
export const SPACING_STEPS = [0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24]

export interface SpacingSettings {
  /** Base unit in px; written as rem relative to 16px. */
  base: number
}

export const DEFAULT_SPACING_SETTINGS: SpacingSettings = { base: 4 }

export function clampSpacing(base: number) {
  if (!Number.isFinite(base)) return DEFAULT_SPACING_SETTINGS.base
  return Math.min(SPACING_RANGE.max, Math.max(SPACING_RANGE.min, base))
}

const rem = (px: number) => `${Number((px / 16).toFixed(5))}rem`

export function generateSpacing(settings: SpacingSettings): TokenGroup {
  const base = clampSpacing(settings.base)
  // Steps have no CSS name: in CSS they're Tailwind's calc() of --spacing.
  const steps: TokenGroup = Object.fromEntries(
    SPACING_STEPS.map((n) => [
      String(n),
      { $type: "dimension", $value: rem(base * n) },
    ])
  )
  return {
    base: {
      base: {
        $type: "dimension",
        $value: rem(base),
        $css: "spacing",
        $theme: ["spacing"],
      },
    },
    step: steps,
  }
}

export const spacingModule = {
  id: "spacing" as const,
  label: "Spacing",
  defaults: DEFAULT_SPACING_SETTINGS,
  generate: generateSpacing,
} satisfies TokenModule<SpacingSettings>
