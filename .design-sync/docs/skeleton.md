---
category: Feedback
---

Loading placeholder: a pulsing `bg-muted` block. Size and shape it with classes (`h-4 w-48`, `size-10 rounded-full`) to mirror the content that will load.

```jsx
<div className="flex items-center gap-3">
  <Skeleton className="size-10 rounded-full" />
  <div className="flex flex-col gap-2">
    <Skeleton className="h-3 w-40" />
    <Skeleton className="h-3 w-24" />
  </div>
</div>
```
