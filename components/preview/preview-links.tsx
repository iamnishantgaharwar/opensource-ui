import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

import { PREVIEW_PAGES } from "@/components/preview/catalog"
import { Button } from "@/components/ui/button"

/** Entry points from the generator page into the component preview. */
export function PreviewLinks() {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4">
      {PREVIEW_PAGES.map((p) => (
        <li key={p.slug}>
          <Link
            href={`/preview/${p.slug}`}
            className="group flex h-full items-center justify-between gap-3 rounded-[10px] border p-4 transition-colors outline-none hover:border-foreground/30 hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <span className="flex min-w-0 flex-col">
              <span className="text-sm font-medium">{p.label}</span>
              <span className="text-[13px] text-muted-foreground">
                {p.description}
              </span>
            </span>
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function OpenPreviewButton() {
  return (
    <Button size="lg" nativeButton={false} render={<Link href="/preview" />}>
      Open full preview
      <HugeiconsIcon icon={ArrowRight01Icon} data-icon="inline-end" />
    </Button>
  )
}
