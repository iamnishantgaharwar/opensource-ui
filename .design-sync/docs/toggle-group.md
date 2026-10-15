---
category: Actions
---

A set of toggles where one or many can be pressed. Parts: `ToggleGroup` > `ToggleGroupItem`.

- `ToggleGroup` props: `variant` (`default` | `outline`) and `size` (`sm` | `default` | `lg`) apply to every item; `spacing` (number, default 2; `0` joins items into one segmented control); `orientation`; `multiple` to allow several pressed; `value` / `defaultValue` (array of item values); `onValueChange`.
- `ToggleGroupItem` takes `value` (required) and children.

```jsx
<ToggleGroup variant="outline" spacing={0} defaultValue={["month"]}>
  <ToggleGroupItem value="week">Week</ToggleGroupItem>
  <ToggleGroupItem value="month">Month</ToggleGroupItem>
  <ToggleGroupItem value="year">Year</ToggleGroupItem>
</ToggleGroup>
```
