"use client"

import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useState } from "react"

import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useColorSystem } from "@/hooks/use-color-system"
import { useCopy } from "@/hooks/use-copy"
import {
  contrast,
  contrastLevel,
  formatHslString,
  formatOklch,
  formatRgbString,
  STEPS,
  type Palette,
  type PaletteName,
} from "@/lib/modules/color"
import { cn } from "@/lib/utils"

const COPY_FORMATS = {
  hex: "HEX",
  oklch: "OKLCH",
  rgb: "RGB",
  hsl: "HSL",
} as const
type CopyFormat = keyof typeof COPY_FORMATS

const PALETTE_ORDER: PaletteName[] = [
  "primary",
  "secondary",
  "accent",
  "tertiary",
  "neutral",
  "success",
  "warning",
  "info",
  "destructive",
]

function formatAs(hex: string, f: CopyFormat) {
  if (f === "oklch") return formatOklch(hex)
  if (f === "rgb") return formatRgbString(hex)
  if (f === "hsl") return formatHslString(hex)
  return hex.toUpperCase()
}

const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1)

export function PalettesSection() {
  const { palettes } = useColorSystem()
  const [format, setFormat] = useState<CopyFormat>("hex")
  const { copied, copy } = useCopy()

  return (
    <Section
      id="palettes"
      title="Palettes"
      description="Click a swatch to copy it. Each shows the best text contrast it supports."
      className="gap-8"
      action={
        <div className="flex items-center gap-2">
          <span id="copy-format" className="text-sm text-muted-foreground">
            Copy as
          </span>
          <ToggleGroup
            aria-labelledby="copy-format"
            value={[format]}
            onValueChange={(next) => {
              if (next.length > 0) setFormat(next[0] as CopyFormat)
            }}
            className="gap-1 rounded-[10px] bg-muted p-1"
          >
            {Object.entries(COPY_FORMATS).map(([v, l]) => (
              <ToggleGroupItem
                key={v}
                value={v}
                className="h-8 px-3 font-normal hover:bg-background/60 aria-pressed:bg-background aria-pressed:font-medium aria-pressed:shadow-xs"
              >
                {l}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      }
    >
      {PALETTE_ORDER.filter((name) => palettes[name]).map((name) => (
        <PaletteRow
          key={name}
          name={name}
          palette={palettes[name]!}
          format={format}
          copied={copied}
          copy={copy}
        />
      ))}
    </Section>
  )
}

function PaletteRow({
  name,
  palette,
  format,
  copied,
  copy,
}: {
  name: PaletteName
  palette: Palette
  format: CopyFormat
  copied: string | null
  copy: ReturnType<typeof useCopy>["copy"]
}) {
  const allKey = `${name}:all`
  const copyAll = () =>
    copy(
      STEPS.map(
        (s) => `--${name}-${s}: ${formatAs(palette.shades[s], format)};`
      ).join("\n"),
      allKey,
      `${name} palette`
    )

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-semibold">{capitalize(name)}</h3>
        <Button variant="ghost" onClick={copyAll}>
          <HugeiconsIcon
            icon={copied === allKey ? Tick02Icon : Copy01Icon}
            data-icon="inline-start"
            className="text-muted-foreground"
          />
          Copy palette
        </Button>
      </div>
      {/* Steps stay readable on narrow screens: the row scrolls instead. On
          phones (where it always overflows) the scrollbar is hidden and the
          right edge fades to show there's more; the fade clears at the end. */}
      <div className="overflow-x-auto max-md:no-scrollbar max-md:scroll-fade-r max-md:scroll-fade-e-8">
        <ul className="grid min-w-190 grid-cols-11 gap-2 p-1">
          {STEPS.map((step) => {
            const hex = palette.shades[step]
            const key = `${name}:${step}`
            return (
              <li key={step}>
                <Swatch
                  label={`${name} ${step}`}
                  step={step}
                  hex={hex}
                  isInput={name !== "neutral" && step === palette.anchor}
                  copied={copied === key}
                  onCopy={(text) => {
                    const value = formatAs(hex, format)
                    // The toast takes the copied swatch's color, with the
                    // text color that contrasts best on it.
                    copy(value, key, value, {
                      style: {
                        "--normal-bg": hex,
                        "--normal-text": text,
                        "--normal-border": hex,
                      } as React.CSSProperties,
                      // Sonner's muted gray would vanish on dark swatches.
                      classNames: {
                        description:
                          "truncate font-mono text-current! opacity-80",
                      },
                    })
                  }}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function Swatch({
  label,
  step,
  hex,
  isInput,
  copied,
  onCopy,
}: {
  label: string
  step: number
  hex: string
  isInput: boolean
  copied: boolean
  /** Called with the text color (black or white) that reads best on it. */
  onCopy: (text: string) => void
}) {
  const onWhite = contrast(hex, "#ffffff")
  const onBlack = contrast(hex, "#000000")
  const text = onWhite >= onBlack ? "#ffffff" : "#000000"
  const best = Math.max(onWhite, onBlack)

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            aria-label={`Copy ${label}, ${hex}`}
            onClick={() => onCopy(text)}
            className="group flex w-full min-w-0 flex-col gap-2 rounded-lg text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        }
      >
        <span
          className={cn(
            "flex h-14 w-full items-end justify-between rounded-lg p-2 text-[13px] font-medium transition-transform group-hover:-translate-y-px motion-reduce:transition-none motion-reduce:group-hover:translate-y-0",
            isInput
              ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
              : "ring-1 ring-foreground/10 ring-inset"
          )}
          style={{ background: hex, color: text }}
        >
          <span className="truncate">{contrastLevel(best)}</span>
          {copied && <HugeiconsIcon icon={Tick02Icon} className="size-4" />}
        </span>
        <span className="flex flex-col text-[13px]">
          <span className="font-medium">
            {step}
            {isInput && " · base"}
          </span>
          <span className="truncate font-mono text-muted-foreground uppercase">
            {hex}
          </span>
        </span>
      </TooltipTrigger>
      <TooltipContent className="flex flex-col gap-0.5 font-mono text-[11px]">
        {isInput && <span className="font-sans">Your input color</span>}
        <span>
          White {onWhite.toFixed(2)} · {contrastLevel(onWhite)}
        </span>
        <span>
          Black {onBlack.toFixed(2)} · {contrastLevel(onBlack)}
        </span>
        <span>{formatOklch(hex)}</span>
        <span>{formatRgbString(hex)}</span>
      </TooltipContent>
    </Tooltip>
  )
}
