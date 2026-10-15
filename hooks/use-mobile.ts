import { useMediaQuery } from "@/hooks/use-media-query"

const MOBILE_BREAKPOINT = 768

// Rewritten from shadcn's version on top of useMediaQuery (useSyncExternalStore),
// which avoids setting state inside an effect.
export function useIsMobile() {
  return useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
}
