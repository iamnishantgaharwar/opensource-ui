import { hexToOklch, oklchToHex } from "@/lib/modules/color/convert"

export const STEPS = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const
export type Step = (typeof STEPS)[number]

export type Shades = Record<Step, string>

export interface Palette {
  /** Hex value for each step. */
  shades: Shades
  /** The step that holds the exact input color. */
  anchor: Step
  input: string
}

export type AnchorMode = "500" | "auto"

// OKLCH lightness per step for brand palettes (close to Tailwind's averages).
const BRAND_LIGHTNESS = [
  0.971, 0.936, 0.885, 0.808, 0.71, 0.623, 0.546, 0.47, 0.4, 0.338, 0.268,
]

// shadcn/Tailwind neutral lightness, so the plain preset matches shadcn exactly.
const NEUTRAL_LIGHTNESS = [
  0.985, 0.97, 0.922, 0.87, 0.708, 0.556, 0.439, 0.371, 0.269, 0.205, 0.145,
]

// Share of the neutral's chroma at each step (modelled on Tailwind slate).
const NEUTRAL_CHROMA_PROFILE = [
  0.07, 0.15, 0.28, 0.48, 0.87, 1, 1, 0.95, 0.9, 0.9, 0.9,
]

const toShades = (hexes: string[]) =>
  Object.fromEntries(STEPS.map((s, i) => [s, hexes[i]])) as Shades

function nearestIndex(targets: number[], l: number) {
  let best = 0
  for (let i = 1; i < targets.length; i++) {
    if (Math.abs(targets[i] - l) < Math.abs(targets[best] - l)) best = i
  }
  return best
}

/**
 * Builds an 11-step scale around an input color. The input is kept exactly
 * at its anchor step; lighter and darker steps are spread between it and the
 * scale's ends in OKLCH, with chroma tapering toward the extremes.
 */
export function generateScale(hex: string, anchorMode: AnchorMode = "500") {
  const input = hexToOklch(hex)
  const a =
    anchorMode === "auto"
      ? nearestIndex(BRAND_LIGHTNESS, input.l)
      : STEPS.indexOf(500)
  const top = Math.max(BRAND_LIGHTNESS[0], (input.l + 1) / 2)
  const bottom = Math.min(BRAND_LIGHTNESS[10], input.l / 2)

  const hexes = BRAND_LIGHTNESS.map((target, i) => {
    if (i === a) return hex
    let l: number
    let chroma: number
    if (i < a) {
      const t =
        (target - BRAND_LIGHTNESS[a]) /
        (BRAND_LIGHTNESS[0] - BRAND_LIGHTNESS[a])
      l = input.l + t * (top - input.l)
      chroma = input.c * (1 - 0.93 * t)
    } else {
      const t =
        (BRAND_LIGHTNESS[a] - target) /
        (BRAND_LIGHTNESS[a] - BRAND_LIGHTNESS[10])
      l = input.l - t * (input.l - bottom)
      chroma = input.c * (1 + 0.6 * t - 1.15 * t * t)
    }
    return oklchToHex({ mode: "oklch", l, c: chroma, h: input.h })
  })

  return {
    shades: toShades(hexes),
    anchor: STEPS[a],
    input: hex,
  } satisfies Palette
}

/** A low-chroma gray scale with the given hue and peak chroma. */
export function generateNeutralScale(hue: number, chroma: number): Shades {
  return toShades(
    NEUTRAL_LIGHTNESS.map((l, i) =>
      oklchToHex({
        mode: "oklch",
        l,
        c: chroma * NEUTRAL_CHROMA_PROFILE[i],
        h: hue,
      })
    )
  )
}
