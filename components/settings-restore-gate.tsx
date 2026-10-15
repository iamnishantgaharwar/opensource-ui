"use client"

import { useRevealRestoredSettings } from "@/hooks/use-settings"

export function SettingsRestoreGate() {
  useRevealRestoredSettings()
  return null
}
