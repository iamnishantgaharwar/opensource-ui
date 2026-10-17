import { describe, expect, it } from "vitest"

import { generateSpacing } from "@/lib/modules/spacing"
import type { Token, TokenGroup } from "@/lib/tokens/types"

const tokens = (base: number) => {
  const tree = generateSpacing({ base })
  return {
    base: (tree.base as TokenGroup).base as Token,
    step: tree.step as Record<string, Token>,
  }
}

describe("generateSpacing", () => {
  it("defaults to Tailwind's 0.25rem", () => {
    expect(tokens(4).base.$value).toBe("0.25rem")
    expect(tokens(4).step["4"].$value).toBe("1rem")
  })

  it("scales every step from the base", () => {
    expect(tokens(5).base.$value).toBe("0.3125rem")
    expect(tokens(5).step["4"].$value).toBe("1.25rem")
    expect(tokens(3.5).step["0.5"].$value).toBe("0.10938rem")
  })

  it("clamps out-of-range input", () => {
    expect(tokens(1).base.$value).toBe("0.1875rem")
    expect(tokens(99).base.$value).toBe("0.375rem")
    expect(tokens(Number.NaN).base.$value).toBe("0.25rem")
  })

  it("publishes only --spacing to CSS", () => {
    expect(tokens(4).base.$css).toBe("spacing")
    expect(tokens(4).base.$theme).toEqual(["spacing"])
    expect(tokens(4).step["4"].$css).toBeUndefined()
  })
})
