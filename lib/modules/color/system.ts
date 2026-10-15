import {
  contrast,
  hexToOklch,
  oklchToHex,
  parseColor,
} from "@/lib/modules/color/convert"
import { suggestColor } from "@/lib/modules/color/harmony"
import {
  generateNeutralScale,
  generateScale,
  STEPS,
  type Palette,
  type Shades,
  type Step,
} from "@/lib/modules/color/scale"
import {
  NEUTRAL_PRESETS,
  SEMANTIC_COLORS,
  type BrandSlot,
  type ColorSettings,
  type NeutralPreset,
  type SemanticColor,
} from "@/lib/modules/color/settings"

export const BRAND_PALETTES = [
  "primary",
  "secondary",
  "accent",
  "tertiary",
] as const
export type BrandPaletteName = (typeof BRAND_PALETTES)[number]
export type PaletteName = BrandPaletteName | "neutral" | SemanticColor

export interface RoleValue {
  hex: string
  alpha?: number
  /** Where the value comes from, e.g. "neutral.200"; absent for computed values. */
  ref?: string
}

export interface Role {
  light: RoleValue
  dark: RoleValue
}

export interface ColorSystem {
  /** Only palettes that have a color; empty optional slots are omitted. */
  palettes: Partial<Record<PaletteName, Palette>>
  /** shadcn/ui theme variables, in shadcn's order. */
  roles: Record<string, Role>
  /** Additional roles that shadcn doesn't define. */
  extraRoles: Record<string, Role>
}

const WHITE: RoleValue = { hex: "#ffffff", ref: "white" }

// Each slot rotates the hue a different way so equal harmonies don't collide.
const SLOT_DIRECTION = { secondary: 1, accent: -1, tertiary: 2 } as const

export function resolveSlot(
  slot: BrandSlot,
  primary: string,
  name: keyof typeof SLOT_DIRECTION
): string | null {
  if (slot.auto)
    return suggestColor(primary, slot.harmony, SLOT_DIRECTION[name])
  return slot.hex ? parseColor(slot.hex) : null
}

export function neutralShades(
  presetName: NeutralPreset,
  primary: string
): Shades {
  const preset = NEUTRAL_PRESETS[presetName]
  if ("hue" in preset) return generateNeutralScale(preset.hue, preset.chroma)
  const p = hexToOklch(primary)
  return generateNeutralScale(p.h, Math.min(0.02, p.c * 0.25))
}

