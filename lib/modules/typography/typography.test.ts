import { describe, expect, it } from "vitest"

import {
  DEFAULT_TYPOGRAPHY_SETTINGS,
  FONTS,
  fontStack,
  generateTypeScale,
  googleFontsUrl,
  typeScaleToTokens,
  type TypographySettings,
} from "@/lib/modules/typography"
import { cssVariables } from "@/lib/tokens/css"
import { isToken, type Token, type TokenGroup } from "@/lib/tokens/types"

const settings = (patch: Partial<TypographySettings> = {}) => ({
  ...DEFAULT_TYPOGRAPHY_SETTINGS,
  ...patch,
})

const byId = (s: TypographySettings) =>
  Object.fromEntries(generateTypeScale(s).roles.map((r) => [r.id, r]))

describe("generateTypeScale", () => {
  it("matches the PRD example at 16px and Major Third, whole px", () => {
    const roles = byId(settings({ unit: "px" }))
    const px = Object.fromEntries(
      Object.entries(roles).map(([k, r]) => [k, r.px])
    )
    expect(px).toEqual({
      display: 76,
      h1: 61,
      h2: 49,
      h3: 39,
      h4: 31,
      h5: 25,
      h6: 20,
      "body-lg": 18,
      body: 16,
      "body-sm": 13,
      caption: 10,
    })
    expect(roles.h1.size).toBe("61px")
  })

  it("writes rem relative to the root size", () => {
    expect(byId(settings()).display.size).toBe("4.75rem")
    expect(byId(settings()).h1.size).toBe("3.8125rem")
    expect(byId(settings({ rootSize: 10 })).body.size).toBe("1.6rem")
  })

  it("rounds to none, half or whole px", () => {
    const h3 = (rounding: TypographySettings["rounding"]) =>
      byId(settings({ rounding })).h3.px
    expect(h3("none")).toBe(39.06)
    expect(h3("half")).toBe(39)
    expect(h3("whole")).toBe(39)
    expect(byId(settings({ rounding: "half" })).h6.px).toBe(20)
    expect(byId(settings({ rounding: "half", ratio: 1.2 })).h5.px).toBe(23)
  })

  it("clamps out-of-range inputs instead of failing", () => {
    const low = byId(settings({ baseSize: 2, ratio: 0.5 }))
    expect(low.body.px).toBe(10)
    expect(low.h1.px).toBe(Math.round(10 * 1.01 ** 6))
    expect(byId(settings({ baseSize: 99, ratio: 9 })).body.px).toBe(24)
    expect(byId(settings({ baseSize: Number.NaN })).body.px).toBe(10)
  })

  it("flags roles under 12px", () => {
    const roles = byId(settings())
    expect(roles.caption.tooSmall).toBe(true)
    expect(roles["body-sm"].tooSmall).toBe(false)
  })

  it("keeps headings tighter and heavier than body text", () => {
    const roles = byId(settings())
    expect(roles.h1.lineHeight).toBeLessThan(roles.body.lineHeight)
    expect(roles.h1.weight).toBeGreaterThan(roles.body.weight)
    expect(roles.h1.letterSpacing).toBe("-0.025em")
    expect(roles.body.letterSpacing).toBe("0")
  })

  it("uses the body font for headings unless one is picked", () => {
    expect(generateTypeScale(settings()).fonts.heading).toBe("inter")
    const picked = generateTypeScale(settings({ headingFont: "fraunces" }))
    expect(picked.fonts).toEqual({ body: "inter", heading: "fraunces" })
    expect(picked.stacks.heading).toMatch(/^"Fraunces", ui-serif/)
  })

  it("is deterministic", () => {
    const s = settings({ ratio: 1.333, rounding: "none" })
    expect(generateTypeScale(s)).toEqual(generateTypeScale(s))
  })
})

describe("fonts", () => {
  it("puts web fonts before their category's fallbacks", () => {
    expect(fontStack("inter")).toMatch(/^"Inter", ui-sans-serif/)
    expect(fontStack("system-serif")).toMatch(/^ui-serif/)
  })

  it("loads every web font in one request and skips system stacks", () => {
    expect(googleFontsUrl(["system-sans"])).toBeNull()
    expect(googleFontsUrl(["inter", "inter", "playfair-display"])).toBe(
      "https://fonts.googleapis.com/css2?family=Inter:wght@400..700&family=Playfair+Display:wght@400..700&display=swap"
    )
  })

  it("has a valid weight spec for every web font", () => {
    for (const font of Object.values(FONTS)) {
      if ("google" in font)
        expect(font.weights).toMatch(/^\d+(\.\.\d+|(;\d+)*)$/)
    }
  })
})

describe("typography tokens", () => {
  const tree = typeScaleToTokens(generateTypeScale(settings()))
  const token = (...path: string[]) =>
    path.reduce<Token | TokenGroup>(
      (n, k) => (n as TokenGroup)[k],
      tree
    ) as Token

  it("names every token for CSS and wires roles into Tailwind", () => {
    const h1 = token("size", "h1")
    expect(isToken(h1)).toBe(true)
    expect(h1.$css).toBe("font-size-h1")
    expect(h1.$theme).toEqual(["text-h1", "text-6xl"])
    expect(token("lineHeight", "body-sm").$theme).toEqual([
      "text-body-sm--line-height",
      "text-sm--line-height",
    ])
    expect(token("weight", "h1").$theme).toEqual(["text-h1--font-weight"])
    expect(token("font", "sans").$import).toContain("family=Inter")
  })

  it("previews rem sizes in px when the root isn't 16px", () => {
    const custom = typeScaleToTokens(
      generateTypeScale(settings({ rootSize: 10 }))
    )
    const vars = cssVariables({ typography: custom }, "light", {
      preview: true,
    })
    expect(vars["--font-size-body"]).toBe("16px")
    expect(
      cssVariables({ typography: custom }, "light")["--font-size-body"]
    ).toBe("1.6rem")
    // Tailwind's own sizes follow the scale inside the preview.
    expect(vars["--text-sm"]).toBe("var(--font-size-body-sm)")
    expect(vars).not.toHaveProperty("--font-sans", "var(--font-sans)")
  })
})
