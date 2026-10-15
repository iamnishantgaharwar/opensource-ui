---
category: Foundations
---

Icon renderer for Hugeicons — the only icon set this system uses. Pass an icon object from the bundle's curated `Icons` namespace: `<HugeiconsIcon icon={Icons.Search01Icon} />`. Props: `icon` (required), `size` (px, default 24), `strokeWidth`, `color`, `className`.

- Inside `Button`, `Badge`, `Toggle`, `SidebarMenuButton` and `Alert`, components size the icon for you; add `data-icon="inline-start"` / `"inline-end"` in buttons and badges.
- Standalone, size with classes (`className="size-4 text-muted-foreground"`).
- Available in `Icons`: Add01Icon, Alert02Icon, AlertCircleIcon, Analytics01Icon, ArrowDown01Icon, ArrowDownLeft01Icon, ArrowExpand01Icon, ArrowLeft01Icon, ArrowRight01Icon, ArrowUp01Icon, ArrowUpRight01Icon, Attachment01Icon, Bookmark01Icon, Calendar03Icon, Call02Icon, Cancel01Icon, ChartLineData01Icon, Chat01Icon, CheckListIcon, CheckmarkBadge01Icon, CheckmarkCircle02Icon, Clock01Icon, CodeIcon, CommandIcon, Copy01Icon, CreditCardIcon, DashboardSquare01Icon, Delete02Icon, Download04Icon, Edit02Icon, EyeIcon, FavouriteIcon, File01Icon, FilterIcon, FlashIcon, Folder01Icon, Globe02Icon, GridViewIcon, HelpCircleIcon, Home01Icon, Image01Icon, InformationCircleIcon, Invoice01Icon, Layers01Icon, LayoutGridIcon, Link01Icon, Loading03Icon, Location01Icon, LockIcon, Login01Icon, Logout01Icon, Mail01Icon, Menu01Icon, Message01Icon, MinusSignIcon, Moon02Icon, MoreHorizontalCircle01Icon, MoreHorizontalIcon, MoreVerticalIcon, MultiplicationSignCircleIcon, Notification01Icon, PaintBoardIcon, PencilEdit01Icon, PlusSignIcon, RefreshIcon, Rocket01Icon, Search01Icon, Settings01Icon, Settings02Icon, Share08Icon, ShoppingCart01Icon, SidebarLeftIcon, SortingIcon, SparklesIcon, SquareUnlock01Icon, StarIcon, Sun03Icon, Tag01Icon, Task01Icon, TextFontIcon, Tick02Icon, UnfoldMoreIcon, Upload04Icon, UserGroupIcon, UserIcon, ViewIcon, ViewOffIcon, Wallet01Icon. Use no other icon names — they are not in the bundle.

```jsx
<span className="flex items-center gap-2 text-sm text-muted-foreground">
  <HugeiconsIcon icon={Icons.Calendar03Icon} className="size-4" />
  Oct 14
</span>
```
