import { hexToOklch, oklchToHex } from "@/lib/modules/color/convert"

export const HARMONIES = {
  analogous: { label: "Analogous", offset: 30 },
  complementary: { label: "Complementary", offset: 180 },
  "split-complementary": { label: "Split complementary", offset: 150 },
  triadic: { label: "Triadic", offset: 120 },
  square: { label: "Square", offset: 90 },
} as const

export type Harmony = keyof typeof HARMONIES

/**
 * Suggests a color related to `base` by rotating its OKLCH hue. `direction`
 * lets different slots using the same harmony land on different hues
 * (e.g. secondary +30°, accent −30°).
 */
export function suggestColor(base: string, harmony: Harmony, direction = 1) {
  const c = hexToOklch(base)
  const h = (((c.h + HARMONIES[harmony].offset * direction) % 360) + 360) % 360
  return oklchToHex({ ...c, h })
}
