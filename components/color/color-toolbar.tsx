"use client"

import {
  ArrowRight01Icon,
  Cancel01Icon,
  CodeIcon,
  SparklesIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useId, useMemo, useState } from "react"
import Link from "next/link"
import { HexColorPicker } from "react-colorful"

import { ColorTextField, EMPTY_SWATCH } from "@/components/color/color-input"
import { NeutralPicker } from "@/components/color/neutral-picker"
import { SegmentedControl } from "@/components/segmented-control"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useCopy } from "@/hooks/use-copy"
import { useModuleSettings, useSettings } from "@/hooks/use-settings"
import { exportShadcn } from "@/lib/export/shadcn"
import {
  generateColorSystem,
  HARMONIES,
  neutralShades,
  resolveSlot,
  SEMANTIC_COLORS,
  type BrandSlot,
  type ColorSettings,
  type Harmony,
  type SemanticColor,
} from "@/lib/modules/color"
import { generateTokens } from "@/lib/tokens/registry"
import { cn } from "@/lib/utils"

const SLOTS = [
  { name: "secondary", label: "Secondary" },
  { name: "accent", label: "Accent" },
  { name: "tertiary", label: "Tertiary" },
] as const

const HARMONY_LABELS = Object.fromEntries(
  Object.entries(HARMONIES).map(([k, v]) => [k, v.label])
)

const SEMANTIC_LABELS: Record<SemanticColor, string> = {
  success: "Success",
  warning: "Warning",
  info: "Info",
  destructive: "Destructive",
}

const PICKER_STYLE = { width: "100%", height: 160 }
// Shorter on phones so more of the preview stays visible while picking.
const PICKER_CLASS = "max-sm:h-28!"

const TOOL_BUTTON =
  "relative grid size-9 shrink-0 place-items-center rounded-lg outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 data-popup-open:bg-muted"

/**
 * A labelled tool: color dot plus its role name. On phones the name is hidden
 * (the trigger's aria-label still carries it) and the chip is a square like
 * the other tools, so the whole bar fits without scrolling.
 */
const TOOL_CHIP =
  "relative flex h-9 shrink-0 items-center gap-2 rounded-lg pr-3 pl-2 text-[13px] font-medium outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 data-popup-open:bg-muted max-sm:w-9 max-sm:justify-center max-sm:px-0"

/**
 * Floating color toolbar (Figma-style) for editing the color settings from any
 * page. Each button opens its panel above the bar; changes apply live and are
 * saved like the main controls. `children` adds page-specific tools at the end.
 */
export function ColorToolbar({ children }: { children?: React.ReactNode }) {
  const [color, update] = useModuleSettings("color")

  return (
    <div
      role="group"
      aria-label="Color toolbar"
      className="sticky bottom-6 z-30 mx-auto mt-6 no-scrollbar flex w-fit max-w-full items-center gap-0.5 overflow-x-auto rounded-[14px] border bg-popover/95 p-1 text-popover-foreground shadow-lg backdrop-blur sm:gap-1 sm:p-1.5"
    >
      <ToolPopover
        label="Primary"
        chip
        trigger={<Swatch fill={color.primary} text="Primary" />}
      >
        <PrimaryPanel color={color} update={update} />
      </ToolPopover>
      {SLOTS.map(({ name, label }) => {
        const suggested = resolveSlot(
          { ...color[name], auto: true },
          color.primary,
          name
        )!
        const slot = color[name]
        return (
          <ToolPopover
            key={name}
            label={slot.auto ? `${label} (auto-suggested)` : label}
            chip
            trigger={
              <Swatch
                fill={slot.auto ? suggested : slot.hex}
                auto={slot.auto}
                text={label}
              />
            }
          >
            <SlotPanel
              label={label}
              slot={slot}
              suggested={suggested}
              onChange={(next) => update({ [name]: next })}
            />
          </ToolPopover>
        )
      })}
      <Separator orientation="vertical" className="mx-1 h-5" />
      <ToolPopover
        label="Neutral"
        trigger={<NeutralSwatch settings={color} />}
        className="w-80"
      >
        <PanelHeader
          title="Neutral"
          hint="Grays for backgrounds, text and borders"
        />
        <NeutralPicker
          value={color.neutral}
          primary={color.primary}
          onChange={(neutral) => update({ neutral })}
        />
      </ToolPopover>
      <ToolPopover
        label="Semantic colors"
        trigger={<SemanticSwatch semantic={color.semantic} />}
        className="w-80"
      >
        <SemanticPanel color={color} update={update} />
      </ToolPopover>
      <Separator orientation="vertical" className="mx-1 h-6" />
      {children}
      <CopyCssButton />
    </div>
  )
}

