import { AppHeader } from "@/components/app-header"
import { ColorControls } from "@/components/color/color-controls"
import { PalettesSection } from "@/components/color/palette-display"
import { ControlsPanel } from "@/components/controls-panel"
import { ExportPanel } from "@/components/export/export-panel"
import {
  OpenPreviewButton,
  PreviewLinks,
} from "@/components/preview/preview-links"
import { Section, SectionPlaceholder } from "@/components/section"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader contained />
      {/* Hidden while saved settings are restored; see restoreScript. */}
      <div
        data-restore-target
        className="mx-auto w-full max-w-360 flex-1 lg:grid lg:grid-cols-[minmax(304px,384px)_minmax(0,1fr)] lg:items-start lg:gap-12 lg:p-8"
      >
        {/* Full-height divider centered in the gap; the panel inside stays
            pinned while the page scrolls. */}
        <div className="lg:-mr-6 lg:self-stretch lg:border-r lg:pr-6">
          <ControlsPanel>
            <div
              id="color"
              className="flex scroll-mt-28 flex-col gap-1 lg:scroll-mt-20"
            >
              <h1 className="text-[2rem] leading-10 font-semibold tracking-tight">
                Color
              </h1>
              <p className="text-sm text-muted-foreground">
                Set your brand hues. Neutrals and status colors follow, with
                light and dark roles.
              </p>
            </div>
            <ColorControls />
            <Section
              id="typography"
              size="sm"
              title="Typography"
              description="Base size, ratio and font family."
            >
              <SectionPlaceholder>Coming after color</SectionPlaceholder>
            </Section>
          </ControlsPanel>
        </div>
        <main className="flex min-w-0 flex-col gap-12 p-4 lg:p-0">
          <PalettesSection />
          <Section
            id="preview"
            title="Preview"
            description="See your colors on real shadcn components, in light and dark."
            action={<OpenPreviewButton />}
          >
            <PreviewLinks />
          </Section>
          <Section
            id="export"
            title="Export"
            description="Copy-ready tokens for shadcn, Tailwind and JSON."
          >
            <ExportPanel />
          </Section>
        </main>
      </div>
    </div>
  )
}
