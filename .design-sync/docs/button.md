---
category: Actions
---

The primary clickable control. Built on Base UI `Button`.

- `variant`: `default` (primary action, one per view), `secondary`, `outline`, `ghost` (toolbar/inline), `destructive` (only for destructive actions), `link`.
- `size`: `xs`, `sm`, `default`, `lg`; icon-only squares `icon-xs`, `icon-sm`, `icon`, `icon-lg` (always pass `aria-label`).
- Icons: put a `HugeiconsIcon` inside with `data-icon="inline-start"` or `data-icon="inline-end"` so padding adjusts. No size class needed.
- Render as a link: `<Button nativeButton={false} render={<a href="/docs" />}>Docs</Button>` (Base UI `render`, not `asChild`).
- `buttonVariants({ variant, size })` returns the class string for styling other elements as buttons.

```jsx
<div className="flex gap-2">
  <Button variant="outline">Cancel</Button>
  <Button>
    <HugeiconsIcon icon={Icons.Mail01Icon} data-icon="inline-start" />
    Send invite
  </Button>
</div>
```
