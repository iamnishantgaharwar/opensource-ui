import tailwind from "@tailwindcss/postcss"
import postcss from "postcss"
import { describe, expect, it } from "vitest"

import { exportJson } from "@/lib/export/json"
import { exportShadcn } from "@/lib/export/shadcn"
import { hslChannels, SHADCN_VARIABLES } from "@/lib/export/shared"
import { exportTailwindV3 } from "@/lib/export/tailwind-v3"
import { defaultSettings, generateTokens } from "@/lib/tokens/registry"

const tree = generateTokens(defaultSettings())

/** `--name: value;` pairs inside the first `selector { … }` block. */
function block(code: string, selector: string) {
  const start = code.indexOf(`${selector} {`)
  const body = code.slice(start, code.indexOf("\n}", start))
  return Object.fromEntries(
    [...body.matchAll(/--([\w-]+): ([^;]+);/g)].map((m) => [m[1], m[2]])
  )
}

describe("shadcn export", () => {
  const { code } = exportShadcn(tree)

  it("defines every shadcn variable in :root and the mode-dependent ones in .dark", () => {
    const root = block(code, ":root")
    const dark = block(code, ".dark")
    for (const name of SHADCN_VARIABLES) expect(root).toHaveProperty(name)
    expect(root.background).toBe("oklch(1 0 0)")
    expect(dark.border).toBe("oklch(1 0 0 / 10%)")
    expect(dark).not.toHaveProperty("primary-500")
  })

  it("maps every color, shadcn's included, plus radius in @theme inline", () => {
    const theme = code.slice(code.indexOf("@theme inline"))
    expect(theme).toContain("--color-background: var(--background);")
    expect(theme).toContain("--color-border: var(--border);")
    expect(theme).toContain("--color-primary-500: var(--primary-500);")
    expect(theme).toContain("--color-link: var(--link);")
    expect(theme).toContain("--radius-lg: var(--radius);")
    expect(block(code, ":root").radius).toBe("0.625rem")
  })

  it("compiles with Tailwind when it replaces shadcn's blocks", async () => {
    // A shadcn globals.css whose :root, .dark and @theme inline blocks were
    // replaced wholesale by the export: the base layer must still compile.
    const css = [
      '@import "tailwindcss";',
      '@source inline("bg-background border-border rounded-lg bg-primary-500 text-link bg-success");',
      "@custom-variant dark (&:is(.dark *));",
      code,
      "@layer base { * { @apply border-border outline-ring/50; } body { @apply bg-background text-foreground; } }",
    ].join("\n")
    const result = await postcss([tailwind({ base: process.cwd() })]).process(
      css,
      { from: `${process.cwd()}/app/globals.css` }
    )
    for (const [cls, decl] of [
      ["bg-background", "background-color: var(--background)"],
      ["border-border", "border-color: var(--border)"],
      ["rounded-lg", "border-radius: var(--radius)"],
      ["bg-primary-500", "background-color: var(--primary-500)"],
      ["text-link", "color: var(--link)"],
    ]) {
      expect(result.css).toMatch(
        new RegExp(`\\.${cls} \\{\\s*${decl.replace(/[()]/g, "\\$&")}`)
      )
    }
  })
})

describe("Tailwind v3 export", () => {
  const [css, config] = exportTailwindV3(tree)

  it("writes HSL channel variables", () => {
    expect(css.code).toContain("--background: 0 0% 100%;")
    expect(css.code).toMatch(/--border: 0 0% 100% \/ 0\.1;/)
  })

  it("nests colors by name", () => {
    expect(config.code).toContain('DEFAULT: "hsl(var(--primary))"')
    expect(config.code).toContain(
      'foreground: "hsl(var(--primary-foreground))"'
    )
    expect(config.code).toContain('500: "hsl(var(--primary-500))"')
    expect(config.code).toContain(
      '"primary-foreground": "hsl(var(--sidebar-primary-foreground))"'
    )
    expect(config.code).toContain('background: "hsl(var(--background))"')
  })
})

describe("JSON export", () => {
  const json = JSON.parse(exportJson(tree).code)

  it("uses $type/$value with dark mode and aliases in $extensions", () => {
    expect(json.color.role.background).toEqual({
      $type: "color",
      $value: "oklch(1 0 0)",
      $extensions: { mode: { dark: expect.stringMatching(/^oklch/) } },
    })
    expect(json.color.role.foreground.$extensions.alias).toBe(
      "{color.palette.neutral.950}"
    )
    expect(json.color.palette.primary["500"].$type).toBe("color")
  })
})

describe("hslChannels", () => {
  it("formats channels and alpha", () => {
    expect(hslChannels("#ff0000")).toBe("0 100% 50%")
    expect(hslChannels("oklch(1 0 0 / 15%)")).toBe("0 0% 100% / 0.15")
  })
})
