"use client"

import {
  Alert02Icon,
  ArrowRight02Icon,
  ContrastIcon,
  Copy01Icon,
  PaintBoardIcon,
  Sun03Icon,
  TextFontIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import Link from "next/link"
import { useMemo } from "react"

import { useLandingBrand } from "@/components/landing/landing-brand"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCopy } from "@/hooks/use-copy"
import { checkContrast, STEPS, type Step } from "@/lib/modules/color"
import {
  generateTypeScale,
  MIN_READABLE_PX,
  type TypeRoleId,
} from "@/lib/modules/typography"
import { cssVariables } from "@/lib/tokens/css"
import { generateTokens } from "@/lib/tokens/registry"
import { cn } from "@/lib/utils"

/**
 * What the generator does, as a bento. Every illustration is real output for
 * the landing page's brand color, made with the app's own generators.
 */
export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="mx-auto flex max-w-7xl scroll-mt-4 flex-col gap-14 px-4 py-24 sm:px-8"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        <h2
          id="features-title"
          className="font-display text-[2rem] leading-10 font-bold tracking-normal sm:text-5xl sm:leading-14"
        >
          Everything your design system needs, checked together.
        </h2>
        <p className="max-w-xl text-lg text-muted-foreground">
          Palettes, contrast, type and a live preview, so the theme you export
          is one you can ship.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card
          icon={PaintBoardIcon}
          title="Palettes from one color"
          body="Eleven even steps from 50 to 950, with your color kept exactly at its step."
        >
          <PalettesArt />
        </Card>
        <Card
          icon={ContrastIcon}
          title="Contrast checked as you go"
          body="Every text, fill and focus pair is measured against WCAG AA in light and dark."
        >
          <ContrastArt />
        </Card>
        <Card
          icon={TextFontIcon}
          title="A type scale that adds up"
          body="Pick a base size and ratio and get every role from Display to Caption, with a warning when text gets too small."
          className="lg:row-span-2"
        >
          <TypeArt />
        </Card>
        <Card
          icon={Sun03Icon}
          title="Live preview in light and dark"
          body="See buttons, badges and alerts painted with your tokens in both themes before anything ships."
          className="lg:col-span-2 lg:flex-row lg:flex-wrap lg:items-center lg:p-5"
          textClassName="lg:flex-[1_1_260px] lg:p-2"
          artClassName="min-w-0 lg:mt-0 lg:flex-[1_1_340px]"
        >
          <PreviewArt />
        </Card>
      </div>
    </section>
  )
}

function Card({
  icon,
  title,
  body,
  className,
  textClassName,
  artClassName,
  children,
}: {
  icon: IconSvgElement
  title: string
  body: string
  className?: string
  textClassName?: string
  artClassName?: string
  children: React.ReactNode
}) {
  return (
    <article
      className={cn(
        "flex min-w-0 flex-col gap-6 rounded-[14px] bg-muted px-5 pt-7 pb-5",
        className
      )}
    >
      <div className={cn("flex flex-col gap-2 px-2", textClassName)}>
        <h3 className="flex items-center gap-2.5 text-xl font-semibold tracking-[-0.01em]">
          <IconChip icon={icon} />
          {title}
        </h3>
        <p className="text-muted-foreground">{body}</p>
      </div>
      <div
        className={cn(
          "mt-auto flex flex-1 flex-col justify-center gap-4 rounded-[10px] bg-background p-5 text-sm",
          artClassName
        )}
      >
        {children}
      </div>
    </article>
  )
}

