import type { Harmony } from "@/lib/modules/color/harmony"
import type { AnchorMode } from "@/lib/modules/color/scale"

/**
 * An optional brand color. With `auto` on, the color is suggested from
 * primary by `harmony`; otherwise `hex` is used, and null means the slot is
 * empty (its roles fall back to neutral, like shadcn's defaults).
 */
export interface BrandSlot {
  auto: boolean
  harmony: Harmony
  hex: string | null
}

export const NEUTRAL_PRESETS = {
  tinted: { label: "Tinted from primary" },
  neutral: { label: "Neutral", hue: 0, chroma: 0 },
  zinc: { label: "Zinc", hue: 285.9, chroma: 0.016 },
  slate: { label: "Slate", hue: 257.4, chroma: 0.046 },
  gray: { label: "Gray", hue: 264.4, chroma: 0.03 },
  stone: { label: "Stone", hue: 58.1, chroma: 0.011 },
} as const

export type NeutralPreset = keyof typeof NEUTRAL_PRESETS

/** How shadcn's `secondary` / `accent` roles use the brand palettes. */
export type BrandRoleStyle = "subtle" | "solid"

export const SEMANTIC_COLORS = [
  "success",
  "warning",
  "info",
  "destructive",
] as const
export type SemanticColor = (typeof SEMANTIC_COLORS)[number]

export interface ColorSettings {
  primary: string
  secondary: BrandSlot
  accent: BrandSlot
  tertiary: BrandSlot
  neutral: NeutralPreset
  semantic: Record<SemanticColor, string>
  anchor: AnchorMode
  brandRoleStyle: BrandRoleStyle
}

export const DEFAULT_COLOR_SETTINGS: ColorSettings = {
  primary: "#77d3ec",
  secondary: { auto: false, harmony: "analogous", hex: null },
  accent: { auto: false, harmony: "complementary", hex: null },
  tertiary: { auto: false, harmony: "triadic", hex: null },
  neutral: "tinted",
  // Tailwind green-600, amber-500, blue-600 and red-600 (shadcn's destructive).
  semantic: {
    success: "#00a63e",
    warning: "#fe9a00",
    info: "#155dfc",
    destructive: "#e7000b",
  },
  anchor: "auto",
  brandRoleStyle: "subtle",
}
