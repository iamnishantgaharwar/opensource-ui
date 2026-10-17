"use client"

import { FileImportIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useDeferredValue, useId, useMemo, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { settingsStore } from "@/hooks/use-settings"
import { importThemeCss } from "@/lib/tokens/import-css"

/**
 * Paste an existing shadcn theme to start from it. Shows what was picked up
 * as you paste; applying replaces the settings in one undoable step.
 */
export function ImportTheme() {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [css, setCss] = useState("")
  const deferred = useDeferredValue(css)
  const result = useMemo(
    () => (deferred.trim() ? importThemeCss(deferred) : null),
    [deferred]
  )

  const apply = () => {
    if (!result?.found.length) return
    settingsStore.replace(result.settings)
    setOpen(false)
    setCss("")
    toast.success("Imported your theme", {
      description: `${result.found.length} settings picked up`,
      action: { label: "Undo", onClick: () => settingsStore.undo() },
    })
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button variant="outline" size="lg" className="w-full" />}
      >
        <HugeiconsIcon
          icon={FileImportIcon}
          data-icon="inline-start"
          className="text-muted-foreground"
        />
        Import
      </SheetTrigger>
      <SheetContent className="w-full gap-0 sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Import a shadcn theme</SheetTitle>
          <SheetDescription>
            Paste your globals.css, or just its :root block. Colors, neutral,
            radius, spacing and fonts are picked up; everything else starts from
            the defaults.
          </SheetDescription>
        </SheetHeader>
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor={`${id}-css`}>globals.css</Label>
            <Textarea
              id={`${id}-css`}
              value={css}
              onChange={(e) => setCss(e.target.value)}
              placeholder={
                ":root {\n  --primary: oklch(0.205 0 0);\n  --radius: 0.625rem;\n  …\n}"
              }
              spellCheck={false}
              className="min-h-56 font-mono text-xs"
            />
          </div>
          {result && (
            <div className="flex flex-col gap-2" aria-live="polite">
              <p className="text-sm font-medium">
                {result.found.length
                  ? `Found ${result.found.length}`
                  : "Nothing recognized yet"}
              </p>
              {result.found.length > 0 && (
                <ul className="flex flex-col divide-y rounded-lg border text-sm">
                  {result.found.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center justify-between gap-3 px-3 py-2"
                    >
                      <span className="text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="flex items-center gap-2 font-mono text-[13px]">
                        {item.swatch && (
                          <span
                            aria-hidden
                            className="size-4 rounded-sm ring-1 ring-foreground/15"
                            style={{ background: item.swatch }}
                          />
                        )}
                        {item.value}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {result.skipped.length > 0 && (
                <p className="text-[13px] text-muted-foreground">
                  Couldn&apos;t use: {result.skipped.join(", ")} (a var()
                  reference or a font outside the catalog).
                </p>
              )}
            </div>
          )}
        </div>
        <SheetFooter className="flex-row justify-end gap-2 border-t">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button disabled={!result?.found.length} onClick={apply}>
            Apply
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
