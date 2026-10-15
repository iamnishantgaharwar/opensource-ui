import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  HugeiconsIcon,
  Icons,
} from "opensource-ui"

export function Open() {
  return (
    <Collapsible defaultOpen className="flex w-80 flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">3 files changed</span>
        <CollapsibleTrigger
          render={
            <Button variant="ghost" size="icon-sm" aria-label="Toggle files" />
          }
        >
          <HugeiconsIcon icon={Icons.UnfoldMoreIcon} />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="flex flex-col gap-1.5">
        {["tokens/color.json", "tokens/type.json", "styles.css"].map((f) => (
          <div
            key={f}
            className="rounded-md border px-3 py-2 font-mono text-xs"
          >
            {f}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

export function Closed() {
  return (
    <Collapsible className="flex w-80 flex-col gap-2">
      <CollapsibleTrigger
        render={<Button variant="outline" size="sm" className="self-start" />}
      >
        Show order details
      </CollapsibleTrigger>
      <CollapsibleContent className="text-sm text-muted-foreground">
        Shipped Oct 14 via express courier.
      </CollapsibleContent>
    </Collapsible>
  )
}
