import { Button, HugeiconsIcon, Icons } from "opensource-ui"

export function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}

export function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon-sm" variant="outline" aria-label="Add">
        <HugeiconsIcon icon={Icons.Add01Icon} />
      </Button>
      <Button size="icon" variant="outline" aria-label="Add">
        <HugeiconsIcon icon={Icons.Add01Icon} />
      </Button>
      <Button size="icon-lg" variant="outline" aria-label="Add">
        <HugeiconsIcon icon={Icons.Add01Icon} />
      </Button>
    </div>
  )
}

export function WithIcons() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>
        <HugeiconsIcon icon={Icons.Mail01Icon} data-icon="inline-start" />
        Send invite
      </Button>
      <Button variant="outline">
        Continue
        <HugeiconsIcon icon={Icons.ArrowRight01Icon} data-icon="inline-end" />
      </Button>
      <Button variant="secondary">
        <HugeiconsIcon icon={Icons.Download04Icon} data-icon="inline-start" />
        Download
      </Button>
      <Button variant="destructive">
        <HugeiconsIcon icon={Icons.Delete02Icon} data-icon="inline-start" />
        Delete
      </Button>
      <Button variant="ghost" size="icon" aria-label="More">
        <HugeiconsIcon icon={Icons.MoreHorizontalIcon} />
      </Button>
    </div>
  )
}

export function States() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button disabled>Disabled</Button>
      <Button variant="outline" disabled>
        Disabled outline
      </Button>
      <Button disabled>
        <HugeiconsIcon
          icon={Icons.Loading03Icon}
          data-icon="inline-start"
          className="animate-spin"
        />
        Saving…
      </Button>
    </div>
  )
}
