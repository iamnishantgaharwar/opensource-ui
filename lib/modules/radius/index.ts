import type { TokenGroup, TokenModule } from "@/lib/tokens/types"

/** shadcn's own radius choices, in rem; 0.625 is its default. */
export const RADIUS_PRESETS = [0, 0.3, 0.5, 0.625, 0.75, 1] as const

export const RADIUS_RANGE = { min: 0, max: 1.5, step: 0.025 } as const

/**
 * Each Tailwind radius as a multiple of the base, matching shadcn's
 * `@theme inline` (`--radius-sm: calc(var(--radius) * 0.6)` …), so the
 * generated values line up with what shadcn users already have.
 */
export const RADIUS_STEPS = {
  sm: 0.6,
  md: 0.8,
  lg: 1,
  xl: 1.4,
  "2xl": 1.8,
  "3xl": 2.2,
  "4xl": 2.6,
} as const

export interface RadiusSettings {
  /** Base radius in rem (Tailwind's rounded-lg). */
  base: number
}

export const DEFAULT_RADIUS_SETTINGS: RadiusSettings = { base: 0.625 }

const rem = (n: number) => (n === 0 ? "0" : `${Number(n.toFixed(4))}rem`)

/** Base radius clamped to the allowed range (bad input never breaks output). */
export function clampRadius(base: number) {
  if (!Number.isFinite(base)) return DEFAULT_RADIUS_SETTINGS.base
  return Math.min(RADIUS_RANGE.max, Math.max(RADIUS_RANGE.min, base))
}

/**
 * `--radius` plus every step as its own token, so each export can list real
 * values (JSON, Tailwind v3) rather than calc() expressions.
 */
export function generateRadius(settings: RadiusSettings): TokenGroup {
  const base = clampRadius(settings.base)
  const scale: TokenGroup = {
    base: { $type: "dimension", $value: rem(base), $css: "radius" },
  }
  for (const [step, factor] of Object.entries(RADIUS_STEPS)) {
    scale[step] = {
      $type: "dimension",
      $value: rem(base * factor),
      $css: `radius-${step}`,
      $theme: [`radius-${step}`],
    }
  }
  return { scale }
}

export const radiusModule = {
  id: "radius" as const,
  label: "Radius",
  defaults: DEFAULT_RADIUS_SETTINGS,
  generate: generateRadius,
} satisfies TokenModule<RadiusSettings>
