import { formatOklch } from "@/lib/modules/color/convert"
import { STEPS } from "@/lib/modules/color/scale"
import {
  DEFAULT_COLOR_SETTINGS,
  type ColorSettings,
} from "@/lib/modules/color/settings"
import {
  generateColorSystem,
  type ColorSystem,
  type Role,
  type RoleValue,
} from "@/lib/modules/color/system"
import type { Token, TokenGroup, TokenModule } from "@/lib/tokens/types"

const css = (v: RoleValue) => formatOklch(v.hex, v.alpha)
// Only palette steps ("neutral.200") are aliases; "white" is a literal.
const path = (v: RoleValue) =>
  v.ref?.includes(".") ? `color.palette.${v.ref}` : undefined

function roleToken(name: string, { light, dark }: Role): Token {
  const token: Token = { $type: "color", $value: css(light), $css: name }
  if (path(light)) token.$ref = path(light)
  if (css(dark) !== token.$value) token.$dark = css(dark)
  if (path(dark) && dark.ref !== light.ref) token.$darkRef = path(dark)
  return token
}

const roleGroup = (roles: Record<string, Role>): TokenGroup =>
  Object.fromEntries(
    Object.entries(roles).map(([k, r]) => [k, roleToken(k, r)])
  )

export function colorSystemToTokens(system: ColorSystem): TokenGroup {
  const palette: TokenGroup = {}
  for (const [name, p] of Object.entries(system.palettes)) {
    palette[name] = Object.fromEntries(
      STEPS.map((s) => [
        s,
        {
          $type: "color",
          $value: formatOklch(p.shades[s]),
          $css: `${name}-${s}`,
        },
      ])
    )
  }
  // Roles first: they're what shadcn users paste; palettes are the raw scales.
  return {
    role: roleGroup(system.roles),
    extra: roleGroup(system.extraRoles),
    palette,
  }
}

export const colorModule = {
  id: "color" as const,
  label: "Color",
  defaults: DEFAULT_COLOR_SETTINGS,
  generate: (s: ColorSettings) => colorSystemToTokens(generateColorSystem(s)),
} satisfies TokenModule<ColorSettings>

export * from "@/lib/modules/color/convert"
export * from "@/lib/modules/color/harmony"
export * from "@/lib/modules/color/scale"
export * from "@/lib/modules/color/settings"
export * from "@/lib/modules/color/system"
export * from "@/lib/modules/color/contrast-check"
