import type { Metadata } from "next"

import { AppHeader } from "@/components/app-header"
import { ColorToolbar } from "@/components/color/color-toolbar"
import {
  PreviewModeButton,
  PreviewModeProvider,
} from "@/components/preview/preview-mode"
import { PreviewPageNav } from "@/components/preview/preview-nav"
import { ShareUrlSync } from "@/components/share-link"
import { pageMetadata } from "@/lib/metadata"
import { SITE_NAME } from "@/lib/site"
import {
  InspectButton,
  TokenInspector,
} from "@/components/preview/token-inspector"

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Preview",
    description:
      "See your generated design system on real shadcn/ui components, in light and dark.",
    path: "/preview",
  }),
  // A plain title here would stop the root "· csskit" template reaching the
  // component pages, so pass it on.
  title: { default: "Preview", template: `%s · ${SITE_NAME}` },
}

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col">
      <ShareUrlSync />
      <AppHeader />
      <PreviewModeProvider>
        {/* The generator page's 1440px column, so the header doesn't move
            between pages. */}
        <div className="mx-auto flex w-full max-w-360 flex-1 flex-col gap-6 p-4 lg:grid lg:grid-cols-[232px_minmax(0,1fr)] lg:items-start lg:gap-8 lg:p-8">
          {/* Full-height divider halfway into the gap. It fits inside the
              existing widths so the demos keep their room. */}
          <div className="lg:-mr-4 lg:self-stretch lg:border-r lg:pr-4">
            <PreviewPageNav />
          </div>
          <main className="flex min-w-0 flex-col">
            {children}
            <ColorToolbar>
              <PreviewModeButton />
              <InspectButton />
            </ColorToolbar>
            <TokenInspector />
          </main>
        </div>
      </PreviewModeProvider>
    </div>
  )
}
