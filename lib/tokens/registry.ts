import { colorModule } from "@/lib/modules/color"
import { radiusModule } from "@/lib/modules/radius"
import { typographyModule } from "@/lib/modules/typography"
import type { TokenGroup, TokenModule } from "@/lib/tokens/types"

// Register new modules here; preview and exporters pick them up automatically.
export const tokenModules = [
  colorModule,
  typographyModule,
  radiusModule,
] as const

type Modules = (typeof tokenModules)[number]

export type DesignSettings = {
  [M in Modules as M["id"]]: M extends TokenModule<infer S> ? S : never
}

export function defaultSettings(): DesignSettings {
  return Object.fromEntries(
    tokenModules.map((m) => [m.id, structuredClone(m.defaults)])
  ) as DesignSettings
}

export function generateTokens(settings: DesignSettings): TokenGroup {
  const tree: TokenGroup = {}
  for (const m of tokenModules) {
    const s = settings[m.id as keyof DesignSettings]
    tree[m.id] = (m as TokenModule<typeof s>).generate(s)
  }
  return tree
}
