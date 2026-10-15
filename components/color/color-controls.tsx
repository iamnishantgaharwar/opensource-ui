"use client"

import { ArrowDown01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useId, useMemo } from "react"

import { BrandSlotField } from "@/components/color/brand-slot-field"
import { ColorInput } from "@/components/color/color-input"
import { NeutralPicker } from "@/components/color/neutral-picker"
import { Section } from "@/components/section"
import { SegmentedControl } from "@/components/segmented-control"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { useModuleSettings } from "@/hooks/use-settings"
import {
  generateScale,
  resolveSlot,
  SEMANTIC_COLORS,
  type BrandSlot,
  type SemanticColor,
} from "@/lib/modules/color"

const SLOTS = [
  {
    name: "secondary",
    label: "Secondary",
    hint: "Supporting brand color",
  },
  { name: "accent", label: "Accent", hint: "Sparing highlights" },
  { name: "tertiary", label: "Tertiary", hint: "Optional third hue" },
] as const

const SEMANTIC_LABELS: Record<SemanticColor, string> = {
  success: "Success",
  warning: "Warning",
  info: "Info",
  destructive: "Destructive",
}

export function ColorControls() {
  const id = useId()
  const [color, update] = useModuleSettings("color")
  const anchor = useMemo(
    () => generateScale(color.primary, color.anchor).anchor,
    [color.primary, color.anchor]
  )

  return (
    <div className="flex flex-col gap-10">
      <Section id="brand" size="sm" title="Brand" className="gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <Label htmlFor={`${id}-primary`}>Primary</Label>
            <p className="text-[13px] text-muted-foreground">
              Main brand color, kept exactly at step {anchor}
            </p>
          </div>
          <ColorInput
            id={`${id}-primary`}
            label="Primary"
            value={color.primary}
            onChange={(primary) => update({ primary })}
          />
        </div>

        {SLOTS.map(({ name, label, hint }) => (
          <BrandSlotField
            key={name}
            label={label}
            hint={hint}
            slot={color[name]}
            suggested={resolveSlot(
              { ...color[name], auto: true },
              color.primary,
              name
            )!}
            onChange={(slot: BrandSlot) => update({ [name]: slot })}
          />
        ))}
      </Section>

      <Section
        id="neutral"
        size="sm"
        title="Neutral"
        description="Grays for backgrounds, text and borders"
        className="gap-3"
      >
        <NeutralPicker
          aria-labelledby="neutral-title"
          value={color.neutral}
          primary={color.primary}
          onChange={(neutral) => update({ neutral })}
        />
      </Section>

      <Section
        id="status"
        size="sm"
        title="Status"
        description="For alerts, badges and validation"
      >
        {SEMANTIC_COLORS.map((name) => (
          <div
            key={name}
            className="grid grid-cols-[6rem_minmax(0,1fr)] items-center gap-2"
          >
            <Label htmlFor={`${id}-${name}`}>{SEMANTIC_LABELS[name]}</Label>
            <ColorInput
              id={`${id}-${name}`}
              label={SEMANTIC_LABELS[name]}
              value={color.semantic[name]}
              onChange={(hex) =>
                update({ semantic: { ...color.semantic, [name]: hex } })
              }
            />
          </div>
        ))}
      </Section>

      <Collapsible>
        <CollapsibleTrigger className="group flex items-center gap-1 rounded-md text-sm font-medium text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50">
          Advanced
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            className="size-4 transition-transform group-data-panel-open:rotate-180"
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-col gap-5 pt-4">
            <div className="flex flex-col gap-2">
              <div>
                <Label id={`${id}-anchor`}>Input color position</Label>
                <p className="text-xs text-muted-foreground">
                  Where each input color sits in its 50–950 scale
                </p>
              </div>
              <SegmentedControl
                aria-labelledby={`${id}-anchor`}
                value={color.anchor}
                onValueChange={(anchor) => update({ anchor })}
                options={[
                  { value: "auto", label: "Nearest lightness" },
                  { value: "500", label: "Always 500" },
                ]}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <Label id={`${id}-style`}>Secondary &amp; accent style</Label>
                <p className="text-xs text-muted-foreground">
                  Subtle keeps shadcn&apos;s look: light tints for secondary
                  buttons and hover states. Solid uses the brand colors as-is.
                </p>
              </div>
              <SegmentedControl
                aria-labelledby={`${id}-style`}
                value={color.brandRoleStyle}
                onValueChange={(brandRoleStyle) => update({ brandRoleStyle })}
                options={[
                  { value: "subtle", label: "Subtle" },
                  { value: "solid", label: "Solid" },
                ]}
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
