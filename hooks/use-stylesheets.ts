import { useEffect } from "react"

/**
 * Adds a <link rel="stylesheet"> for each URL (the user's web fonts) the
 * first time it's needed. Links are kept when the selection changes, so
 * switching back to a font is instant and nothing flashes.
 */
export function useStylesheets(urls: readonly string[]) {
  const key = urls.join("\n")
  useEffect(() => {
    for (const href of key ? key.split("\n") : []) {
      if (
        document.head.querySelector(
          `link[data-stylesheet="${CSS.escape(href)}"]`
        )
      ) {
        continue
      }
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = href
      link.dataset.stylesheet = href
      document.head.appendChild(link)
    }
  }, [key])
}
