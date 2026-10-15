---
category: Overlays
---

Floating panel anchored to a trigger. Base UI `Popover`. Parts: `Popover` > `PopoverTrigger` + `PopoverContent` (> optional `PopoverHeader` with `PopoverTitle` and `PopoverDescription`).

- `PopoverTrigger` renders a button; style it as one with `render={<Button variant="outline" />}`.
- `PopoverContent`: `side` (`bottom`), `align` (`center`), `sideOffset` (4). Width defaults to `w-72`.
- `open` / `defaultOpen`, `onOpenChange` on `Popover`.

```jsx
<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>Share</PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Share project</PopoverTitle>
      <PopoverDescription>Anyone with the link can view.</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>
```
