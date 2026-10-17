"use client"

import { useEffect } from "react"

import { SHARE_PARAM } from "@/lib/tokens/share"

/**
 * Share links used to point at "/". The generator now lives at /design, so
 * an old link is forwarded there with its settings intact.
 */
export function LegacyShareRedirect() {
  useEffect(() => {
    const { search, hash } = window.location
    if (new URLSearchParams(search).has(SHARE_PARAM))
      window.location.replace(`/design${search}${hash}`)
  }, [])
  return null
}
