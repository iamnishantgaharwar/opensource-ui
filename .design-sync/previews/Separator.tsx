import { Separator } from "opensource-ui"

export function Horizontal() {
  return (
    <div className="flex w-72 flex-col gap-3 text-sm">
      <div>
        <p className="font-medium">Design System Generator</p>
        <p className="text-muted-foreground">Palettes, roles and type scale.</p>
      </div>
      <Separator />
      <p className="text-muted-foreground">
        Exports CSS, Tailwind and JSON tokens.
      </p>
    </div>
  )
}

export function Vertical() {
  return (
    <div className="flex h-5 items-center gap-3 text-sm">
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>API</span>
      <Separator orientation="vertical" />
      <span>Changelog</span>
    </div>
  )
}
