"use client"

import { RefreshIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { settingsStore } from "@/hooks/use-settings"

/** Icon-only beside undo/redo, which can take a reset back. */
export function ResetButton() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label="Reset all settings to defaults"
            onClick={() => settingsStore.reset()}
          />
        }
      >
        <HugeiconsIcon icon={RefreshIcon} />
      </TooltipTrigger>
      <TooltipContent>Reset to defaults</TooltipContent>
    </Tooltip>
  )
}
