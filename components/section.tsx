import { cn } from "@/lib/utils"

/**
 * A titled block. `lg` is a main-column section (24px heading); `sm` is a
 * group inside the controls panel. `action` sits at the right of the title.
 */
export function Section({
  id,
  title,
  description,
  size = "lg",
  action,
  className,
  children,
}: {
  id: string
  title: string
  description?: string
  size?: "sm" | "lg"
  action?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      // Clear the sticky header (two rows on small screens) when jumped to.
      className={cn(
        "flex scroll-mt-28 flex-col lg:scroll-mt-20",
        size === "lg" ? "gap-5" : "gap-4",
        className
      )}
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2
            id={`${id}-title`}
            className={cn(
              "font-semibold",
              size === "lg" ? "text-2xl tracking-tight" : "text-base"
            )}
          >
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                "text-muted-foreground",
                size === "lg" ? "text-sm" : "text-[13px]"
              )}
            >
              {description}
            </p>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

/** Stand-in for a section that a later step fills in. */
export function SectionPlaceholder({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
      {children}
    </div>
  )
}
