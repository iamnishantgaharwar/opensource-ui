# opensource-ui — how to build with it

shadcn/ui components on **Base UI** (not Radix), styled with **Tailwind v4 utility classes** and shadcn theme tokens. Neutral palette, Inter for text, Geist Mono for code, Hugeicons for icons.

## Setup

Everything is on `window.OpensourceUi`:

```jsx
const { Button, Card, CardHeader, CardTitle, CardContent, HugeiconsIcon, Icons, toast } = window.OpensourceUi
```

- No root provider is needed for styling: tokens, fonts and utilities all come from `styles.css`. Wrap the page in `bg-background text-foreground font-sans` so the surface and text use the theme.
- Context wrappers some families need: `TooltipProvider` once around anything using `Tooltip`; `SidebarProvider` around `Sidebar` + `SidebarInset`; render `<Toaster />` once and call `toast()` (`toast.success`, `toast.error`) to show notifications.
- Dark mode: add `className="dark"` to a wrapper. Every token flips inside it. Don't hand-pick dark colors.
- Base UI API: change the rendered element with `render`, never `asChild`. Triggers that should look like buttons: `<PopoverTrigger render={<Button variant="outline" />}>Share</PopoverTrigger>`. A button rendered as a link also needs `nativeButton={false}`.
- Values are arrays where Base UI expects them: `Slider defaultValue={[60]}`, `ToggleGroup defaultValue={["month"]}`.

## Styling: Tailwind classes, and only the ones that are compiled

Designs can't run Tailwind. A class works only if it's in the compiled `_ds_bundle.css`, so use the families below and don't invent arbitrary values (`w-[317px]`, `#hex`, `text-[13px]`).

| Purpose | Classes |
|---|---|
| Surfaces | `bg-background` `bg-card` `bg-muted` `bg-secondary` `bg-accent` `bg-primary` `bg-popover` `bg-sidebar` |
| Text | `text-foreground` `text-muted-foreground` `text-primary` `text-primary-foreground` `text-destructive` `text-card-foreground` |
| Lines | `border` `border-b` `border-t` `border-border` `border-input` `ring-2 ring-primary` `divide-y` |
| Tints | `bg-primary/10` `bg-destructive/10` `bg-muted/50` `border-primary/30` |
| Charts | `bg-chart-1` … `bg-chart-5` |
| Layout | `flex` `grid` `grid-cols-1…6,12` `col-span-2` `gap-*` `space-y-*` `items-center` `justify-between` `flex-1` `shrink-0`, with `sm:` `md:` `lg:` prefixes |
| Spacing / size | `p-*` `px-*` `py-*` `m*-*` (0–24 scale) `w-full` `max-w-sm…7xl` `size-4…16` `min-h-screen` |
| Type | `text-xs…6xl` `font-medium` `font-semibold` `font-mono` `tracking-tight` `tabular-nums` `truncate` |
| Shape | `rounded-md` `rounded-lg` `rounded-xl` `rounded-full` `shadow-sm` `shadow-md` |

Don't add `p-*` to Card parts. Card pads itself; use `CardHeader` / `CardContent` / `CardFooter` and layout classes only. Inside `Button`, `Badge` and `Toggle`, icons size themselves: mark them `data-icon="inline-start"` or `"inline-end"`.

## Where the truth lives

- `components/<group>/<Name>/<Name>.prompt.md` lists each family's parts, key props and a composition example. Read it before using a family: compound parts (`CardHeader`, `SelectItem`, `SidebarMenuButton`…) are documented there, not as separate components.
- `<Name>.d.ts` is the props contract. `_ds_bundle.css` is the compiled stylesheet (theme variables at the top, then every available utility).
- Icons: only names in `Icons` exist (listed in `HugeiconsIcon.prompt.md`); e.g. `Icons.Search01Icon`, `Icons.Settings02Icon`.

## Example

```jsx
<div className="min-h-screen bg-background p-6 font-sans text-foreground">
  <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
    <Card size="sm">
      <CardHeader><CardDescription>Revenue</CardDescription></CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="text-2xl font-semibold tabular-nums">$48,210</p>
        <Progress value={72} aria-label="Revenue goal" />
      </CardContent>
    </Card>
  </div>
  <Button className="mt-6" onClick={() => toast.success("Report exported")}>
    <HugeiconsIcon icon={Icons.Download04Icon} data-icon="inline-start" />
    Export
  </Button>
  <Toaster position="bottom-center" />
</div>
```
