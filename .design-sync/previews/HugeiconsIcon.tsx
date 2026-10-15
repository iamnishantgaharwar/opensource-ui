import { HugeiconsIcon, Icons } from "opensource-ui"

const names = Object.keys(Icons).sort() as (keyof typeof Icons)[]

function IconGrid({ from, to }: { from: string; to: string }) {
  return (
    <div className="grid w-full grid-cols-6 gap-2">
      {names
        .filter((n) => n[0] >= from && n[0] <= to)
        .map((n) => (
          <div
            key={n}
            className="flex flex-col items-center gap-1.5 rounded-lg border p-2 text-center"
          >
            <HugeiconsIcon icon={Icons[n]} className="size-5" />
            <span className="w-full truncate text-[10px] text-muted-foreground">
              {n.replace(/Icon$/, "")}
            </span>
          </div>
        ))}
    </div>
  )
}

export function GalleryAToL() {
  return <IconGrid from="A" to="L" />
}

export function GalleryMToZ() {
  return <IconGrid from="M" to="Z" />
}

export function Inline() {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <span className="flex items-center gap-2 text-muted-foreground">
        <HugeiconsIcon icon={Icons.Calendar03Icon} className="size-4" />
        Oct 14
      </span>
      <span className="flex items-center gap-2">
        <HugeiconsIcon
          icon={Icons.CheckmarkCircle02Icon}
          className="size-4 text-primary"
        />
        Tokens exported
      </span>
      <span className="flex items-center gap-2 text-destructive">
        <HugeiconsIcon icon={Icons.Alert02Icon} className="size-4" />2 contrast
        issues
      </span>
    </div>
  )
}
