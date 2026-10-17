import { restoreSettings } from "@/lib/tokens/persist"
import type { DesignSettings } from "@/lib/tokens/registry"

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

export interface Preset {
  id: string
  name: string
  description: string
  /** Only what differs from the defaults; everything else stays default. */
  settings: DeepPartial<DesignSettings>
}

/**
 * Curated starting points across the modules. Each is a complete look, not a
 * color swap: type, radius, shadows and density are chosen to match.
 */
export const PRESETS: Preset[] = [
  {
    id: "neutral",
    name: "Neutral",
    description: "Close to shadcn's stock look: near-black, gray, Inter",
    settings: {
      color: { primary: "#171717", neutral: "neutral" },
      radius: { base: 0.625 },
    },
  },
  {
    id: "saas",
    name: "Calm SaaS",
    description: "Trustworthy blue on slate, crisp and quiet",
    settings: {
      color: {
        primary: "#2563eb",
        neutral: "slate",
        accent: { auto: true, harmony: "analogous", hex: null },
      },
      typography: { bodyFont: "inter", ratio: 1.2 },
      radius: { base: 0.5 },
      shadow: { strength: 0.5 },
    },
  },
  {
    id: "editorial",
    name: "Editorial",
    description: "Serif headlines, warm stone and rust, generous spacing",
    settings: {
      color: { primary: "#9a3412", neutral: "stone" },
      typography: {
        bodyFont: "source-serif-4",
        headingFont: "playfair-display",
        ratio: 1.333,
        baseSize: 17,
      },
      radius: { base: 0.3 },
      shadow: { strength: 0.5 },
      spacing: { base: 4.5 },
    },
  },
  {
    id: "playful",
    name: "Playful",
    description: "Violet with a pop of contrast, round and bouncy",
    settings: {
      color: {
        primary: "#7c3aed",
        neutral: "tinted",
        secondary: { auto: true, harmony: "complementary", hex: null },
        accent: { auto: true, harmony: "triadic", hex: null },
        brandRoleStyle: "solid",
      },
      typography: { bodyFont: "nunito", ratio: 1.25 },
      radius: { base: 1 },
      shadow: { strength: 1.75 },
      spacing: { base: 4.5 },
    },
  },
  {
    id: "fintech",
    name: "Fintech",
    description: "Emerald on gray, plex type, compact and flat",
    settings: {
      color: { primary: "#059669", neutral: "gray" },
      typography: { bodyFont: "ibm-plex-sans", ratio: 1.2, baseSize: 15 },
      radius: { base: 0.3 },
      shadow: { strength: 0.5, tinted: false },
      spacing: { base: 3.5 },
    },
  },
  {
    id: "developer",
    name: "Developer",
    description: "Orange on zinc with Geist and a mono touch",
    settings: {
      color: { primary: "#ea580c", neutral: "zinc" },
      typography: { bodyFont: "geist", headingFont: "geist", ratio: 1.25 },
      radius: { base: 0.5 },
    },
  },
]

/** A preset as full, validated settings. */
export function presetSettings(preset: Preset): DesignSettings {
  return restoreSettings(JSON.stringify(preset.settings))
}
