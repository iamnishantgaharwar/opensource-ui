export type TokenType =
  "color" | "dimension" | "fontFamily" | "fontWeight" | "number"

export type TokenValue = string | number

/**
 * A single design token, loosely following the W3C Design Tokens format.
 * `$dark` holds the value in dark mode when it differs from light mode.
 * `$ref` / `$darkRef` record the token path a value was taken from
 * (e.g. "color.palette.neutral.200") so exporters can emit aliases.
 * `$css` is the CSS custom property name (without `--`) the token is
 * published under; tokens without it are not emitted as CSS variables.
 * `$theme` lists Tailwind v4 theme variables (without `--`) that should
 * point at it, e.g. ["text-h1", "text-6xl"]; colors map to `color-<name>`
 * without needing it. `$import` is a stylesheet the token needs loaded (a
 * web font). `$preview` replaces `$value` in the in-app preview when the two
 * differ (rem sizes against a custom root; the preview runs on 16px).
 */
export interface Token {
  $type: TokenType
  $value: TokenValue
  $css?: string
  $dark?: TokenValue
  $ref?: string
  $darkRef?: string
  $description?: string
  $theme?: string[]
  $import?: string
  $preview?: TokenValue
}

export interface TokenGroup {
  [key: string]: Token | TokenGroup
}

export function isToken(node: Token | TokenGroup): node is Token {
  return "$value" in node && "$type" in node
}

/**
 * An independent generator that turns its own settings into one slice of
 * the token tree. `generate` must be pure and deterministic so shared links
 * reproduce exactly. UI controls are attached separately by the app layer.
 */
export interface TokenModule<Settings> {
  id: string
  label: string
  defaults: Settings
  generate(settings: Settings): TokenGroup
}

export interface TokenLeaf {
  path: string[]
  token: Token
}

/** Depth-first walk over every token in a tree, in insertion order. */
export function flattenTokens(group: TokenGroup, prefix: string[] = []) {
  const leaves: TokenLeaf[] = []
  for (const [key, node] of Object.entries(group)) {
    const path = [...prefix, key]
    if (isToken(node)) leaves.push({ path, token: node })
    else leaves.push(...flattenTokens(node, path))
  }
  return leaves
}
