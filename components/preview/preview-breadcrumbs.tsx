import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function PreviewBreadcrumbs({ current }: { current: string }) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-[13px]">
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/preview" />}>
            Preview
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{current}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
