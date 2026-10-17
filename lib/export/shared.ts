import { clampChroma, converter, formatHex, parse } from "culori"

import {
  flattenTokens,
  type Token,
  type TokenGroup,
  type TokenLeaf,
} from "@/lib/tokens/types"

export interface ExportFile {
  filename: string
  language: "css" | "js" | "json"
  code: string
}

/** Theme variables shadcn's own globals.css already maps in `@theme inline`. */
export const SHADCN_VARIABLES = new Set([
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
])

const GROUP_LABELS: Record<string, string> = {
  "color.role": "shadcn theme",
  "color.extra": "Extra roles",
  "color.palette": "Palettes",
  "typography.font": "Font families",
  "typography.size": "Font sizes",
  "typography.lineHeight": "Line heights",
  "typography.letterSpacing": "Letter spacing",
  "typography.weight": "Font weights",
  "radius.scale": "Radius",
}

export interface CssGroup {
  label: string
  leaves: TokenLeaf[]
}

/**
 * Tokens that have a CSS name, grouped by their first two path segments
 * (e.g. color.role) so exports get a comment header per group.
 */
export function cssGroups(tree: TokenGroup): CssGroup[] {
  const groups = new Map<string, CssGroup>()
  for (const leaf of flattenTokens(tree)) {
    if (!leaf.token.$css) continue
    const key = leaf.path.slice(0, 2).join(".")
    if (!groups.has(key)) {
      groups.set(key, { label: GROUP_LABELS[key] ?? key, leaves: [] })
    }
    groups.get(key)!.leaves.push(leaf)
  }
  return [...groups.values()]
}

/**
 * Tailwind v4 theme variables that point at a token: its `$theme` names, or
 * `color-<name>` for a color.
 */
export function themeNames(token: Token): string[] {
  if (token.$theme) return token.$theme
  return token.$type === "color" && token.$css ? [`color-${token.$css}`] : []
}

const toHsl = converter("hsl")
const round = (n: number, d = 1) => Math.round(n * 10 ** d) / 10 ** d

/** "H S% L%" channels (with "/ a" for alpha), the shadcn v3 variable format. */
export function hslChannels(cssColor: string): string {
  const color = parse(cssColor)!
  // Go through clamped sRGB hex so float noise can't produce 101% or a hue on gray.
  const c = toHsl(formatHex(clampChroma(color, "oklch")))!
  const gray = c.s < 0.001
  const channels = `${gray ? 0 : round(c.h ?? 0)} ${gray ? 0 : round(c.s * 100)}% ${round(c.l * 100)}%`
  return color.alpha !== undefined && color.alpha < 1
    ? `${channels} / ${round(color.alpha, 2)}`
    : channels
}
