import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  HugeiconsIcon,
  Icons,
  Progress,
} from "opensource-ui"

export function Basic() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Project Apollo</CardTitle>
        <CardDescription>Updated 2 hours ago</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm" aria-label="More">
            <HugeiconsIcon icon={Icons.MoreHorizontalIcon} />
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
  )
}

export function Stats() {
  return (
    <div className="grid w-full grid-cols-3 gap-3">
      {[
        ["Revenue", "$48,210", 72],
        ["Active users", "2,318", 54],
        ["Conversion", "3.6%", 36],
      ].map(([label, value, goal]) => (
        <Card key={label} size="sm">
          <CardHeader>
            <CardDescription>{label}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p className="text-2xl font-semibold tabular-nums">{value}</p>
            <Progress value={Number(goal)} aria-label={`${label} goal`} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function Pricing() {
  return (
    <Card className="w-full max-w-xs ring-2 ring-primary">
      <CardHeader>
        <CardTitle>Pro</CardTitle>
        <CardDescription>
          <span className="text-2xl font-semibold text-foreground">$24</span> /
          month
        </CardDescription>
        <CardAction>
          <Badge>Popular</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-sm">
        {["Unlimited projects", "Shared tokens", "Priority support"].map(
          (f) => (
            <span key={f} className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Icons.CheckmarkCircle02Icon}
                className="size-4 text-primary"
              />
              {f}
            </span>
          )
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full">Choose Pro</Button>
      </CardFooter>
    </Card>
  )
}

export function Profile() {
  return (
    <Card className="w-full max-w-sm">
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
  )
}
