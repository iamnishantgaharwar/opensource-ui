import type { Metadata } from "next"

import { AppHeader } from "@/components/app-header"
import { ColorToolbar } from "@/components/color/color-toolbar"
import {
  PreviewModeButton,
  PreviewModeProvider,
} from "@/components/preview/preview-mode"
import { PreviewPageNav } from "@/components/preview/preview-nav"

export const metadata: Metadata = {
  title: "Preview · opensource-ui",
  description: "See your generated colors on real shadcn components.",
}

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader />
      <PreviewModeProvider>
        {/* Full width, unlike the generator page: demos such as the resource
            cards size themselves with container queries and need the room. */}
        <div className="flex w-full flex-1 flex-col gap-6 p-4 lg:grid lg:grid-cols-[232px_minmax(0,1fr)] lg:items-start lg:gap-8 lg:p-8">
          {/* Full-height divider halfway into the gap. It fits inside the
              existing widths so the demos keep their room. */}
          <div className="lg:-mr-4 lg:self-stretch lg:border-r lg:pr-4">
            <PreviewPageNav />
          </div>
          <main className="flex min-w-0 flex-col">
            {children}
            <ColorToolbar>
              <PreviewModeButton />
            </ColorToolbar>
          </main>
        </div>
      </PreviewModeProvider>
    </div>
  )
}
