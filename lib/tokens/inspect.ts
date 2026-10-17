import { flattenTokens, type Token, type TokenGroup } from "@/lib/tokens/types"

/**
 * Which tokens a set of Tailwind classes uses (PRD P-6). The index is built
 * from the token tree itself, so new modules show up without changes: color
 * tokens map from color utilities, other tokens from their `$theme` names,
 * and spacing utilities map to `--spacing × n`. Pure.
 */

export interface TokenUse {
  /** CSS variable without `--`, e.g. "primary". */
  css: string
  type: Token["$type"]
  /** For spacing: the multiplier (p-4 → 4). */
  times?: number
}

export type TokenIndex = Map<string, TokenUse>

const COLOR_UTILITIES = [
  "bg",
  "text",
  "border",
  "border-t",
  "border-b",
  "border-l",
  "border-r",
  "ring",
  "ring-offset",
  "outline",
  "fill",
  "stroke",
  "divide",
  "from",
  "via",
  "to",
  "accent",
  "caret",
  "decoration",
]

// Utilities whose numbers are steps of --spacing.
const SPACING_RX =
  /^-?(p|px|py|pt|pb|pl|pr|ps|pe|m|mx|my|mt|mb|ml|mr|ms|me|gap|gap-x|gap-y|space-x|space-y|h|w|size|min-h|min-w|max-h|max-w|top|right|bottom|left|inset|inset-x|inset-y|translate-x|translate-y|scroll-m|scroll-p)-(\d+(?:\.\d+)?)$/

const ROUNDED_RX = /^rounded(?:-(?:t|r|b|l|s|e|tl|tr|bl|br|ss|se|es|ee))?-(.+)$/

export function buildTokenIndex(tree: TokenGroup): TokenIndex {
  const index: TokenIndex = new Map()
  for (const { token } of flattenTokens(tree)) {
    if (!token.$css) continue
    const use: TokenUse = { css: token.$css, type: token.$type }
    if (token.$type === "color") {
      for (const u of COLOR_UTILITIES) {
        index.set(`${u}-${token.$css}`, use)
        index.set(`${u}-(--${token.$css})`, use)
      }
      continue
    }
    for (const name of token.$theme ?? []) {
      if (name.includes("--")) continue // modifiers ride along with the base
      if (name.startsWith("radius-")) index.set(`rounded-${name.slice(7)}`, use)
      else if (name === "spacing") index.set("spacing", use)
      else index.set(name, use) // text-sm, shadow-md, font-heading…
    }
  }
  return index
}

/**
 * Variants that apply in normal use: interaction, dark mode, breakpoints.
 * Anything else (aria-invalid:, data-[…]:, group-…:, disabled:) depends on a
 * state the component may not be in, so its tokens would mislead.
 */
const EVERYDAY_VARIANT =
  /^(hover|focus|focus-visible|focus-within|active|dark|sm|md|lg|xl|2xl|max-(sm|md|lg|xl|2xl)|@[\w-]+|motion-(safe|reduce)|placeholder|selection)$/

/** The variants before the utility: `hover:dark:bg-x` → ["hover", "dark"]. */
export function variantsOf(cls: string): string[] {
  const parts: string[] = []
  let depth = 0
  let start = 0
  for (let i = 0; i < cls.length; i++) {
    const c = cls[i]
    if (c === "[" || c === "(") depth++
    else if (c === "]" || c === ")") depth--
    else if (c === ":" && depth === 0) {
      parts.push(cls.slice(start, i))
      start = i + 1
    }
  }
  return parts
}

/** `hover:dark:bg-primary/80` → `bg-primary`. */
export function baseClass(cls: string): string {
  let depth = 0
  let start = 0
  for (let i = 0; i < cls.length; i++) {
    const c = cls[i]
    if (c === "[" || c === "(") depth++
    else if (c === "]" || c === ")") depth--
    else if (c === ":" && depth === 0) start = i + 1
  }
  return cls
    .slice(start)
    .replace(/^!|!$/g, "")
    .replace(/\/[\w.[\]()-]+$/, "")
}

/**
 * Tokens used by these classes, in first-seen order, without duplicates.
 * Classes behind state-dependent variants are skipped (see EVERYDAY_VARIANT).
 */
export function tokensForClasses(
  classes: Iterable<string>,
  index: TokenIndex
): TokenUse[] {
  const seen = new Map<string, TokenUse>()
  const spacing = index.get("spacing")
  for (const raw of classes) {
    if (!variantsOf(raw).every((v) => EVERYDAY_VARIANT.test(v))) continue
    const cls = baseClass(raw)
    let use = index.get(cls)
    const rounded = ROUNDED_RX.exec(cls)
    if (!use && rounded) use = index.get(`rounded-${rounded[1]}`)
    const step = SPACING_RX.exec(cls)
    if (!use && step && spacing) {
      const key = `spacing×${step[2]}`
      if (!seen.has(key)) seen.set(key, { ...spacing, times: Number(step[2]) })
      continue
    }
    if (use && !seen.has(use.css)) seen.set(use.css, use)
  }
  return [...seen.values()]
}
