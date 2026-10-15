import { describe, expect, it } from "vitest"

import { highlight } from "@/lib/highlight"

describe("highlight", () => {
  it("round-trips the source text", () => {
    const code =
      ':root {\n  /* c */\n  --a: oklch(1 0 0);\n}\n{"b": "x", "n": 2}'
    expect(
      highlight(code)
        .map((t) => t.text)
        .join("")
    ).toBe(code)
  })

  it("classifies CSS and JSON tokens", () => {
    const kinds = (code: string) =>
      highlight(code)
        .filter((t) => t.kind !== "plain")
        .map((t) => [t.kind, t.text])
    expect(kinds("--primary: oklch(0.5 0.1 200);")).toEqual([
      ["property", "--primary"],
      ["color", "oklch(0.5 0.1 200)"],
    ])
    expect(kinds('{"a": "b"}')).toEqual([
      ["key", '"a"'],
      ["string", '"b"'],
    ])
  })
})
