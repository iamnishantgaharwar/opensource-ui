"use client"

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type HTMLMotionProps,
  type Transition,
} from "motion/react"
import { useEffect, useRef } from "react"

// The design's easing: a quick start that settles softly.
const EASE = [0.2, 0.7, 0.2, 1] as const

// The server can't know the visitor's motion setting, so markup is the same
// either way (no hydration mismatch); reduced motion only changes timing,
// which applies after hydration.
function useTiming(transition: Transition): Transition {
  return useReducedMotion() ? { duration: 0 } : transition
}

type DivProps = Omit<HTMLMotionProps<"div">, "initial" | "animate">

/** Fades in on load (the header). */
export function FadeIn({ delay = 0, ...props }: DivProps & { delay?: number }) {
  const transition = useTiming({ duration: 0.5, ease: "easeOut", delay })
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={transition}
      {...props}
    />
  )
}

/** Rises 16px into place on load; staggered with `delay` (in seconds). */
export function FadeUp({ delay = 0, ...props }: DivProps & { delay?: number }) {
  const transition = useTiming({ duration: 0.6, ease: EASE, delay })
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
      {...props}
    />
  )
}

/** A bigger, slower rise for the device mockup. */
export function RiseIn({ delay = 0, ...props }: DivProps & { delay?: number }) {
  const transition = useTiming({ duration: 0.9, ease: EASE, delay })
  return (
    <motion.div
      initial={{ opacity: 0, y: 48, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={transition}
      {...props}
    />
  )
}

/**
 * Fades up as it scrolls into view, tied to scroll position: fully in once
 * 60% of it is on screen, and it plays back when you scroll up. With reduced
 * motion it's simply shown.
 */
export function Reveal({
  as = "div",
  style,
  ...props
}: Omit<HTMLMotionProps<"div">, "style"> & {
  as?: "div" | "li" | "article"
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "0.6 end"],
  })
  const opacity = useMotionValue(0)
  const y = useMotionValue(16)

  const apply = (progress: number) => {
    const p = reduce ? 1 : progress
    opacity.set(p)
    y.set(16 * (1 - p))
  }
  useMotionValueEvent(scrollYProgress, "change", apply)
  // Sync on mount and when the motion setting resolves.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => apply(scrollYProgress.get()), [reduce])

  const Tag = motion[as] as typeof motion.div
  return <Tag ref={ref} {...props} style={{ ...style, opacity, y }} />
}

/** One hero stripe, breathing between its strength and 45% of it. */
export function Beam({
  left,
  width,
  opacity,
  duration,
}: {
  left: number
  width: number
  opacity: number
  duration: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.span
      className="absolute top-0 h-3/5 bg-linear-to-b from-foreground to-transparent blur-[2px]"
      style={{ left: `${left}%`, width: `${width}%` }}
      initial={{ opacity }}
      animate={
        reduce ? { opacity } : { opacity: [opacity, opacity * 0.45, opacity] }
      }
      transition={
        reduce
          ? { duration: 0 }
          : { duration, ease: "easeInOut", repeat: Infinity }
      }
    />
  )
}
