import {
  HugeiconsIcon,
  Icons,
  ToggleGroup,
  ToggleGroupItem,
} from "opensource-ui"

export function Segmented() {
  return (
    <ToggleGroup variant="outline" spacing={0} defaultValue={["month"]}>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
      <ToggleGroupItem value="year">Year</ToggleGroupItem>
    </ToggleGroup>
  )
}

export function IconsOnly() {
  return (
    <ToggleGroup defaultValue={["grid"]} aria-label="Layout">
      <ToggleGroupItem value="grid" aria-label="Grid">
        <HugeiconsIcon icon={Icons.GridViewIcon} />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="List">
        <HugeiconsIcon icon={Icons.Menu01Icon} />
      </ToggleGroupItem>
      <ToggleGroupItem value="board" aria-label="Board">
        <HugeiconsIcon icon={Icons.LayoutGridIcon} />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export function Multiple() {
  return (
    <ToggleGroup
      multiple
      variant="outline"
      size="sm"
      defaultValue={["email", "push"]}
      aria-label="Channels"
    >
      <ToggleGroupItem value="email">
        <HugeiconsIcon icon={Icons.Mail01Icon} />
        Email
      </ToggleGroupItem>
      <ToggleGroupItem value="sms">
        <HugeiconsIcon icon={Icons.Message01Icon} />
        SMS
      </ToggleGroupItem>
      <ToggleGroupItem value="push">
        <HugeiconsIcon icon={Icons.Notification01Icon} />
        Push
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
