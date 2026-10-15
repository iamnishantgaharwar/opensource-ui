---
category: Display
---

Data table (semantic `<table>` in a horizontally scrolling container). Parts: `Table` > `TableHeader` / `TableBody` / `TableFooter` > `TableRow` > `TableHead` / `TableCell`; optional `TableCaption`.

- Selected row: `data-state="selected"` on `TableRow`.
- Numbers: `className="text-right tabular-nums"` on the head and cells.
- Frame it with `<div className="rounded-xl border">` around the `Table`.

```jsx
<div className="rounded-xl border">
  <Table>
    <TableHeader>
      <TableRow><TableHead>Invoice</TableHead><TableHead className="text-right">Amount</TableHead></TableRow>
    </TableHeader>
    <TableBody>
      <TableRow><TableCell className="font-medium">INV-001</TableCell><TableCell className="text-right tabular-nums">$250.00</TableCell></TableRow>
    </TableBody>
  </Table>
</div>
```
