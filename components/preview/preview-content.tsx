import {
  Add01Icon,
  Alert02Icon,
  AlertCircleIcon,
  ArrowUpRight01Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  MultiplicationSignCircleIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// Every color here comes from the generated tokens via shadcn classes or
// `var(--token)`; nothing is hard-coded, so the preview shows the real system.

/**
 * Soft fills from each palette: a light step behind a dark step of the same
 * hue (flipped in dark mode), so text keeps its contrast. Written out in full
 * because Tailwind only sees literal class names.
 */
export const TINT = {
  primary:
    "bg-(--primary-50) text-(--primary-700) dark:bg-(--primary-950) dark:text-(--primary-200)",
  success:
    "bg-(--success-50) text-(--success-700) dark:bg-(--success-950) dark:text-(--success-200)",
  warning:
    "bg-(--warning-50) text-(--warning-700) dark:bg-(--warning-950) dark:text-(--warning-200)",
  info: "bg-(--info-50) text-(--info-700) dark:bg-(--info-950) dark:text-(--info-200)",
  destructive:
    "bg-(--destructive-50) text-(--destructive-700) dark:bg-(--destructive-950) dark:text-(--destructive-200)",
} as const

/** The text half of TINT, for titles and icons on a tinted fill. */
const TINT_TEXT = {
  info: "text-(--info-700) dark:text-(--info-200)",
  success: "text-(--success-700) dark:text-(--success-200)",
  warning: "text-(--warning-700) dark:text-(--warning-200)",
  destructive: "text-(--destructive-700) dark:text-(--destructive-200)",
} as const

const TINT_BG = {
  info: "bg-(--info-50) dark:bg-(--info-950)",
  success: "bg-(--success-50) dark:bg-(--success-950)",
  warning: "bg-(--warning-50) dark:bg-(--warning-950)",
  destructive: "bg-(--destructive-50) dark:bg-(--destructive-950)",
} as const

/** Badge in a soft palette fill; secondary/accent/tertiary use their roles. */
export function TintBadge({
  tone,
  dot = false,
  className,
  children,
}: {
  tone: keyof typeof TINT | "secondary" | "accent" | "tertiary" | "outline"
  dot?: boolean
  className?: string
  children: React.ReactNode
}) {
  const fill =
    tone === "secondary"
      ? "bg-secondary text-secondary-foreground"
      : tone === "accent"
        ? "bg-accent text-accent-foreground"
        : tone === "tertiary"
          ? "bg-(--tertiary) text-(--tertiary-foreground)"
          : tone === "outline"
            ? "border-border text-foreground"
            : TINT[tone]
  return (
    <Badge
      variant={tone === "outline" ? "outline" : "default"}
      className={cn("h-6 gap-1.5 rounded-md px-2 text-[13px]", fill, className)}
    >
      {dot && <span aria-hidden className="size-1.5 rounded-full bg-current" />}
      {children}
    </Badge>
  )
}

export function PreviewContent() {
  return (
    <div className="@container">
      <PreviewNav />
      <div className="flex flex-col gap-12 p-5 @2xl:px-8 @2xl:py-12">
        <Hero />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] gap-6">
          <FormCard />
          <FeedbackCard />
          <StatusCard />
        </div>
        <Dashboard />
      </div>
    </div>
  )
}

export function PreviewNav() {
  return (
    <header className="flex items-center gap-6 border-b px-5 py-3 @2xl:px-6">
      <span className="flex items-center gap-2 text-sm font-semibold">
        <span className="size-6 rounded-md bg-primary" aria-hidden />
        Acme
      </span>
      <nav aria-label="Sample" className="hidden gap-5 text-sm @2xl:flex">
        <span className="font-medium">Dashboard</span>
        <span className="text-muted-foreground">Projects</span>
        <span className="text-muted-foreground">Team</span>
        <span className="text-muted-foreground">Docs</span>
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden @xl:block">
          <HugeiconsIcon
            icon={Search01Icon}
            className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            aria-label="Search (sample)"
            placeholder="Search…"
            className="w-48 pl-8"
          />
        </div>
        <Button size="sm">
          <HugeiconsIcon icon={Add01Icon} data-icon="inline-start" />
          New project
        </Button>
        <Avatar>
          <AvatarFallback>NG</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="flex max-w-180 flex-col items-start gap-5">
      <TintBadge tone="primary" className="h-7 rounded-full px-3">
        <span aria-hidden className="size-1.5 rounded-full bg-primary" />
        Version 2.0 is here
      </TintBadge>
      <h2 className="text-3xl font-semibold tracking-tight @2xl:text-[2.5rem] @2xl:leading-12">
        Build a consistent product, faster
      </h2>
      <p className="text-base text-muted-foreground">
        Every color on this page comes from your tokens. Read the{" "}
        <a
          href="#preview"
          className="text-(--link) underline underline-offset-[3px]"
        >
          migration guide
        </a>{" "}
        or the{" "}
        <a
          href="#preview"
          className="text-(--link-visited) underline underline-offset-[3px]"
        >
          changelog you already visited
        </a>
        .
      </p>
      <div className="flex flex-wrap gap-2">
        <Button size="lg">Get started</Button>
        <Button size="lg" variant="secondary">
          Secondary
        </Button>
        <Button size="lg" variant="outline">
          Outline
        </Button>
        <Button size="lg" variant="ghost">
          Ghost
        </Button>
        <Button size="lg" variant="destructive">
          Delete
        </Button>
        <Button size="lg" disabled>
          Disabled
        </Button>
        <Button size="lg" variant="link">
          Link
        </Button>
      </div>
    </section>
  )
}

