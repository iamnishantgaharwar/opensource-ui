import type { Metadata } from "next"

import { ClosingCta } from "@/components/landing/closing-cta"
import { DeviceMockups } from "@/components/landing/device-mockups"
import { Faq } from "@/components/landing/faq"
import { Features } from "@/components/landing/features"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { LandingBrandProvider } from "@/components/landing/landing-brand"
import { LegacyShareRedirect } from "@/components/landing/legacy-share-redirect"
import { SiteFooter } from "@/components/landing/site-footer"
import { Stack } from "@/components/landing/stack"

const BRITNEY_CSS =
  "https://api.fontshare.com/v2/css?f[]=britney@700&display=swap"

export const metadata: Metadata = {
  title: "csskit · One brand color in, a complete design system out",
}

export default function LandingPage() {
  return (
    <LandingBrandProvider>
      {/* Britney for the headings (see --font-display in globals.css). */}
      <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
      <link rel="stylesheet" href={BRITNEY_CSS} precedence="default" />
      <LegacyShareRedirect />
      <Hero />
      <main>
        <DeviceMockups />
        <Features />
        <HowItWorks />
        <Stack />
        <Faq />
        <ClosingCta />
      </main>
      <SiteFooter />
    </LandingBrandProvider>
  )
}
