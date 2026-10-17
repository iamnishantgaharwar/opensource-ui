import { Tick02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { StackArt } from "@/components/landing/illustrations"
import { LANDING_BRAND } from "@/lib/site"

const STACK = [
  "shadcn/ui",
  "Tailwind CSS v4",
  "Tailwind CSS v3",
  "CSS variables",
  "JSON tokens",
] as const

export function Stack() {
  return (
    <section
      aria-labelledby="stack-title"
      className="mx-auto max-w-7xl px-4 pb-20 sm:px-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-8 rounded-[14px] border p-6 sm:p-10">
        <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-5">
          <div className="flex max-w-120 flex-col gap-1">
            <h2
              id="stack-title"
              className="font-display text-2xl font-bold tracking-normal"
            >
              Works with the stack you have
            </h2>
            <p className="text-muted-foreground">
              Plain CSS variables and JSON tokens that any framework can read.
            </p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {STACK.map((item) => (
              <li
                key={item}
                className="flex h-9 items-center gap-2 rounded-full bg-muted px-3.5 text-sm font-medium"
              >
                <HugeiconsIcon icon={Tick02Icon} className="size-4" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="max-w-110 flex-[1_1_340px] max-md:hidden">
          <StackArt spot={LANDING_BRAND} />
        </div>
      </div>
    </section>
  )
}
