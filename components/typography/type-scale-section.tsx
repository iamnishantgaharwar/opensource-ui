"use client"

import { Alert02Icon, Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useId, useMemo } from "react"

import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useCopy } from "@/hooks/use-copy"
import { useModuleSettings } from "@/hooks/use-settings"
import { useStylesheets } from "@/hooks/use-stylesheets"
import {
  generateTypeScale,
  googleFontsUrl,
  MIN_READABLE_PX,
  RATIO_PRESETS,
  type TypeRole,
} from "@/lib/modules/typography"

// Headings get a short line so large sizes show whole words, not "…".
const SAMPLE = "The quick brown fox jumps over the lazy dog"
const HEADING_SAMPLE = "Design systems"

const SEGMENT =
  "h-7 px-2.5 font-normal tabular-nums hover:bg-background/60 aria-pressed:bg-background aria-pressed:font-medium aria-pressed:shadow-xs"

const QUICK_BASES = [14, 16, 18] as const
const QUICK_RATIOS = RATIO_PRESETS.filter((r) =>
  [1.125, 1.2, 1.25, 1.333].includes(r.value)
)

/**
 * Every role with its size, a live sample and a copy button (PRD T-7). The
 * samples are a specimen of the user's system, so they're styled inline from
 * the generated scale, like the color swatches.
 */
export function TypeScaleSection() {
  const [type, update] = useModuleSettings("typography")
  const scale = useMemo(() => generateTypeScale(type), [type])
  const { copied, copy } = useCopy()
  const fontUrl = googleFontsUrl([scale.fonts.body, scale.fonts.heading])
  useStylesheets(fontUrl ? [fontUrl] : [])
  const smallest = scale.roles
    .filter((r) => r.tooSmall)
    .reduce<TypeRole | undefined>(
      (a, r) => (!a || r.px < a.px ? r : a),
      undefined
    )

  return (
    <Section
      id="type-scale"
      title="Type scale"
      description="Each role is a step on your scale. Click a size to copy it."
      action={
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Segmented
            label="Base"
            value={String(type.baseSize)}
            options={QUICK_BASES.map((b) => ({
              value: String(b),
              label: `${b}px`,
            }))}
            onChange={(v) => update({ baseSize: Number(v) })}
          />
          <Segmented
            label="Ratio"
            value={String(type.ratio)}
            options={QUICK_RATIOS.map((r) => ({
              value: String(r.value),
              label: String(r.value),
              title: r.label,
            }))}
            onChange={(v) => update({ ratio: Number(v) })}
          />
        </div>
      }
    >
      {smallest && (
        <p
          role="alert"
          className="flex items-start gap-2.5 rounded-[10px] bg-(--status-warn)/8 px-4 py-3 text-sm"
        >
          <HugeiconsIcon
            icon={Alert02Icon}
            className="mt-0.5 size-4 shrink-0 text-(--status-warn)"
          />
          <span>
            <span className="font-semibold">
              {smallest.label} is {Number(smallest.px.toFixed(2))}px, under the{" "}
              {MIN_READABLE_PX}px minimum for readable text.
            </span>{" "}
            <span className="text-muted-foreground">
              Try a larger base size or a smaller ratio.
            </span>
          </span>
        </p>
      )}
      <ul className="flex flex-col border-t">
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

function Segmented({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: { value: string; label: string; title?: string }[]
  onChange: (value: string) => void
}) {
  const id = useId()
  return (
    <div className="flex items-center gap-2">
      <span id={id} className="text-sm text-muted-foreground">
        {label}
      </span>
      <ToggleGroup
        aria-labelledby={id}
        value={[value]}
        onValueChange={(next) => {
          if (next.length > 0) onChange(next[0])
        }}
        className="gap-1 rounded-[10px] bg-muted p-1"
      >
        {options.map((o) => (
          <ToggleGroupItem
            key={o.value}
            value={o.value}
            title={o.title}
            className={SEGMENT}
          >
            {o.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
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
    <li className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b py-5">
      <div className="flex w-50 shrink-0 flex-col gap-1">
        <span className="flex items-center gap-1.5 text-sm font-medium">
          {role.label}
          {role.tooSmall && (
            <HugeiconsIcon
              icon={Alert02Icon}
              aria-label={`Under ${MIN_READABLE_PX}px`}
              className="size-4 text-(--status-warn)"
            />
          )}
        </span>
        <span className="flex flex-col font-mono text-[13px] text-muted-foreground tabular-nums">
          <span>{unitIsPx ? role.size : `${role.size} · ${role.px}px`}</span>
          <span>
            Line {role.lineHeight} · Weight {role.weight}
          </span>
        </span>
      </div>
      <p
        className="min-w-0 flex-1 basis-60 truncate"
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
        className="shrink-0 font-mono text-[13px]"
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
