---
category: Display
---

Small label for status, category or count. `variant`: `default` (primary fill), `secondary`, `outline`, `destructive`, `ghost`, `link`. Icons go inside with `data-icon="inline-start"` / `"inline-end"`. Renders a `<span>`; use `render={<a href="…" />}` for a linked badge.

```jsx
<div className="flex gap-2">
  <Badge>New</Badge>
  <Badge variant="secondary">Draft</Badge>
  <Badge variant="outline">v2.4</Badge>
  <Badge variant="destructive">Failed</Badge>
</div>
```
