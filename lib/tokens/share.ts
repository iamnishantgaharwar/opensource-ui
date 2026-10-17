import { restoreSettings } from "@/lib/tokens/persist"
import { defaultSettings, type DesignSettings } from "@/lib/tokens/registry"

/** Query parameter that carries shared settings: `/?s=…`. */
export const SHARE_PARAM = "s"

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v)

/**
 * Only the values that differ from the defaults, so links stay short and a
 * link made before a new setting existed still picks up that setting's
 * default. Undefined when nothing differs.
 */
function diff(value: unknown, defaults: unknown): unknown {
  if (isPlainObject(value) && isPlainObject(defaults)) {
    const out: Record<string, unknown> = {}
    for (const key of Object.keys(value)) {
      const d = diff(value[key], defaults[key])
      if (d !== undefined) out[key] = d
    }
    return Object.keys(out).length ? out : undefined
  }
  return Object.is(value, defaults) ? undefined : value
}

// base64url of UTF-8, so the token survives any URL position unescaped.
function toBase64Url(text: string) {
  const bytes = new TextEncoder().encode(text)
  let binary = ""
  for (const b of bytes) binary += String.fromCharCode(b)
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function fromBase64Url(token: string) {
  const b64 = token.replace(/-/g, "+").replace(/_/g, "/")
  const binary = atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4))
  return new TextDecoder().decode(
    Uint8Array.from(binary, (c) => c.charCodeAt(0))
  )
}

/** The share token for some settings; "" when they're the defaults. */
export function encodeSettings(settings: DesignSettings): string {
  const changed = diff(settings, defaultSettings())
  return changed === undefined ? "" : toBase64Url(JSON.stringify(changed))
}

/**
 * Settings from a share token. Validated like saved settings: anything
 * unreadable or unusable falls back to the defaults. Null when there's no
 * token or it isn't valid base64.
 */
export function decodeSettings(token: string | null): DesignSettings | null {
  if (!token) return null
  try {
    return restoreSettings(fromBase64Url(token))
  } catch {
    return null
  }
}

/** `pathname?s=…#hash` for the current settings. */
export function shareHref(
  settings: DesignSettings,
  pathname: string,
  hash = ""
): string {
  const token = encodeSettings(settings)
  return `${pathname}${token ? `?${SHARE_PARAM}=${token}` : ""}${hash}`
}
