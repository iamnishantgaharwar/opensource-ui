"use client"

import {
  CheckmarkBadge01Icon,
  Download04Icon,
  PaintBoardIcon,
  StarIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"

import { CARD_SHADOW } from "@/components/preview/demos/demo-section"
import { useColorSystem } from "@/hooks/use-color-system"
import { contrast } from "@/lib/modules/color"
import { cn } from "@/lib/utils"

// Metric cards drawn from the primary palette: soft tinted cards around one
// featured card filled with a primary gradient. Tints flip in dark mode via
// the `dark:` variant; the featured card's text is picked by contrast.

const METRICS: {
  value: string
  label: string
  body: string
  icon: IconSvgElement
}[] = [
  {
    value: "2.4M",
    label: "Tokens exported",
    body: "Copied into real projects as shadcn CSS, Tailwind config and JSON.",
    icon: Download04Icon,
  },
  {
    value: "38,000",
    label: "Themes created",
    body: "Brand palettes generated, tuned and previewed this year.",
    icon: PaintBoardIcon,
  },
  {
    value: "99.2%",
    label: "Contrast pass rate",
    body: "Text and button pairs in exported themes that meet WCAG AA.",
    icon: CheckmarkBadge01Icon,
  },
  {
    value: "1,200+",
    label: "GitHub stars",
    body: "Developers following the project and shaping what ships next.",
    icon: StarIcon,
  },
]

const FEATURED = 1

export function MetricCards() {
  const { palettes } = useColorSystem()
  const shades = palettes.primary!.shades
  const neutral = palettes.neutral!.shades
  // Text on the featured gradient (500→700): whichever of white or
  // near-black reads better on its middle step.
  const onFeatured =
    contrast(shades[600], "#ffffff") >= contrast(shades[600], neutral[950])
      ? "#ffffff"
      : neutral[950]

  return (
    <ul
      style={
        {
          "--m-50": shades[50],
          "--m-100": shades[100],
          "--m-200": shades[200],
          "--m-300": shades[300],
          "--m-400": shades[400],
          "--m-500": shades[500],
          "--m-600": shades[600],
          "--m-700": shades[700],
          "--m-800": shades[800],
          "--m-900": shades[900],
          "--m-950": shades[950],
          "--m-on": onFeatured,
        } as React.CSSProperties
      }
      className="grid gap-4 @xl:grid-cols-2 @4xl:grid-cols-4"
    >
      {METRICS.map((m, i) => (
        <li key={m.label}>
          {/* Like the reference, the featured card shows just the number. */}
          {i === FEATURED ? <FeaturedCard {...m} /> : <MetricCard {...m} />}
        </li>
      ))}
    </ul>
  )
}

function IconBadge({
  icon,
  className,
}: {
  icon: IconSvgElement
  className?: string
}) {
  return (
    <span
      className={cn(
        "grid size-12 place-items-center rounded-full ring-4",
        className
      )}
    >
      <HugeiconsIcon icon={icon} strokeWidth={2} className="size-5" />
    </span>
  )
}

function MetricCard({ value, label, body, icon }: (typeof METRICS)[number]) {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-80 flex-col overflow-hidden rounded-2xl border border-(--m-100) bg-(--m-50) p-6 dark:border-(--m-900) dark:bg-(--m-950)",
        CARD_SHADOW
      )}
    >
      <CornerSquares />
      <IconBadge
        icon={icon}
        className="relative bg-(--m-100) text-(--m-700) ring-(--m-100)/50 dark:bg-(--m-900) dark:text-(--m-300) dark:ring-(--m-900)/50"
      />
      <p className="relative mt-5 text-3xl font-semibold tracking-tight text-(--m-700) tabular-nums dark:text-(--m-300)">
        {value}
      </p>
      <p className="relative mt-1 text-sm text-muted-foreground">{label}</p>
      <p className="relative mt-auto pt-8 text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
    </div>
  )
}

function FeaturedCard({ value, label, icon }: (typeof METRICS)[number]) {
  return (
    <div className="relative flex h-full min-h-80 flex-col overflow-hidden rounded-2xl bg-linear-to-b from-(--m-500) to-(--m-700) p-6 text-(--m-on) shadow-(--m-600)/25 shadow-xl">
      <IconBadge icon={icon} className="relative bg-white/20 ring-white/10" />
      <p className="relative mt-5 text-3xl font-semibold tracking-tight tabular-nums">
        {value}
      </p>
      <p className="relative mt-1 text-sm opacity-85">{label}</p>
      <Bubbles />
    </div>
  )
}

/** Nested rounded-square outlines tucked into the top-right corner. */
function CornerSquares() {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className="absolute -top-10 -right-10 size-40 fill-none stroke-(--m-200) dark:stroke-(--m-900)"
    >
      {[0, 14, 28, 42].map((inset) => (
        <rect
          key={inset}
          x={inset}
          y={inset}
          width={120 - inset * 2}
          height={120 - inset * 2}
          rx={24 - inset / 3}
          strokeWidth="1.25"
        />
      ))}
    </svg>
  )
}

/** Translucent bubbles rising from the bottom edge of the featured card. */
function Bubbles() {
  const bubbles = [
    [85, 108, 46],
    [30, 120, 30],
    [118, 70, 16],
    [60, 78, 10],
  ] as const
  return (
    <svg
      viewBox="0 0 140 130"
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-auto w-full fill-white"
    >
      {bubbles.map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} opacity={0.12 + i * 0.04} />
      ))}
    </svg>
  )
}
