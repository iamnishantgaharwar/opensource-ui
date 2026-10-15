import type { ExportFile } from "@/lib/export/shared"
import { isToken, type TokenGroup } from "@/lib/tokens/types"

type JsonNode = { [key: string]: JsonNode | string | number }

/**
 * W3C Design Tokens format: `$type` / `$value`, with the dark-mode value in
 * `$extensions.mode.dark` and the source scale step as an alias in
 * `$extensions.alias` (e.g. "{color.palette.neutral.950}").
 */
function toJson(group: TokenGroup): JsonNode {
  const out: JsonNode = {}
  for (const [k, node] of Object.entries(group)) {
    if (!isToken(node)) {
      out[k] = toJson(node)
      continue
    }
    const token: JsonNode = { $type: node.$type, $value: node.$value }
    const ext: JsonNode = {}
    if (node.$dark !== undefined) ext.mode = { dark: node.$dark }
    if (node.$ref) {
      ext.alias = `{${node.$ref}}`
      if (node.$darkRef) ext.darkAlias = `{${node.$darkRef}}`
    }
    if (Object.keys(ext).length) token.$extensions = ext
    out[k] = token
  }
  return out
}

export function exportJson(tree: TokenGroup): ExportFile {
  return {
    filename: "tokens.json",
    language: "json",
    code: JSON.stringify(toJson(tree), null, 2) + "\n",
  }
}