function ToolPopover({
  label,
  trigger,
  chip = false,
  className,
  children,
}: {
  label: string
  trigger: React.ReactElement
  /** Show the trigger as a labelled chip instead of an icon button. */
  chip?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger
          render={
            <PopoverTrigger
              aria-label={label}
              className={chip ? TOOL_CHIP : TOOL_BUTTON}
              render={trigger}
            />
          }
        />
        <TooltipContent side="top">{label}</TooltipContent>
      </Tooltip>
      <PopoverContent
        side="top"
        sideOffset={12}
        className={cn("w-72 gap-3", className)}
      >
        {children}
        <Link
          href="/#color"
          className="flex items-center gap-1 self-start rounded-md text-sm font-medium outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Fine-tune in Color
          <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
        </Link>
      </PopoverContent>
    </Popover>
  )
}

/** A tool button with a tooltip and no popover. */
export function ToolButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            aria-label={label}
            className={TOOL_BUTTON}
            onClick={onClick}
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent side="top">{label}</TooltipContent>
    </Tooltip>
  )
}

function Swatch({
  fill,
  auto = false,
  text,
  ...props
}: {
  fill: string | null
  auto?: boolean
  /** Role name next to the dot, from 640px up. */
  text?: string
} & React.ComponentProps<"button">) {
  return (
    <button type="button" {...props}>
      <span className="relative">
        <span
          className={cn(
            "block size-5 rounded-full ring-1 ring-foreground/15",
            !fill && EMPTY_SWATCH
          )}
          style={fill ? { background: fill } : undefined}
        />
        {auto && (
          <span className="absolute -right-1 -bottom-1 grid size-3.5 place-items-center rounded-full bg-popover text-muted-foreground ring-1 ring-border">
            <HugeiconsIcon icon={SparklesIcon} className="size-2.5" />
          </span>
        )}
      </span>
      {text && <span className="max-sm:hidden">{text}</span>}
    </button>
  )
}

function NeutralSwatch({
  settings,
  ...props
}: { settings: ColorSettings } & React.ComponentProps<"button">) {
  const shades = neutralShades(settings.neutral, settings.primary)
  return (
    <button type="button" {...props}>
      <span
        className="block size-5 rounded-full ring-1 ring-foreground/15"
        style={{
          background: `linear-gradient(135deg, ${shades[200]} 50%, ${shades[700]} 50%)`,
        }}
      />
    </button>
  )
}

function SemanticSwatch({
  semantic,
  ...props
}: {
  semantic: ColorSettings["semantic"]
} & React.ComponentProps<"button">) {
  return (
    <button type="button" {...props}>
      <span className="grid size-5 grid-cols-2 gap-0.5">
        {SEMANTIC_COLORS.map((name) => (
          <span
            key={name}
            className="rounded-full ring-1 ring-foreground/10"
            style={{ background: semantic[name] }}
          />
        ))}
      </span>
    </button>
  )
}

function PanelHeader({
  title,
  hint,
  children,
}: {
  title: string
  hint?: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div>
        <p className="text-sm font-medium">{title}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      {children}
    </div>
  )
}

type Update = (patch: Partial<ColorSettings>) => void

function PrimaryPanel({
  color,
  update,
}: {
  color: ColorSettings
  update: Update
}) {
  const anchor = useMemo(
    () => generateColorSystem(color).palettes.primary!.anchor,
    [color]
  )
  return (
    <>
      <PanelHeader
        title="Primary"
        hint={`Main brand color · kept exactly at step ${anchor}`}
      />
      <HexColorPicker
        color={color.primary}
        onChange={(primary) => update({ primary })}
        style={PICKER_STYLE}
        className={PICKER_CLASS}
        aria-label="Primary color"
      />
      <ColorTextField
        label="Primary"
        value={color.primary}
        onChange={(primary) => update({ primary })}
      />
    </>
  )
}

