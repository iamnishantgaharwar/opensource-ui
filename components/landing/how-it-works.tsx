"use client"

import { useMemo } from "react"

import { CodeBlock } from "@/components/export/code-block"
import {
  PasteArt,
  PickColorArt,
  ReviewArt,
} from "@/components/landing/illustrations"
import { useLandingBrand } from "@/components/landing/landing-brand"
import { exportShadcn } from "@/lib/export/shadcn"
import { generateTokens } from "@/lib/tokens/registry"

const STEPS = [
  {
    art: PickColorArt,
    title: "Pick your brand color",
    body: "Type a hex or pick one. Secondary, accent and tertiary can be suggested for you.",
  },
  {
    art: ReviewArt,
    title: "Review palettes and contrast",
    body: "Check every pair in light and dark, tune type, radius, shadows and spacing, and see it on real components.",
  },
  {
    art: PasteArt,
    title: "Paste the tokens",
    body: "Copy the light and dark blocks into your stylesheet. Anything that reads the variables picks them up right away.",
  },
] as const

export function HowItWorks() {
  const { brand, settings } = useLandingBrand()
  // The real export for the landing page's brand color.
  const file = useMemo(() => exportShadcn(generateTokens(settings)), [settings])

  return (
    <section
      id="how"
      aria-labelledby="how-title"
      className="mx-auto flex max-w-7xl scroll-mt-4 flex-col gap-12 px-4 py-20 sm:px-8"
    >
      <div className="flex max-w-3xl flex-col gap-4">
        <span className="text-sm font-medium text-muted-foreground">
          How it works
        </span>
        <h2
          id="how-title"
          className="font-display text-[2rem] leading-10 font-bold tracking-normal sm:text-[2.5rem] sm:leading-12"
        >
          From brand color to tokens in three steps
        </h2>
      </div>
      <ol className="grid gap-6 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex flex-col gap-5">
            <div className="grid h-45 place-items-center rounded-[14px] bg-muted p-5">
              <step.art spot={brand} />
            </div>
            <div className="flex flex-col gap-1.5 px-1">
              <span className="text-[13px] font-medium text-muted-foreground">
                Step {i + 1}
              </span>
              <h3 className="text-xl font-semibold tracking-[-0.01em]">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <CodeBlock file={file} />
    </section>
  )
}