function PalettesArt() {
  const { system } = useLandingBrand()
  const { copied, copy } = useCopy()
  const palette = system.palettes.primary
  if (!palette) return null
  const rows = ([50, 300, palette.anchor, 900] as Step[]).filter(
    (s, i, all) => all.indexOf(s) === i
  )

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="flex flex-col">
          <span className="text-[13px] text-muted-foreground">Primary</span>
          <span className="font-mono text-xl font-semibold uppercase">
            {palette.input}
          </span>
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            copy(
              STEPS.map((s) => `--primary-${s}: ${palette.shades[s]};`).join(
                "\n"
              ),
              "palette",
              "primary palette"
            )
          }
        >
          <HugeiconsIcon
            icon={copied ? Tick02Icon : Copy01Icon}
            data-icon="inline-start"
          />
          Copy palette
        </Button>
      </div>
      <ul className="flex flex-col gap-3">
        {rows.map((step) => (
          <li key={step} className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="size-3 shrink-0 rounded-full ring-1 ring-foreground/10 ring-inset"
              style={{ background: palette.shades[step] }}
            />
            <span className="flex-1 font-medium">
              {step}
              {step === palette.anchor && " · base"}
            </span>
            <span className="font-mono text-[13px] text-muted-foreground uppercase">
              {palette.shades[step]}
            </span>
          </li>
        ))}
      </ul>
      <span aria-hidden className="grid grid-cols-11 gap-0.75">
        {STEPS.map((step) => (
          <span
            key={step}
            className={cn(
              "h-5 rounded-[4px]",
              step === palette.anchor
                ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                : "ring-1 ring-foreground/5 ring-inset"
            )}
            style={{ background: palette.shades[step] }}
          />
        ))}
      </span>
    </>
  )
}

function ContrastArt() {
  const { system } = useLandingBrand()
  const checks = useMemo(() => checkContrast(system), [system])
  const check = checks.find((c) => c.id === "primary")
  if (!check) return null
  const { light } = check

  return (
    <>
      <span className="flex items-center justify-between">
        <span className="text-base font-semibold">Contrast</span>
        <span className="text-[13px] text-muted-foreground">
          {checks.length} pairs
        </span>
      </span>
      <span className="flex flex-col gap-3 rounded-lg bg-muted p-3.5">
        <span className="flex items-center justify-between gap-2">
          <span className="text-[13px] font-medium text-muted-foreground">
            {check.label}
          </span>
          <span
            className={cn(
              "flex h-5.5 items-center gap-1 rounded-md px-2 text-[13px] font-medium",
              light.pass
                ? "bg-(--status-ok)/12 text-(--status-ok)"
                : "bg-destructive/10 text-destructive"
            )}
          >
            <HugeiconsIcon
              icon={light.pass ? Tick02Icon : Alert02Icon}
              className="size-3"
            />
            {light.pass ? "Passes AA" : "Fails AA"}
          </span>
        </span>
        <span className="flex items-center gap-3">
          <span
            aria-hidden
            className="grid size-10 shrink-0 place-items-center rounded-lg font-semibold"
            style={{ background: light.bg, color: light.fg }}
          >
            Aa
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="font-semibold tabular-nums">
              {light.ratio.toFixed(2)}:1
            </span>
            <span className="truncate font-mono text-[13px] text-muted-foreground">
              {check.fg} on {check.bg}
            </span>
          </span>
        </span>
      </span>
      <Link
        href="/design#contrast"
        className="flex h-11 items-center justify-center gap-2 rounded-lg border border-dashed border-foreground/25 text-[13px] font-medium transition-colors outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        See all {checks.length} pairs
        <HugeiconsIcon icon={ArrowRight02Icon} className="size-4" />
      </Link>
    </>
  )
}

const TYPE_ROWS: TypeRoleId[] = ["display", "h1", "h2", "h3", "body", "caption"]

