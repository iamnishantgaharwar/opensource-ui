"use client"

import { useDeferredValue, useMemo } from "react"

import { CodeBlock } from "@/components/export/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSettings } from "@/hooks/use-settings"
import { EXPORT_FORMATS, type ExportFormat } from "@/lib/export"
import { generateTokens } from "@/lib/tokens/registry"
import type { TokenGroup } from "@/lib/tokens/types"

const HINTS: Record<ExportFormat, string> = {
  shadcn:
    "Paste over the :root and .dark blocks in app/globals.css, and add the @theme inline lines to yours.",
  "tailwind-v3":
    "For shadcn on Tailwind v3: CSS variables as HSL channels plus the matching tailwind.config.js colors.",
  json: "W3C Design Tokens format. Dark values and source steps live in $extensions.",
}

export function ExportPanel() {
  // Exports render a lot of text; let controls and the preview update first.
  const settings = useDeferredValue(useSettings())
  const tree = useMemo(() => generateTokens(settings), [settings])

  return (
    <Tabs defaultValue="shadcn" className="gap-5">
      <TabsList
        variant="line"
        // The divider is an inset shadow so the active underline can sit on it
        // without being clipped by the horizontal scroll.
        className="w-full justify-start gap-6 overflow-x-auto overflow-y-hidden rounded-none p-0 shadow-[inset_0_-1px_0_var(--border)] group-data-horizontal/tabs:h-10"
      >
        {EXPORT_FORMATS.map((f) => (
          <TabsTrigger
            key={f.id}
            value={f.id}
            className="h-full flex-none px-0 font-normal text-muted-foreground group-data-horizontal/tabs:after:bottom-0 data-active:font-medium data-active:text-foreground"
          >
            {f.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {EXPORT_FORMATS.map((f) => (
        <TabsContent key={f.id} value={f.id} className="flex flex-col gap-5">
          <p className="text-sm text-muted-foreground">{HINTS[f.id]}</p>
          <FormatFiles format={f.id} tree={tree} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

// Only the active tab is mounted, so only that format is generated.
function FormatFiles({
  format,
  tree,
}: {
  format: ExportFormat
  tree: TokenGroup
}) {
  const files = useMemo(
    () => EXPORT_FORMATS.find((f) => f.id === format)!.run(tree),
    [format, tree]
  )
  return files.map((file) => <CodeBlock key={file.filename} file={file} />)
}
