"use client"

import { useId } from "react"

import { NumberField } from "@/components/typography/number-field"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useModuleSettings } from "@/hooks/use-settings"
import {
  clampSpacing,
  SPACING_PRESETS,
  SPACING_RANGE,
} from "@/lib/modules/spacing"

const fmt = (n: number) => String(Number(n.toFixed(2)))

/**
 * Density: one base unit that every Tailwind spacing utility multiplies.
 * Presets are drawn as three bars at that spacing.
 */
export function SpacingControls() {
  const id = useId()
  const [spacing, update] = useModuleSettings("spacing")
  const preset = SPACING_PRESETS.find((p) => p.value === spacing.base)
  const base = clampSpacing(spacing.base)

  return (
    <div className="flex flex-col gap-6">
      {/* 2×2 in narrow spots (toolbar popover), so "Comfortable" fits. */}
      <div className="@container flex flex-col gap-2">
        <Label id={`${id}-presets`}>Density</Label>
        <ToggleGroup
          aria-labelledby={`${id}-presets`}
          variant="outline"
          spacing={2}
          value={preset ? [String(preset.value)] : []}
          onValueChange={(next) => {
            if (next.length > 0) update({ base: Number(next[0]) })
          }}
          className="grid w-full grid-cols-2 @[22rem]:grid-cols-4"
        >
          {SPACING_PRESETS.map((p) => (
            <ToggleGroupItem
              key={p.value}
              value={String(p.value)}
              className="h-auto min-w-0 flex-col gap-2.5 px-1 pt-3 pb-2 font-normal aria-pressed:border-primary aria-pressed:font-medium aria-pressed:ring-1 aria-pressed:ring-primary aria-pressed:ring-inset"
            >
              <span
                aria-hidden
                className="flex h-6 flex-col justify-center"
                style={{ gap: `${p.value * 0.75}px` }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="block h-1 w-7 rounded-full bg-foreground/60"
                  />
                ))}
              </span>
              <span className="text-[13px]">{p.label}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <Label htmlFor={`${id}-base`}>Base unit</Label>
          <p className="text-[13px] text-muted-foreground tabular-nums">
            p-4 = {fmt(base * 4)}px · a button is {fmt(base * 8)}px tall
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Slider
            aria-label="Base unit"
            min={SPACING_RANGE.min}
            max={SPACING_RANGE.max}
            step={SPACING_RANGE.step}
            value={[spacing.base]}
            onValueChange={(v) => update({ base: Array.isArray(v) ? v[0] : v })}
            className="flex-1"
          />
          <NumberField
            id={`${id}-base`}
            value={spacing.base}
            onChange={(b) => update({ base: b })}
            min={SPACING_RANGE.min}
            max={SPACING_RANGE.max}
            step={SPACING_RANGE.step}
            decimals={2}
            suffix="px"
            className="w-24 shrink-0"
          />
        </div>
      </div>
    </div>
  )
}
