"use client"

import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { createContext, useContext, useMemo, useState } from "react"

import { ToolButton } from "@/components/color/color-toolbar"
import { useSettings } from "@/hooks/use-settings"
import { useStylesheets } from "@/hooks/use-stylesheets"
import { cssVariables, stylesheetImports, type Mode } from "@/lib/tokens/css"
import { generateTokens } from "@/lib/tokens/registry"
import { cn } from "@/lib/utils"

const PreviewModeContext = createContext<{
  mode: Mode
  setMode: (mode: Mode) => void
  /** Token inspector on: hovering a component shows the tokens it uses. */
  inspect: boolean
  setInspect: (inspect: boolean) => void
}>({ mode: "light", setMode: () => {}, inspect: false, setInspect: () => {} })

export const usePreviewMode = () => useContext(PreviewModeContext)

/** Light/dark choice for the preview, kept while moving between pages. */
export function PreviewModeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [mode, setMode] = useState<Mode>("light")
  const [inspect, setInspect] = useState(false)
  const value = useMemo(
    () => ({ mode, setMode, inspect, setInspect }),
    [mode, inspect]
  )
  return <PreviewModeContext value={value}>{children}</PreviewModeContext>
}

/** Toolbar button that flips the preview between light and dark. */
export function PreviewModeButton() {
  const { mode, setMode } = useContext(PreviewModeContext)
  const next = mode === "light" ? "dark" : "light"
  return (
    <ToolButton label={`Preview in ${next} mode`} onClick={() => setMode(next)}>
      <HugeiconsIcon
        icon={mode === "light" ? Moon02Icon : Sun03Icon}
        className="size-4"
      />
    </ToolButton>
  )
}

/**
 * Applies the generated system to its subtree only, as inline CSS variables.
 * Children use the usual shadcn classes (`bg-primary`, `text-muted-foreground`)
 * and pick the generated values up through the cascade; the app chrome keeps
 * its own theme. Tailwind's own sizes (text-sm…) are pointed at the type
 * scale here too, and the user's web fonts are loaded. `data-preview-mode`
 * lets the preview show light or dark independently of the app theme (see
 * the dark variant in globals.css).
 */
export function PreviewSurface({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const { mode } = useContext(PreviewModeContext)
  const settings = useSettings()
  const tokens = useMemo(() => generateTokens(settings), [settings])
  const style = useMemo(
    () => cssVariables(tokens, mode, { preview: true }),
    [tokens, mode]
  )
  useStylesheets(useMemo(() => stylesheetImports(tokens), [tokens]))

  return (
    <div
      data-preview-mode={mode}
      style={style as React.CSSProperties}
      className={cn(
        "bg-background font-sans text-base text-foreground [color-scheme:light] selection:bg-(--selection) selection:text-(--selection-foreground)",
        mode === "dark" && "dark [color-scheme:dark]",
        className
      )}
    >
      {children}
    </div>
  )
}
