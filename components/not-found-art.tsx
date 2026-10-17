"use client"

import { motion, useReducedMotion } from "motion/react"

const STROKE = {
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  fill: "none",
} as const

/**
 * Someone puzzled by a blank swatch card that floats beside them. The card
 * bobs gently (not with reduced motion); `spot` is the offset accent.
 */
export function NotFoundArt({ spot }: { spot: string }) {
  const reduce = useReducedMotion()
  return (
    <svg
      aria-hidden
      viewBox="0 0 360 320"
      className="block h-80 w-full overflow-visible text-foreground"
    >
      <motion.g
        style={{ transformBox: "fill-box", originX: 0.5, originY: 1 }}
        initial={{ y: 0, rotate: -4 }}
        animate={reduce ? undefined : { y: [0, -8, 0], rotate: [-4, 3, -4] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      >
        <g transform="translate(6 6)">
          <rect x="196" y="40" width="108" height="140" rx="14" fill={spot} />
        </g>
        <g {...STROKE}>
          <rect
            x="196"
            y="40"
            width="108"
            height="140"
            rx="14"
            className="fill-background"
          />
          <rect
            x="212"
            y="56"
            width="76"
            height="70"
            rx="8"
            strokeDasharray="4 8"
          />
          <path d="M240 82c0-12 22-12 22 0 0 9-11 9-11 18" />
          <path d="M251 112h.01" strokeWidth="4" />
          <path d="M212 146h48M212 160h30" />
        </g>
      </motion.g>
      <g {...STROKE}>
        <path d="M70 168c-8-24 6-46 30-46 20 0 32 14 32 32 0 20-14 32-32 32-14 0-26-6-30-18" />
        <path d="M92 185v13M110 185v13" />
        <path d="M92 198c-24 4-40 30-42 102" />
        <path d="M92 198l9 10 9-10" />
        <path d="M110 198c10 0 18 4 24 10l42-38" />
        <path d="M188 182l-44 40c4 24 6 52 6 78" />
        <path d="M174 170c2-9 15-11 19-3 3 7-2 14-10 15" />
        <path d="M72 300v-26" />
        <path d="M150 70l-4-12M168 64l4-12M134 82l-10-6" />
        <path d="M20 304c14 10 28-8 42 0s28-8 42 0 28-8 42 0 28-8 42 0 28-8 42 0 28-8 42 0" />
        <path d="M322 30l6-10M332 44l10-4" />
      </g>
      <path
        d="M64 162c-12-6-16-24-6-36 2-14 16-22 30-20 10-10 30-8 38 4 12 2 18 14 14 24-6 4-14 2-20-4-6 6-18 8-26 4-6 8-12 14-12 22-6 0-12 2-18 6z"
        fill="currentColor"
      />
      <circle cx="100" cy="156" r="3.5" fill="currentColor" />
      <circle cx="114" cy="156" r="3.5" fill="currentColor" />
      <path d="M98 170c4 -3 10 -3 14 0" {...STROKE} />
    </svg>
  )
}
