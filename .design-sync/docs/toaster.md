---
category: Feedback
---

Toast notifications (sonner). Render `<Toaster />` once near the app root, then call `toast()` (also exported from the bundle) from event handlers: `toast("Saved")`, `toast.success("Copied")`, `toast.error("Upload failed")`, `toast("Title", { description: "…", action: { label: "Undo", onClick } })`. Props: `position` (e.g. `"bottom-center"`), `richColors`, `expand`. Nothing is visible until a toast fires.

```jsx
<>
  <Button variant="outline" onClick={() => toast.success("Link copied")}>Copy link</Button>
  <Toaster position="bottom-center" />
</>
```
