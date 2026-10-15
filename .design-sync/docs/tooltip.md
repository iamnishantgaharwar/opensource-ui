---
category: Overlays
---

Short hint on hover/focus. Base UI `Tooltip`. Parts: `TooltipProvider` (once around the app; sets `delay`) > `Tooltip` > `TooltipTrigger` + `TooltipContent`.

- `TooltipTrigger` renders a button; reuse a `Button` with `render={<Button variant="ghost" size="icon" aria-label="…" />}`.
- `TooltipContent`: `side` (`top`), `align`, `sideOffset` (4). Dark (`bg-foreground`) with an arrow.

```jsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Copy" />}>
      <HugeiconsIcon icon={Icons.Copy01Icon} />
    </TooltipTrigger>
    <TooltipContent>Copy to clipboard</TooltipContent>
  </Tooltip>
</TooltipProvider>
```
