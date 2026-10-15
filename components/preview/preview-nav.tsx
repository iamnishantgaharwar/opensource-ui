"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { PREVIEW_GROUPS, PREVIEW_PAGES } from "@/components/preview/catalog"
import { cn } from "@/lib/utils"

const GROUPS = [
  { label: null, pages: [{ href: "/preview", label: "All components" }] },
  ...PREVIEW_GROUPS.map((group) => ({
    label: group,
    pages: PREVIEW_PAGES.filter((p) => p.group === group).map((p) => ({
      href: `/preview/${p.slug}`,
      label: p.label,
    })),
  })),
]

/**
 * Page list for the preview. From 1024px a column pinned below the header
 * while the preview scrolls; below that one row that scrolls sideways, so
 * the preview itself stays in view. Both hide the scrollbar, like the
 * shadcn sidebar.
 */
export function PreviewPageNav() {
  const pathname = usePathname()

  return (
    <aside
      aria-label="Preview pages"
      className="-mx-4 no-scrollbar flex gap-1 overflow-x-auto border-b px-4 pb-3 lg:sticky lg:top-22 lg:mx-0 lg:max-h-[calc(100svh-7rem)] lg:flex-col lg:gap-8 lg:overflow-y-auto lg:border-0 lg:p-0"
    >
      {GROUPS.map((group) => (
        <nav
          key={group.label ?? "all"}
          aria-label={group.label ?? "Overview"}
          className="flex shrink-0 gap-1 lg:flex-col"
        >
          {group.label && (
            <span className="hidden px-3 pb-1 text-[13px] font-medium text-muted-foreground lg:block">
              {group.label}
            </span>
          )}
          {group.pages.map((p) => {
            const active = pathname === p.href
            return (
              <Link
                key={p.href}
                href={p.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-9 shrink-0 items-center rounded-lg px-3 text-sm transition-colors outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50",
                  active && "bg-muted font-medium"
                )}
              >
                {p.label}
              </Link>
            )
          })}
        </nav>
      ))}
    </aside>
  )
}
