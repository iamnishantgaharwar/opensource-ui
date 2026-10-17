import {
  defaultSettings,
  generateTokens,
  type DesignSettings,
} from "@/lib/tokens/registry"

export const STORAGE_KEY = "opensource-ui:settings:v1"

/** Set on <html> while saved settings are being restored (see restoreScript). */
export const RESTORING_ATTR = "data-restoring"

/**
 * Runs in <head> before first paint. If settings were saved or the URL is a
 * share link (?s=, see lib/tokens/share.ts), it marks <html>
 * so settings-driven UI stays hidden until the app has applied them, instead
 * of flashing the server-rendered defaults. The timeout is a safety net in
 * case scripts fail to load.
 */
export const restoreScript = `(function(){var h=/[?&]s=/.test(location.search);try{h=h||!!localStorage.getItem(${JSON.stringify(STORAGE_KEY)})}catch(e){}if(h){var d=document.documentElement;d.setAttribute("${RESTORING_ATTR}","");setTimeout(function(){d.removeAttribute("${RESTORING_ATTR}")},5000)}})()`

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v)

/**
 * Takes each value from `saved` when it has the same type as the default, and
 * the default otherwise. Keys missing from the defaults are dropped, and keys
 * added since the data was saved get their defaults.
 */
function mergeWithDefaults<T>(defaults: T, saved: unknown): T {
  if (isPlainObject(defaults)) {
    if (!isPlainObject(saved)) return defaults
    const out: Record<string, unknown> = {}
    for (const key of Object.keys(defaults)) {
      out[key] = mergeWithDefaults(defaults[key], saved[key])
    }
    return out as T
  }
  if (saved === undefined) return defaults
  // Nullable fields (e.g. an empty brand slot) default to null.
  if (defaults === null) {
    return (saved === null || typeof saved === "string" ? saved : defaults) as T
  }
  return (typeof saved === typeof defaults ? saved : defaults) as T
}

/**
 * Restores settings from stored JSON. Falls back to defaults when the data is
 * unreadable or produces settings the generators can't handle (e.g. an
 * unknown preset name from an older version).
 */
export function restoreSettings(json: string | null): DesignSettings {
  const defaults = defaultSettings()
  if (!json) return defaults
  try {
    const settings = mergeWithDefaults(defaults, JSON.parse(json))
    generateTokens(settings)
    return settings
  } catch {
    return defaults
  }
}
