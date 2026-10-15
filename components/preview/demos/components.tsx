import {
  Add01Icon,
  ArrowRight01Icon,
  Calendar03Icon,
  CheckmarkCircle02Icon,
  Delete02Icon,
  Download04Icon,
  Loading03Icon,
  Mail01Icon,
  MoreHorizontalIcon,
  StarIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import {
  ALERTS,
  FormCard,
  ORDERS,
  SemanticBadge,
  STATUS_TOKEN,
} from "@/components/preview/preview-content"
import { DemoSection, tone } from "@/components/preview/demos/demo-section"
import { FeatureCards } from "@/components/preview/demos/feature-cards"
import { MetricCards } from "@/components/preview/demos/metric-cards"
import { ResourceCards } from "@/components/preview/demos/resource-cards"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

const SEMANTIC = ["success", "warning", "info", "destructive"] as const
const BRAND = ["primary", "secondary", "accent", "tertiary"] as const

/** A solid fill in any role, with its matching foreground. */
const solid = (token: string) =>
  ({
    background: `var(--${token})`,
    color: `var(--${token}-foreground)`,
  }) as React.CSSProperties

export function ButtonsDemo() {
  return (
    <>
      <DemoSection title="Variants">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </DemoSection>
      <DemoSection title="Sizes">
        <Button size="xs">Extra small</Button>
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon-sm" aria-label="Add (sample)">
          <HugeiconsIcon icon={Add01Icon} />
        </Button>
        <Button size="icon" aria-label="Add (sample)">
          <HugeiconsIcon icon={Add01Icon} />
        </Button>
        <Button size="icon-lg" aria-label="Add (sample)">
          <HugeiconsIcon icon={Add01Icon} />
        </Button>
      </DemoSection>
      <DemoSection title="With icons">
        <Button>
          <HugeiconsIcon icon={Mail01Icon} data-icon="inline-start" />
          Send invite
        </Button>
        <Button variant="outline">
          Continue
          <HugeiconsIcon icon={ArrowRight01Icon} data-icon="inline-end" />
        </Button>
        <Button variant="secondary">
          <HugeiconsIcon icon={Download04Icon} data-icon="inline-start" />
          Download
        </Button>
        <Button variant="destructive">
          <HugeiconsIcon icon={Delete02Icon} data-icon="inline-start" />
          Delete
        </Button>
        <Button variant="ghost" size="icon" aria-label="More (sample)">
          <HugeiconsIcon icon={MoreHorizontalIcon} />
        </Button>
      </DemoSection>
      <DemoSection title="States">
        <Button disabled>Disabled</Button>
        <Button variant="outline" disabled>
          Disabled outline
        </Button>
        <Button disabled>
          <HugeiconsIcon
            icon={Loading03Icon}
            data-icon="inline-start"
            className="animate-spin"
          />
          Saving…
        </Button>
      </DemoSection>
      <DemoSection
        title="Brand and status fills"
        description="Your other palettes as solid buttons."
      >
        {[...BRAND.slice(1), ...SEMANTIC.slice(0, 3)].map((t) => (
          <Button key={t} style={solid(t)} className="capitalize">
            {t}
          </Button>
        ))}
      </DemoSection>
    </>
  )
}

export function BadgesDemo() {
  return (
    <>
      <DemoSection title="Variants">
        <Badge>Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="ghost">Ghost</Badge>
      </DemoSection>
      <DemoSection title="Solid status">
        <SemanticBadge token="success">Active</SemanticBadge>
        <SemanticBadge token="warning">Pending</SemanticBadge>
        <SemanticBadge token="info">Beta</SemanticBadge>
        <SemanticBadge token="destructive">Failed</SemanticBadge>
      </DemoSection>
      <DemoSection
        title="Soft status"
        description="Tinted background with a colored dot; text stays readable."
      >
        {SEMANTIC.map((t) => (
          <Badge
            key={t}
            variant="outline"
            style={tone(t)}
            className="border-(--tone)/30 bg-(--tone)/10 capitalize"
          >
            <span className="size-1.5 rounded-full bg-(--tone)" />
            {t}
          </Badge>
        ))}
      </DemoSection>
      <DemoSection title="Brand">
        {BRAND.map((t) => (
          <Badge key={t} style={solid(t)} className="capitalize">
            {t}
          </Badge>
        ))}
        <Badge className="bg-accent text-accent-foreground">
          <HugeiconsIcon icon={StarIcon} data-icon="inline-start" />
          Featured
        </Badge>
      </DemoSection>
    </>
  )
}

export function CardsDemo() {
  return (
    <>
      <DemoSection
        title="Resource cards"
        description="Soft tinted cards with a status pill and a geometric pattern."
        className="block"
      >
        <ResourceCards />
      </DemoSection>
      <DemoSection
        title="Metric cards"
        description="Key numbers in your primary palette, with one featured card."
        className="block"
      >
        <MetricCards />
      </DemoSection>
      <DemoSection
        title="Feature highlights"
        description="Bold cards in your brand colors. Hover a card to open it."
        className="block"
      >
        <FeatureCards />
      </DemoSection>
      <DemoSection
        title="Basic"
        className="grid items-start gap-4 @2xl:grid-cols-2"
      >
        <Card>
          <CardHeader>
            <CardTitle>Project Apollo</CardTitle>
            <CardDescription>Updated 2 hours ago</CardDescription>
            <CardAction>
              <Button variant="ghost" size="icon-sm" aria-label="More (sample)">
                <HugeiconsIcon icon={MoreHorizontalIcon} />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            A redesign of the onboarding flow with a new type scale and color
            system.
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="outline" size="sm">
              Share
            </Button>
            <Button size="sm">Open</Button>
          </CardFooter>
        </Card>
        <Card>
          <div className="mx-4 h-32 rounded-lg bg-muted" />
          <CardHeader>
            <CardTitle>Media card</CardTitle>
            <CardDescription>
              With an image area on a muted fill.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="secondary" size="sm" className="w-full">
              Read more
            </Button>
          </CardFooter>
        </Card>
      </DemoSection>
      <DemoSection title="Stats" className="grid gap-4 @xl:grid-cols-3">
        {[
          ["Revenue", "$48,210", 72],
          ["Active users", "2,318", 54],
          ["Conversion", "3.6%", 36],
        ].map(([label, value, progress]) => (
          <Card key={label} size="sm">
            <CardHeader>
              <CardDescription>{label}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <p className="text-2xl font-semibold tabular-nums">{value}</p>
              <Progress value={Number(progress)} aria-label={`${label} goal`} />
            </CardContent>
          </Card>
        ))}
      </DemoSection>
      <DemoSection
        title="Pricing"
        className="grid items-start gap-4 @2xl:grid-cols-3"
      >
        {[
          { name: "Starter", price: "$0", featured: false },
          { name: "Pro", price: "$24", featured: true },
          { name: "Team", price: "$79", featured: false },
        ].map((plan) => (
          <Card
            key={plan.name}
            className={plan.featured ? "ring-2 ring-primary" : undefined}
          >
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-2xl font-semibold text-foreground">
                  {plan.price}
                </span>{" "}
                / month
              </CardDescription>
              {plan.featured && (
                <CardAction>
                  <Badge>Popular</Badge>
                </CardAction>
              )}
            </CardHeader>
            <CardContent className="flex flex-col gap-2 text-sm">
              {["Unlimited projects", "Shared tokens", "Priority support"].map(
                (f) => (
                  <span key={f} className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={CheckmarkCircle02Icon}
                      className="size-4 text-primary"
                    />
                    {f}
                  </span>
                )
              )}
            </CardContent>
            <CardFooter>
              <Button
                variant={plan.featured ? "default" : "outline"}
                className="w-full"
              >
                Choose {plan.name}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </DemoSection>
      <DemoSection
        title="Profile and list"
        className="grid items-start gap-4 @2xl:grid-cols-2"
      >
        <Card>
          <CardHeader className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Ada Lovelace</CardTitle>
              <CardDescription>Design engineer</CardDescription>
            </div>
          </CardHeader>
          <CardFooter className="gap-2">
            <Button size="sm" className="flex-1">
              Follow
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              Message
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {["Design review", "Token handoff", "Release"].map((e, i) => (
              <div key={e} className="flex items-center gap-3 text-sm">
                <span className="grid size-8 place-items-center rounded-md bg-secondary text-secondary-foreground">
                  <HugeiconsIcon icon={Calendar03Icon} className="size-4" />
                </span>
                <span className="flex-1">{e}</span>
                <span className="text-muted-foreground">Oct {14 + i * 3}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </DemoSection>
    </>
  )
}

export function FormsDemo() {
  return (
    <>
      <DemoSection title="Text fields" className="grid gap-4 @2xl:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="f-name">Name</Label>
          <Input id="f-name" placeholder="Ada Lovelace" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="f-email">Email</Label>
          <Input id="f-email" defaultValue="ada@" aria-invalid />
          <p className="text-xs text-destructive">Enter a valid email.</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="f-disabled">Disabled</Label>
          <Input id="f-disabled" disabled defaultValue="Read only" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="f-plan">Plan</Label>
          <Select
            defaultValue="pro"
            items={{ starter: "Starter", pro: "Pro", team: "Team" }}
          >
            <SelectTrigger id="f-plan" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="starter">Starter</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="team">Team</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5 @2xl:col-span-2">
          <Label htmlFor="f-bio">Bio</Label>
          <Textarea id="f-bio" placeholder="Tell us about yourself" />
        </div>
      </DemoSection>
      <DemoSection title="Choices" className="grid gap-6 @2xl:grid-cols-3">
        <div className="flex flex-col gap-3">
          <Label className="font-normal">
            <Checkbox defaultChecked />
            Email updates
          </Label>
          <Label className="font-normal">
            <Checkbox />
            SMS updates
          </Label>
          <Label className="font-normal">
            <Checkbox disabled />
            Fax (disabled)
          </Label>
        </div>
        <RadioGroup defaultValue="monthly" aria-label="Billing (sample)">
          <Label className="font-normal">
            <RadioGroupItem value="monthly" />
            Monthly
          </Label>
          <Label className="font-normal">
            <RadioGroupItem value="yearly" />
            Yearly
          </Label>
        </RadioGroup>
        <div className="flex flex-col gap-4">
          <Label className="justify-between font-normal">
            Notifications
            <Switch defaultChecked />
          </Label>
          <Label className="justify-between font-normal">
            Dark mode
            <Switch />
          </Label>
          <Slider defaultValue={[60]} aria-label="Volume (sample)" />
        </div>
      </DemoSection>
      <DemoSection title="In a card" className="block max-w-md">
        <FormCard />
      </DemoSection>
    </>
  )
}

export function AlertsDemo() {
  return (
    <>
      <DemoSection title="Default variants" className="grid gap-3">
        <Alert>
          <HugeiconsIcon icon={ALERTS[0].icon} />
          <AlertTitle>Default alert</AlertTitle>
          <AlertDescription>
            Uses the card surface and foreground.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <HugeiconsIcon icon={ALERTS[3].icon} />
          <AlertTitle>Destructive variant</AlertTitle>
          <AlertDescription>
            shadcn&apos;s built-in error style.
          </AlertDescription>
        </Alert>
      </DemoSection>
      <DemoSection
        title="Tinted status"
        className="grid gap-3 @2xl:grid-cols-2"
      >
        {ALERTS.map((a) => (
          <Alert
            key={a.token}
            style={tone(a.token)}
            className="border-(--tone)/30 bg-(--tone)/8"
          >
            <HugeiconsIcon icon={a.icon} className="text-(--tone)" />
            <AlertTitle>{a.title}</AlertTitle>
            <AlertDescription>{a.body}</AlertDescription>
          </Alert>
        ))}
      </DemoSection>
      <DemoSection title="Solid banners" className="grid gap-2">
        {ALERTS.map((a) => (
          <div
            key={a.token}
            style={solid(a.token)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium"
          >
            <HugeiconsIcon icon={a.icon} className="size-4" />
            {a.title}
          </div>
        ))}
      </DemoSection>
    </>
  )
}

export function TablesDemo() {
  return (
    <>
      <DemoSection title="Orders" className="block">
        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox aria-label="Select all (sample)" />
                </TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ORDERS.map((o, i) => (
                <TableRow
                  key={o.id}
                  data-state={i === 1 ? "selected" : undefined}
                >
                  <TableCell>
                    <Checkbox
                      defaultChecked={i === 1}
                      aria-label={`Select ${o.id} (sample)`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{o.id}</TableCell>
                  <TableCell>{o.customer}</TableCell>
                  <TableCell>
                    <SemanticBadge token={STATUS_TOKEN[o.status]}>
                      {o.status}
                    </SemanticBadge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {o.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell className="text-right tabular-nums">
                  $1,823.00
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </DemoSection>
    </>
  )
}

export function TabsDemo() {
  return (
    <>
      <DemoSection title="Default" className="block">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card className="mt-2">
              <CardContent className="text-sm text-muted-foreground">
                Overview content sits on the card surface.
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="activity">
            <Card className="mt-2">
              <CardContent className="text-sm text-muted-foreground">
                Recent activity.
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card className="mt-2">
              <CardContent className="text-sm text-muted-foreground">
                Settings.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DemoSection>
      <DemoSection title="Line" className="block">
        <Tabs defaultValue="code">
          <TabsList variant="line">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="docs">Docs</TabsTrigger>
          </TabsList>
        </Tabs>
      </DemoSection>
    </>
  )
}

export function AvatarsDemo() {
  const people = ["AL", "AT", "GH", "LT", "MH"]
  return (
    <>
      <DemoSection title="Sizes">
        <Avatar size="sm">
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
      </DemoSection>
      <DemoSection
        title="Brand fallbacks"
        description="Light tints from each palette."
      >
        {BRAND.map((t, i) => (
          <Avatar key={t} size="lg">
            <AvatarFallback
              style={{
                background: `var(--${t}-100, var(--muted))`,
                color: `var(--${t}-900, var(--foreground))`,
              }}
            >
              {people[i]}
            </AvatarFallback>
          </Avatar>
        ))}
      </DemoSection>
      <DemoSection title="Group">
        <AvatarGroup>
          {people.map((p) => (
            <Avatar key={p}>
              <AvatarFallback>{p}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </DemoSection>
    </>
  )
}

export function ProgressDemo() {
  return (
    <>
      <DemoSection title="Progress" className="grid gap-4 @2xl:grid-cols-2">
        {[24, 68, 100].map((v) => (
          <div key={v} className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs">
              <span>Upload</span>
              <span className="text-muted-foreground tabular-nums">{v}%</span>
            </div>
            <Progress value={v} aria-label={`Upload ${v}% (sample)`} />
          </div>
        ))}
      </DemoSection>
      <DemoSection title="Status bars" className="grid gap-3">
        {SEMANTIC.map((t, i) => (
          <div
            key={t}
            className="flex items-center gap-3 text-xs"
            style={tone(t)}
          >
            <span className="w-20 capitalize">{t}</span>
            <span className="h-2 flex-1 rounded-full bg-muted">
              <span
                className="block h-full rounded-full bg-(--tone)"
                style={{ width: `${90 - i * 20}%` }}
              />
            </span>
          </div>
        ))}
      </DemoSection>
      <DemoSection title="Skeleton" className="block">
        <div className="flex items-center gap-3" aria-hidden>
          <Skeleton className="size-10 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      </DemoSection>
      <DemoSection title="Spinner">
        <HugeiconsIcon
          icon={Loading03Icon}
          className="size-5 animate-spin text-primary"
        />
        <span className="text-sm text-muted-foreground">
          Loading your workspace…
        </span>
      </DemoSection>
    </>
  )
}
