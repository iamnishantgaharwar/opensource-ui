---
category: Display
---

Thin divider line (`bg-border`). Base UI `Separator`. `orientation`: `horizontal` (default) or `vertical` — a vertical one needs a parent with a height (e.g. `flex h-5 items-center`).

```jsx
<div className="flex h-5 items-center gap-3 text-sm">
  <span>Docs</span><Separator orientation="vertical" /><span>API</span>
</div>
```
