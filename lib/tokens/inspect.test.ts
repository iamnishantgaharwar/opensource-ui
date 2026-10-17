import { describe, expect, it } from "vitest"

import {
  baseClass,
  buildTokenIndex,
  tokensForClasses,
} from "@/lib/tokens/inspect"
import { defaultSettings, generateTokens } from "@/lib/tokens/registry"

const index = buildTokenIndex(generateTokens(defaultSettings()))
const uses = (classes: string) =>
  tokensForClasses(classes.split(" "), index).map((u) =>
    u.times === undefined ? u.css : `${u.css}×${u.times}`
  )

describe("token inspector", () => {
  it("strips variants, important and opacity", () => {
    expect(baseClass("hover:dark:bg-primary/80")).toBe("bg-primary")
    expect(baseClass("data-[state=open]:bg-accent")).toBe("bg-accent")
    expect(baseClass("!text-sm")).toBe("text-sm")
    expect(baseClass("bg-(--success)/10")).toBe("bg-(--success)")
  })

  it("maps a shadcn button's classes to tokens", () => {
    expect(
      uses(
        "inline-flex h-8 rounded-lg px-2.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/80 focus-visible:ring-ring/50 shadow-xs"
      )
    ).toEqual([
      "spacing×8",
      "radius-lg",
      "spacing×2.5",
      "font-size-body-sm",
      "primary",
      "primary-foreground",
      "ring",
      "shadow-xs",
    ])
  })

  it("covers arbitrary token colors, directional radius and fonts", () => {
    expect(uses("bg-(--success) rounded-t-xl font-heading text-h2")).toEqual([
      "success",
      "radius-xl",
      "font-heading",
      "font-size-h2",
    ])
  })

  it("skips state-dependent variants but keeps everyday ones", () => {
    expect(
      uses(
        "bg-primary aria-invalid:border-destructive data-[state=open]:bg-accent group-data-[size=sm]/card:text-sm hover:bg-secondary dark:text-foreground"
      )
    ).toEqual(["primary", "secondary", "foreground"])
  })

  it("ignores classes that use no token", () => {
    expect(uses("flex items-center grid-cols-2 text-left")).toEqual([])
  })
})
