---
category: Actions
---

A two-state button (pressed / not pressed). Base UI `Toggle`.

- `variant`: `default` (transparent), `outline` (bordered).
- `size`: `sm`, `default`, `lg`.
- State: `pressed` / `defaultPressed`, `onPressedChange`. Pressed state renders with `bg-muted`.
- Icon-only toggles need `aria-label`.

```jsx
<Toggle variant="outline" defaultPressed aria-label="Bold">
  <HugeiconsIcon icon={Icons.TextFontIcon} />
</Toggle>
```
