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

/** Soft two-layer shadow for the sample cards; deeper on dark surfaces. */
export const CARD_SHADOW =
  "shadow-[0_1px_2px_rgb(0_0_0/0.05),0_10px_28px_-12px_rgb(0_0_0/0.18)] dark:shadow-[0_1px_2px_rgb(0_0_0/0.4),0_12px_32px_-12px_rgb(0_0_0/0.7)]"
