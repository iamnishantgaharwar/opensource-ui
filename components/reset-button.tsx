"use client"

import { RefreshIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"
import { settingsStore } from "@/hooks/use-settings"

export function ResetButton() {
  return (
    <Button
      variant="outline"
      size="lg"
      aria-label="Reset all settings to defaults"
      onClick={() => settingsStore.reset()}
    >
      <HugeiconsIcon
        icon={RefreshIcon}
        data-icon="inline-start"
        className="text-muted-foreground"
      />
      <span className="max-sm:sr-only">Reset palette</span>
    </Button>
  )
}
