"use client"

import { SparklesIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useMemo, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { settingsStore } from "@/hooks/use-settings"
import { generateColorSystem } from "@/lib/modules/color"
import { FONTS } from "@/lib/modules/typography"
import { PRESETS, presetSettings, type Preset } from "@/lib/tokens/presets"

/** Replaces the whole system with a curated starting point (one undo step). */
export function PresetsMenu() {
  const [open, setOpen] = useState(false)

  const apply = (preset: Preset) => {
    settingsStore.replace(presetSettings(preset))
    setOpen(false)
    toast.success(`Started from ${preset.name}`, {
      action: { label: "Undo", onClick: () => settingsStore.undo() },
    })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={<Button variant="outline" size="lg" className="w-full" />}
      >
        <HugeiconsIcon
          icon={SparklesIcon}
          data-icon="inline-start"
          className="text-muted-foreground"
        />
        Presets
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[min(30rem,calc(100vw-2rem))]">
        <PopoverHeader>
          <PopoverTitle>Presets</PopoverTitle>
          <PopoverDescription>
            Complete systems to start from: color, type, radius, shadows and
            spacing. Replaces your current settings; you can undo.
          </PopoverDescription>
        </PopoverHeader>
        <ul className="grid gap-2 sm:grid-cols-2">
          {PRESETS.map((p) => (
            <li key={p.id}>
              <PresetCard preset={p} onApply={() => apply(p)} />
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}

function PresetCard({
  preset,
  onApply,
}: {
  preset: Preset
  onApply: () => void
}) {
  const { settings, dots } = useMemo(() => {
    const settings = presetSettings(preset)
    const { palettes } = generateColorSystem(settings.color)
    const dots = [
      palettes.primary!.shades[500],
      palettes.secondary?.shades[500],
      palettes.accent?.shades[500],
      palettes.neutral!.shades[200],
      palettes.neutral!.shades[800],
    ].filter((c): c is string => Boolean(c))
    return { settings, dots }
  }, [preset])
  const type = settings.typography
  const font =
    FONTS[type.headingFont === "same" ? type.bodyFont : type.headingFont]

  return (
    <button
      type="button"
      onClick={onApply}
      className="flex h-full w-full flex-col gap-2 rounded-lg border p-3 text-left transition-colors outline-none hover:border-foreground/30 hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <span className="flex items-center justify-between gap-2">
        <span className="flex -space-x-1" aria-hidden>
          {dots.map((c, i) => (
            <span
              key={i}
              className="size-5 rounded-full ring-2 ring-popover"
              style={{ background: c }}
            />
          ))}
        </span>
        <span className="text-[13px] text-muted-foreground">{font.label}</span>
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-medium">{preset.name}</span>
        <span className="text-[13px] leading-snug text-muted-foreground">
          {preset.description}
        </span>
      </span>
    </button>
  )
}
