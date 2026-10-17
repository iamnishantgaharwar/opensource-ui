import type { MetadataRoute } from "next"

import { PREVIEW_PAGES } from "@/components/preview/catalog"
import { SITE_URL } from "@/lib/site"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, SITE_URL).toString()
  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    { url: url("/design"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/preview"), changeFrequency: "monthly", priority: 0.7 },
    ...PREVIEW_PAGES.map((page) => ({
      url: url(`/preview/${page.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ]
}
