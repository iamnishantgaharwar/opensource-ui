import { HugeiconsIcon, Icons, Input, Label } from "opensource-ui"

export function Default() {
  return (
    <div className="flex w-72 flex-col gap-1.5">
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="Ada Lovelace" />
    </div>
  )
}

export function Invalid() {
  return (
    <div className="flex w-72 flex-col gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" defaultValue="ada@" aria-invalid />
      <p className="text-xs text-destructive">Enter a valid email.</p>
    </div>
  )
}

export function Disabled() {
  return (
    <div className="flex w-72 flex-col gap-1.5">
      <Label htmlFor="workspace">Workspace</Label>
      <Input id="workspace" disabled defaultValue="acme-design" />
    </div>
  )
}

export function WithIcon() {
  return (
    <div className="relative w-72">
      <HugeiconsIcon
        icon={Icons.Search01Icon}
        className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        aria-label="Search"
        placeholder="Search projects…"
        className="pl-8"
      />
    </div>
  )
}
