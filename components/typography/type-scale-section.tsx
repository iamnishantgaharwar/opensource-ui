"use client"

import { Alert02Icon, Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useMemo } from "react"

import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import { useCopy } from "@/hooks/use-copy"
import { useModuleSettings } from "@/hooks/use-settings"
import { useStylesheets } from "@/hooks/use-stylesheets"
import {
  generateTypeScale,
  googleFontsUrl,
  MIN_READABLE_PX,
  type TypeRole,
} from "@/lib/modules/typography"
import { cn } from "@/lib/utils"

// Headings get a short line so large sizes show whole words, not "…".
const SAMPLE = "The quick brown fox jumps over the lazy dog"
const HEADING_SAMPLE = "Design systems"

/**
 * Every role with its size, a live sample and a copy button (PRD T-7). The
 * samples are a specimen of the user's system, so they're styled inline from
 * the generated scale, like the color swatches.
 */
export function TypeScaleSection() {
  const [type] = useModuleSettings("typography")
  const scale = useMemo(() => generateTypeScale(type), [type])
  const { copied, copy } = useCopy()
  const fontUrl = googleFontsUrl([scale.fonts.body, scale.fonts.heading])
  useStylesheets(fontUrl ? [fontUrl] : [])
  const small = scale.roles.filter((r) => r.tooSmall)

  return (
    <Section
      id="type-scale"
      title="Type scale"
      description="Each role is a step on your scale. Click a size to copy it."
    >
      {small.length > 0 && (
        <p className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm">
          <HugeiconsIcon
            icon={Alert02Icon}
            className="mt-0.5 size-4 shrink-0 text-destructive"
          />
          <span>
            {small.map((r) => r.label).join(", ")}{" "}
            {small.length === 1 ? "is" : "are"} under {MIN_READABLE_PX}px, which
            is hard to read. Try a larger base size or a smaller ratio.
          </span>
        </p>
      )}
      <ul className="flex flex-col divide-y rounded-[10px] border">
        {scale.roles.map((role) => (
          <TypeRow
            key={role.id}
            role={role}
            family={role.heading ? scale.stacks.heading : scale.stacks.body}
            copied={copied === role.id}
            onCopy={() => copy(role.size, role.id)}
          />
        ))}
      </ul>
    </Section>
  )
}

function TypeRow({
  role,
  family,
  copied,
  onCopy,
}: {
  role: TypeRole
  family: string
  copied: boolean
  onCopy: () => void
}) {
  const unitIsPx = role.size.endsWith("px")
  return (
    <li className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:gap-6">
      <div className="flex shrink-0 items-start justify-between gap-3 sm:w-40 sm:flex-col sm:gap-0.5">
        <span className="flex items-center gap-1.5 text-sm font-medium">
          {role.label}
          {role.tooSmall && (
            <HugeiconsIcon
              icon={Alert02Icon}
              aria-label={`Under ${MIN_READABLE_PX}px`}
              className="size-4 text-destructive"
            />
          )}
        </span>
        <span className="flex flex-col text-right text-[13px] text-muted-foreground tabular-nums sm:text-left">
          <span>{unitIsPx ? role.size : `${role.size} · ${role.px}px`}</span>
          <span>
            Line {role.lineHeight} · Weight {role.weight}
          </span>
        </span>
      </div>
      <p
        className="min-w-0 flex-1 truncate"
        style={{
          fontFamily: family,
          fontSize: `${role.px}px`,
          lineHeight: role.lineHeight,
          letterSpacing: role.letterSpacing,
          fontWeight: role.weight,
        }}
      >
        {role.heading ? HEADING_SAMPLE : SAMPLE}
      </p>
      <Button
        variant="ghost"
        aria-label={`Copy ${role.label} size, ${role.size}`}
        onClick={onCopy}
        className={cn("shrink-0 self-start font-mono sm:self-center")}
      >
        <HugeiconsIcon
          icon={copied ? Tick02Icon : Copy01Icon}
          data-icon="inline-start"
          className="text-muted-foreground"
        />
        {role.size}
      </Button>
    </li>
  )
}
