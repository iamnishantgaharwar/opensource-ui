import { AppHeader } from "@/components/app-header"
import { ColorControls } from "@/components/color/color-controls"
import { PalettesSection } from "@/components/color/palette-display"
import { ControlsPanel } from "@/components/controls-panel"
import { ExportPanel } from "@/components/export/export-panel"
import {
  OpenPreviewButton,
  PreviewLinks,
} from "@/components/preview/preview-links"
import { RadiusControls } from "@/components/radius/radius-controls"
import { Section } from "@/components/section"
import { TypeScaleSection } from "@/components/typography/type-scale-section"
import { TypographyControls } from "@/components/typography/typography-controls"

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
            <div
              id="typography"
              className="flex scroll-mt-28 flex-col gap-1 border-t pt-10 lg:scroll-mt-20"
            >
              <h2 className="text-[2rem] leading-10 font-semibold tracking-tight">
                Typography
              </h2>
              <p className="text-sm text-muted-foreground">
                Pick a base size and a ratio; every role from Display to Caption
                follows.
              </p>
            </div>
            <TypographyControls />
            <div
              id="radius"
              className="flex scroll-mt-28 flex-col gap-1 border-t pt-10 lg:scroll-mt-20"
            >
              <h2 className="text-[2rem] leading-10 font-semibold tracking-tight">
                Radius
              </h2>
              <p className="text-sm text-muted-foreground">
                How round corners are, from cards and dialogs down to badges.
              </p>
            </div>
            <RadiusControls />
          </ControlsPanel>
        </div>
        <main className="flex min-w-0 flex-col gap-12 p-4 lg:p-0">
          <PalettesSection />
          <TypeScaleSection />
          <Section
            id="preview"
            title="Preview"
            description="See your colors, type and radius on real shadcn components, in light and dark."
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
