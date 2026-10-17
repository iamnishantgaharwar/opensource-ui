"use client"

import { useId } from "react"

import { Section } from "@/components/section"
import { SegmentedControl } from "@/components/segmented-control"
import { NumberField } from "@/components/typography/number-field"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useModuleSettings } from "@/hooks/use-settings"
import {
  BASE_SIZE,
  FONT_CATEGORIES,
  FONTS,
  RATIO,
  RATIO_PRESETS,
  ROOT_SIZE,
  type FontCategory,
  type FontId,
  type Rounding,
  type TypeUnit,
} from "@/lib/modules/typography"

const CATEGORY_LABELS: Record<FontCategory, string> = {
  sans: "Sans serif",
  serif: "Serif",
  mono: "Monospace",
}

const FONT_LABELS: Record<string, string> = Object.fromEntries(
  Object.entries(FONTS).map(([id, f]) => [id, f.label])
)

const RATIO_LABELS: Record<string, string> = {
  ...Object.fromEntries(
    RATIO_PRESETS.map((p) => [String(p.value), `${p.label} · ${p.value}`])
  ),
  custom: "Custom",
}

export function FontSelect({
  id,
  value,
  onChange,
  allowSame = false,
}: {
  id: string
  value: string
  onChange: (value: string) => void
  allowSame?: boolean
}) {
  const items = allowSame
    ? { same: "Same as body", ...FONT_LABELS }
    : FONT_LABELS
  return (
    <Select value={value} onValueChange={(v) => v && onChange(v)} items={items}>
      <SelectTrigger
        id={id}
        className="h-9 w-full px-3 shadow-xs data-[size=default]:h-9"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        {allowSame && <SelectItem value="same">Same as body</SelectItem>}
        {FONT_CATEGORIES.map((category) => (
          <SelectGroup key={category}>
            <SelectLabel>{CATEGORY_LABELS[category]}</SelectLabel>
            {Object.entries(FONTS)
              .filter(([, f]) => f.category === category)
              .map(([fontId, f]) => (
                <SelectItem key={fontId} value={fontId}>
                  {f.label}
                </SelectItem>
              ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  )
}

/** Base size: slider plus number field. `id` labels the number field. */
export function BaseSizeInput({ id }: { id: string }) {
  const [type, update] = useModuleSettings("typography")
  return (
    <div className="flex items-center gap-3">
      <Slider
        aria-label="Base size"
        min={BASE_SIZE.min}
        max={BASE_SIZE.max}
        step={1}
        value={[type.baseSize]}
        onValueChange={(v) => update({ baseSize: Array.isArray(v) ? v[0] : v })}
        className="flex-1"
      />
      <NumberField
        id={id}
        value={type.baseSize}
        onChange={(baseSize) => update({ baseSize })}
        min={BASE_SIZE.min}
        max={BASE_SIZE.max}
        step={1}
        suffix="px"
        className="w-24 shrink-0"
      />
    </div>
  )
}

/** Ratio: preset menu plus a custom value. `id` labels the menu. */
export function RatioInput({ id }: { id: string }) {
  const [type, update] = useModuleSettings("typography")
  const preset = RATIO_PRESETS.find((p) => p.value === type.ratio)
  return (
    <div className="flex items-center gap-2">
      <Select
        value={preset ? String(preset.value) : "custom"}
        onValueChange={(v) => {
          if (v && v !== "custom") update({ ratio: Number(v) })
        }}
        items={RATIO_LABELS}
      >
        <SelectTrigger
          id={id}
          className="h-9 min-w-0 flex-1 px-3 shadow-xs data-[size=default]:h-9"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          {RATIO_PRESETS.map((p) => (
            <SelectItem key={p.value} value={String(p.value)}>
              {p.label} · {p.value}
            </SelectItem>
          ))}
          {!preset && <SelectItem value="custom">Custom</SelectItem>}
        </SelectContent>
      </Select>
      <NumberField
        aria-label="Custom ratio"
        value={type.ratio}
        onChange={(ratio) => update({ ratio })}
        min={RATIO.min}
        max={RATIO.max}
        step={0.01}
        decimals={3}
        className="w-24 shrink-0"
      />
    </div>
  )
}

/** Left-panel controls for the type scale (PRD T-1 to T-10). */
export function TypographyControls() {
  const id = useId()
  const [type, update] = useModuleSettings("typography")
  return (
    <div className="flex flex-col gap-10">
      <Section id="scale" size="sm" title="Scale" className="gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <Label htmlFor={`${id}-base`}>Base size</Label>
            <p className="text-[13px] text-muted-foreground">
              Body text; every other role is a step up or down from it
            </p>
          </div>
          <BaseSizeInput id={`${id}-base`} />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <Label htmlFor={`${id}-ratio`}>Ratio</Label>
            <p className="text-[13px] text-muted-foreground">
              How much each step grows
            </p>
          </div>
          <RatioInput id={`${id}-ratio`} />
        </div>

        <div className="flex flex-col gap-2">
          <Label id={`${id}-rounding`}>Rounding</Label>
          <SegmentedControl<Rounding>
            aria-labelledby={`${id}-rounding`}
            value={type.rounding}
            onValueChange={(rounding) => update({ rounding })}
            options={[
              { value: "none", label: "None" },
              { value: "half", label: "0.5 px" },
              { value: "whole", label: "Whole px" },
            ]}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <Label id={`${id}-unit`}>Unit</Label>
            <p className="text-[13px] text-muted-foreground">
              What exported sizes are written in
            </p>
          </div>
          <SegmentedControl<TypeUnit>
            aria-labelledby={`${id}-unit`}
            value={type.unit}
            onValueChange={(unit) => update({ unit })}
            options={[
              { value: "rem", label: "rem" },
              { value: "px", label: "px" },
            ]}
          />
          {type.unit === "rem" && (
            <div className="flex items-center justify-between gap-3 pt-1">
              <Label
                htmlFor={`${id}-root`}
                className="font-normal text-muted-foreground"
              >
                1rem equals
              </Label>
              <NumberField
                id={`${id}-root`}
                value={type.rootSize}
                onChange={(rootSize) => update({ rootSize })}
                min={ROOT_SIZE.min}
                max={ROOT_SIZE.max}
                step={1}
                suffix="px"
                className="w-24"
              />
            </div>
          )}
        </div>
      </Section>

      <Section
        id="fonts"
        size="sm"
        title="Fonts"
        description="System stacks or Google Fonts, loaded as you pick them"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-body-font`}>Body</Label>
          <FontSelect
            id={`${id}-body-font`}
            value={type.bodyFont}
            onChange={(v) => update({ bodyFont: v as FontId })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-heading-font`}>Headings</Label>
          <FontSelect
            id={`${id}-heading-font`}
            value={type.headingFont}
            onChange={(v) => update({ headingFont: v as FontId | "same" })}
            allowSame
          />
        </div>
      </Section>
    </div>
  )
}
