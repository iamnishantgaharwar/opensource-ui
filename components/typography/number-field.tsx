"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

/**
 * Number input that commits as soon as the text is a number in range, keeps
 * the draft while it isn't (e.g. "1." on the way to "1.25"), and shows the
 * stored value again on blur.
 */
export function NumberField({
  id,
  value,
  onChange,
  min,
  max,
  step,
  decimals = 0,
  suffix,
  className,
  ...props
}: {
  id?: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
  decimals?: number
  /** Unit shown inside the field, e.g. "px". */
  suffix?: string
  className?: string
  "aria-label"?: string
  "aria-describedby"?: string
}) {
  const [draft, setDraft] = useState<string | null>(null)
  const shown = draft ?? String(Number(value.toFixed(decimals)))
  const parsed = Number(draft)
  const invalid =
    draft !== null && (draft === "" || !(parsed >= min && parsed <= max))

  return (
    <div className={cn("relative", className)}>
      <Input
        id={id}
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        value={shown}
        aria-invalid={invalid || undefined}
        className={cn("h-9 px-3 tabular-nums shadow-xs", suffix && "pr-9")}
        onChange={(e) => {
          setDraft(e.target.value)
          const n = Number(e.target.value)
          if (e.target.value !== "" && n >= min && n <= max) {
            onChange(Number(n.toFixed(decimals)))
          }
        }}
        onBlur={() => setDraft(null)}
        {...props}
      />
      {suffix && (
        <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted-foreground">
          {suffix}
        </span>
      )}
    </div>
  )
}
