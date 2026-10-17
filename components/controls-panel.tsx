"use client"

import { ArrowDown01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useEffect, useState } from "react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useMediaQuery } from "@/hooks/use-media-query"

const CONTROL_SECTIONS = ["#color", "#typography", "#radius"]

/**
 * Left column on desktop, pinned while the main column scrolls; below 1024px
 * it stacks above the preview and can be collapsed. Desktop always shows it
 * open.
 */
export function ControlsPanel({ children }: { children: React.ReactNode }) {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const [open, setOpen] = useState(true)

  // Jumping to a control section from the nav should reveal it.
  useEffect(() => {
    const onHashChange = () => {
      if (CONTROL_SECTIONS.includes(window.location.hash)) setOpen(true)
    }
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  return (
    <Collapsible
      open={isDesktop || open}
      onOpenChange={setOpen}
      render={
        // From 1024px it stays pinned below the header and scrolls on its
        // own (scrollbar hidden) while the palettes scroll. The 4px inset
        // keeps focus rings from being clipped by the scroll box.
        <aside
          aria-label="Settings"
          className="no-scrollbar border-b lg:sticky lg:top-22 lg:-mx-1 lg:max-h-[calc(100svh-7rem)] lg:overflow-y-auto lg:border-b-0 lg:px-1 lg:pb-1"
        />
      }
    >
      <CollapsibleTrigger className="group flex w-full items-center justify-between px-4 py-3 text-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50 lg:hidden">
        Controls
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          className="size-4 text-muted-foreground transition-transform group-data-panel-open:rotate-180"
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-10 px-4 pb-6 lg:p-0">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}
