"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

/** Single-choice toggle group that never ends up with nothing selected. */
export function SegmentedControl<T extends string>({
  value,
  onValueChange,
  options,
  className,
  ...props
}: {
  value: T
  onValueChange: (value: T) => void
  options: ReadonlyArray<{ value: T; label: React.ReactNode }>
  className?: string
  "aria-label"?: string
  "aria-labelledby"?: string
}) {
  return (
    <ToggleGroup
      variant="outline"
      size="sm"
      value={[value]}
      onValueChange={(next) => {
        if (next.length > 0) onValueChange(next[0] as T)
      }}
      className={cn("w-full", className)}
      {...props}
    >
      {options.map((o) => (
        <ToggleGroupItem
          key={o.value}
          value={o.value}
          className="flex-1 aria-pressed:border-foreground/30"
        >
          {o.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
