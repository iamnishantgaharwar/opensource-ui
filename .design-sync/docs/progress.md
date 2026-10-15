---
category: Feedback
---

Determinate progress bar. Base UI `Progress`. `Progress` renders the track and indicator itself — pass `value` (0–100). Optional children `ProgressLabel` and `ProgressValue` render a label row above the bar. Needs `aria-label` when there's no `ProgressLabel`.

```jsx
<Progress value={68}>
  <ProgressLabel>Upload</ProgressLabel>
  <ProgressValue />
</Progress>
```
