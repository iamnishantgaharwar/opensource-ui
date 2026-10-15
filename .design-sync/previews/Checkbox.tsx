import { Checkbox, Label } from "opensource-ui"

export function Group() {
  return (
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
  )
}

export function States() {
  return (
    <div className="flex items-center gap-4">
      <Checkbox aria-label="Unchecked" />
      <Checkbox defaultChecked aria-label="Checked" />
      <Checkbox disabled aria-label="Unchecked, disabled" />
      <Checkbox defaultChecked disabled aria-label="Checked, disabled" />
    </div>
  )
}

export function WithDescription() {
  return (
    <Label className="w-80 items-start font-normal">
      <Checkbox defaultChecked className="mt-0.5" />
      <span className="flex flex-col gap-1">
        <span className="font-medium">Share usage data</span>
        <span className="leading-snug text-muted-foreground">
          Help improve the generator. No colors or tokens are collected.
        </span>
      </span>
    </Label>
  )
}
