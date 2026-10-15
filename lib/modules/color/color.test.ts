import { describe, expect, it } from "vitest"

import {
  colorModule,
  contrast,
  DEFAULT_COLOR_SETTINGS,
  formatOklch,
  generateColorSystem,
  generateNeutralScale,
  generateScale,
  hexToOklch,
  normalizeHex,
  parseColor,
  STEPS,
  type ColorSettings,
} from "@/lib/modules/color"
import type { Token } from "@/lib/tokens/types"

const settings = (patch: Partial<ColorSettings> = {}): ColorSettings => ({
  ...structuredClone(DEFAULT_COLOR_SETTINGS),
  ...patch,
})

describe("hex parsing", () => {
  it.each([
    ["#77D3EC", "#77d3ec"],
    ["77d3ec", "#77d3ec"],
    ["#abc", "#aabbcc"],
    ["fff", "#ffffff"],
  ])("normalizes %s", (input, out) => expect(normalizeHex(input)).toBe(out))

  it.each(["", "#12", "#12345", "#ggg", "1234567"])("rejects %s", (input) =>
    expect(normalizeHex(input)).toBeNull()
  )

  it("parses rgb() and hsl()", () => {
    expect(parseColor("rgb(255, 0, 0)")).toBe("#ff0000")
    expect(parseColor("hsl(0 0% 100%)")).toBe("#ffffff")
  })
})

describe("generateScale", () => {
  const inputs = [
    "#77d3ec",
    "#e11d48",
    "#facc15",
    "#1e1b4b",
    "#f8fafc",
    "#808080",
  ]

  it.each(inputs)("keeps %s exactly at step 500 by default", (hex) => {
    const p = generateScale(hex)
    expect(p.anchor).toBe(500)
    expect(p.shades[500]).toBe(hex)
  })

  it.each(inputs)("produces 11 shades from light to dark for %s", (hex) => {
    const ls = STEPS.map((s) => hexToOklch(generateScale(hex).shades[s]).l)
    expect(ls).toHaveLength(11)
    for (let i = 1; i < ls.length; i++) expect(ls[i]).toBeLessThan(ls[i - 1])
  })

  it("auto-places a light input at the step nearest its lightness", () => {
    const p = generateScale("#77d3ec", "auto")
    expect(p.anchor).toBe(300)
    expect(p.shades[300]).toBe("#77d3ec")
  })

  it("is deterministic", () => {
    expect(generateScale("#77d3ec")).toEqual(generateScale("#77d3ec"))
  })
})

describe("neutral scale", () => {
  it("reproduces shadcn's neutral grays with zero chroma", () => {
    const shades = generateNeutralScale(0, 0)
    expect(formatOklch(shades[50])).toBe("oklch(0.985 0 0)")
    expect(formatOklch(shades[950])).toBe("oklch(0.145 0 0)")
  })
})

describe("generateColorSystem", () => {
  it("omits empty optional palettes and falls back to neutral roles", () => {
    const sys = generateColorSystem(settings())
    expect(sys.palettes.secondary).toBeUndefined()
    expect(sys.roles.secondary.light.ref).toBe("neutral.100")
    expect(sys.roles.accent.dark.ref).toBe("neutral.800")
  })

  it("suggests secondary when auto is on", () => {
    const sys = generateColorSystem(
      settings({
        secondary: { auto: true, harmony: "complementary", hex: null },
      })
    )
    const p = hexToOklch("#77d3ec").h
    const s = hexToOklch(sys.palettes.secondary!.input).h
    expect(Math.abs(((s - p + 360) % 360) - 180)).toBeLessThan(15)
    expect(sys.roles.secondary.light.ref).toBe("secondary.100")
  })

  it("uses a picked color and supports solid role style", () => {
    const sys = generateColorSystem(
      settings({
        accent: { auto: false, harmony: "triadic", hex: "#e11d48" },
        brandRoleStyle: "solid",
      })
    )
    expect(sys.roles.accent.light.hex).toBe("#e11d48")
  })

  it("keeps the primary input and picks readable foreground", () => {
    const { roles } = generateColorSystem(settings())
    expect(roles.primary.light.hex).toBe("#77d3ec")
    // A light cyan needs dark text.
    expect(roles["primary-foreground"].light.ref).toBe("neutral.950")
    expect(
      contrast(roles.primary.light.hex, roles["primary-foreground"].light.hex)
    ).toBeGreaterThan(4.5)
  })

  it("darkens links until they pass AA on white", () => {
    const { extraRoles } = generateColorSystem(settings())
    expect(
      contrast(extraRoles.link.light.hex, "#ffffff")
    ).toBeGreaterThanOrEqual(4.5)
  })

  it("defines every shadcn theme variable", () => {
    const { roles } = generateColorSystem(settings())
    const shadcn = [
      "background",
      "foreground",
      "card",
      "card-foreground",
      "popover",
      "popover-foreground",
      "primary",
      "primary-foreground",
      "secondary",
      "secondary-foreground",
      "muted",
      "muted-foreground",
      "accent",
      "accent-foreground",
      "destructive",
      "border",
      "input",
      "ring",
      "chart-1",
      "chart-2",
      "chart-3",
      "chart-4",
      "chart-5",
      "sidebar",
      "sidebar-foreground",
      "sidebar-primary",
      "sidebar-primary-foreground",
      "sidebar-accent",
      "sidebar-accent-foreground",
      "sidebar-border",
      "sidebar-ring",
    ]
    expect(Object.keys(roles)).toEqual(shadcn)
  })
})

describe("semantic colors", () => {
  it.each(["success", "warning", "info", "destructive"])(
    "%s keeps its input, stays readable in dark mode and has AA foreground",
    (name) => {
      const sys = generateColorSystem(settings())
      const role = sys.roles[name] ?? sys.extraRoles[name]
      const fg = sys.extraRoles[`${name}-foreground`]
      expect(role.light.hex).toBe(
        DEFAULT_COLOR_SETTINGS.semantic[name as "info"]
      )
      expect(
        contrast(role.dark.hex, sys.palettes.neutral!.shades[950])
      ).toBeGreaterThanOrEqual(3)
      expect(contrast(role.light.hex, fg.light.hex)).toBeGreaterThanOrEqual(4.5)
    }
  )
})

describe("colorModule", () => {
  it("emits oklch tokens with dark overrides", () => {
    const tree = colorModule.generate(settings()) as Record<
      string,
      Record<string, Token>
    >
    expect(tree.role.background).toMatchObject({
      $type: "color",
      $value: "oklch(1 0 0)",
      $darkRef: "color.palette.neutral.950",
    })
    expect(tree.role.border.$dark).toBe("oklch(1 0 0 / 10%)")
    expect(Object.keys(tree.palette)).toEqual([
      "primary",
      "neutral",
      "success",
      "warning",
      "info",
      "destructive",
    ])
  })
})
