---
category: Navigation
---

Switch between views. Base UI `Tabs`. Parts: `Tabs` > `TabsList` > `TabsTrigger`, plus one `TabsContent` per tab.

- `Tabs`: `value` / `defaultValue`, `onValueChange`, `orientation`.
- `TabsList` `variant`: `default` (muted pill track) or `line` (underline).
- `TabsTrigger` / `TabsContent` share a `value`.

```jsx
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="activity">Recent activity</TabsContent>
</Tabs>
```
