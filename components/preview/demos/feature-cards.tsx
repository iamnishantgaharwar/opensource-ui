"use client"

import {
  ArrowRight01Icon,
  CodeIcon,
  PaintBoardIcon,
  TextFontIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"

import { CARD_SHADOW } from "@/components/preview/demos/demo-section"
import { useColorSystem } from "@/hooks/use-color-system"
import { contrast, type ColorSystem } from "@/lib/modules/color"
import { cn } from "@/lib/utils"

// Bold feature cards filled with the brand colors exactly as entered (empty
// slots fall back to chart colors). Card text is dark or light, whichever
// reads better on the card, so they work in light and dark mode.

const FEATURES: { title: string; body: string; icon: IconSvgElement }[] = [
  {
    title: "Color Palettes",
    body: "Turn one brand color into 11-step scales with light and dark roles.",
    icon: PaintBoardIcon,
  },
  {
    title: "Type Scale",
    body: "Pick a base size and ratio to get a consistent set of text sizes.",
    icon: TextFontIcon,
  },
  {
    title: "Live Preview",
    body: "See every change on real components before you ship it.",
    icon: ViewIcon,
  },
  {
    title: "Token Export",
    body: "Copy shadcn CSS, a Tailwind config or JSON tokens in one click.",
    icon: CodeIcon,
  },
]

/** Card fills: primary, secondary, accent, tertiary. */
function cardColors({ palettes, roles }: ColorSystem) {
  const neutral = palettes.neutral!.shades
  const fills = [
    palettes.primary!.input,
    palettes.secondary?.input ?? roles["chart-2"].light.hex,
    palettes.accent?.input ?? roles["chart-3"].light.hex,
    palettes.tertiary?.input ?? roles["chart-4"].light.hex,
  ]
  return fills.map((fill) => ({
    background: fill,
    color:
      contrast(fill, neutral[950]) >= contrast(fill, neutral[50])
        ? neutral[950]
        : neutral[50],
  }))
}

export function FeatureCards() {
  const colors = cardColors(useColorSystem())

  return (
    <ul
      id="feature-cards"
      className="grid scroll-mt-24 gap-3 @xl:grid-cols-2 @4xl:grid-cols-4"
    >
      {FEATURES.map((f, i) => (
        <li key={f.title}>
          <FeatureCard index={i} style={colors[i]} {...f} />
        </li>
      ))}
    </ul>
  )
}

function FeatureCard({
  index,
  title,
  body,
  icon,
  style,
}: {
  index: number
  title: string
  body: string
  icon: IconSvgElement
  style: React.CSSProperties
}) {
  return (
    // Hover or keyboard focus opens a card.
    <a
      href="#feature-cards"
      className={cn(
        "group flex h-full min-h-80 flex-col rounded-2xl p-5 outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        CARD_SHADOW
      )}
      style={style}
    >
      <HugeiconsIcon icon={icon} strokeWidth={2} className="size-8" />
      <div className="mt-auto">
        <p className="text-xs">{String(index + 1).padStart(2, "0")}.</p>
        <div className="mt-2 flex items-end justify-between gap-3">
          <p className="text-xl leading-tight font-medium tracking-tight">
            {title}
          </p>
          <span
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-full border border-current opacity-0 transition-opacity",
              "group-hover:opacity-100 group-focus-visible:opacity-100"
            )}
          >
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
          </span>
        </div>
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <hr className="mt-4 border-current" />
            <p className="mt-4 text-xs leading-relaxed">{body}</p>
          </div>
        </div>
      </div>
    </a>
  )
}
