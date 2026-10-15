import { Label, RadioGroup, RadioGroupItem } from "opensource-ui"

export function Default() {
  return (
    <RadioGroup defaultValue="monthly" aria-label="Billing period">
      <Label className="font-normal">
        <RadioGroupItem value="monthly" />
        Monthly
      </Label>
      <Label className="font-normal">
        <RadioGroupItem value="yearly" />
        Yearly (save 20%)
      </Label>
    </RadioGroup>
  )
}

export function Options() {
  return (
    <RadioGroup
      defaultValue="comfortable"
      aria-label="Density"
      className="w-72"
    >
      {[
        ["compact", "Compact", "More rows on screen"],
        ["comfortable", "Comfortable", "The default spacing"],
        ["spacious", "Spacious", "Larger touch targets"],
      ].map(([value, title, hint]) => (
        <Label
          key={value}
          className="items-start rounded-lg border p-3 font-normal"
        >
          <RadioGroupItem value={value} className="mt-0.5" />
          <span className="flex flex-col gap-1">
            <span className="font-medium">{title}</span>
            <span className="text-muted-foreground">{hint}</span>
          </span>
        </Label>
      ))}
    </RadioGroup>
  )
}

export function Disabled() {
  return (
    <RadioGroup defaultValue="a" disabled aria-label="Plan (locked)">
      <Label className="font-normal">
        <RadioGroupItem value="a" />
        Starter
      </Label>
      <Label className="font-normal">
        <RadioGroupItem value="b" />
        Team
      </Label>
    </RadioGroup>
  )
}
