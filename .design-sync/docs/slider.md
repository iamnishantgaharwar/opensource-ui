---
category: Forms
---

Range input. Base UI `Slider`. Values are arrays: one thumb per entry (`defaultValue={[60]}`, or `[20, 80]` for a range). Props: `value` / `defaultValue`, `onValueChange`, `min` (0), `max` (100), `step`, `orientation`, `disabled`. Needs `aria-label` when there is no visible label.

```jsx
<Slider defaultValue={[25, 75]} aria-label="Price range" />
```
