import { exportJson } from "@/lib/export/json"
import { exportShadcn } from "@/lib/export/shadcn"
import type { ExportFile } from "@/lib/export/shared"
import { exportTailwindV3 } from "@/lib/export/tailwind-v3"
import type { TokenGroup } from "@/lib/tokens/types"

export type { ExportFile } from "@/lib/export/shared"

export const EXPORT_FORMATS = [
  {
    id: "shadcn",
    label: "shadcn · Tailwind v4",
    run: (t: TokenGroup) => [exportShadcn(t)],
  },
  { id: "tailwind-v3", label: "Tailwind v3", run: exportTailwindV3 },
  { id: "json", label: "JSON", run: (t: TokenGroup) => [exportJson(t)] },
] as const satisfies ReadonlyArray<{
  id: string
  label: string
  run: (tree: TokenGroup) => ExportFile[]
}>

export type ExportFormat = (typeof EXPORT_FORMATS)[number]["id"]
