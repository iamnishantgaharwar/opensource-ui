/**
 * Font families the generator offers: system stacks plus a curated set of
 * Google Fonts. `weights` is what the Google Fonts css2 API accepts for the
 * family ("400..700" for variable fonts, a list for static ones); asking
 * for a weight a family lacks makes the whole request fail.
 */

export const FONT_CATEGORIES = ["sans", "serif", "mono"] as const
export type FontCategory = (typeof FONT_CATEGORIES)[number]

const FALLBACKS: Record<FontCategory, string> = {
  sans: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
}

interface FontDef {
  label: string
  category: FontCategory
  /** Google Fonts family name; absent for system stacks. */
  google?: string
  weights?: string
}

export const FONTS = {
  "system-sans": { label: "System sans", category: "sans" },
  "system-serif": { label: "System serif", category: "serif" },
  "system-mono": { label: "System mono", category: "mono" },

  inter: {
    label: "Inter",
    category: "sans",
    google: "Inter",
    weights: "400..700",
  },
  geist: {
    label: "Geist",
    category: "sans",
    google: "Geist",
    weights: "400..700",
  },
  roboto: {
    label: "Roboto",
    category: "sans",
    google: "Roboto",
    weights: "400..700",
  },
  "open-sans": {
    label: "Open Sans",
    category: "sans",
    google: "Open Sans",
    weights: "400..700",
  },
  lato: { label: "Lato", category: "sans", google: "Lato", weights: "400;700" },
  poppins: {
    label: "Poppins",
    category: "sans",
    google: "Poppins",
    weights: "400;500;600;700",
  },
  montserrat: {
    label: "Montserrat",
    category: "sans",
    google: "Montserrat",
    weights: "400..700",
  },
  "dm-sans": {
    label: "DM Sans",
    category: "sans",
    google: "DM Sans",
    weights: "400..700",
  },
  manrope: {
    label: "Manrope",
    category: "sans",
    google: "Manrope",
    weights: "400..700",
  },
  "plus-jakarta-sans": {
    label: "Plus Jakarta Sans",
    category: "sans",
    google: "Plus Jakarta Sans",
    weights: "400..700",
  },
  "ibm-plex-sans": {
    label: "IBM Plex Sans",
    category: "sans",
    google: "IBM Plex Sans",
    weights: "400;500;600;700",
  },
  "source-sans-3": {
    label: "Source Sans 3",
    category: "sans",
    google: "Source Sans 3",
    weights: "400..700",
  },
  "work-sans": {
    label: "Work Sans",
    category: "sans",
    google: "Work Sans",
    weights: "400..700",
  },
  nunito: {
    label: "Nunito",
    category: "sans",
    google: "Nunito",
    weights: "400..700",
  },
  "space-grotesk": {
    label: "Space Grotesk",
    category: "sans",
    google: "Space Grotesk",
    weights: "400..700",
  },

  "source-serif-4": {
    label: "Source Serif 4",
    category: "serif",
    google: "Source Serif 4",
    weights: "400..700",
  },
  merriweather: {
    label: "Merriweather",
    category: "serif",
    google: "Merriweather",
    weights: "400..700",
  },
  "playfair-display": {
    label: "Playfair Display",
    category: "serif",
    google: "Playfair Display",
    weights: "400..700",
  },
  lora: {
    label: "Lora",
    category: "serif",
    google: "Lora",
    weights: "400..700",
  },
  fraunces: {
    label: "Fraunces",
    category: "serif",
    google: "Fraunces",
    weights: "400..700",
  },
  "dm-serif-display": {
    label: "DM Serif Display",
    category: "serif",
    google: "DM Serif Display",
    weights: "400",
  },
  "instrument-serif": {
    label: "Instrument Serif",
    category: "serif",
    google: "Instrument Serif",
    weights: "400",
  },

  "jetbrains-mono": {
    label: "JetBrains Mono",
    category: "mono",
    google: "JetBrains Mono",
    weights: "400..700",
  },
  "geist-mono": {
    label: "Geist Mono",
    category: "mono",
    google: "Geist Mono",
    weights: "400..700",
  },
  "ibm-plex-mono": {
    label: "IBM Plex Mono",
    category: "mono",
    google: "IBM Plex Mono",
    weights: "400;500;600;700",
  },
} as const satisfies Record<string, FontDef>

export type FontId = keyof typeof FONTS

export const isFontId = (id: string): id is FontId => id in FONTS

/** CSS font-family value: the family first, then its category's fallbacks. */
export function fontStack(id: FontId): string {
  const font: FontDef = FONTS[id]
  return font.google
    ? `"${font.google}", ${FALLBACKS[font.category]}`
    : FALLBACKS[font.category]
}

/**
 * One Google Fonts css2 URL for every web font in `ids` (system stacks
 * need nothing), or null when there is nothing to load.
 */
export function googleFontsUrl(ids: FontId[]): string | null {
  const families = [...new Set(ids)]
    .map((id): FontDef => FONTS[id])
    .filter((f) => f.google)
    .map((f) => `family=${f.google!.replace(/ /g, "+")}:wght@${f.weights}`)
  if (!families.length) return null
  return `https://fonts.googleapis.com/css2?${families.join("&")}&display=swap`
}
