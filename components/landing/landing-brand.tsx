"use client"

import { createContext, useContext, useMemo } from "react"

import { generateColorSystem, type ColorSystem } from "@/lib/modules/color"
import { LANDING_BRAND } from "@/lib/site"
import { defaultSettings, type DesignSettings } from "@/lib/tokens/registry"

interface LandingBrand {
  brand: string
  settings: DesignSettings
  system: ColorSystem
}

const LandingBrandContext = createContext<LandingBrand | null>(null)

/**
 * The landing page's generated system, for LANDING_BRAND. Fixed on purpose:
 * trying colors happens in the generator, not on the marketing page.
 */
export function LandingBrandProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const value = useMemo(() => {
    const settings = defaultSettings()
    return {
      brand: LANDING_BRAND,
      settings,
      system: generateColorSystem(settings.color),
    }
  }, [])
  return (
    <LandingBrandContext.Provider value={value}>
      {children}
    </LandingBrandContext.Provider>
  )
}

export function useLandingBrand() {
  const value = useContext(LandingBrandContext)
  if (!value)
    throw new Error("useLandingBrand needs a LandingBrandProvider above it")
  return value
}
