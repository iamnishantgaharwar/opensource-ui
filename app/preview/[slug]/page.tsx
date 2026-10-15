import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { findPreviewPage, PREVIEW_PAGES } from "@/components/preview/catalog"
import { PREVIEW_DEMOS } from "@/components/preview/demos"
import { PreviewPage } from "@/components/preview/preview-page"

// Every component page is prerendered; unknown slugs are 404s.
export const dynamicParams = false

export function generateStaticParams() {
  return PREVIEW_PAGES.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  props: PageProps<"/preview/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params
  const page = findPreviewPage(slug)
  return page ? { title: `${page.label} · Preview · opensource-ui` } : {}
}

export default async function ComponentPreviewPage(
  props: PageProps<"/preview/[slug]">
) {
  const { slug } = await props.params
  const page = findPreviewPage(slug)
  if (!page) notFound()
  const Demo = PREVIEW_DEMOS[page.slug]

  return (
    <PreviewPage title={page.label} description={page.description}>
      <div className="flex flex-col gap-10 p-5 @2xl:p-8">
        <Demo />
      </div>
    </PreviewPage>
  )
}
