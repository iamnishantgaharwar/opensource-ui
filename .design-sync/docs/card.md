---
category: Display
---

Surface for grouped content. Parts: `Card` > `CardHeader` (> `CardTitle`, `CardDescription`, `CardAction`) + `CardContent` + `CardFooter`.

- `Card` `size`: `default` | `sm` (tighter padding, smaller title — use for stat tiles).
- `CardAction` sits top-right in the header (an icon button or badge).
- `CardFooter` has a muted fill and top border; put actions there with `gap-2`.
- Padding comes from the card; don't add `p-*` to the parts, only layout (`flex`, `gap-*`).

```jsx
<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Project Apollo</CardTitle>
    <CardDescription>Updated 2 hours ago</CardDescription>
  </CardHeader>
  <CardContent className="text-sm text-muted-foreground">
    A redesign of the onboarding flow.
  </CardContent>
  <CardFooter className="gap-2">
    <Button variant="outline" size="sm">Share</Button>
    <Button size="sm">Open</Button>
  </CardFooter>
</Card>
```
