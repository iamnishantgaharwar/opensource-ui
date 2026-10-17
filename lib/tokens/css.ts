import { flattenTokens, type TokenGroup } from "@/lib/tokens/types"

export type Mode = "light" | "dark"

/**
 * Every token that has a CSS name, as `--name: value` pairs for one mode.
 * With `preview`, values come from `$preview` when set, and each `$theme`
 * name is pointed at its token too, so Tailwind utilities that read theme
 * variables at runtime (text-sm reads --text-sm) pick up the generated
 * system inside the preview.
 */
export function cssVariables(
  tree: TokenGroup,
  mode: Mode,
  { preview = false }: { preview?: boolean } = {}
) {
  const vars: Record<string, string> = {}
  for (const { token } of flattenTokens(tree)) {
    if (!token.$css) continue
    const base = preview ? (token.$preview ?? token.$value) : token.$value
    const value = mode === "dark" ? (token.$dark ?? base) : base
    vars[`--${token.$css}`] = String(value)
    if (!preview) continue
    for (const name of token.$theme ?? []) {
      // `--font-sans: var(--font-sans)` would be a cycle.
      if (name !== token.$css) vars[`--${name}`] = `var(--${token.$css})`
    }
  }
  return vars
}

/** Stylesheets the tokens need loaded (web fonts), without duplicates. */
export function stylesheetImports(tree: TokenGroup): string[] {
  const urls = flattenTokens(tree).flatMap(({ token }) =>
    token.$import ? [token.$import] : []
  )
  return [...new Set(urls)]
}
