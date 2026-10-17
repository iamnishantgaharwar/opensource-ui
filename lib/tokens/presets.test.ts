import { describe, expect, it } from "vitest"

import { checkContrast, generateColorSystem } from "@/lib/modules/color"
import { PRESETS, presetSettings } from "@/lib/tokens/presets"
import { generateTokens } from "@/lib/tokens/registry"

describe("presets", () => {
  it("have unique ids", () => {
    const ids = PRESETS.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  for (const preset of PRESETS) {
    describe(preset.name, () => {
      const settings = presetSettings(preset)

      it("keeps every value it sets (none rejected as invalid)", () => {
        // restoreSettings drops values it can't use; a typo in a preset
        // would silently fall back to the default.
        expect(settings).toMatchObject(preset.settings)
        expect(() => generateTokens(settings)).not.toThrow()
      })

      it("passes every contrast check", () => {
        const failing = checkContrast(
          generateColorSystem(settings.color)
        ).filter((r) => !r.light.pass || !r.dark.pass)
        expect(failing.map((r) => r.id)).toEqual([])
      })
    })
  }
})
