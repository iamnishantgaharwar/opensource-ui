import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "opensource-ui"

const plans = { starter: "Starter", pro: "Pro", team: "Team" }

export function Default() {
  return (
    <div className="flex w-64 flex-col gap-1.5">
      <Label htmlFor="plan">Plan</Label>
      <Select defaultValue="pro" items={plans}>
        <SelectTrigger id="plan" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="starter">Starter</SelectItem>
          <SelectItem value="pro">Pro</SelectItem>
          <SelectItem value="team">Team</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export function Small() {
  return (
    <Select
      defaultValue="week"
      items={{ day: "Today", week: "This week", month: "This month" }}
    >
      <SelectTrigger size="sm" aria-label="Date range">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="day">Today</SelectItem>
        <SelectItem value="week">This week</SelectItem>
        <SelectItem value="month">This month</SelectItem>
      </SelectContent>
    </Select>
  )
}

export function Open() {
  return (
    <div className="h-64 w-64">
      <Select
        defaultOpen
        defaultValue="europe/berlin"
        items={{
          "america/new_york": "New York",
          "america/los_angeles": "Los Angeles",
          "europe/london": "London",
          "europe/berlin": "Berlin",
        }}
      >
        <SelectTrigger className="w-full" aria-label="Time zone">
          <SelectValue />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          <SelectGroup>
            <SelectLabel>Americas</SelectLabel>
            <SelectItem value="america/new_york">New York</SelectItem>
            <SelectItem value="america/los_angeles">Los Angeles</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Europe</SelectLabel>
            <SelectItem value="europe/london">London</SelectItem>
            <SelectItem value="europe/berlin">Berlin</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
