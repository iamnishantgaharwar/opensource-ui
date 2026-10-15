import { Badge, HugeiconsIcon, Icons } from "opensource-ui"

export function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="ghost">Ghost</Badge>
    </div>
  )
}

export function WithIcons() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>
        <HugeiconsIcon
          icon={Icons.CheckmarkBadge01Icon}
          data-icon="inline-start"
        />
        Verified
      </Badge>
      <Badge variant="secondary">
        <HugeiconsIcon icon={Icons.StarIcon} data-icon="inline-start" />
        Featured
      </Badge>
      <Badge variant="outline">
        v2.4
        <HugeiconsIcon icon={Icons.ArrowUpRight01Icon} data-icon="inline-end" />
      </Badge>
    </div>
  )
}

export function Counts() {
  return (
    <div className="flex items-center gap-2 text-sm">
      Inbox <Badge>12</Badge>
      <span className="ml-3">Drafts</span> <Badge variant="secondary">3</Badge>
    </div>
  )
}
