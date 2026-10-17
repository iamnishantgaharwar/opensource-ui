import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  DashboardSquare01Icon,
  Folder01Icon,
  Settings02Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { DemoSection } from "@/components/preview/demos/demo-section"
import {
  ChannelChart,
  CHANNELS,
  Dashboard,
  PreviewNav,
} from "@/components/preview/preview-content"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function NavigationDemo() {
  return (
    <>
      <DemoSection title="Top bar" className="block">
        <div className="overflow-hidden rounded-xl border">
          <PreviewNav />
        </div>
      </DemoSection>
      <DemoSection
        title="Sidebar"
        description="Uses the sidebar-* roles."
        className="block"
      >
        <div className="flex w-64 flex-col gap-1 rounded-xl border border-sidebar-border bg-sidebar p-3 text-sidebar-foreground">
          {[
            ["Overview", DashboardSquare01Icon],
            ["Projects", Folder01Icon],
            ["Team", UserGroupIcon],
            ["Settings", Settings02Icon],
          ].map(([label, icon], i) => (
            <span
              key={label as string}
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm",
                i === 0
                  ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/75"
              )}
            >
              <HugeiconsIcon
                icon={icon as typeof Folder01Icon}
                className="size-4"
              />
              {label as string}
            </span>
          ))}
          <div className="mt-3 rounded-lg bg-sidebar-primary p-3 text-sidebar-primary-foreground">
            <p className="text-sm font-medium">Upgrade to Pro</p>
            <p className="mt-0.5 text-xs opacity-80">
              Unlock unlimited projects.
            </p>
          </div>
        </div>
      </DemoSection>
      <DemoSection title="Breadcrumbs">
        <nav
          aria-label="Breadcrumb (sample)"
          className="flex items-center gap-2 text-sm"
        >
          <span className="text-muted-foreground">Home</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">Projects</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">Apollo</span>
        </nav>
      </DemoSection>
      <DemoSection title="Pagination">
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Previous page (sample)"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} />
        </Button>
        {[1, 2, 3, 4].map((n) => (
          <Button
            key={n}
            variant={n === 2 ? "default" : "ghost"}
            size="icon-sm"
          >
            {n}
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Next page (sample)"
        >
          <HugeiconsIcon icon={ArrowRight01Icon} />
        </Button>
      </DemoSection>
    </>
  )
}

export function DashboardDemo() {
  return <Dashboard />
}

export function ChartsDemo() {
  const total = CHANNELS.reduce((s, c) => s + c.value, 0)
  return (
    <>
      <DemoSection title="Bars" className="block max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle>Traffic by channel</CardTitle>
            <CardDescription>Visits, last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChannelChart />
          </CardContent>
        </Card>
      </DemoSection>
      <DemoSection
        title="Share of total"
        description="A stacked bar with a 2px gap between segments and a legend."
        className="block max-w-xl"
      >
        <div className="flex h-3 gap-0.5 overflow-hidden rounded-full">
          {CHANNELS.map((c, i) => (
            <span
              key={c.name}
              style={{
                width: `${(c.value / total) * 100}%`,
                background: `var(--chart-${i + 1})`,
              }}
            />
          ))}
        </div>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
          {CHANNELS.map((c, i) => (
            <li key={c.name} className="flex items-center gap-1.5">
              <span
                className="size-2.5 rounded-sm"
                style={{ background: `var(--chart-${i + 1})` }}
              />
              {c.name}
              <span className="text-muted-foreground tabular-nums">
                {Math.round((c.value / total) * 100)}%
              </span>
            </li>
          ))}
        </ul>
      </DemoSection>
      <DemoSection title="Series colors" className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className="flex flex-col gap-1.5">
            <span
              className="h-12 rounded-md"
              style={{ background: `var(--chart-${n})` }}
            />
            <span className="font-mono text-xs text-muted-foreground">
              chart-{n}
            </span>
          </div>
        ))}
      </DemoSection>
    </>
  )
}

