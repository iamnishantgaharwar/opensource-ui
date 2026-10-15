"use client"

import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useId } from "react"

import { CARD_SHADOW } from "@/components/preview/demos/demo-section"
import { useColorSystem } from "@/hooks/use-color-system"
import { cn } from "@/lib/utils"
import {
  generateScale,
  type ColorSystem,
  type Shades,
} from "@/lib/modules/color"

// Soft tinted cards with a status pill and a geometric pattern. Each card
// takes one brand palette; empty slots get a scale generated from a chart
// color. Tints flip in dark mode via the `dark:` variant, which the preview
// scopes to its own light/dark setting.

type Pattern = (props: { shades: Shades }) => React.ReactNode

const RESOURCES: {
  status: string
  title: string
  body: string
  link: string
  Pattern: Pattern
}[] = [
  {
    status: "120+ templates",
    title: "Templates",
    body: "Landing pages, dashboards and docs sites that pick up your tokens instantly.",
    link: "Browse templates",
    Pattern: DotsPattern,
  },
  {
    status: "New",
    title: "Figma Plugin",
    body: "Sync palettes and type styles into Figma so design and code never drift.",
    link: "Install plugin",
    Pattern: ArcsPattern,
  },
  {
    status: "8k members",
    title: "Community",
    body: "Share themes, get feedback on contrast and see what others are building.",
    link: "Join the Discord",
    Pattern: BarsPattern,
  },
  {
    status: "Monthly",
    title: "Workshops",
    body: "Live sessions on color, type and growing a design system with your team.",
    link: "Save a seat",
    Pattern: TilesPattern,
  },
]

function cardScales({ palettes, roles }: ColorSystem): Shades[] {
  const brand = [
    palettes.primary,
    palettes.secondary,
    palettes.accent,
    palettes.tertiary,
  ]
  return brand.map(
    (p, i) =>
      p?.shades ?? generateScale(roles[`chart-${i + 2}`].light.hex).shades
  )
}

export function ResourceCards() {
  const scales = cardScales(useColorSystem())

  return (
    <ul
      id="resource-cards"
      className="grid scroll-mt-24 gap-3 @3xl:grid-cols-2"
    >
      {RESOURCES.map((r, i) => (
        <li key={r.title}>
          <ResourceCard {...r} shades={scales[i]} />
        </li>
      ))}
    </ul>
  )
}

function ResourceCard({
  status,
  title,
  body,
  link,
  Pattern,
  shades,
}: (typeof RESOURCES)[number] & { shades: Shades }) {
  return (
    <div
      style={
        {
          "--tint": shades[100],
          "--tint-dark": shades[950],
          "--dot": shades[500],
        } as React.CSSProperties
      }
      className={cn(
        "@container relative flex h-full min-h-72 flex-col overflow-hidden rounded-2xl bg-(--tint) p-6 text-(--neutral-950) dark:bg-(--tint-dark) dark:text-(--neutral-50)",
        CARD_SHADOW
      )}
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] @md:block">
        <Pattern shades={shades} />
      </div>
      <span className="relative flex w-fit items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-xs font-medium dark:bg-black/30">
        <span aria-hidden className="size-2 rounded-full bg-(--dot)" />
        {status}
      </span>
      <div className="relative mt-auto flex flex-col gap-3 pt-10 @md:max-w-[58%]">
        <h3 className="text-2xl font-medium tracking-tight">{title}</h3>
        <p className="text-sm leading-relaxed opacity-80">{body}</p>
        <a
          href="#resource-cards"
          className="mt-4 flex w-fit items-center gap-2 border-b border-current pb-1 text-sm font-semibold outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {link}
          <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
        </a>
      </div>
    </div>
  )
}

/** useId, made safe for `url(#id)` references (React ids contain symbols). */
function useSvgId() {
  return "g" + useId().replace(/[^a-zA-Z0-9-]/g, "")
}

const SVG_PROPS = {
  viewBox: "0 0 200 260",
  preserveAspectRatio: "xMaxYMid slice",
  className: "size-full",
  "aria-hidden": true,
} as const

/** Halftone: dots that grow toward the right edge. */
function DotsPattern({ shades }: { shades: Shades }) {
  const steps = [200, 300, 400, 500] as const
  const dots = []
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 8; col++) {
      const t = col / 7
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={14 + col * 26}
          cy={10 + row * 27}
          r={2 + t * 10 * (0.6 + 0.4 * Math.abs(Math.sin(row * 0.7)))}
          fill={shades[steps[(row + col) % steps.length]]}
        />
      )
    }
  }
  return <svg {...SVG_PROPS}>{dots}</svg>
}

/** Nested arcs rising from the bottom-right corner. */
function ArcsPattern({ shades }: { shades: Shades }) {
  const rings = [
    [230, 200],
    [190, 300],
    [150, 400],
    [110, 500],
    [70, 600],
    [32, 100],
  ] as const
  return (
    <svg {...SVG_PROPS}>
      {rings.map(([r, step]) => (
        <circle key={r} cx="200" cy="260" r={r} fill={shades[step]} />
      ))}
    </svg>
  )
}

/** Staggered rounded bars running off the right edge. */
function BarsPattern({ shades }: { shades: Shades }) {
  const id = useSvgId()
  const bars = [60, 20, 90, 40, 110, 10, 70, 30]
  return (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id={id}>
          <stop offset="0" stopColor={shades[300]} />
          <stop offset="1" stopColor={shades[600]} />
        </linearGradient>
      </defs>
      {bars.map((x, i) => (
        <rect
          key={i}
          x={x}
          y={8 + i * 32}
          width={240}
          height={22}
          rx={11}
          fill={i % 3 === 1 ? shades[200] : `url(#${id})`}
        />
      ))}
    </svg>
  )
}

/** Rounded tiles fanned out like a stack of swatches. */
function TilesPattern({ shades }: { shades: Shades }) {
  const tiles = [
    [-24, 200],
    [-12, 300],
    [0, 400],
    [12, 600],
  ] as const
  return (
    <svg {...SVG_PROPS}>
      {tiles.map(([angle, step]) => (
        <rect
          key={angle}
          x="70"
          y="70"
          width="120"
          height="120"
          rx="18"
          fill={shades[step]}
          transform={`rotate(${angle} 130 230)`}
        />
      ))}
    </svg>
  )
}
