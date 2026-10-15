import { HugeiconsIcon, Icons, Toggle } from "opensource-ui"

export function Variants() {
  return (
    <div className="flex items-center gap-2">
      <Toggle aria-label="Favourite">
        <HugeiconsIcon icon={Icons.StarIcon} />
      </Toggle>
      <Toggle variant="outline" aria-label="Bookmark">
        <HugeiconsIcon icon={Icons.Bookmark01Icon} />
      </Toggle>
      <Toggle variant="outline" defaultPressed aria-label="Show preview">
        <HugeiconsIcon icon={Icons.ViewIcon} />
      </Toggle>
    </div>
  )
}

export function WithText() {
  return (
    <div className="flex items-center gap-2">
      <Toggle variant="outline" size="sm" defaultPressed>
        <HugeiconsIcon icon={Icons.GridViewIcon} />
        Grid
      </Toggle>
      <Toggle variant="outline">
        <HugeiconsIcon icon={Icons.FilterIcon} />
        Filters
      </Toggle>
      <Toggle variant="outline" size="lg">
        <HugeiconsIcon icon={Icons.SparklesIcon} />
        Highlights
      </Toggle>
    </div>
  )
}

export function Disabled() {
  return (
    <Toggle variant="outline" disabled aria-label="Locked">
      <HugeiconsIcon icon={Icons.LockIcon} />
    </Toggle>
  )
}
