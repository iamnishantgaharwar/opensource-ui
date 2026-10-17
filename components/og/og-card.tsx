import { WORDMARK_PATH, WORDMARK_VIEWBOX } from "@/components/logo-wordmark"
import { generateColorSystem, STEPS } from "@/lib/modules/color"
import { defaultSettings } from "@/lib/tokens/registry"

export const OG_SIZE = { width: 1200, height: 630 }

// The social share card (served as /og.png), in the landing hero's look: the neutral wash, the wordmark,
// the headline and the default brand's real generated palette. Colors are
// written out because this renders outside the app's stylesheet.
export function OgCard() {
  const primary = generateColorSystem(defaultSettings().color).palettes.primary
  const [, , , width, height] = WORDMARK_VIEWBOX.split(" ").map(Number)

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        color: "#fafafa",
        backgroundColor: "#0a0a0a",
        backgroundImage:
          "linear-gradient(180deg, #52525b 0%, #2a2a2e 45%, #0a0a0a 100%)",
      }}
    >
      <svg
        viewBox={WORDMARK_VIEWBOX}
        width={(48 * width) / height}
        height={48}
        fill="#fafafa"
      >
        <path d={WORDMARK_PATH} />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
          }}
        >
          <span>One brand color in.</span>
          <span>A complete design system out.</span>
        </div>
        <span style={{ fontSize: 28, color: "#a1a1aa" }}>
          Palettes · Contrast checks · Type scale · Design tokens
        </span>
      </div>
      {primary && (
        <div style={{ display: "flex", gap: 10 }}>
          {STEPS.map((step) => (
            <div
              key={step}
              style={{
                flex: 1,
                height: 44,
                borderRadius: 10,
                backgroundColor: primary.shades[step],
                border:
                  step === primary.anchor
                    ? "3px solid #fafafa"
                    : "1px solid rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
