---
category: Forms
---

Checkbox. Base UI `Checkbox`.

- State: `checked` / `defaultChecked`, `onCheckedChange`, `disabled`. There is no indeterminate style (the indicator is always a tick), so don't use `indeterminate`.
- Wrap in a `Label` for the text; standalone checkboxes (table row selection) need `aria-label`.

```jsx
<div className="flex flex-col gap-3">
  <Label className="font-normal"><Checkbox defaultChecked />Email updates</Label>
  <Label className="font-normal"><Checkbox />SMS updates</Label>
</div>
```
