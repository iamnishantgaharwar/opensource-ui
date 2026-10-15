---
category: Forms
---

Single-line text field. Base UI `Input`; accepts every native `<input>` prop.

- Pair with `Label` (`htmlFor` / `id`). Stack label, field and help text in `flex flex-col gap-1.5`.
- Error state: set `aria-invalid` — the border and ring turn `destructive`. Put the message below in `text-xs text-destructive`.
- `disabled` dims the field.

```jsx
<div className="flex flex-col gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="ada@example.com" />
</div>
```
