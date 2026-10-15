---
category: Navigation
---

Path to the current page. Parts: `Breadcrumb` > `BreadcrumbList` > `BreadcrumbItem` (> `BreadcrumbLink` or `BreadcrumbPage` for the current page), with `BreadcrumbSeparator` between items and `BreadcrumbEllipsis` for collapsed levels. `BreadcrumbLink` renders an `<a>` (pass `href`, or `render` for a router link).

```jsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbLink href="#">Projects</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Apollo</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```
