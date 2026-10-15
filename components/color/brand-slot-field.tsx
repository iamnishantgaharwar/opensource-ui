"use client"

import { useId } from "react"

import { ColorInput } from "@/components/color/color-input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { HARMONIES, type BrandSlot, type Harmony } from "@/lib/modules/color"

const HARMONY_LABELS = Object.fromEntries(
  Object.entries(HARMONIES).map(([k, v]) => [k, v.label])
)

/**
 * An optional brand color: either auto-suggested from primary by a harmony
 * rule, or picked by hand (empty until the user picks one).
 */
export function BrandSlotField({
  label,
  hint,
  slot,
  suggested,
  onChange,
}: {
  label: string
  hint: string
  slot: BrandSlot
  /** The color the harmony rule currently suggests. */
  suggested: string
  onChange: (slot: BrandSlot) => void
}) {
  const id = useId()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end justify-between gap-2">
        <div className="flex flex-col">
          <Label htmlFor={`${id}-input`}>{label}</Label>
          <p className="text-[13px] text-muted-foreground">{hint}</p>
        </div>
        <Label className="shrink-0 text-[13px] font-normal text-muted-foreground">
          <Checkbox
            checked={slot.auto}
            onCheckedChange={(auto) => onChange({ ...slot, auto })}
          />
          Auto-suggest
        </Label>
      </div>
      {slot.auto ? (
        // Shows the suggestion; picking or typing a color takes over by hand.
        <ColorInput
          id={`${id}-input`}
          label={label}
          value={suggested}
          onChange={(hex) => onChange({ ...slot, auto: false, hex })}
          trailing={
            <Select
              value={slot.harmony}
              onValueChange={(harmony) =>
                harmony && onChange({ ...slot, harmony: harmony as Harmony })
              }
              items={HARMONY_LABELS}
            >
              <SelectTrigger
                aria-label={`${label} harmony`}
                className="h-9 shrink-0 px-3 shadow-xs data-[size=default]:h-9"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end" alignItemWithTrigger={false}>
                {Object.entries(HARMONY_LABELS).map(([v, l]) => (
                  <SelectItem key={v} value={v}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          }
        />
      ) : (
        <ColorInput
          id={`${id}-input`}
          label={label}
          value={slot.hex}
          pickerStart={suggested}
          onChange={(hex) => onChange({ ...slot, hex })}
          onClear={() => onChange({ ...slot, hex: null })}
        />
      )}
    </div>
  )
}
