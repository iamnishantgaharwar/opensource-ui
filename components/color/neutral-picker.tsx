"use client"

import { Tick02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  NEUTRAL_PRESETS,
  neutralShades,
  type NeutralPreset,
} from "@/lib/modules/color"

const PRESETS = Object.keys(NEUTRAL_PRESETS) as NeutralPreset[]

// Enough of the scale to show both the tint and the depth of each preset.
const RAMP = [100, 300, 400, 600, 800] as const

export function NeutralPicker({
  value,
  primary,
  onChange,
  ...props
}: {
  value: NeutralPreset
  primary: string
  onChange: (preset: NeutralPreset) => void
  "aria-labelledby"?: string
}) {
  return (
    <ToggleGroup
      variant="outline"
      spacing={2}
      value={[value]}
      onValueChange={(next) => {
        if (next.length > 0) onChange(next[0] as NeutralPreset)
      }}
      className="grid w-full grid-cols-2"
      {...props}
    >
      {PRESETS.map((p) => {
        const shades = neutralShades(p, primary)
        return (
          <ToggleGroupItem
            key={p}
            value={p}
            className="group/neutral h-auto flex-col items-stretch gap-2 p-2 font-normal shadow-xs aria-pressed:border-primary aria-pressed:font-medium aria-pressed:ring-1 aria-pressed:ring-primary aria-pressed:ring-inset"
          >
            <span
              aria-hidden
              className="grid h-5 grid-cols-5 overflow-hidden rounded-sm ring-1 ring-foreground/10 ring-inset"
            >
              {RAMP.map((step) => (
                <span key={step} style={{ background: shades[step] }} />
              ))}
            </span>
            <span className="flex items-center justify-between gap-2">
              {p === "tinted" ? "Tinted" : NEUTRAL_PRESETS[p].label}
              <HugeiconsIcon
                icon={Tick02Icon}
                aria-hidden
                className="invisible group-aria-pressed/neutral:visible"
              />
            </span>
          </ToggleGroupItem>
        )
      })}
    </ToggleGroup>
  )
}
