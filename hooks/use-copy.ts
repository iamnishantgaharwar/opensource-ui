import { useCallback, useEffect, useRef, useState } from "react"
import { toast, type ExternalToast } from "sonner"

/**
 * Copies text and remembers which item was copied for a moment, so the
 * trigger can show a check mark. A toast confirms it for screen readers too;
 * its second line names what was copied (the text itself unless `detail`
 * says otherwise, e.g. a filename for a whole file).
 */
export function useCopy(resetMs = 1500) {
  const [copied, setCopied] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = useCallback(
    async (
      text: string,
      key = text,
      detail = text,
      toastOptions?: ExternalToast
    ) => {
      try {
        await navigator.clipboard.writeText(text)
      } catch {
        toast.error("Couldn't copy to the clipboard")
        return
      }
      setCopied(key)
      toast.success("Copied to clipboard", {
        description: detail,
        classNames: { description: "truncate font-mono" },
        ...toastOptions,
      })
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(null), resetMs)
    },
    [resetMs]
  )

  return { copied, copy }
}
