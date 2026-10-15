---
category: Display
---

User or team image with initials fallback. Parts: `Avatar` > `AvatarImage` + `AvatarFallback` (+ optional `AvatarBadge` status dot); `AvatarGroup` overlaps several avatars, `AvatarGroupCount` shows "+N".

- `Avatar` `size`: `sm`, `default`, `lg`.
- `AvatarFallback` shows while the image loads or when it fails — always include it.

```jsx
<AvatarGroup>
  <Avatar><AvatarFallback>AL</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>GH</AvatarFallback></Avatar>
  <AvatarGroupCount>+3</AvatarGroupCount>
</AvatarGroup>
```
