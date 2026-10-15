import {
  clampChroma,
  converter,
  formatHex,
  formatRgb,
  parse,
  wcagContrast,
  type Oklch,
} from "culori"

const toOklch = converter("oklch")
const toRgb = converter("rgb")
const toHsl = converter("hsl")

const HEX_RE = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i

/** Normalizes "#abc", "abc", "#aabbcc" or "aabbcc" to "#aabbcc"; null if invalid. */
export function normalizeHex(input: string): string | null {
  const match = HEX_RE.exec(input.trim())
  if (!match) return null
  let hex = match[1].toLowerCase()
  if (hex.length === 3) hex = [...hex].map((c) => c + c).join("")
  return `#${hex}`
}

/** Parses any CSS color string (hex, rgb(), hsl(), oklch()) to a hex value. */
export function parseColor(input: string): string | null {
  const hex = normalizeHex(input)
  if (hex) return hex
  const color = parse(input.trim())
  return color ? formatHex(clampChroma(color, "oklch")) : null
}

export function hexToOklch(hex: string): Oklch & { h: number } {
  const c = toOklch(hex)!
  // Achromatic colors have no hue; pin it so math stays deterministic.
  return { ...c, h: c.h ?? 0 }
}

/** Fits an OKLCH color into sRGB by reducing chroma, then returns its hex. */
export function oklchToHex(color: Oklch): string {
  return formatHex(clampChroma(color, "oklch"))
}

const round = (n: number, digits: number) => {
  const f = 10 ** digits
  return Math.round(n * f) / f
}

/** CSS `oklch()` string in the same precision shadcn uses. */
export function formatOklch(hex: string, alpha?: number): string {
  const { l, c, h } = hexToOklch(hex)
  const chroma = round(c, 3)
  const parts = [round(l, 3), chroma, chroma === 0 ? 0 : round(h, 3)]
  const a = alpha === undefined ? "" : ` / ${Math.round(alpha * 100)}%`
  return `oklch(${parts.join(" ")}${a})`
}

export function formatRgbString(hex: string): string {
  return formatRgb(toRgb(hex)!)
}

export function formatHslString(hex: string): string {
  const { h = 0, s, l } = toHsl(hex)!
  return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
}

export function contrast(a: string, b: string): number {
  return wcagContrast(a, b)
}

export type ContrastLevel = "AAA" | "AA" | "AA Large" | "Fail"

export function contrastLevel(ratio: number): ContrastLevel {
  if (ratio >= 7) return "AAA"
  if (ratio >= 4.5) return "AA"
  if (ratio >= 3) return "AA Large"
  return "Fail"
}
