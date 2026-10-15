// Pages of the component preview. Kept free of the demo components so the
// sidebar can import it without bundling every demo.
export const PREVIEW_GROUPS = ["Components", "Patterns"] as const

export const PREVIEW_PAGES = [
  {
    slug: "buttons",
    label: "Buttons",
    group: "Components",
    description: "Variants, sizes, icons and states.",
  },
  {
    slug: "badges",
    label: "Badges",
    group: "Components",
    description: "Labels for status, categories and counts.",
  },
  {
    slug: "cards",
    label: "Cards",
    group: "Components",
    description: "Containers for content, stats, pricing and profiles.",
  },
  {
    slug: "forms",
    label: "Forms",
    group: "Components",
    description: "Inputs, selects, toggles and validation.",
  },
  {
    slug: "alerts",
    label: "Alerts",
    group: "Components",
    description: "Inline feedback in every semantic color.",
  },
  {
    slug: "tables",
    label: "Tables",
    group: "Components",
    description: "Data with status, selection and totals.",
  },
  {
    slug: "tabs",
    label: "Tabs",
    group: "Components",
    description: "Switch between views.",
  },
  {
    slug: "avatars",
    label: "Avatars",
    group: "Components",
    description: "People and teams, with fallbacks.",
  },
  {
    slug: "progress",
    label: "Progress & loading",
    group: "Components",
    description: "Progress bars, skeletons and spinners.",
  },
  {
    slug: "navigation",
    label: "Navigation",
    group: "Patterns",
    description: "Top bar, sidebar, breadcrumbs and pagination.",
  },
  {
    slug: "dashboard",
    label: "Dashboard",
    group: "Patterns",
    description: "Everything together in a product screen.",
  },
  {
    slug: "charts",
    label: "Charts",
    group: "Patterns",
    description: "The chart-1 to chart-5 series colors.",
  },
  {
    slug: "typography",
    label: "Text & links",
    group: "Patterns",
    description: "Headings, body text, links and code.",
  },
  {
    slug: "surfaces",
    label: "Surfaces",
    group: "Patterns",
    description: "Background layers, borders, overlay and selection.",
  },
] as const satisfies ReadonlyArray<{
  slug: string
  label: string
  group: (typeof PREVIEW_GROUPS)[number]
  description: string
}>

export type PreviewSlug = (typeof PREVIEW_PAGES)[number]["slug"]

export const findPreviewPage = (slug: string) =>
  PREVIEW_PAGES.find((p) => p.slug === slug)