function SlotPanel({
  label,
  slot,
  suggested,
  onChange,
}: {
  label: string
  slot: BrandSlot
  suggested: string
  onChange: (slot: BrandSlot) => void
}) {
  const id = useId()
  return (
    <>
      <PanelHeader title={label}>
        <Label className="shrink-0 gap-1.5 text-xs font-normal text-muted-foreground">
          <Checkbox
            checked={slot.auto}
            onCheckedChange={(auto) => onChange({ ...slot, auto })}
          />
          Auto-suggest
        </Label>
      </PanelHeader>
      {slot.auto ? (
        <>
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="size-8 shrink-0 rounded-lg ring-1 ring-foreground/10 ring-inset"
              style={{ background: suggested }}
            />
            <Select
              value={slot.harmony}
              onValueChange={(harmony) =>
                harmony && onChange({ ...slot, harmony: harmony as Harmony })
              }
              items={HARMONY_LABELS}
            >
              <SelectTrigger
                id={`${id}-harmony`}
                aria-label={`${label} harmony`}
                className="min-w-0 flex-1"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(HARMONY_LABELS).map(([v, l]) => (
                  <SelectItem key={v} value={v}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-xs text-muted-foreground">
            Suggested from primary: {suggested.toUpperCase()}. Untick to pick
            your own.
          </p>
        </>
      ) : (
        <>
          <HexColorPicker
            color={slot.hex ?? suggested}
            onChange={(hex) => onChange({ ...slot, hex })}
            style={PICKER_STYLE}
            className={PICKER_CLASS}
            aria-label={`${label} color`}
          />
          <div className="flex items-center gap-1.5">
            <ColorTextField
              label={label}
              value={slot.hex}
              onChange={(hex) => onChange({ ...slot, hex })}
            />
            {slot.hex && (
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Clear ${label} color`}
                onClick={() => onChange({ ...slot, hex: null })}
              >
                <HugeiconsIcon icon={Cancel01Icon} />
              </Button>
            )}
          </div>
          {!slot.hex && (
            <p className="text-xs text-muted-foreground">
              Empty: {label.toLowerCase()} roles use the neutral grays.
            </p>
          )}
        </>
      )}
    </>
  )
}

function SemanticPanel({
  color,
  update,
}: {
  color: ColorSettings
  update: Update
}) {
  const [active, setActive] = useState<SemanticColor>("success")
  const set = (hex: string) =>
    update({ semantic: { ...color.semantic, [active]: hex } })

  return (
    <>
      <PanelHeader
        title="Semantic"
        hint="Status colors for alerts, badges and validation"
      />
      <SegmentedControl
        aria-label="Semantic color"
        value={active}
        onValueChange={setActive}
        options={SEMANTIC_COLORS.map((name) => ({
          value: name,
          label: (
            <span className="flex items-center gap-1">
              <span
                aria-hidden
                className="size-2 rounded-full"
                style={{ background: color.semantic[name] }}
              />
              {name === "destructive" ? "Error" : SEMANTIC_LABELS[name]}
            </span>
          ),
        }))}
      />
      <HexColorPicker
        color={color.semantic[active]}
        onChange={set}
        style={PICKER_STYLE}
        className={PICKER_CLASS}
        aria-label={`${SEMANTIC_LABELS[active]} color`}
      />
      <ColorTextField
        key={active}
        label={SEMANTIC_LABELS[active]}
        value={color.semantic[active]}
        onChange={set}
      />
    </>
  )
}

function CopyCssButton() {
  const settings = useSettings()
  const { copied, copy } = useCopy()
  return (
    <ToolButton
      label="Copy shadcn CSS"
      onClick={() =>
        copy(
          exportShadcn(generateTokens(settings)).code,
          "css",
          "globals.css for shadcn"
        )
      }
    >
      <HugeiconsIcon icon={copied ? Tick02Icon : CodeIcon} className="size-4" />
    </ToolButton>
  )
}
