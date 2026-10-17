import type { Metadata } from "next"

import { OG_IMAGE, SITE_NAME } from "@/lib/site"

/**
 * Page metadata with matching Open Graph and Twitter fields. Pages need the
 * full objects: Next replaces a parent's `openGraph` instead of merging it.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  const fullTitle = `${title} · ${SITE_NAME}`
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
  }
}
