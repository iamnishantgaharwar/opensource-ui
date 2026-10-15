import { Label, Slider } from "opensource-ui"

export function Single() {
  return (
    <div className="flex w-72 flex-col gap-3">
      <div className="flex justify-between text-sm">
        <Label>Volume</Label>
        <span className="text-muted-foreground tabular-nums">60%</span>
      </div>
      <Slider defaultValue={[60]} aria-label="Volume" />
    </div>
  )
}

export function Range() {
  return (
    <div className="flex w-72 flex-col gap-3">
      <div className="flex justify-between text-sm">
        <Label>Price</Label>
        <span className="text-muted-foreground tabular-nums">$20 – $80</span>
      </div>
      <Slider defaultValue={[20, 80]} aria-label="Price range" />
    </div>
  )
}

export function Disabled() {
  return (
    <div className="w-72">
      <Slider defaultValue={[35]} disabled aria-label="Opacity (locked)" />
    </div>
  )
}
