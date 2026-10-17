"use client"

import { CursorPointer02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useEffect, useMemo, useState } from "react"

import { ToolButton } from "@/components/color/color-toolbar"
import { usePreviewMode } from "@/components/preview/preview-mode"
import { useSettings } from "@/hooks/use-settings"
import { cssVariables } from "@/lib/tokens/css"
import {
  buildTokenIndex,
  tokensForClasses,
  type TokenUse,
} from "@/lib/tokens/inspect"
import { generateTokens } from "@/lib/tokens/registry"

const MAX_ROWS = 10
const MAX_NODES = 300

/** Toolbar toggle for the inspector. */
export function InspectButton() {
  const { inspect, setInspect } = usePreviewMode()
  return (
    <ToolButton
      label={inspect ? "Stop inspecting tokens" : "Inspect tokens"}
      pressed={inspect}
      onClick={() => setInspect(!inspect)}
    >
      <HugeiconsIcon icon={CursorPointer02Icon} className="size-4" />
    </ToolButton>
  )
}

interface Target {
  el: Element
  name: string
  uses: TokenUse[]
}

/** "card-header" → "Card header". */
const humanize = (slot: string) =>
  slot.charAt(0).toUpperCase() + slot.slice(1).replace(/-/g, " ")

/**
 * While inspecting, hovering or focusing a component in the preview outlines
 * it and lists the tokens its classes use, with their current values (PRD
 * P-6). Escape turns it off.
 */
export function TokenInspector() {
  const { inspect, setInspect, mode } = usePreviewMode()
  const settings = useSettings()
  const tree = useMemo(() => generateTokens(settings), [settings])
  const index = useMemo(() => buildTokenIndex(tree), [tree])
  const values = useMemo(
    () => cssVariables(tree, mode, { preview: true }),
    [tree, mode]
  )
  const [target, setTarget] = useState<Target | null>(null)
  // Re-measure the outline when the page scrolls or resizes.
  const [, setTick] = useState(0)

  useEffect(() => {
    if (!inspect) return
    const pick = (node: EventTarget | null) => {
      const el = node instanceof Element ? node : null
      const surface = el?.closest("[data-preview-mode]")
      if (!el || !surface) return setTarget(null)
      // The shadcn component it belongs to, or the element itself.
      const slot = el.closest("[data-slot]")
      const root = slot && surface.contains(slot) ? slot : el
      const nodes = [root, ...root.querySelectorAll("*")].slice(0, MAX_NODES)
      const classes = nodes.flatMap((n) =>
        (n.getAttribute("class") ?? "").split(/\s+/).filter(Boolean)
      )
      setTarget({
        el: root,
        name: humanize(
          root.getAttribute("data-slot") ?? root.tagName.toLowerCase()
        ),
        uses: tokensForClasses(classes, index),
      })
    }
    const onOver = (e: PointerEvent) => pick(e.target)
    const onFocus = (e: FocusEvent) => pick(e.target)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setInspect(false)
    }
    const remeasure = () => setTick((t) => t + 1)
    document.addEventListener("pointerover", onOver)
    document.addEventListener("focusin", onFocus)
    document.addEventListener("keydown", onKey)
    window.addEventListener("scroll", remeasure, true)
    window.addEventListener("resize", remeasure)
    return () => {
      document.removeEventListener("pointerover", onOver)
      document.removeEventListener("focusin", onFocus)
      document.removeEventListener("keydown", onKey)
      window.removeEventListener("scroll", remeasure, true)
      window.removeEventListener("resize", remeasure)
      setTarget(null)
    }
  }, [inspect, index, setInspect])

  if (!inspect || !target || !target.el.isConnected) return null
  const rect = target.el.getBoundingClientRect()
  const panelWidth = 288
  const left = Math.min(
    Math.max(8, rect.left),
    window.innerWidth - panelWidth - 8
  )
  // Below the component when there's room, else above it.
  const below = rect.bottom + 8 + 220 < window.innerHeight
  const top = below ? rect.bottom + 8 : Math.max(8, rect.top - 8)
  const spacingPx = 16 * parseFloat(values["--spacing"] ?? "0.25")

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed z-[60] rounded-[3px] outline-2 outline-offset-2 outline-foreground outline-dashed"
        style={{
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        }}
      />
      <div
        role="status"
        className="pointer-events-none fixed z-[60] flex flex-col gap-2 rounded-lg border bg-popover p-3 text-popover-foreground shadow-lg"
        style={{
          left,
          top,
          width: panelWidth,
          transform: below ? undefined : "translateY(-100%)",
        }}
      >
        <span className="flex items-baseline justify-between gap-2">
          <span className="text-sm font-medium">{target.name}</span>
          <span className="text-[13px] text-muted-foreground">
            {target.uses.length} token{target.uses.length === 1 ? "" : "s"}
          </span>
        </span>
        {target.uses.length === 0 ? (
          <span className="text-[13px] text-muted-foreground">
            No design tokens: layout only.
          </span>
        ) : (
          <ul className="flex flex-col gap-1.5">
            {target.uses.slice(0, MAX_ROWS).map((u) => {
              const value = values[`--${u.css}`] ?? ""
              return (
                <li
                  key={u.times === undefined ? u.css : `${u.css}${u.times}`}
                  className="flex items-center gap-2 text-[13px]"
                >
                  {u.type === "color" && (
                    <span
                      aria-hidden
                      className="size-3.5 shrink-0 rounded-sm ring-1 ring-foreground/15"
                      style={{ background: value }}
                    />
                  )}
                  <span className="font-mono">
                    --{u.css}
                    {u.times !== undefined && ` × ${u.times}`}
                  </span>
                  <span className="ml-auto truncate text-muted-foreground">
                    {u.times !== undefined
                      ? `${Number((u.times * spacingPx).toFixed(2))}px`
                      : u.type === "color"
                        ? ""
                        : value}
                  </span>
                </li>
              )
            })}
            {target.uses.length > MAX_ROWS && (
              <li className="text-[13px] text-muted-foreground">
                +{target.uses.length - MAX_ROWS} more
              </li>
            )}
          </ul>
        )}
      </div>
    </>
  )
}
