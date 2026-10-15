import { Checkbox, Input, Label, Switch } from "opensource-ui"

export function WithField() {
  return (
    <div className="flex w-72 flex-col gap-1.5">
      <Label htmlFor="company">Company</Label>
      <Input id="company" placeholder="Acme Inc." />
    </div>
  )
}

export function WrappingControls() {
  return (
    <div className="flex w-72 flex-col gap-4">
      <Label className="font-normal">
        <Checkbox defaultChecked />
        Accept terms and conditions
      </Label>
      <Label className="justify-between font-normal">
        Weekly digest
        <Switch defaultChecked />
      </Label>
    </div>
  )
}
