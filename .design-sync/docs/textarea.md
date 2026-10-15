---
category: Forms
---

Multi-line text field; accepts every native `<textarea>` prop. Grows with content (`field-sizing-content`), minimum height `min-h-16`. Same label, `aria-invalid` and `disabled` conventions as `Input`.

```jsx
<div className="flex flex-col gap-1.5">
  <Label htmlFor="bio">Bio</Label>
  <Textarea id="bio" placeholder="Tell us about yourself" />
</div>
```
