---
category: Forms
---

On/off switch for settings that apply immediately. Base UI `Switch`. Props: `checked` / `defaultChecked`, `onCheckedChange`, `disabled`, `size` (`sm` | `default`). Put it in a `Label` with `justify-between` for a settings row.

```jsx
<Label className="justify-between font-normal">
  Notifications
  <Switch defaultChecked />
</Label>
```
