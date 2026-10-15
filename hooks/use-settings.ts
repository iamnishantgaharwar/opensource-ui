import { useCallback, useEffect, useSyncExternalStore } from "react"

import {
  RESTORING_ATTR,
  restoreSettings,
  STORAGE_KEY,
} from "@/lib/tokens/persist"
import { defaultSettings, type DesignSettings } from "@/lib/tokens/registry"

type ModuleId = keyof DesignSettings

const SAVE_DELAY_MS = 250

// Storage can throw (private mode, blocked cookies); the app then just
// doesn't persist.
function readStorage() {
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function writeStorage(value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(STORAGE_KEY)
    else window.localStorage.setItem(STORAGE_KEY, value)
  } catch {}
}

// One client-side store for every module's settings. Updates are immutable,
// so each module's slice keeps its identity until that module changes.
// The server snapshot is always the defaults; React swaps in the saved
// settings right after hydration.
const serverState = defaultSettings()
let state =
  typeof window === "undefined" ? serverState : restoreSettings(readStorage())
const listeners = new Set<() => void>()
let saveTimer: ReturnType<typeof setTimeout> | undefined

function emit() {
  for (const listener of listeners) listener()
}

// Debounced so dragging the color picker doesn't write on every frame.
function scheduleSave() {
  clearTimeout(saveTimer)
  saveTimer = setTimeout(() => {
    saveTimer = undefined
    writeStorage(JSON.stringify(state))
  }, SAVE_DELAY_MS)
}

if (typeof window !== "undefined") {
  // Don't lose the last change if the tab closes inside the debounce window.
  window.addEventListener("pagehide", () => {
    if (saveTimer === undefined) return
    clearTimeout(saveTimer)
    saveTimer = undefined
    writeStorage(JSON.stringify(state))
  })
}

export const settingsStore = {
  get: () => state,
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  update<K extends ModuleId>(
    id: K,
    update: (current: DesignSettings[K]) => DesignSettings[K]
  ) {
    state = { ...state, [id]: update(state[id]) }
    emit()
    scheduleSave()
  },
  /** Back to defaults; the only action that clears saved settings. */
  reset() {
    clearTimeout(saveTimer)
    saveTimer = undefined
    writeStorage(null)
    state = defaultSettings()
    emit()
  },
}

export function useSettings(): DesignSettings {
  return useSyncExternalStore(
    settingsStore.subscribe,
    settingsStore.get,
    () => serverState
  )
}

/** A module's settings and a setter that merges a partial patch into them. */
export function useModuleSettings<K extends ModuleId>(id: K) {
  const settings = useSyncExternalStore(
    settingsStore.subscribe,
    () => settingsStore.get()[id],
    () => serverState[id]
  )
  const update = useCallback(
    (patch: Partial<DesignSettings[K]>) =>
      settingsStore.update(id, (current) => ({ ...current, ...patch })),
    [id]
  )
  return [settings, update] as const
}

/**
 * Reveals settings-driven UI once the restored settings have rendered. During
 * hydration React renders the server snapshot (defaults) first, so wait until
 * the rendered settings are the store's own.
 */
export function useRevealRestoredSettings() {
  const settings = useSettings()
  useEffect(() => {
    if (settings === settingsStore.get()) {
      document.documentElement.removeAttribute(RESTORING_ATTR)
    }
  }, [settings])
}
