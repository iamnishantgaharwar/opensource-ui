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
import {
  AUTHOR,
  GITHUB_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site"

const BRITNEY_CSS =
  "https://api.fontshare.com/v2/css?f[]=britney@700&display=swap"

export const metadata: Metadata = {
  title: {
    absolute: "csskit · One brand color in, a complete design system out",
  },
  alternates: { canonical: "/" },
}

// Structured data so search engines can show csskit as a free web app.
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL.toString(),
  description: SITE_DESCRIPTION,
  applicationCategory: "DesignApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url },
  codeRepository: GITHUB_URL,
}

export default function LandingPage() {
  return (
    <LandingBrandProvider>
      <script
        type="application/ld+json"
        // Static data; escaping "<" keeps it from ever closing the tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c"),
        }}
      />
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
