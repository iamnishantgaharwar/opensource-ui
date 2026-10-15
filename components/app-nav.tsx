"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSyncExternalStore } from "react"

import { cn } from "@/lib/utils"

// Color, Typography and Export are sections of the generator page; Preview is
// its own page. Links work from any page.
const LINKS = [
  { href: "/#color", label: "Color" },
  { href: "/#typography", label: "Typography" },
  { href: "/preview", label: "Preview" },
  { href: "/#export", label: "Export" },
] as const

function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange)
  return () => window.removeEventListener("hashchange", onChange)
}

export function AppNav() {
  const pathname = usePathname()
  const hash = useSyncExternalStore(
    subscribeHash,
    () => window.location.hash,
    () => ""
  )
  // On the generator page the section you jumped to is current; Color until
  // you jump anywhere.
  const current =
    pathname === "/"
      ? `/${hash || "#color"}`
      : pathname.startsWith("/preview")
        ? "/preview"
        : null

  return (
    <nav
      aria-label="Main"
      className="order-last -mx-2 no-scrollbar flex w-[calc(100%+1rem)] gap-1 overflow-x-auto md:order-none md:mx-0 md:w-auto"
    >
      {LINKS.map((link) => {
        const active = link.href === current
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex h-9 shrink-0 items-center rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
              active && "bg-muted font-medium text-foreground"
            )}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
