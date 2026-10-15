---
category: Forms
---

Dropdown choice. Base UI `Select`. Parts: `Select` > `SelectTrigger` (> `SelectValue`) + `SelectContent` > `SelectItem`, optionally grouped with `SelectGroup` + `SelectLabel` and split by `SelectSeparator`.

- `Select`: `items` (map of value → label, so `SelectValue` shows the label), `value` / `defaultValue`, `onValueChange`, `open` / `defaultOpen`.
- `SelectTrigger`: `size` (`sm` | `default`); add `className="w-full"` in forms. Needs an `id` matching a `Label`.
- `SelectContent`: `side`, `align`, `alignItemWithTrigger` (default `true`: the popup overlays the trigger with the selected item aligned).
- `SelectItem`: `value` (required), children = label. A check mark shows on the selected item.

```jsx
<Select defaultValue="pro" items={{ starter: "Starter", pro: "Pro", team: "Team" }}>
  <SelectTrigger id="plan" className="w-full"><SelectValue /></SelectTrigger>
  <SelectContent>
    <SelectItem value="starter">Starter</SelectItem>
    <SelectItem value="pro">Pro</SelectItem>
    <SelectItem value="team">Team</SelectItem>
  </SelectContent>
</Select>
```
