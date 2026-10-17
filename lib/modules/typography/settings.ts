import type { FontId } from "@/lib/modules/typography/fonts"

/** Musical-interval ratios (PRD T-2). */
export const RATIO_PRESETS = [
  { value: 1.067, label: "Minor Second" },
  { value: 1.125, label: "Major Second" },
  { value: 1.2, label: "Minor Third" },
  { value: 1.25, label: "Major Third" },
  { value: 1.333, label: "Perfect Fourth" },
  { value: 1.414, label: "Augmented Fourth" },
  { value: 1.5, label: "Perfect Fifth" },
  { value: 1.618, label: "Golden Ratio" },
] as const

export const BASE_SIZE = { min: 10, max: 24 } as const
export const RATIO = { min: 1.01, max: 2 } as const
export const ROOT_SIZE = { min: 8, max: 32 } as const

/** Below this a role is hard to read; the app warns (PRD, scale mapping). */
export const MIN_READABLE_PX = 12

export type TypeUnit = "px" | "rem"

/** none: two decimals; half: nearest 0.5px; whole: nearest px. */
export type Rounding = "none" | "half" | "whole"

export interface TypographySettings {
  /** Body size in px. */
  baseSize: number
  ratio: number
  unit: TypeUnit
  /** Root font size in px that rem values are relative to. */
  rootSize: number
  rounding: Rounding
  bodyFont: FontId
  /** "same" uses the body font for headings too. */
  headingFont: FontId | "same"
}

export const DEFAULT_TYPOGRAPHY_SETTINGS: TypographySettings = {
  baseSize: 16,
  ratio: 1.25,
  unit: "rem",
  rootSize: 16,
  rounding: "whole",
  bodyFont: "inter",
  headingFont: "same",
}