export function generateColorSystem(settings: ColorSettings): ColorSystem {
  const primary = parseColor(settings.primary) ?? "#000000"
  const palettes: ColorSystem["palettes"] = {
    primary: generateScale(primary, settings.anchor),
  }
  for (const name of ["secondary", "accent", "tertiary"] as const) {
    const hex = resolveSlot(settings[name], primary, name)
    if (hex) palettes[name] = generateScale(hex, settings.anchor)
  }
  const neutral = neutralShades(settings.neutral, primary)
  palettes.neutral = { shades: neutral, anchor: 500, input: neutral[500] }
  for (const name of SEMANTIC_COLORS) {
    const hex = parseColor(settings.semantic[name]) ?? "#000000"
    palettes[name] = generateScale(hex, settings.anchor)
  }

  const ref = (name: PaletteName, step: Step): RoleValue => ({
    hex: palettes[name]!.shades[step],
    ref: `${name}.${step}`,
  })
  const n = (step: Step) => ref("neutral", step)
  const darkBg = neutral[950]

  /** First step from the anchor, moving toward `dir`, that reaches `min` contrast on `bg`. */
  const readable = (
    name: PaletteName,
    bg: string,
    min: number,
    dir: "darker" | "lighter"
  ): RoleValue => {
    const palette = palettes[name]!
    const steps = dir === "darker" ? STEPS : [...STEPS].reverse()
    const from = steps.indexOf(palette.anchor)
    for (const step of steps.slice(from)) {
      if (contrast(palette.shades[step], bg) >= min) return ref(name, step)
    }
    return ref(name, steps[steps.length - 1])
  }

  /** Light or dark text, whichever reads better on `bg`. */
  const on = (bg: RoleValue): RoleValue =>
    contrast(bg.hex, neutral[50]) >= contrast(bg.hex, neutral[950])
      ? n(50)
      : n(950)

  /** A brand color used as a solid fill: the input itself, lightened in dark mode if needed. */
  const solid = (name: PaletteName): Role => {
    const palette = palettes[name]!
    const light = ref(name, palette.anchor)
    const dark =
      contrast(palette.input, darkBg) >= 3
        ? light
        : readable(name, darkBg, 3, "lighter")
    return { light, dark }
  }

  const withFg = (fill: Role) => ({
    fill,
    fg: { light: on(fill.light), dark: on(fill.dark) },
  })

  /** shadcn's secondary/accent: a subtle fill, tinted by the brand palette when present. */
  const brandRole = (name: "secondary" | "accent") => {
    if (!palettes[name]) {
      return {
        fill: { light: n(100), dark: n(800) },
        fg: { light: n(900), dark: n(50) },
      }
    }
    if (settings.brandRoleStyle === "solid") return withFg(solid(name))
    return {
      fill: { light: ref(name, 100), dark: ref(name, 900) },
      fg: { light: ref(name, 900), dark: ref(name, 100) },
    }
  }

  const primaryRole = withFg(solid("primary"))
  const secondary = brandRole("secondary")
  const accent = brandRole("accent")
  const semantic = Object.fromEntries(
    SEMANTIC_COLORS.map((name) => [name, withFg(solid(name))])
  ) as Record<SemanticColor, ReturnType<typeof withFg>>
  const border: Role = { light: n(200), dark: { hex: "#ffffff", alpha: 0.1 } }
  const input: Role = { light: n(200), dark: { hex: "#ffffff", alpha: 0.15 } }
  const background: Role = { light: WHITE, dark: n(950) }
  const foreground: Role = { light: n(950), dark: n(50) }
  const card: Role = { light: WHITE, dark: n(900) }

  const roles: Record<string, Role> = {
    background,
    foreground,
    card,
    "card-foreground": foreground,
    popover: card,
    "popover-foreground": foreground,
    primary: primaryRole.fill,
    "primary-foreground": primaryRole.fg,
    secondary: secondary.fill,
    "secondary-foreground": secondary.fg,
    muted: { light: n(100), dark: n(800) },
    "muted-foreground": { light: n(500), dark: n(400) },
    accent: accent.fill,
    "accent-foreground": accent.fg,
    destructive: semantic.destructive.fill,
    border,
    input,
    ring: primaryRole.fill,
    ...chartRoles(palettes),
    sidebar: { light: n(50), dark: n(900) },
    "sidebar-foreground": foreground,
    "sidebar-primary": primaryRole.fill,
    "sidebar-primary-foreground": primaryRole.fg,
    "sidebar-accent": accent.fill,
    "sidebar-accent-foreground": accent.fg,
    "sidebar-border": border,
    "sidebar-ring": primaryRole.fill,
  }

  const tertiary = palettes.tertiary
    ? withFg(solid("tertiary"))
    : { fill: roles.muted, fg: { light: n(900), dark: n(50) } }
  const link: Role = {
    light: readable("primary", "#ffffff", 4.5, "darker"),
    dark: readable("primary", darkBg, 4.5, "lighter"),
  }
  const nextStep = (v: RoleValue, by: 1 | -1) => {
    const step = Number(v.ref!.split(".")[1]) as Step
    const i = Math.min(Math.max(STEPS.indexOf(step) + by, 0), STEPS.length - 1)
    return ref("primary", STEPS[i])
  }

  const extraRoles: Record<string, Role> = {
    tertiary: tertiary.fill,
    "tertiary-foreground": tertiary.fg,
    "destructive-foreground": semantic.destructive.fg,
    success: semantic.success.fill,
    "success-foreground": semantic.success.fg,
    warning: semantic.warning.fill,
    "warning-foreground": semantic.warning.fg,
    info: semantic.info.fill,
    "info-foreground": semantic.info.fg,
    "subtle-foreground": { light: n(400), dark: n(500) },
    "border-strong": { light: n(300), dark: n(700) },
    inverse: { light: n(900), dark: n(50) },
    "inverse-foreground": { light: n(50), dark: n(900) },
    overlay: {
      light: { ...n(950), alpha: 0.5 },
      dark: { ...n(950), alpha: 0.7 },
    },
    selection: { light: ref("primary", 200), dark: ref("primary", 800) },
    "selection-foreground": foreground,
    link,
    "link-visited": {
      light: nextStep(link.light, 1),
      dark: nextStep(link.dark, -1),
    },
    skeleton: { light: n(200), dark: n(800) },
  }

  return { palettes, roles, extraRoles }
}

/**
 * chart-1…chart-5: the brand palettes first, then hues spread from primary
 * by the golden angle so any number of series stay distinct. Lightness stays
 * in the band where categorical colors read well (≈0.48–0.67 on dark).
 */
function chartRoles(palettes: ColorSystem["palettes"]): Record<string, Role> {
  const series: Role[] = BRAND_PALETTES.filter((p) => palettes[p]).map((p) => ({
    light: { hex: palettes[p]!.shades[500], ref: `${p}.500` },
    dark: { hex: palettes[p]!.shades[500], ref: `${p}.500` },
  }))
  const base = hexToOklch(palettes.primary!.input)
  const c = Math.min(0.18, Math.max(0.12, base.c))
  for (let k = 1; series.length < 5; k++) {
    const h = (base.h + 137.5 * k) % 360
    series.push({
      light: { hex: oklchToHex({ mode: "oklch", l: 0.62, c, h }) },
      dark: { hex: oklchToHex({ mode: "oklch", l: 0.65, c, h }) },
    })
  }
  return Object.fromEntries(
    series.slice(0, 5).map((r, i) => [`chart-${i + 1}`, r])
  )
}
