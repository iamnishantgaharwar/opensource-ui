import { useEffect, useRef, useState } from "react"

/**
 * For a horizontal scroller: whether content is hidden past its right edge.
 * Updates on scroll and whenever the scroller or its items resize, so it
 * flips off once the user reaches the end or the screen grows wide enough.
 */
export function useOverflowEnd<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [more, setMore] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // 1px slack for subpixel widths.
    const update = () =>
      setMore(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
    update()
    el.addEventListener("scroll", update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(el)
    for (const child of el.children) observer.observe(child)
    return () => {
      el.removeEventListener("scroll", update)
      observer.disconnect()
    }
  }, [])

  return [ref, more] as const
}
