import {
  Button,
  HugeiconsIcon,
  Icons,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "opensource-ui"

export function Open() {
  return (
    <TooltipProvider>
      <div className="flex h-40 w-full items-end justify-center pb-8">
        <Tooltip defaultOpen>
          <TooltipTrigger
            render={<Button variant="outline" size="icon" aria-label="Copy" />}
          >
            <HugeiconsIcon icon={Icons.Copy01Icon} />
          </TooltipTrigger>
          <TooltipContent>Copy to clipboard</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