export function TypographyDemo() {
  return (
    <>
      <DemoSection
        title="Type scale"
        description="Every role from your type settings, in your heading and body fonts."
        className="flex-col items-start gap-3"
      >
        <p className="font-heading text-display">Display</p>
        <h1 className="font-heading text-h1">Heading one</h1>
        <h2 className="font-heading text-h2">Heading two</h2>
        <h3 className="font-heading text-h3">Heading three</h3>
        <h4 className="font-heading text-h4">Heading four</h4>
        <h5 className="font-heading text-h5">Heading five</h5>
        <h6 className="font-heading text-h6">Heading six</h6>
        <p className="text-body-lg">Body large for lead paragraphs</p>
        <p className="text-body">Body for running text</p>
        <p className="text-body-sm">Body small for secondary text</p>
        <p className="text-caption text-muted-foreground">
          Caption for labels and fine print
        </p>
      </DemoSection>
      <DemoSection title="Body" className="block max-w-2xl space-y-3">
        <p className="text-lg text-muted-foreground">
          A lead paragraph introduces the page in a softer tone.
        </p>
        <p>
          Body text uses the foreground color. Read the{" "}
          <a
            href="#"
            className="font-medium text-(--link) underline underline-offset-4"
          >
            documentation
          </a>{" "}
          or the{" "}
          <a
            href="#"
            className="text-(--link-visited) underline underline-offset-4"
          >
            changelog you already visited
          </a>
          . Inline{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            code
          </code>{" "}
          sits on a muted fill.
        </p>
        <blockquote className="border-l-2 border-primary pl-4 text-muted-foreground italic">
          “A design system is a product serving products.”
        </blockquote>
        <ul className="list-disc space-y-1 pl-5">
          <li>Primary text in foreground</li>
          <li className="text-muted-foreground">
            Secondary text in muted-foreground
          </li>
          <li className="text-(--subtle-foreground)">
            Hints in subtle-foreground
          </li>
        </ul>
        <p className="text-sm text-muted-foreground">
          Select some text to see the selection color.
        </p>
      </DemoSection>
    </>
  )
}

const LAYERS = [
  ["background", "bg-background text-foreground"],
  ["card", "bg-card text-card-foreground"],
  ["popover", "bg-popover text-popover-foreground"],
  ["muted", "bg-muted text-muted-foreground"],
  ["secondary", "bg-secondary text-secondary-foreground"],
  ["accent", "bg-accent text-accent-foreground"],
  ["inverse", "bg-(--inverse) text-(--inverse-foreground)"],
] as const

export function SurfacesDemo() {
  return (
    <>
      <DemoSection title="Layers" className="grid gap-2 @2xl:grid-cols-2">
        {LAYERS.map(([name, cls]) => (
          <div
            key={name}
            className={cn(
              "flex items-center justify-between rounded-lg border px-4 py-3 text-sm",
              cls
            )}
          >
            <span className="font-medium">{name}</span>
            <span className="font-mono text-xs opacity-75">--{name}</span>
          </div>
        ))}
      </DemoSection>
      <DemoSection title="Borders" className="grid gap-2 @2xl:grid-cols-3">
        <div className="rounded-lg border p-4 text-sm">border</div>
        <div className="rounded-lg border border-(--border-strong) p-4 text-sm">
          border-strong
        </div>
        <div className="rounded-lg border border-input p-4 text-sm">input</div>
      </DemoSection>
      <DemoSection
        title="Overlay"
        description="A dialog over the overlay scrim."
        className="block"
      >
        <div className="relative h-56 overflow-hidden rounded-xl border bg-background">
          <div className="space-y-2 p-4" aria-hidden>
            <div className="h-3 w-1/2 rounded bg-muted" />
            <div className="h-3 w-3/4 rounded bg-muted" />
            <div className="h-3 w-2/3 rounded bg-muted" />
          </div>
          <div className="absolute inset-0 bg-(--overlay)" />
          <div className="absolute top-1/2 left-1/2 w-72 -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-popover p-4 text-popover-foreground shadow-lg">
            <p className="font-medium">Delete project?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              This can&apos;t be undone.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" size="sm">
                Cancel
              </Button>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </div>
          </div>
        </div>
      </DemoSection>
    </>
  )
}
