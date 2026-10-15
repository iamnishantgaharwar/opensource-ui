import { describe, expect, it } from "vitest"

import { restoreSettings } from "@/lib/tokens/persist"
import { defaultSettings } from "@/lib/tokens/registry"

describe("restoreSettings", () => {
  it("returns defaults for missing or broken data", () => {
    expect(restoreSettings(null)).toEqual(defaultSettings())
    expect(restoreSettings("{not json")).toEqual(defaultSettings())
  })

  it("restores saved values, including picked and empty slots", () => {
    const saved = defaultSettings()
    saved.color.primary = "#e11d48"
    saved.color.accent = { auto: false, harmony: "triadic", hex: "#22c55e" }
    saved.color.semantic.warning = "#eab308"
    expect(restoreSettings(JSON.stringify(saved))).toEqual(saved)
  })

  it("fills in fields added since saving and drops unknown or mistyped ones", () => {
    const restored = restoreSettings(
      JSON.stringify({
        color: { primary: "#e11d48", anchor: 500, removedField: true },
        unknownModule: {},
      })
    )
    expect(restored.color.primary).toBe("#e11d48")
    expect(restored.color.anchor).toBe(defaultSettings().color.anchor)
    expect(restored.color.semantic).toEqual(defaultSettings().color.semantic)
    expect(restored).not.toHaveProperty("unknownModule")
    expect(restored.color).not.toHaveProperty("removedField")
  })

  it("falls back to defaults when saved values break generation", () => {
    const restored = restoreSettings(
      JSON.stringify({ color: { neutral: "no-such-preset" } })
    )
    expect(restored).toEqual(defaultSettings())
  })
})
