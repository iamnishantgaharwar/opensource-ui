import { flattenTokens, type TokenGroup } from "@/lib/tokens/types"

export type Mode = "light" | "dark"

/** Every token that has a CSS name, as `--name: value` pairs for one mode. */
export function cssVariables(tree: TokenGroup, mode: Mode) {
  const vars: Record<string, string> = {}
  for (const { token } of flattenTokens(tree)) {
    if (!token.$css) continue
    const value = mode === "dark" ? (token.$dark ?? token.$value) : token.$value
    vars[`--${token.$css}`] = String(value)
  }
  return vars
}
