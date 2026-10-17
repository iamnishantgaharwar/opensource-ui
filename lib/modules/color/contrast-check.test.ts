import { describe, expect, it } from "vitest"

import {
  checkContrast,
  CONTRAST_PAIRS,
} from "@/lib/modules/color/contrast-check"
import {
  DEFAULT_COLOR_SETTINGS,
  NEUTRAL_PRESETS,
  type NeutralPreset,
} from "@/lib/modules/color/settings"
import { generateColorSystem } from "@/lib/modules/color/system"

const check = (patch = {}) =>
  checkContrast(generateColorSystem({ ...DEFAULT_COLOR_SETTINGS, ...patch }))

describe("checkContrast", () => {
  it("checks every pair in both modes against existing roles", () => {
    const results = check()
    expect(results).toHaveLength(CONTRAST_PAIRS.length)
    for (const r of results) {
      expect(r.light.ratio).toBeGreaterThan(1)
      expect(r.dark.ratio).toBeGreaterThan(1)
      expect(r.light.fg).toMatch(/^#[0-9a-f]{6}$/)
    }
  })

  it("passes body text and links for the defaults", () => {
    const byId = Object.fromEntries(check().map((r) => [r.id, r]))
    for (const id of ["body", "card", "link"] as const) {
      expect(byId[id].light.pass).toBe(true)
      expect(byId[id].dark.pass).toBe(true)
    }
    expect(byId.body.light.level).toBe("AAA")
  })

  it("applies 3:1 to the focus ring and 4.5:1 to text", () => {
    const ring = check().find((r) => r.id === "ring")!
    expect(ring.min).toBe(3)
    expect(check().find((r) => r.id === "primary")!.min).toBe(4.5)
  })

  it("passes = ratio meets the pair's minimum", () => {
    for (const r of check({ primary: "#facc15" })) {
      for (const mode of [r.light, r.dark]) {
        expect(mode.pass).toBe(mode.ratio >= r.min)
      }
    }
  })

  it("passes every pair with the default settings", () => {
    const failing = check().filter((r) => !r.light.pass || !r.dark.pass)
    expect(failing.map((r) => r.id)).toEqual([])
  })

  // The generator picks readable shades and text colors itself; across a
  // spread of brand colors (pale, mid-tone, near-black) and every option,
  // nothing it produces should fail.
  it("passes every pair across brand colors, neutrals and styles", () => {
    const primaries = [
      "#77d3ec",
      "#facc15",
      "#f5f5f5",
      "#111111",
      "#e11d48",
      "#86efac",
      "#2563eb",
      "#7c3aed",
      "#ff6b00",
      "#ec4899",
    ]
    const failing: string[] = []
    for (const primary of primaries) {
      for (const neutral of Object.keys(NEUTRAL_PRESETS) as NeutralPreset[]) {
        for (const brandRoleStyle of ["subtle", "solid"] as const) {
          for (const auto of [false, true]) {
            const slot = (name: "secondary" | "accent" | "tertiary") => ({
              ...DEFAULT_COLOR_SETTINGS[name],
              auto,
            })
            const results = check({
              primary,
              neutral,
              brandRoleStyle,
              secondary: slot("secondary"),
              accent: slot("accent"),
              tertiary: slot("tertiary"),
            })
            for (const r of results) {
              for (const mode of ["light", "dark"] as const) {
                if (!r[mode].pass) {
                  failing.push(`${r.id}/${mode} ${primary} ${neutral}`)
                }
              }
            }
          }
        }
      }
    }
    expect(failing).toEqual([])
  })

  it("is deterministic", () => {
    expect(check({ primary: "#e11d48" })).toEqual(check({ primary: "#e11d48" }))
  })
})
