import { Cookie } from "next/font/google"

import { LogoWordmark } from "@/components/logo-wordmark"
import { COFFEE_URL } from "@/lib/site"

// Buy Me a Coffee's button face; only the button uses it.
const cookie = Cookie({ weight: "400", subsets: ["latin"] })

/** Styled after Buy Me a Coffee's own button, in their brand colors. */
function CoffeeButton() {
  return (
    <a
      href={COFFEE_URL}
      target="_blank"
      rel="noreferrer"
      className={`${cookie.className} flex h-12 items-center gap-2 self-start rounded-[10px] border border-(--coffee-foreground) bg-(--coffee) pr-4.5 pl-3.5 text-[1.75rem] leading-none text-(--coffee-foreground) shadow-xs transition-transform outline-none hover:-translate-y-px focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none`}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="size-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M4 8h13v5a6.5 6.5 0 0 1-13 0z"
          className="fill-(--coffee-cup)"
        />
        <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17" />
        <path d="M8 2.5c0 1 1 1.5 1 2.5M12 2.5c0 1 1 1.5 1 2.5" />
      </svg>
      Buy me a coffee
    </a>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-10 px-4 py-12 sm:px-8">
        <div className="flex max-w-xs flex-col gap-3">
          <LogoWordmark className="self-start" />
          <p className="text-sm text-muted-foreground">
            A free design-token generator for shadcn/ui and Tailwind.
          </p>
          <div className="flex flex-col gap-2 pt-3">
            <span className="text-[13px] text-muted-foreground">
              It&apos;s free. If it saved you time, you can chip in.
            </span>
            <CoffeeButton />
          </div>
        </div>
      </div>
      <p className="mx-auto max-w-7xl px-4 pb-8 text-[13px] text-muted-foreground sm:px-8">
        © 2026 csskit
      </p>
    </footer>
  )
}
