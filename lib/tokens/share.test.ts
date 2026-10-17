import { describe, expect, it } from "vitest"

import { defaultSettings } from "@/lib/tokens/registry"
import { decodeSettings, encodeSettings, shareHref } from "@/lib/tokens/share"

describe("share links", () => {
  it("encodes defaults as nothing", () => {
    expect(encodeSettings(defaultSettings())).toBe("")
    expect(shareHref(defaultSettings(), "/preview", "#cards")).toBe(
      "/preview#cards"
    )
  })

  it("round-trips changed settings with a URL-safe token", () => {
    const s = defaultSettings()
    s.color.primary = "#e11d48"
    s.color.accent = { auto: true, harmony: "triadic", hex: null }
    s.typography.headingFont = "fraunces"
    s.typography.ratio = 1.333
    const token = encodeSettings(s)
    expect(token).toMatch(/^[\w-]+$/)
    expect(decodeSettings(token)).toEqual(s)
  })

  it("keeps links short by storing only differences", () => {
    const s = defaultSettings()
    s.color.primary = "#e11d48"
    expect(encodeSettings(s).length).toBeLessThan(50)
  })

  it("rejects or repairs bad tokens", () => {
    expect(decodeSettings(null)).toBeNull()
    expect(decodeSettings("%%%")).toBeNull()
    // Valid base64 of junk JSON falls back to the defaults.
    expect(decodeSettings(btoa("{not json"))).toEqual(defaultSettings())
    // Unknown values are dropped, known ones kept.
    const token = btoa(
      JSON.stringify({ color: { primary: "#123456", bogus: 1 } })
    )
    expect(decodeSettings(token)?.color.primary).toBe("#123456")
  })
})
