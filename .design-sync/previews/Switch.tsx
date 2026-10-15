import { Label, Switch } from "opensource-ui"

export function SettingsRows() {
  return (
    <div className="flex w-72 flex-col gap-4">
      <Label className="justify-between font-normal">
        Notifications
        <Switch defaultChecked />
      </Label>
      <Label className="justify-between font-normal">
        Dark mode
        <Switch />
      </Label>
      <Label className="justify-between font-normal">
        Beta features (locked)
        <Switch disabled />
      </Label>
    </div>
  )
}

export function Sizes() {
  return (
    <div className="flex items-center gap-4">
      <Switch size="sm" defaultChecked aria-label="Small, on" />
      <Switch size="sm" aria-label="Small, off" />
      <Switch defaultChecked aria-label="Default, on" />
      <Switch aria-label="Default, off" />
    </div>
  )
}
