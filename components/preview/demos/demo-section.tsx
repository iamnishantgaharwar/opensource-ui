import { cn } from "@/lib/utils"

/** A titled block inside a preview page; rendered on the generated theme. */
export function DemoSection({
  title,
  description,
  className,
  children,
}: {
  title: string
  description?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-sm font-semibold">{title}</h2>
        {description && (
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className={cn("flex flex-wrap items-center gap-3", className)}>
        {children}
      </div>
    </section>
  )
}

/** Inline style that points `--tone` at a token, for tinted variants. */
export const tone = (token: string) =>
  ({ "--tone": `var(--${token})` }) as React.CSSProperties

/**
 * Sample-card elevation from the generated shadow scale, so the Shadows
 * settings show up on the cards (dark mode gets its own stronger values).
 */
export const CARD_SHADOW = "shadow-md"
