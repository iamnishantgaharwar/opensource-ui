export type TokenKind =
  | "plain"
  | "comment"
  | "color"
  | "key"
  | "string"
  | "property"
  | "keyword"
  | "number"

export interface CodeToken {
  kind: TokenKind
  text: string
}

// Tried in order at each position; sticky (`y`) so they only match there.
// Enough for the CSS, JS config and JSON this app generates.
const RULES: [TokenKind, RegExp][] = [
  ["comment", /\/\*[\s\S]*?\*\/|\/\/[^\n]*/y],
  ["color", /oklch\([^)]*\)|#[0-9a-f]{6}\b/iy],
  ["key", /"[^"\n]*"(?=\s*:)/y],
  ["string", /"[^"\n]*"|'[^'\n]*'/y],
  ["property", /--[\w-]+/y],
  [
    "keyword",
    /@[\w-]+|:root\b|\.dark\b|\b(?:module|exports|const|export|default)\b/y,
  ],
  ["number", /\b\d+(?:\.\d+)?%?/y],
]

export function highlight(code: string): CodeToken[] {
  const tokens: CodeToken[] = []
  let plain = ""
  let i = 0
  outer: while (i < code.length) {
    for (const [kind, re] of RULES) {
      re.lastIndex = i
      const m = re.exec(code)
      if (m && m[0].length > 0) {
        if (plain) tokens.push({ kind: "plain", text: plain })
        plain = ""
        tokens.push({ kind, text: m[0] })
        i += m[0].length
        continue outer
      }
    }
    plain += code[i++]
  }
  if (plain) tokens.push({ kind: "plain", text: plain })
  return tokens
}
