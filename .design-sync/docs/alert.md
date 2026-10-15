---
category: Feedback
---

Inline message. Parts: `Alert` > optional leading icon (`HugeiconsIcon`, first child) + `AlertTitle` + `AlertDescription`; `AlertAction` pins a button top-right.

- `variant`: `default` (card surface) or `destructive` (error text color).

```jsx
<Alert>
  <HugeiconsIcon icon={Icons.InformationCircleIcon} />
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>Your trial ends in 3 days.</AlertDescription>
</Alert>
```
