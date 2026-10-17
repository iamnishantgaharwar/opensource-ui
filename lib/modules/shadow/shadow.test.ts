import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

import {
  generateShadows,
  SHADOW_LEVELS,
  shadowValue,
  type ShadowLevel,
} from "@/lib/modules/shadow"
import type { Token, TokenGroup } from "@/lib/tokens/types"

describe("shadows", () => {
  it("reproduces Tailwind's defaults at strength 1, untinted", () => {
    const theme = readFileSync(
      join(process.cwd(), "node_modules/tailwindcss/theme.css"),
      "utf8"
    )
    for (const level of Object.keys(SHADOW_LEVELS) as ShadowLevel[]) {
      const tw = theme.match(new RegExp(`--shadow-${level}: ([^;]+);`))![1]
      expect(shadowValue(level, 1, false)).toBe(tw)
    }
  })

  it("scales opacity with strength and turns off at 0", () => {
    expect(shadowValue("xs", 0.5, false)).toBe("0 1px 2px 0 rgb(0 0 0 / 0.025)")
    expect(shadowValue("lg", 0, false)).toBe("0 0 #0000")
  })

  it("tints from the neutral palette at runtime", () => {
    expect(shadowValue("xs", 1, true)).toBe(
      "0 1px 2px 0 color-mix(in oklab, var(--neutral-950) 5%, transparent)"
    )
  })

  it("doubles opacity in dark mode, capped at fully opaque", () => {
    const scale = generateShadows({ strength: 1, tinted: false })
      .scale as TokenGroup
    expect((scale.xs as Token).$dark).toBe("0 1px 2px 0 rgb(0 0 0 / 0.1)")
    // Strength clamps to 2.5 first; the dark boost still doubles it after.
    expect(shadowValue("2xl", 9, false)).toContain("rgb(0 0 0 / 0.625)")
    expect(shadowValue("2xl", 2.5, false, 2)).toContain("rgb(0 0 0 / 1)")
  })

  it("names each level for CSS and Tailwind", () => {
    const scale = generateShadows({ strength: 1, tinted: true })
      .scale as TokenGroup
    expect((scale.md as Token).$css).toBe("shadow-md")
    expect((scale.md as Token).$theme).toEqual(["shadow-md"])
  })
})
