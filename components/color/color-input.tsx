"use client"

import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useState } from "react"
import { HexColorPicker } from "react-colorful"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import {
  formatHslString,
  formatRgbString,
  parseColor,
} from "@/lib/modules/color"
import { cn } from "@/lib/utils"

const FORMATS = { hex: "HEX", rgb: "RGB", hsl: "HSL" } as const
type Format = keyof typeof FORMATS

function format(hex: string, f: Format) {
  if (f === "rgb") return formatRgbString(hex)
  if (f === "hsl") return formatHslString(hex)
  return hex.toUpperCase()
}

/** Striped look for a swatch with no color picked yet. */
export const EMPTY_SWATCH =
  "border border-dashed border-foreground/25 bg-[repeating-linear-gradient(45deg,transparent_0_4px,var(--muted)_4px_8px)] ring-0"

/**
 * Text field + format menu. Accepts HEX, RGB or HSL (any valid CSS color) and
 * commits as soon as the text parses; invalid text is flagged until blur.
 * `trailing` replaces the format menu (an auto-suggested slot shows its
 * harmony rule there instead).
 */
export function ColorTextField({
  id,
  label,
  value,
  onChange,
  trailing,
  className,
}: {
  id?: string
  label: string
  value: string | null
  onChange: (hex: string) => void
  trailing?: React.ReactNode
  className?: string
}) {
  const [fmt, setFmt] = useState<Format>("hex")
  const [draft, setDraft] = useState<string | null>(null)
  const shown = draft ?? (value ? format(value, fmt) : "")
  const invalid = draft !== null && draft !== "" && !parseColor(draft)

  return (
    <div className={cn("flex min-w-0 flex-1 items-center gap-2", className)}>
      <Input
        id={id}
        value={shown}
        aria-label={id ? undefined : `${label} color`}
        placeholder="Pick or type a color"
        spellCheck={false}
        autoComplete="off"
        aria-invalid={invalid || undefined}
        className="h-9 min-w-0 flex-1 px-3 font-mono text-sm shadow-xs placeholder:font-sans"
        onChange={(e) => {
          setDraft(e.target.value)
          const hex = parseColor(e.target.value)
          if (hex) onChange(hex)
        }}
        onBlur={() => setDraft(null)}
      />
      {trailing ?? (
        <Select
          value={fmt}
          onValueChange={(v) => v && setFmt(v)}
          items={FORMATS}
        >
          <SelectTrigger
            aria-label={`${label} color format`}
            className="h-9 shrink-0 px-3 shadow-xs data-[size=default]:h-9"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(FORMATS).map(([v, l]) => (
              <SelectItem key={v} value={v}>
                {l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  )
}

/**
 * Swatch + picker popover + text field. A null value renders the empty
 * "pick a color" state.
 */
export function ColorInput({
  id,
  label,
  value,
  onChange,
  onClear,
  pickerStart = "#808080",
  trailing,
}: {
  id: string
  label: string
  value: string | null
  onChange: (hex: string) => void
  onClear?: () => void
  /** Where the picker starts when the value is empty. */
  pickerStart?: string
  trailing?: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger
          aria-label={`Pick ${label} color`}
          className={cn(
            "size-9 shrink-0 rounded-lg border ring-2 ring-background transition-colors outline-none ring-inset hover:border-foreground/40 focus-visible:ring-3 focus-visible:ring-ring/50",
            !value && EMPTY_SWATCH
          )}
          style={value ? { background: value } : undefined}
        />
        <PopoverContent align="start" className="w-auto">
          <HexColorPicker
            color={value ?? pickerStart}
            onChange={onChange}
            aria-label={`${label} color`}
          />
        </PopoverContent>
      </Popover>
      <ColorTextField
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        trailing={trailing}
      />
      {onClear && value && (
        <Button
          variant="ghost"
          size="icon-lg"
          aria-label={`Clear ${label} color`}
          onClick={onClear}
        >
          <HugeiconsIcon icon={Cancel01Icon} />
        </Button>
      )}
    </div>
  )
}
