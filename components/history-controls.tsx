"use client"

import { Redo02Icon, Undo02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { settingsStore, useHistory } from "@/hooks/use-settings"

/** Inside a text field, ⌘Z belongs to the field's own undo. */
function isTextEntry(el: Element | null) {
  if (!(el instanceof HTMLElement)) return false
  if (el.isContentEditable || el.tagName === "TEXTAREA") return true
  return (
    el.tagName === "INPUT" &&
    !["checkbox", "radio", "range", "button"].includes(
      (el as HTMLInputElement).type
    )
  )
}

/** Undo/redo buttons, plus ⌘Z / ⇧⌘Z (Ctrl+Z / Ctrl+Y) anywhere else. */
export function HistoryControls() {
  const { canUndo, canRedo } = useHistory()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.altKey) return
      if (isTextEntry(document.activeElement)) return
      const key = e.key.toLowerCase()
      if (key === "z" && !e.shiftKey) {
        e.preventDefault()
        settingsStore.undo()
      } else if ((key === "z" && e.shiftKey) || (key === "y" && e.ctrlKey)) {
        e.preventDefault()
        settingsStore.redo()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <div className="flex items-center gap-1">
      <HistoryButton
        label="Undo"
        shortcut="⌘Z"
        icon={Undo02Icon}
        disabled={!canUndo}
        onClick={() => settingsStore.undo()}
      />
      <HistoryButton
        label="Redo"
        shortcut="⇧⌘Z"
        icon={Redo02Icon}
        disabled={!canRedo}
        onClick={() => settingsStore.redo()}
      />
    </div>
  )
}

function HistoryButton({
  label,
  shortcut,
  icon,
  disabled,
  onClick,
}: {
  label: string
  shortcut: string
  icon: typeof Undo02Icon
  disabled: boolean
  onClick: () => void
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label={label}
            disabled={disabled}
            onClick={onClick}
          />
        }
      >
        <HugeiconsIcon icon={icon} />
      </TooltipTrigger>
      <TooltipContent>
        {label} <span className="opacity-70">{shortcut}</span>
      </TooltipContent>
    </Tooltip>
  )
}
