---
category: Overlays
---

Panel that slides in from a screen edge (Base UI `Dialog`). Parts: `Sheet` > `SheetTrigger` + `SheetContent` (> `SheetHeader` with `SheetTitle` and `SheetDescription`, body, `SheetFooter`); `SheetClose` closes it.

- `SheetContent`: `side` (`top` | `right` | `bottom` | `left`, default `right`), `showCloseButton` (default `true`).
- `SheetTrigger` / `SheetClose` style as buttons with `render={<Button variant="outline" />}`.

```jsx
<Sheet>
  <SheetTrigger render={<Button variant="outline" />}>Edit profile</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>Changes save when you click Save.</SheetDescription>
    </SheetHeader>
    <div className="flex flex-col gap-1.5 px-4"><Label htmlFor="n">Name</Label><Input id="n" /></div>
    <SheetFooter><Button>Save</Button></SheetFooter>
  </SheetContent>
</Sheet>
```