export function FormCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>Inputs, validation and toggles</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="pv-name">Name</Label>
          <Input id="pv-name" defaultValue="Ada Lovelace" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="pv-email">Email</Label>
          <Input id="pv-email" defaultValue="ada@" aria-invalid />
          <p className="flex items-center gap-1 text-[13px] text-destructive">
            <HugeiconsIcon icon={AlertCircleIcon} className="size-4" />
            Enter a full email, like ada@example.com.
          </p>
        </div>
        <Label className="justify-between font-normal">
          Product updates
          <Switch defaultChecked />
        </Label>
        <Label className="font-normal">
          <Checkbox defaultChecked />I agree to the terms
        </Label>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Create account</Button>
      </CardFooter>
    </Card>
  )
}

export const ALERTS: {
  token: string
  icon: IconSvgElement
  title: string
  body: string
}[] = [
  {
    token: "info",
    icon: InformationCircleIcon,
    title: "Heads up",
    body: "Maintenance is scheduled for Sunday.",
  },
  {
    token: "success",
    icon: CheckmarkCircle02Icon,
    title: "Payment received",
    body: "Invoice #1042 is paid.",
  },
  {
    token: "warning",
    icon: Alert02Icon,
    title: "Storage almost full",
    body: "You've used 92% of your plan.",
  },
  {
    token: "destructive",
    icon: MultiplicationSignCircleIcon,
    title: "Deploy failed",
    body: "Build exited with code 1.",
  },
]

function FeedbackCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback</CardTitle>
        <CardDescription>
          Status colors, always with an icon and a title
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {ALERTS.map((a) => {
          const tone = a.token as keyof typeof TINT_TEXT
          return (
            <Alert key={a.token} className={cn("border-0", TINT_BG[tone])}>
              <HugeiconsIcon icon={a.icon} className={TINT_TEXT[tone]} />
              <AlertTitle className={TINT_TEXT[tone]}>{a.title}</AlertTitle>
              <AlertDescription>{a.body}</AlertDescription>
            </Alert>
          )
        })}
      </CardContent>
    </Card>
  )
}

function StatusCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status and surfaces</CardTitle>
        <CardDescription>Badges, progress, loading and toasts</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5">
        <div className="flex flex-wrap gap-2">
          <TintBadge tone="primary">Primary</TintBadge>
          <TintBadge tone="secondary">Secondary</TintBadge>
          <TintBadge tone="outline">Outline</TintBadge>
          <TintBadge tone="accent">Accent</TintBadge>
          <TintBadge tone="tertiary">Tertiary</TintBadge>
          <TintBadge tone="success">Active</TintBadge>
          <TintBadge tone="warning">Pending</TintBadge>
          <TintBadge tone="info">Beta</TintBadge>
          <TintBadge tone="destructive">Failed</TintBadge>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Onboarding</span>
            <span className="text-muted-foreground tabular-nums">68%</span>
          </div>
          <Progress value={68} aria-label="Onboarding progress (sample)" />
        </div>
        <div className="flex items-center gap-3" aria-hidden>
          <span className="size-10 shrink-0 animate-pulse rounded-full bg-(--skeleton)" />
          <span className="flex flex-1 flex-col gap-2">
            <span className="h-3 w-4/5 animate-pulse rounded-md bg-(--skeleton)" />
            <span className="h-3 w-1/2 animate-pulse rounded-md bg-(--skeleton)" />
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 rounded-[10px] bg-(--inverse) px-4 py-3 text-sm text-(--inverse-foreground)">
          <span className="flex items-center gap-2">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-4" />
            Changes saved
          </span>
          <span className="font-medium underline underline-offset-[3px]">
            Undo
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export function SemanticBadge({
  token,
  children,
}: {
  token: string
  children: React.ReactNode
}) {
  return (
    <Badge
      style={
        {
          background: `var(--${token})`,
          color: `var(--${token}-foreground)`,
        } as React.CSSProperties
      }
    >
      {children}
    </Badge>
  )
}

const NAV = ["Overview", "Projects", "Team", "Analytics", "Settings"]

