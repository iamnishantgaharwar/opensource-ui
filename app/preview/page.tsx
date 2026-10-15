import { PreviewContent } from "@/components/preview/preview-content"
import { PreviewPage } from "@/components/preview/preview-page"

export default function PreviewOverviewPage() {
  return (
    <PreviewPage
      title="All components"
      description="A sample product page built from your palette. Pick a component on the left to see it on its own."
    >
      <PreviewContent />
    </PreviewPage>
  )
}
