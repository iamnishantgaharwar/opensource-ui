import {
  hexToOklch,
  NEUTRAL_PRESETS,
  parseColor,
  SEMANTIC_COLORS,
  type ColorSettings,
  type NeutralPreset,
} from "@/lib/modules/color"
import { FONTS, type FontId } from "@/lib/modules/typography"
import { restoreSettings } from "@/lib/tokens/persist"
import type { DesignSettings } from "@/lib/tokens/registry"

/**
 * Reads an existing shadcn theme (a pasted globals.css, or just its :root
 * block) into settings: colors, neutral, radius, spacing and fonts. Handles
 * Tailwind v4 (oklch, hex…) and v3 (bare HSL channels) values. Pure.
 */

export interface ImportedItem {
  label: string
  value: string
  /** A color to show next to the value. */
  swatch?: string
}

export interface ImportResult {
  /** Defaults plus everything recognized, validated. */
  settings: DesignSettings
  found: ImportedItem[]
  /** Variables that look meaningful but couldn't be used. */
  skipped: string[]
}

/** `--name: value` pairs from the first `:root { … }` block, else anywhere. */
function rootVariables(css: string): Map<string, string> {
  const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, "")
  const root =
    /:root\s*\{([^}]*)\}/.exec(withoutComments)?.[1] ?? withoutComments
  const vars = new Map<string, string>()
  for (const m of root.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) {
    if (!vars.has(m[1])) vars.set(m[1], m[2].trim())
  }
  return vars
}

/** shadcn v3 writes colors as bare channels: "222.2 47.4% 11.2%". */
function toColor(value: string): string | null {
  const channels =
    /^(-?[\d.]+)\s+([\d.]+)%\s+([\d.]+)%(?:\s*\/\s*([\d.]+%?))?$/.exec(value)
  if (channels) {
    const [, h, s, l, a] = channels
    return parseColor(`hsl(${h} ${s}% ${l}%${a ? ` / ${a}` : ""})`)
  }
  if (value.startsWith("var(")) return null
  return parseColor(value)
}

/** Stock shadcn secondary/accent are grays; only a real hue counts as brand. */
const isBrandColor = (hex: string) => hexToOklch(hex).c > 0.03

const NAMED_NEUTRALS = (Object.keys(NEUTRAL_PRESETS) as NeutralPreset[]).filter(
  (p) => p !== "tinted"
)

/** The neutral preset whose hue and chroma are closest to a gray. */
function closestNeutral(hex: string): NeutralPreset {
  const { h, c } = hexToOklch(hex)
  if (c < 0.006) return "neutral"
  let best: NeutralPreset = "neutral"
  let bestScore = Infinity
  for (const name of NAMED_NEUTRALS) {
    const preset = NEUTRAL_PRESETS[name] as { hue: number; chroma: number }
    const dh = Math.abs(((h - preset.hue + 540) % 360) - 180) / 180
    const score = dh * 2 + Math.abs(c - preset.chroma) * 20
    if (score < bestScore) {
      best = name
      bestScore = score
    }
  }
  return best
}

/** "0.5rem" / "8px" → rem, or null. */
function toRem(value: string): number | null {
  const m = /^([\d.]+)(rem|px)$/.exec(value)
  if (!m) return null
  return m[2] === "px" ? Number(m[1]) / 16 : Number(m[1])
}

/** First family in a stack that's in the catalog. */
function catalogFont(stack: string): FontId | null {
  for (const family of stack.split(",")) {
    const name = family
      .trim()
      .replace(/^["']|["']$/g, "")
      .toLowerCase()
    const hit = (Object.keys(FONTS) as FontId[]).find(
      (id) => FONTS[id].label.toLowerCase() === name
    )
    if (hit) return hit
  }
  return null
}

export function importThemeCss(css: string): ImportResult {
  const vars = rootVariables(css)
  const found: ImportedItem[] = []
  const skipped: string[] = []
  const color: Partial<ColorSettings> = {}
  const patch: Record<string, unknown> = { color }

  const primary = vars.has("primary") ? toColor(vars.get("primary")!) : null
  if (primary) {
    color.primary = primary
    found.push({
      label: "Primary",
      value: primary.toUpperCase(),
      swatch: primary,
    })
  } else if (vars.has("primary")) {
    skipped.push("--primary")
  }

  for (const slot of ["secondary", "accent"] as const) {
    const hex = vars.has(slot) ? toColor(vars.get(slot)!) : null
    if (hex && isBrandColor(hex)) {
      color[slot] = { auto: false, harmony: "analogous", hex }
      found.push({
        label: slot === "secondary" ? "Secondary" : "Accent",
        value: hex.toUpperCase(),
        swatch: hex,
      })
    }
  }

  const semantic: Partial<ColorSettings["semantic"]> = {}
  for (const name of SEMANTIC_COLORS) {
    const hex = vars.has(name) ? toColor(vars.get(name)!) : null
    if (hex) {
      semantic[name] = hex
      found.push({
        label: name[0].toUpperCase() + name.slice(1),
        value: hex.toUpperCase(),
        swatch: hex,
      })
    }
  }
  if (Object.keys(semantic).length)
    color.semantic = semantic as ColorSettings["semantic"]

  const gray = toColor(vars.get("muted-foreground") ?? vars.get("muted") ?? "")
  if (gray) {
    color.neutral = closestNeutral(gray)
    found.push({
      label: "Neutral",
      value: `${NEUTRAL_PRESETS[color.neutral].label} (closest)`,
      swatch: gray,
    })
  }

  if (vars.has("radius")) {
    const rem = toRem(vars.get("radius")!)
    if (rem !== null) {
      patch.radius = { base: rem }
      found.push({ label: "Radius", value: `${rem}rem` })
    } else skipped.push("--radius")
  }

  if (vars.has("spacing")) {
    const rem = toRem(vars.get("spacing")!)
    if (rem !== null) {
      patch.spacing = { base: rem * 16 }
      found.push({ label: "Spacing", value: `${rem * 16}px base` })
    } else skipped.push("--spacing")
  }

  const typography: Record<string, string> = {}
  for (const [name, key] of [
    ["font-sans", "bodyFont"],
    ["font-heading", "headingFont"],
  ] as const) {
    if (!vars.has(name)) continue
    const font = catalogFont(vars.get(name)!)
    if (font) {
      typography[key] = font
      found.push({
        label: key === "bodyFont" ? "Body font" : "Heading font",
        value: FONTS[font].label,
      })
    } else skipped.push(`--${name}`)
  }
  if (Object.keys(typography).length) patch.typography = typography

  return {
    settings: restoreSettings(JSON.stringify(patch)),
    found,
    skipped,
  }
}
