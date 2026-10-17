// Line drawings for the landing page. Strokes use the text color and fills
// the page background, so they follow light and dark; `spot` is the one
// accent, offset behind the drawing like a print misregistration.

const STROKE = {
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  fill: "none",
} as const

function Frame({
  viewBox,
  className,
  children,
}: {
  viewBox: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <svg
      aria-hidden
      viewBox={viewBox}
      className={
        className ?? "block h-35 w-45 overflow-visible text-foreground"
      }
    >
      {children}
    </svg>
  )
}

/** Fanned color cards in a hand. */
export function PickColorArt({ spot }: { spot: string }) {
  return (
    <Frame viewBox="0 0 160 140">
      <g transform="translate(5 5)">
        <rect
          x="84"
          y="26"
          width="34"
          height="78"
          rx="7"
          transform="rotate(20 96 104)"
          fill={spot}
        />
      </g>
      <g {...STROKE}>
        <rect
          x="58"
          y="22"
          width="34"
          height="80"
          rx="7"
          transform="rotate(-20 75 104)"
          className="fill-background"
        />
        <rect
          x="70"
          y="18"
          width="34"
          height="84"
          rx="7"
          className="fill-background"
        />
        <rect
          x="84"
          y="26"
          width="34"
          height="78"
          rx="7"
          transform="rotate(20 96 104)"
          className="fill-background"
        />
        <circle cx="87" cy="34" r="6" />
        <path d="M78 52h18M78 62h12" />
        <path d="M46 126c4-10 10-18 20-22 8-3 16-2 24 1 6 2 12 1 18-3 5-3 10 3 6 8-6 8-16 13-28 14" />
        <path d="M72 104c-6-6-2-14 6-12M64 108c-5-6 0-13 7-11" />
        <path d="M36 132l12-10M56 136l8-8" />
        <path d="M40 34l-9-6M36 48H25M46 20l-4-9" />
      </g>
    </Frame>
  )
}

/** A type sample under a magnifier with a check. */
export function ReviewArt({ spot }: { spot: string }) {
  return (
    <Frame viewBox="0 0 160 140">
      <g transform="translate(5 5)">
        <circle cx="104" cy="62" r="26" fill={spot} />
      </g>
      <g {...STROKE}>
        <rect x="18" y="30" width="86" height="70" rx="9" />
        <path d="M30 46h20" />
        <circle cx="104" cy="62" r="26" className="fill-background" />
        <path d="M93 63l7 7 14-15" />
        <path d="M123 82l18 20" strokeWidth="7" />
        <path d="M130 22l4-9M142 30l9-4M120 18l-1-10" />
        <path d="M22 118c8 6 16-6 24 0s16-6 24 0" />
      </g>
      <text
        x="30"
        y="88"
        fontSize="30"
        fontWeight="700"
        fill="currentColor"
        className="font-sans"
      >
        Aa
      </text>
    </Frame>
  )
}

/** A clipboard of token lines. */
export function PasteArt({ spot }: { spot: string }) {
  return (
    <Frame viewBox="0 0 160 140">
      <g transform="translate(6 6)">
        <rect x="42" y="26" width="76" height="96" rx="9" fill={spot} />
      </g>
      <g {...STROKE}>
        <rect
          x="42"
          y="26"
          width="76"
          height="96"
          rx="9"
          className="fill-background"
        />
        <rect
          x="62"
          y="17"
          width="36"
          height="17"
          rx="6"
          className="fill-background"
        />
        <path d="M56 52h28M56 66h46M64 80h30M56 94h22M56 108h36" />
        <path d="M128 40c16 2 22 18 10 26-9 6-17-6-8-11 8-4 14 6 10 16-3 7-9 11-16 13" />
        <path d="M118 80l6 6-8 3" />
        <path d="M30 40l-9-5M28 54H17M36 26l-4-9" />
      </g>
    </Frame>
  )
}

/** Someone with a question. */
export function QuestionArt({ spot }: { spot: string }) {
  const bubble =
    "M118 22h58a12 12 0 0 1 12 12v30a12 12 0 0 1-12 12h-30l-16 14 2-14h-14a12 12 0 0 1-12-12V34a12 12 0 0 1 12-12z"
  return (
    <Frame
      viewBox="0 0 200 170"
      className="block h-46.75 w-55 overflow-visible text-foreground"
    >
      <g transform="translate(5 5)">
        <path d={bubble} fill={spot} />
      </g>
      <g {...STROKE}>
        <path d={bubble} className="fill-background" />
        <path d="M140 40c0-8 16-8 16 0 0 6-8 7-8 13" />
        <path d="M148 62h.01" strokeWidth="4" />
        <path d="M52 98c-8-24 6-46 30-46 20 0 32 14 32 32 0 20-14 32-32 32-14 0-26-6-30-18" />
        <path d="M74 115v13M92 115v13" />
        <path d="M38 170c0-24 14-40 36-42M92 128c22 2 36 18 36 42" />
        <path d="M74 128l9 10 9-10" />
        <path d="M58 170v-14M108 170v-14" />
        <path d="M140 104l8-6M146 118h10" />
      </g>
      <path
        d="M46 92c-12-6-16-24-6-36 2-14 16-22 30-20 10-10 30-8 38 4 12 2 18 14 14 24-6 4-14 2-20-4-6 6-18 8-26 4-6 8-12 14-12 22-6 0-12 2-18 6z"
        fill="currentColor"
      />
      <circle cx="82" cy="86" r="3.5" fill="currentColor" />
      <circle cx="96" cy="86" r="3.5" fill="currentColor" />
    </Frame>
  )
}

