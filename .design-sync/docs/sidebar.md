---
category: Navigation
---

App sidebar layout. Everything must sit inside `SidebarProvider` (it holds open/collapsed state; `useSidebar()` reads it). Parts: `SidebarProvider` > `Sidebar` + `SidebarInset` (the main area). Inside `Sidebar`: `SidebarHeader`, `SidebarContent` (> `SidebarGroup` > `SidebarGroupLabel` + `SidebarGroupContent` > `SidebarMenu` > `SidebarMenuItem` > `SidebarMenuButton`), `SidebarFooter`. Extras: `SidebarMenuBadge`, `SidebarMenuAction`, `SidebarMenuSub` / `SidebarMenuSubItem` / `SidebarMenuSubButton`, `SidebarInput`, `SidebarSeparator`, `SidebarTrigger` (toggle button), `SidebarRail`.

- `Sidebar`: `side` (`left` | `right`), `variant` (`sidebar` | `floating` | `inset`), `collapsible` (`offcanvas` | `icon` | `none`). The default is fixed to the viewport and hidden below 768px; use `collapsible="none"` for a sidebar that sits in normal flow.
- `SidebarMenuButton`: `isActive`, `size` (`sm` | `default` | `lg`), `tooltip` (shown when collapsed to icons), `render={<a href="…" />}` for links. Put a `HugeiconsIcon` before the label.
- Colors come from the `--sidebar*` tokens (`bg-sidebar`, `text-sidebar-foreground`, `bg-sidebar-accent`).

```jsx
<SidebarProvider>
  <Sidebar collapsible="none">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Workspace</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <HugeiconsIcon icon={Icons.DashboardSquare01Icon} />Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <SidebarInset className="p-6">Page content</SidebarInset>
</SidebarProvider>
```
