"use client"

import { useId } from "react"

import { NumberField } from "@/components/typography/number-field"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useModuleSettings } from "@/hooks/use-settings"
import { RADIUS_PRESETS, RADIUS_RANGE } from "@/lib/modules/radius"

/**
 * Base radius: shadcn's presets as buttons (each drawn with its own corner),
 * plus a slider and field for anything in between.
 */
export function RadiusControls() {
  const id = useId()
  const [radius, update] = useModuleSettings("radius")
  const preset = RADIUS_PRESETS.find((p) => p === radius.base)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label id={`${id}-presets`}>Presets</Label>
        <ToggleGroup
          aria-labelledby={`${id}-presets`}
          variant="outline"
          spacing={2}
          value={preset === undefined ? [] : [String(preset)]}
          onValueChange={(next) => {
            if (next.length > 0) update({ base: Number(next[0]) })
          }}
          className="grid w-full grid-cols-3"
        >
          {RADIUS_PRESETS.map((p) => (
            <ToggleGroupItem
              key={p}
              value={String(p)}
              aria-label={`${p} rem`}
              className="h-auto flex-col gap-2 py-3 font-normal shadow-xs aria-pressed:border-primary aria-pressed:font-medium aria-pressed:ring-1 aria-pressed:ring-primary aria-pressed:ring-inset"
            >
              {/* A corner drawn at this radius, scaled up so it reads. */}
              <span
                aria-hidden
                className="size-6 border-t-2 border-l-2 border-foreground/70"
                style={{ borderTopLeftRadius: `${p * 1.5}rem` }}
              />
              <span className="tabular-nums">{p}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <Label htmlFor={`${id}-base`}>Base radius</Label>
          <p className="text-[13px] text-muted-foreground">
            rounded-lg; the other sizes scale from it like shadcn&apos;s
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Slider
            aria-label="Base radius"
            min={RADIUS_RANGE.min}
            max={RADIUS_RANGE.max}
            step={RADIUS_RANGE.step}
            value={[radius.base]}
            onValueChange={(v) => update({ base: Array.isArray(v) ? v[0] : v })}
            className="flex-1"
          />
          <NumberField
            id={`${id}-base`}
            value={radius.base}
            onChange={(base) => update({ base })}
            min={RADIUS_RANGE.min}
            max={RADIUS_RANGE.max}
            step={RADIUS_RANGE.step}
            decimals={3}
            suffix="rem"
            className="w-28 shrink-0"
          />
        </div>
      </div>
    </div>
  )
}
