import { fontStack, type FontId } from "@/lib/modules/typography/fonts"
import {
  BASE_SIZE,
  MIN_READABLE_PX,
  RATIO,
  ROOT_SIZE,
  type Rounding,
  type TypographySettings,
} from "@/lib/modules/typography/settings"

/**
 * The 11 roles (PRD T-4). `step` is the power of the ratio; line height,
 * letter spacing and weight are per-role defaults (T-9): headings run
 * tighter and heavier, body text gets room to breathe. `tailwind` is the
 * Tailwind size this role stands in for, so text-sm, text-xl… follow the
 * scale too.
 */
export const TYPE_ROLES = [
  {
    id: "display",
    label: "Display",
    step: 7,
    lineHeight: 1.1,
    tracking: -0.025,
    weight: 700,
    heading: true,
    tailwind: "7xl",
  },
  {
    id: "h1",
    label: "H1",
    step: 6,
    lineHeight: 1.1,
    tracking: -0.025,
    weight: 700,
    heading: true,
    tailwind: "6xl",
  },
  {
    id: "h2",
    label: "H2",
    step: 5,
    lineHeight: 1.15,
    tracking: -0.02,
    weight: 700,
    heading: true,
    tailwind: "5xl",
  },
  {
    id: "h3",
    label: "H3",
    step: 4,
    lineHeight: 1.2,
    tracking: -0.02,
    weight: 600,
    heading: true,
    tailwind: "4xl",
  },
  {
    id: "h4",
    label: "H4",
    step: 3,
    lineHeight: 1.25,
    tracking: -0.015,
    weight: 600,
    heading: true,
    tailwind: "3xl",
  },
  {
    id: "h5",
    label: "H5",
    step: 2,
    lineHeight: 1.3,
    tracking: -0.01,
    weight: 600,
    heading: true,
    tailwind: "2xl",
  },
  {
    id: "h6",
    label: "H6",
    step: 1,
    lineHeight: 1.4,
    tracking: -0.005,
    weight: 600,
    heading: true,
    tailwind: "xl",
  },
  {
    id: "body-lg",
    label: "Body Large",
    step: 0.5,
    lineHeight: 1.6,
    tracking: 0,
    weight: 400,
    heading: false,
    tailwind: "lg",
  },
  {
    id: "body",
    label: "Body",
    step: 0,
    lineHeight: 1.5,
    tracking: 0,
    weight: 400,
    heading: false,
    tailwind: "base",
  },
  {
    id: "body-sm",
    label: "Body Small",
    step: -1,
    lineHeight: 1.5,
    tracking: 0,
    weight: 400,
    heading: false,
    tailwind: "sm",
  },
  {
    id: "caption",
    label: "Caption",
    step: -2,
    lineHeight: 1.4,
    tracking: 0.01,
    weight: 400,
    heading: false,
    tailwind: "xs",
  },
] as const

export type TypeRoleId = (typeof TYPE_ROLES)[number]["id"]

export interface TypeRole {
  id: TypeRoleId
  label: string
  step: number
  /** Rounded size in px. */
  px: number
  /** The size in the chosen unit, e.g. "1.25rem" or "20px". */
  size: string
  lineHeight: number
  /** In em, e.g. "-0.025em" ("0" when none). */
  letterSpacing: string
  weight: number
  heading: boolean
  tailwind: string
  /** Under MIN_READABLE_PX: the app warns about it. */
  tooSmall: boolean
}

export interface TypeScale {
  roles: TypeRole[]
  fonts: { body: FontId; heading: FontId }
  stacks: { body: string; heading: string }
}

const clamp = (n: number, { min, max }: { min: number; max: number }) =>
  Math.min(max, Math.max(min, Number.isFinite(n) ? n : min))

/** Strips float noise and trailing zeros: 3.8125000001 → "3.8125". */
const num = (n: number, decimals: number) => String(Number(n.toFixed(decimals)))

function roundPx(px: number, rounding: Rounding) {
  if (rounding === "whole") return Math.round(px)
  if (rounding === "half") return Math.round(px * 2) / 2
  return Number(px.toFixed(2))
}

/**
 * The type scale for some settings. Pure and deterministic; out-of-range
 * inputs are clamped (PRD T-1, T-3, T-5) rather than rejected, so a half-typed
 * value never breaks the preview.
 */
export function generateTypeScale(settings: TypographySettings): TypeScale {
  const base = clamp(settings.baseSize, BASE_SIZE)
  const ratio = clamp(settings.ratio, RATIO)
  const root = clamp(settings.rootSize, ROOT_SIZE)
  const body = settings.bodyFont
  const heading =
    settings.headingFont === "same" ? settings.bodyFont : settings.headingFont

  const roles = TYPE_ROLES.map((r): TypeRole => {
    const px = roundPx(base * ratio ** r.step, settings.rounding)
    return {
      id: r.id,
      label: r.label,
      step: r.step,
      px,
      size:
        settings.unit === "rem" ? `${num(px / root, 4)}rem` : `${num(px, 2)}px`,
      lineHeight: r.lineHeight,
      letterSpacing: r.tracking === 0 ? "0" : `${r.tracking}em`,
      weight: r.weight,
      heading: r.heading,
      tailwind: r.tailwind,
      tooSmall: px < MIN_READABLE_PX,
    }
  })

  return {
    roles,
    fonts: { body, heading },
    stacks: { body: fontStack(body), heading: fontStack(heading) },
  }
}

/** Size in px for the preview, which always runs on a 16px root. */
export const previewSize = (role: TypeRole) => `${num(role.px, 2)}px`
