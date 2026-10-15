import { useMemo } from "react"

import { useModuleSettings } from "@/hooks/use-settings"
import { generateColorSystem } from "@/lib/modules/color"

/** The generated color system for the current settings, recomputed on change. */
export function useColorSystem() {
  const [color] = useModuleSettings("color")
  return useMemo(() => generateColorSystem(color), [color])
}
