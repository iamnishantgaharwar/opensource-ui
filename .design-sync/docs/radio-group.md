---
category: Forms
---

Single choice from a list. Parts: `RadioGroup` > `RadioGroupItem`. Base UI `RadioGroup`.

- `RadioGroup`: `value` / `defaultValue`, `onValueChange`, `disabled`. Give it an `aria-label` (or a visible label) for the group.
- `RadioGroupItem`: `value` (required). Wrap each in a `Label`.

```jsx
<RadioGroup defaultValue="monthly" aria-label="Billing period">
  <Label className="font-normal"><RadioGroupItem value="monthly" />Monthly</Label>
  <Label className="font-normal"><RadioGroupItem value="yearly" />Yearly</Label>
</RadioGroup>
```
