import { DEFAULT_COLOR_SETTINGS } from "@/lib/modules/color"

/** Project links shown on the landing page. */
export const GITHUB_URL = "https://github.com/iamnishantgaharwar/opensource-ui"
export const ISSUES_URL = `${GITHUB_URL}/issues`
export const COFFEE_URL = "https://buymeacoffee.com/nishantgaharwar"

/**
 * The one brand color the landing page is drawn with: the app's default, so
 * the illustrations match the screenshots.
 */
export const LANDING_BRAND = DEFAULT_COLOR_SETTINGS.primary

/**
 * Where the site is deployed, for canonical URLs, social images and the
 * sitemap. Set NEXT_PUBLIC_SITE_URL in production (e.g. https://csskit.dev).
 */
export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
)

export const SITE_NAME = "csskit"
export const SITE_TITLE = "csskit · Design system generator for shadcn/ui"
export const SITE_DESCRIPTION =
  "Turn one brand color into a complete, accessible design system: OKLCH palettes, WCAG contrast checks in light and dark, a type scale, radius, shadows and spacing, exported as shadcn/ui, Tailwind CSS and JSON tokens. Free and open source."
export const AUTHOR = {
  name: "Nishant Gaharwar",
  url: "https://github.com/iamnishantgaharwar",
}
export const KEYWORDS = [
  "design system generator",
  "shadcn theme generator",
  "shadcn/ui",
  "Tailwind CSS theme",
  "Tailwind v4",
  "color palette generator",
  "OKLCH",
  "design tokens",
  "CSS variables",
  "WCAG contrast checker",
  "accessible colors",
  "dark mode",
  "type scale generator",
  "open source",
]

/** The social share image (app/og.png/route.ts). */
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "csskit: one brand color in, a complete design system out. Palettes, contrast checks and tokens for shadcn/ui and Tailwind.",
}