function TypeArt() {
  const { settings } = useLandingBrand()
  const scale = useMemo(
    () => generateTypeScale(settings.typography),
    [settings.typography]
  )
  const roles = TYPE_ROWS.flatMap((id) => {
    const role = scale.roles.find((r) => r.id === id)
    return role ? [role] : []
  })

  return (
    <div className="flex flex-col gap-1 rounded-[10px] border bg-background px-3 py-4 shadow-md">
      <span className="flex items-center justify-between px-2 pb-2">
        <span className="flex items-center gap-2 text-base font-semibold">
          Type scale
          <span className="rounded-md bg-primary px-1.5 text-[13px] font-medium text-primary-foreground">
            {settings.typography.ratio}
          </span>
        </span>
        <span className="text-muted-foreground">
          {settings.typography.baseSize}px base
        </span>
      </span>
      {roles.map((role, i) => (
        <span
          key={role.id}
          className={cn(
            "flex items-center gap-3 rounded-lg px-2 py-2.5",
            i === 0 && "bg-muted"
          )}
        >
          <span
            aria-hidden
            className="grid size-10 shrink-0 place-items-center rounded-lg border"
            style={{
              fontWeight: role.weight,
              fontSize: Math.max(11, Math.min(22, Math.round(role.px / 3.2))),
            }}
          >
            Aa
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="flex items-center gap-1.5 font-semibold">
              {role.label}
              {role.tooSmall && (
                <HugeiconsIcon
                  icon={Alert02Icon}
                  className="size-3.5 text-(--status-warn)"
                />
              )}
            </span>
            <span
              className={cn(
                "text-[13px]",
                role.tooSmall ? "text-(--status-warn)" : "text-muted-foreground"
              )}
            >
              {role.tooSmall
                ? `${role.px}px, under the ${MIN_READABLE_PX}px minimum`
                : `${role.px}px · weight ${role.weight}`}
            </span>
          </span>
          <span className="font-mono text-[13px] text-muted-foreground">
            {role.size}
          </span>
        </span>
      ))}
    </div>
  )
}

/** A small icon on a tint of the brand color. */
function IconChip({ icon }: { icon: IconSvgElement }) {
  const { brand } = useLandingBrand()
  return (
    <span
      aria-hidden
      className="grid size-7 shrink-0 place-items-center rounded-lg text-foreground"
      style={{
        background: `color-mix(in oklch, ${brand} 35%, var(--background))`,
      }}
    >
      <HugeiconsIcon icon={icon} className="size-4" />
    </span>
  )
}

/** The generated theme in one mode, as a specimen surface. */
function useThemeStyle(mode: "light" | "dark") {
  const { settings } = useLandingBrand()
  return useMemo(
    () =>
      cssVariables(generateTokens(settings), mode, {
        preview: true,
      }) as React.CSSProperties,
    [settings, mode]
  )
}

const PREVIEW_ROWS = [
  {
    name: "Button",
    sample: () => (
      <Button size="sm" tabIndex={-1}>
        Get started
      </Button>
    ),
  },
  {
    name: "Badge",
    sample: () => (
      <Badge className="bg-(--success)/15 text-(--success)">Active</Badge>
    ),
  },
  {
    name: "Alert",
    sample: () => <Badge variant="destructive">Failed</Badge>,
  },
] as const

function PreviewArt() {
  const light = useThemeStyle("light")
  const dark = useThemeStyle("dark")

  return (
    <>
      <span className="text-base font-semibold">Preview</span>
      <span className="grid grid-cols-2 gap-x-3 rounded-lg bg-muted px-3 py-2 text-[13px] font-medium text-muted-foreground sm:grid-cols-[minmax(0,1fr)_7.5rem_7.5rem]">
        <span className="max-sm:hidden">Component</span>
        <span>Light</span>
        <span>Dark</span>
      </span>
      {PREVIEW_ROWS.map((row) => (
        <span
          key={row.name}
          className="grid grid-cols-2 items-center gap-x-3 px-3 py-1 sm:grid-cols-[minmax(0,1fr)_7.5rem_7.5rem]"
        >
          <span className="text-muted-foreground max-sm:hidden">
            {row.name}
          </span>
          <span
            data-preview-mode="light"
            style={light}
            className="flex h-10 items-center rounded-lg bg-background px-2 font-sans text-foreground scheme-light ring-1 ring-border ring-inset"
          >
            {row.sample()}
          </span>
          <span
            data-preview-mode="dark"
            style={dark}
            className="dark flex h-10 items-center rounded-lg bg-background px-2 font-sans text-foreground scheme-dark ring-1 ring-border ring-inset"
          >
            {row.sample()}
          </span>
        </span>
      ))}
    </>
  )
}
