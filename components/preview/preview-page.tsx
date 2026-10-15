import { PreviewBreadcrumbs } from "@/components/preview/preview-breadcrumbs"
import { PreviewSurface } from "@/components/preview/preview-mode"

/**
 * A preview page: title in the app chrome, then the generated theme on a
 * framed surface, so the user's system is the only strong color on screen.
 */
export function PreviewPage({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div data-restore-target className="flex flex-col gap-8">
      <div className="flex max-w-180 flex-col gap-2">
        <PreviewBreadcrumbs current={title} />
        <h1 className="text-[2rem] leading-10 font-semibold tracking-tight">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="rounded-[14px] bg-muted p-2 md:p-4">
        <PreviewSurface className="@container overflow-hidden rounded-[10px] border shadow-xs">
          {children}
        </PreviewSurface>
      </div>
    </div>
  )
}
