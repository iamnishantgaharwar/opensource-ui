---
category: Forms
---

Form label (`<label>`). Use `htmlFor` with a field `id`, or wrap a `Checkbox` / `RadioGroupItem` / `Switch` directly — the label is `flex items-center gap-2`, so control and text sit side by side. Add `font-normal` for option labels and `justify-between` for a settings row with a trailing `Switch`.

```jsx
<Label className="font-normal">
  <Checkbox defaultChecked />
  Email updates
</Label>
```
