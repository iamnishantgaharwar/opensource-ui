"use client"

import { useId } from "react"

import { NumberField } from "@/components/typography/number-field"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useModuleSettings } from "@/hooks/use-settings"
import {
  SHADOW_PRESETS,
  shadowValue,
  STRENGTH_RANGE,
} from "@/lib/modules/shadow"

/**
 * Shadow strength (presets drawn as cards with that shadow, plus a slider)
 * and whether shadows take the neutral palette's tint.
 */
export function ShadowControls() {
  const id = useId()
  const [shadow, update] = useModuleSettings("shadow")
  const preset = SHADOW_PRESETS.find((p) => p.value === shadow.strength)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label id={`${id}-presets`}>Strength</Label>
        <ToggleGroup
          aria-labelledby={`${id}-presets`}
          variant="outline"
          spacing={2}
          value={preset ? [String(preset.value)] : []}
          onValueChange={(next) => {
            if (next.length > 0) update({ strength: Number(next[0]) })
          }}
          className="grid w-full grid-cols-4"
        >
          {SHADOW_PRESETS.map((p) => (
            <ToggleGroupItem
              key={p.value}
              value={String(p.value)}
              className="h-auto flex-col gap-2.5 px-1 pt-3 pb-2 font-normal aria-pressed:border-primary aria-pressed:font-medium aria-pressed:ring-1 aria-pressed:ring-primary aria-pressed:ring-inset"
            >
              {/* Untinted here: the app chrome doesn't carry the palette. */}
              <span
                aria-hidden
                className="h-6 w-9 rounded-md border bg-background"
                style={{ boxShadow: shadowValue("md", p.value, false) }}
              />
              <span className="text-[13px]">{p.label}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <div className="flex items-center gap-3 pt-1">
          <Slider
            aria-label="Shadow strength"
            min={STRENGTH_RANGE.min}
            max={STRENGTH_RANGE.max}
            step={STRENGTH_RANGE.step}
            value={[shadow.strength]}
            onValueChange={(v) =>
              update({ strength: Array.isArray(v) ? v[0] : v })
            }
            className="flex-1"
          />
          <NumberField
            aria-label="Shadow strength"
            value={shadow.strength}
            onChange={(strength) => update({ strength })}
            min={STRENGTH_RANGE.min}
            max={STRENGTH_RANGE.max}
            step={STRENGTH_RANGE.step}
            decimals={2}
            suffix="×"
            className="w-24 shrink-0"
          />
        </div>
      </div>

      <Label className="items-start justify-between gap-4 font-normal">
        <span className="flex flex-col gap-0.5">
          <span className="font-medium">Tint with neutral</span>
          <span className="text-[13px] leading-snug text-muted-foreground">
            Shadows take your neutral&apos;s darkest shade instead of pure black
          </span>
        </span>
        <Switch
          checked={shadow.tinted}
          onCheckedChange={(tinted) => update({ tinted })}
        />
      </Label>
    </div>
  )
}
