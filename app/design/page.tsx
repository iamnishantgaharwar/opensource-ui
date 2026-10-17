import type { Metadata } from "next"

import { AppHeader } from "@/components/app-header"
import { ColorControls } from "@/components/color/color-controls"
import { ContrastSection } from "@/components/color/contrast-section"
import { PalettesSection } from "@/components/color/palette-display"
import { ControlsPanel } from "@/components/controls-panel"
import { ExportPanel } from "@/components/export/export-panel"
import { ImportTheme } from "@/components/import-theme"
import { PresetsMenu } from "@/components/presets-menu"
import {
  OpenPreviewButton,
  PreviewLinks,
} from "@/components/preview/preview-links"
import { RadiusControls } from "@/components/radius/radius-controls"
import { Section } from "@/components/section"
import { ShareUrlSync } from "@/components/share-link"
import { ShadowControls } from "@/components/shadow/shadow-controls"
import { SpacingControls } from "@/components/spacing/spacing-controls"
import { TypeScaleSection } from "@/components/typography/type-scale-section"
import { TypographyControls } from "@/components/typography/typography-controls"

export const metadata: Metadata = {
  title: "Design · csskit",
}

export default function DesignPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <ShareUrlSync />
      <AppHeader />
      {/* Hidden while saved settings are restored; see restoreScript. */}
      <div
        data-restore-target
        className="mx-auto w-full max-w-360 flex-1 lg:grid lg:grid-cols-[minmax(304px,384px)_minmax(0,1fr)] lg:items-start lg:gap-12 lg:p-8"
      >
        {/* Full-height divider centered in the gap; the panel inside stays
            pinned while the page scrolls. */}
        <div className="lg:-mr-6 lg:self-stretch lg:border-r lg:pr-6">
          <ControlsPanel>
            {/* Ways to start: a curated system or your existing theme. */}
            <div className="grid grid-cols-2 gap-2">
              <PresetsMenu />
              <ImportTheme />
            </div>
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
            <div
              id="shadows"
              className="flex scroll-mt-28 flex-col gap-1 border-t pt-10 lg:scroll-mt-20"
            >
              <h2 className="text-[2rem] leading-10 font-semibold tracking-tight">
                Shadows
              </h2>
              <p className="text-sm text-muted-foreground">
                Depth for cards, popovers and dialogs, from barely there to
                strong.
              </p>
            </div>
            <ShadowControls />
            <div
              id="spacing"
              className="flex scroll-mt-28 flex-col gap-1 border-t pt-10 lg:scroll-mt-20"
            >
              <h2 className="text-[2rem] leading-10 font-semibold tracking-tight">
                Spacing
              </h2>
              <p className="text-sm text-muted-foreground">
                One base unit sets the density of everything: padding, gaps and
                control heights.
              </p>
            </div>
            <SpacingControls />
          </ControlsPanel>
        </div>
        <main className="flex min-w-0 flex-col gap-16 p-4 lg:p-0">
          <PalettesSection />
          <ContrastSection />
          <TypeScaleSection />
          <Section
            id="preview"
            title="Preview"
            description="See your whole system on real shadcn components, in light and dark."
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
