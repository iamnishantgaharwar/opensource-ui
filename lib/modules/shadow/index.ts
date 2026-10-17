import type { TokenGroup, TokenModule } from "@/lib/tokens/types"

/** [x, y, blur, spread, alpha] per layer, in px. */
type Layer = readonly [number, number, number, number, number]

/**
 * Tailwind v4's shadow geometry and opacities, so strength 1 untinted is
 * exactly Tailwind's (and shadcn's) default look.
 */
export const SHADOW_LEVELS = {
  "2xs": [[0, 1, 0, 0, 0.05]],
  xs: [[0, 1, 2, 0, 0.05]],
  sm: [
    [0, 1, 3, 0, 0.1],
    [0, 1, 2, -1, 0.1],
  ],
  md: [
    [0, 4, 6, -1, 0.1],
    [0, 2, 4, -2, 0.1],
  ],
  lg: [
    [0, 10, 15, -3, 0.1],
    [0, 4, 6, -4, 0.1],
  ],
  xl: [
    [0, 20, 25, -5, 0.1],
    [0, 8, 10, -6, 0.1],
  ],
  "2xl": [[0, 25, 50, -12, 0.25]],
} as const satisfies Record<string, readonly Layer[]>

export type ShadowLevel = keyof typeof SHADOW_LEVELS

export const SHADOW_PRESETS = [
  { value: 0, label: "None" },
  { value: 0.5, label: "Subtle" },
  { value: 1, label: "Default" },
  { value: 1.75, label: "Strong" },
] as const

export const STRENGTH_RANGE = { min: 0, max: 2.5, step: 0.05 } as const

/** Shadows read best on dark surfaces at about twice the opacity. */
const DARK_BOOST = 2

export interface ShadowSettings {
  /** Opacity multiplier; 1 is Tailwind's default, 0 turns shadows off. */
  strength: number
  /** Tint with the neutral palette's darkest step instead of pure black. */
  tinted: boolean
}

export const DEFAULT_SHADOW_SETTINGS: ShadowSettings = {
  strength: 1,
  tinted: true,
}

export function clampStrength(strength: number) {
  if (!Number.isFinite(strength)) return DEFAULT_SHADOW_SETTINGS.strength
  return Math.min(STRENGTH_RANGE.max, Math.max(STRENGTH_RANGE.min, strength))
}

const num = (n: number) => String(Number(n.toFixed(3)))
const px = (n: number) => (n === 0 ? "0" : `${n}px`)

/**
 * The shadow color at some opacity. Tinted shadows reference the color
 * module's `--neutral-950` at runtime (color-mix), so they follow the
 * neutral without this module depending on the color settings.
 */
function color(alpha: number, tinted: boolean) {
  const a = Math.min(1, alpha)
  return tinted
    ? `color-mix(in oklab, var(--neutral-950) ${num(a * 100)}%, transparent)`
    : `rgb(0 0 0 / ${num(a)})`
}

/**
 * One box-shadow value for a level; "0 0 #0000" when switched off. `boost`
 * multiplies opacity after the strength is clamped (dark mode), and opacity
 * caps at fully opaque. Lengths follow Tailwind's writing: blur and spread
 * only when there's a blur.
 */
export function shadowValue(
  level: ShadowLevel,
  strength: number,
  tinted: boolean,
  boost = 1
): string {
  const s = clampStrength(strength) * boost
  if (s === 0) return "0 0 #0000"
  return SHADOW_LEVELS[level]
    .map(([x, y, blur, spread, alpha]) =>
      [
        px(x),
        px(y),
        ...(blur || spread ? [px(blur), px(spread)] : []),
        color(alpha * s, tinted),
      ].join(" ")
    )
    .join(", ")
}

export function generateShadows(settings: ShadowSettings): TokenGroup {
  const scale: TokenGroup = {}
  for (const level of Object.keys(SHADOW_LEVELS) as ShadowLevel[]) {
    scale[level] = {
      $type: "shadow",
      $value: shadowValue(level, settings.strength, settings.tinted),
      $dark: shadowValue(level, settings.strength, settings.tinted, DARK_BOOST),
      $css: `shadow-${level}`,
      $theme: [`shadow-${level}`],
    }
  }
  return { scale }
}

export const shadowModule = {
  id: "shadow" as const,
  label: "Shadows",
  defaults: DEFAULT_SHADOW_SETTINGS,
  generate: generateShadows,
} satisfies TokenModule<ShadowSettings>
