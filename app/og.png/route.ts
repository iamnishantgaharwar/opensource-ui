import { ImageResponse } from "next/og"

import { OG_SIZE, OgCard } from "@/components/og/og-card"

// A route named og.png (not the opengraph-image convention) so the static
// export writes a real .png file that any host serves as image/png.
export const dynamic = "force-static"

export function GET() {
  return new ImageResponse(OgCard(), OG_SIZE)
}
