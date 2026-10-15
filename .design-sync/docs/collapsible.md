---
category: Navigation
---

Show/hide a region. Base UI `Collapsible`. Parts: `Collapsible` > `CollapsibleTrigger` + `CollapsibleContent`. `open` / `defaultOpen`, `onOpenChange`. Style the trigger as a button with `render={<Button variant="ghost" />}`.

```jsx
<Collapsible defaultOpen className="flex flex-col gap-2">
  <CollapsibleTrigger render={<Button variant="ghost" size="sm" />}>Show details</CollapsibleTrigger>
  <CollapsibleContent className="text-sm text-muted-foreground">Order shipped Oct 14.</CollapsibleContent>
</Collapsible>
```
