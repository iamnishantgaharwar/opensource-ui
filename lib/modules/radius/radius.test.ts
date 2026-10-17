import { describe, expect, it } from "vitest"

import { generateRadius } from "@/lib/modules/radius"
import { isToken, type Token, type TokenGroup } from "@/lib/tokens/types"

const scale = (base: number) =>
  Object.fromEntries(
    Object.entries((generateRadius({ base }).scale as TokenGroup) ?? {}).map(
      ([k, t]) => [k, isToken(t) ? (t as Token).$value : null]
    )
  )

describe("generateRadius", () => {
  it("matches shadcn's default scale at 0.625rem", () => {
    expect(scale(0.625)).toEqual({
      base: "0.625rem",
      sm: "0.375rem",
      md: "0.5rem",
      lg: "0.625rem",
      xl: "0.875rem",
      "2xl": "1.125rem",
      "3xl": "1.375rem",
      "4xl": "1.625rem",
    })
  })

  it("writes square corners as 0", () => {
    expect(scale(0).sm).toBe("0")
    expect(scale(0).base).toBe("0")
  })

  it("clamps out-of-range input", () => {
    expect(scale(-1).base).toBe("0")
    expect(scale(9).base).toBe("1.5rem")
    expect(scale(Number.NaN).base).toBe("0.625rem")
  })

  it("names --radius and maps each step into Tailwind", () => {
    const g = generateRadius({ base: 0.5 }).scale as TokenGroup
    expect((g.base as Token).$css).toBe("radius")
    expect((g.lg as Token).$theme).toEqual(["radius-lg"])
  })
})