const STATS = [
  { label: "Revenue", value: "$48,210", delta: "+12.5%" },
  { label: "Active users", value: "2,318", delta: "+4.1%" },
  { label: "Conversion", value: "3.6%", delta: "+0.8 pts" },
]

export const CHANNELS = [
  { name: "Organic search", value: 4820 },
  { name: "Direct", value: 3610 },
  { name: "Referral", value: 2240 },
  { name: "Social", value: 1530 },
  { name: "Email", value: 980 },
]

export const ORDERS = [
  { id: "#1042", customer: "Ada Lovelace", amount: "$420.00", status: "Paid" },
  { id: "#1041", customer: "Alan Turing", amount: "$89.00", status: "Pending" },
  {
    id: "#1040",
    customer: "Grace Hopper",
    amount: "$1,250.00",
    status: "Paid",
  },
  { id: "#1039", customer: "Linus T.", amount: "$64.00", status: "Failed" },
] as const

export const STATUS_TOKEN = {
  Paid: "success",
  Pending: "warning",
  Failed: "destructive",
} as const

export function Dashboard() {
  return (
    <section
      aria-label="Sample dashboard"
      className="overflow-hidden rounded-[10px] border bg-card text-card-foreground @3xl:grid @3xl:grid-cols-[240px_minmax(0,1fr)]"
    >
      <aside className="hidden flex-col gap-1 border-r border-sidebar-border bg-sidebar p-4 text-sidebar-foreground @3xl:flex">
        <span className="px-3 pt-1 pb-3 text-sm font-semibold">Workspace</span>
        {NAV.map((label, i) => (
          <span
            key={label}
            className={cn(
              "flex h-8 items-center rounded-md px-3 text-sm",
              i === 0
                ? cn(TINT.primary, "font-medium")
                : "text-muted-foreground"
            )}
          >
            {label}
          </span>
        ))}
        <div className="mt-6 flex flex-col gap-1 rounded-lg border p-3">
          <p className="text-sm font-medium">Upgrade to Pro</p>
          <p className="text-[13px] text-muted-foreground">
            Unlimited projects and seats.
          </p>
          <Button size="sm" className="mt-2 w-full">
            Upgrade
          </Button>
        </div>
      </aside>
      <div className="flex min-w-0 flex-col gap-8 p-4 @2xl:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl font-semibold">Overview</h3>
          <Tabs defaultValue="30d">
            <TabsList>
              <TabsTrigger value="7d">7 days</TabsTrigger>
              <TabsTrigger value="30d">30 days</TabsTrigger>
              <TabsTrigger value="90d">90 days</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(11.25rem,1fr))] gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <span className="text-[2rem] leading-10 font-semibold tracking-tight tabular-nums">
                {s.value}
              </span>
              <span
                className={cn(
                  "flex items-center gap-1 text-[13px] font-medium",
                  TINT_TEXT.success
                )}
              >
                <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-4" />
                {s.delta}
                <span className="font-normal text-muted-foreground">
                  vs last period
                </span>
              </span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(22rem,1fr))] gap-x-12 gap-y-8 border-t pt-8">
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="text-base font-semibold">Traffic by channel</h4>
              <p className="text-sm text-muted-foreground">
                Visits, last 30 days
              </p>
            </div>
            <ChannelChart />
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <div>
              <h4 className="text-base font-semibold">Recent orders</h4>
              <p className="text-sm text-muted-foreground">
                Last 4 transactions
              </p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount (USD)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ORDERS.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="text-muted-foreground">
                      {o.id}
                    </TableCell>
                    <TableCell className="font-medium">{o.customer}</TableCell>
                    <TableCell>
                      <TintBadge tone={STATUS_TOKEN[o.status]} dot>
                        {o.status}
                      </TintBadge>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {o.amount.replace("$", "")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Horizontal bars in chart-1…chart-5, each directly labelled. */
export function ChannelChart() {
  const max = Math.max(...CHANNELS.map((c) => c.value))
  const total = CHANNELS.reduce((sum, c) => sum + c.value, 0)

  return (
    <ul className="flex flex-col gap-3">
      {CHANNELS.map((c, i) => (
        <li key={c.name}>
          <Tooltip>
            <TooltipTrigger
              render={<div className="flex flex-col gap-1.5 py-0.5" />}
            >
              <span className="flex justify-between text-sm">
                <span>{c.name}</span>
                <span className="text-muted-foreground tabular-nums">
                  {c.value.toLocaleString("en-US")}
                </span>
              </span>
              <span className="block h-2 rounded-full bg-muted">
                <span
                  className="block h-full rounded-full"
                  style={{
                    width: `${(c.value / max) * 100}%`,
                    background: `var(--chart-${i + 1})`,
                  }}
                />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              {c.name}: {c.value.toLocaleString("en-US")} visits (
              {Math.round((c.value / total) * 100)}%)
            </TooltipContent>
          </Tooltip>
        </li>
      ))}
    </ul>
  )
}
