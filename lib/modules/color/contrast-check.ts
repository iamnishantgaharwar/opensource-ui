import { parse, formatHex, type Rgb } from "culori"

import {
  contrast,
  contrastLevel,
  type ContrastLevel,
} from "@/lib/modules/color/convert"
import type { ColorSystem, Role, RoleValue } from "@/lib/modules/color/system"

/**
 * Foreground/background pairs that shadcn components actually draw. Text
 * needs 4.5:1 (WCAG AA, 1.4.3); the focus ring is a non-text indicator and
 * needs 3:1 (1.4.11). Borders and hint text are left out on purpose: shadcn's
 * own defaults sit below those thresholds by design, so flagging them would
 * mark every theme as failing.
 */
export const CONTRAST_PAIRS = [
  {
    id: "body",
    label: "Body text",
    fg: "foreground",
    bg: "background",
    min: 4.5,
  },
  {
    id: "card",
    label: "Text on cards",
    fg: "card-foreground",
    bg: "card",
    min: 4.5,
  },
  {
    id: "popover",
    label: "Text in popovers",
    fg: "popover-foreground",
    bg: "popover",
    min: 4.5,
  },
  {
    id: "muted",
    label: "Muted text",
    fg: "muted-foreground",
    bg: "background",
    min: 4.5,
  },
  {
    id: "muted-fill",
    label: "Muted text on muted fill",
    fg: "muted-foreground",
    bg: "muted",
    min: 4.5,
  },
  {
    id: "primary",
    label: "Primary button",
    fg: "primary-foreground",
    bg: "primary",
    min: 4.5,
  },
  {
    id: "secondary",
    label: "Secondary button",
    fg: "secondary-foreground",
    bg: "secondary",
    min: 4.5,
  },
  {
    id: "accent",
    label: "Accent and hover",
    fg: "accent-foreground",
    bg: "accent",
    min: 4.5,
  },
  {
    id: "tertiary",
    label: "Tertiary fill",
    fg: "tertiary-foreground",
    bg: "tertiary",
    min: 4.5,
  },
  {
    id: "destructive",
    label: "Destructive fill",
    fg: "destructive-foreground",
    bg: "destructive",
    min: 4.5,
  },
  {
    id: "error-text",
    label: "Error text",
    fg: "destructive",
    bg: "background",
    min: 4.5,
  },
  {
    id: "success",
    label: "Success fill",
    fg: "success-foreground",
    bg: "success",
    min: 4.5,
  },
  {
    id: "warning",
    label: "Warning fill",
    fg: "warning-foreground",
    bg: "warning",
    min: 4.5,
  },
  {
    id: "info",
    label: "Info fill",
    fg: "info-foreground",
    bg: "info",
    min: 4.5,
  },
  { id: "link", label: "Links", fg: "link", bg: "background", min: 4.5 },
  {
    id: "link-visited",
    label: "Visited links",
    fg: "link-visited",
    bg: "background",
    min: 4.5,
  },
  {
    id: "inverse",
    label: "Toasts and tooltips",
    fg: "inverse-foreground",
    bg: "inverse",
    min: 4.5,
  },
  {
    id: "selection",
    label: "Selected text",
    fg: "selection-foreground",
    bg: "selection",
    min: 4.5,
  },
  {
    id: "sidebar",
    label: "Sidebar text",
    fg: "sidebar-foreground",
    bg: "sidebar",
    min: 4.5,
  },
  {
    id: "sidebar-primary",
    label: "Sidebar active item",
    fg: "sidebar-primary-foreground",
    bg: "sidebar-primary",
    min: 4.5,
  },
  {
    id: "sidebar-accent",
    label: "Sidebar hover",
    fg: "sidebar-accent-foreground",
    bg: "sidebar-accent",
    min: 4.5,
  },
  { id: "ring", label: "Focus ring", fg: "ring", bg: "background", min: 3 },
] as const

export type ContrastPairId = (typeof CONTRAST_PAIRS)[number]["id"]

export interface ContrastResult {
  ratio: number
  level: ContrastLevel
  pass: boolean
  fg: string
  bg: string
}

export interface ContrastCheck {
  id: ContrastPairId
  label: string
  fg: string
  bg: string
  min: number
  light: ContrastResult
  dark: ContrastResult
}

/** A color with alpha, composited over the opaque color behind it. */
function flatten(v: RoleValue, behind: string): string {
  if (v.alpha === undefined || v.alpha >= 1) return v.hex
  const a = parse(v.hex) as Rgb
  const b = parse(behind) as Rgb
  const mix = (x: number, y: number) => x * v.alpha! + y * (1 - v.alpha!)
  return formatHex({
    mode: "rgb",
    r: mix(a.r, b.r),
    g: mix(a.g, b.g),
    b: mix(a.b, b.b),
  })
}

function result(fg: RoleValue, bg: RoleValue, min: number): ContrastResult {
  // Backgrounds here are opaque; flatten anyway so a translucent one never
  // reports a ratio against the wrong color.
  const bgHex = flatten(bg, "#ffffff")
  const fgHex = flatten(fg, bgHex)
  const ratio = contrast(fgHex, bgHex)
  return {
    ratio,
    level: contrastLevel(ratio),
    pass: ratio >= min,
    fg: fgHex,
    bg: bgHex,
  }
}

/** Every pair checked in light and dark mode. Pure and deterministic. */
export function checkContrast(system: ColorSystem): ContrastCheck[] {
  const roles: Record<string, Role> = { ...system.roles, ...system.extraRoles }
  return CONTRAST_PAIRS.map((p) => ({
    id: p.id,
    label: p.label,
    fg: p.fg,
    bg: p.bg,
    min: p.min,
    light: result(roles[p.fg].light, roles[p.bg].light, p.min),
    dark: result(roles[p.fg].dark, roles[p.bg].dark, p.min),
  }))
}
