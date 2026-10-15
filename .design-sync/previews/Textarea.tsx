import { Label, Textarea } from "opensource-ui"

export function Default() {
  return (
    <div className="flex w-80 flex-col gap-1.5">
      <Label htmlFor="bio">Bio</Label>
      <Textarea id="bio" placeholder="Tell us about yourself" />
      <p className="text-xs text-muted-foreground">
        Shown on your public profile.
      </p>
    </div>
  )
}

export function Filled() {
  return (
    <div className="flex w-80 flex-col gap-1.5">
      <Label htmlFor="notes">Release notes</Label>
      <Textarea
        id="notes"
        defaultValue={
          "New type scale and color tokens.\nFixed focus rings on dark surfaces.\nExport now includes Tailwind v3 config."
        }
      />
    </div>
  )
}

export function Invalid() {
  return (
    <div className="flex w-80 flex-col gap-1.5">
      <Label htmlFor="feedback">Feedback</Label>
      <Textarea id="feedback" aria-invalid defaultValue="Too short" />
      <p className="text-xs text-destructive">Write at least 20 characters.</p>
    </div>
  )
}
