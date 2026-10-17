import { googleFontsUrl } from "@/lib/modules/typography/fonts"
import {
  generateTypeScale,
  previewSize,
  type TypeScale,
} from "@/lib/modules/typography/scale"
import {
  DEFAULT_TYPOGRAPHY_SETTINGS,
  type TypographySettings,
} from "@/lib/modules/typography/settings"
import type { Token, TokenGroup, TokenModule } from "@/lib/tokens/types"

/**
 * Token slice: font families, then per role its size, line height, letter
 * spacing and weight. `$theme` wires each into Tailwind: `text-h1` gets the
 * whole role (size + line height + tracking + weight), and the Tailwind size
 * the role stands in for (`text-6xl`) gets its size and line height, so
 * components that use Tailwind's sizes follow the scale too.
 */
export function typeScaleToTokens(scale: TypeScale): TokenGroup {
  const fontImport = googleFontsUrl([scale.fonts.body, scale.fonts.heading])
  const family = (css: string, value: string): Token => ({
    $type: "fontFamily",
    $value: value,
    $css: css,
    $theme: [css],
    ...(fontImport ? { $import: fontImport } : {}),
  })

  const size: TokenGroup = {}
  const lineHeight: TokenGroup = {}
  const letterSpacing: TokenGroup = {}
  const weight: TokenGroup = {}
  for (const r of scale.roles) {
    const preview = previewSize(r)
    size[r.id] = {
      $type: "dimension",
      $value: r.size,
      $css: `font-size-${r.id}`,
      $theme: [`text-${r.id}`, `text-${r.tailwind}`],
      ...(preview !== r.size ? { $preview: preview } : {}),
    }
    lineHeight[r.id] = {
      $type: "number",
      $value: r.lineHeight,
      $css: `line-height-${r.id}`,
      $theme: [`text-${r.id}--line-height`, `text-${r.tailwind}--line-height`],
    }
    letterSpacing[r.id] = {
      $type: "dimension",
      $value: r.letterSpacing,
      $css: `letter-spacing-${r.id}`,
      $theme: [`text-${r.id}--letter-spacing`],
    }
    weight[r.id] = {
      $type: "fontWeight",
      $value: r.weight,
      $css: `font-weight-${r.id}`,
      $theme: [`text-${r.id}--font-weight`],
    }
  }

  return {
    font: {
      sans: family("font-sans", scale.stacks.body),
      heading: family("font-heading", scale.stacks.heading),
    },
    size,
    lineHeight,
    letterSpacing,
    weight,
  }
}

export const typographyModule = {
  id: "typography" as const,
  label: "Typography",
  defaults: DEFAULT_TYPOGRAPHY_SETTINGS,
  generate: (s: TypographySettings) => typeScaleToTokens(generateTypeScale(s)),
} satisfies TokenModule<TypographySettings>

export * from "@/lib/modules/typography/fonts"
export * from "@/lib/modules/typography/scale"
export * from "@/lib/modules/typography/settings"