const SPARK = "M0 -9C1 -3 3 -1 9 0C3 1 1 3 0 9C-1 3 -3 1 -9 0C-3 -1 -1 -3 0 -9Z"

/** A token pill on a tilt, for the stack scene. */
function Tag({
  transform,
  width,
  label,
  spot,
}: {
  transform: string
  width: number
  label: string
  spot?: string
}) {
  return (
    <g transform={transform}>
      {spot && (
        <g transform="translate(4 4)">
          <rect width={width} height="36" rx="9" fill={spot} />
        </g>
      )}
      <rect
        width={width}
        height="36"
        rx="9"
        {...STROKE}
        className="fill-background"
      />
      <circle cx="14" cy="18" r="4" {...STROKE} />
      <text
        x="28"
        y="23"
        fontSize="14"
        fontWeight="600"
        fill="currentColor"
        className="font-mono"
      >
        {label}
      </text>
    </g>
  )
}

/** A cup pouring tokens out as CSS, Tailwind and JSON. */
export function StackArt({ spot }: { spot: string }) {
  const splash =
    "M213 168c2-14 22-20 34-12 10-8 26-2 22 10 10 4 6 18-6 18h-42c-12 0-14-10-8-16z"
  const pour = "M139 95c22 6 18 34 42 40s34 14 52 20"
  return (
    <Frame
      viewBox="0 0 420 210"
      className="block h-52.5 w-full overflow-visible text-foreground"
    >
      <path
        d={pour}
        fill="none"
        stroke={spot}
        strokeWidth="14"
        strokeLinecap="round"
      />
      <g transform="translate(5 5)">
        <path d={splash} fill={spot} />
      </g>
      <g transform="rotate(28 85 110)">
        <g transform="translate(5 5)">
          <path d="M50 70h70l-10 80H60z" fill={spot} />
        </g>
        <path
          d="M50 70h70l-10 80H60z"
          {...STROKE}
          className="fill-background"
        />
        <path
          d="M50 70c0-9 70-9 70 0c0 9-70 9-70 0z"
          {...STROKE}
          className="fill-background"
        />
        <path d="M52 84c-24-40 84-58 66-6" {...STROKE} />
        <path d="M66 100v28M80 104v34" {...STROKE} />
      </g>
      <path d={pour} {...STROKE} />
      <path d={splash} {...STROKE} className="fill-background" />
      <circle cx="200" cy="184" r="4" fill="currentColor" />
      <circle cx="284" cy="170" r="3" fill="currentColor" />
      <path
        d="M248 152c4-30 14-60 34-92M256 154c18-22 30-40 52-50M264 158c20-6 32-8 48-6"
        {...STROKE}
        strokeDasharray="2 8"
      />
      <Tag
        transform="translate(276 22) rotate(-10)"
        width={88}
        label="CSS"
        spot={spot}
      />
      <Tag
        transform="translate(304 80) rotate(7)"
        width={108}
        label="Tailwind"
      />
      <Tag transform="translate(300 140) rotate(-4)" width={92} label="JSON" />
      <path d="M226 24l6-12M244 30l12-6M218 44H206" {...STROKE} />
      <path d={SPARK} transform="translate(396 34)" fill="currentColor" />
      <path
        d={SPARK}
        transform="translate(182 40) scale(0.7)"
        fill="currentColor"
      />
      <path d="M20 186c10 8 20-6 30 0s20-6 30 0s20-6 30 0" {...STROKE} />
      <path d="M150 44c-8-14 6-26 16-16 8 8-4 20-12 12" {...STROKE} />
    </Frame>
  )
}

/** A paper plane with a looping trail. */
export function PlaneArt({ spot }: { spot: string }) {
  const plane = "M150 14L54 52l30 14 8 32 20-26 26 14z"
  return (
    <Frame
      viewBox="0 0 160 120"
      className="block h-22.5 w-30 overflow-visible text-foreground"
    >
      <g transform="translate(5 5)">
        <path d={plane} fill={spot} />
      </g>
      <g {...STROKE}>
        <path d={plane} />
        <path d="M84 66l66-52M92 98l8-24" />
        <path
          d="M44 74c-14 6-24 16-22 26 2 9 14 8 14-1 0-8-14-8-22 2"
          strokeDasharray="2 7"
        />
        <path d="M126 104l6 8M140 96l9 4" />
      </g>
    </Frame>
  )
}
