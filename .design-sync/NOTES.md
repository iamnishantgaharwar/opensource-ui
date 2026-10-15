# design-sync notes

## How this repo is synced

- This is a Next.js app, not a published package: there is no `dist/`. `node .design-sync/build.mjs` (`cfg.buildCmd`) produces a stand-in package under `.design-sync/.cache/dist/`: `index.js` re-exports every `components/ui/*.tsx` plus `toast` (sonner), `HugeiconsIcon` and the curated `Icons` namespace (`.design-sync/icons.ts`); `types/` is `tsc` declarations (`tsconfig.dts.json`) with `@/` specifiers rewritten to relative; `ds.css` is `.design-sync/tailwind.css` compiled with the repo's own `@tailwindcss/postcss`.
- Run `node .design-sync/build.mjs` before every converter/driver run. Config paths (`srcDir`, `tsconfig`, `cssEntry`, `extraFonts`, `docsDir`) are relative to `.design-sync/.cache/dist/` (the converter's PKG_DIR), hence the `../../..` prefixes.
- Converter command: `node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules ./node_modules --out ./ds-bundle` (entry comes from `cfg.entry`).
- Tailwind scans only `.design-sync/` (previews, docs, conventions) and `components/ui` (`base` = `.design-sync/`), plus an `@source inline(...)` safelist of common layout/spacing/type/token utilities in `tailwind.css`. Designs can't compile Tailwind, so a class missing from that CSS silently does nothing — extend the safelist rather than relying on scanning. A class used in a new preview is picked up automatically, but only after `build.mjs` re-runs.
- `globals.css` is `@import`ed as-is, so theme tokens stay in sync with the app. `--font-sans` / `--font-mono` are set by next/font in the app; `tailwind.css` points them at Inter / Geist Mono, shipped from `.design-sync/fonts/` (Google Fonts woff2, OFL, latin + latin-ext).
- Only the 27 family roots + `HugeiconsIcon` get cards; compound parts (`CardHeader`, `SidebarMenuButton`, …) are excluded via `componentSrcMap: null` but still ship in the bundle and are documented in `.design-sync/docs/<family>.md` (which also sets each card's group via `category`).
- Full `@hugeicons/core-free-icons` is ~6.4 MB minified, too heavy for every design; `icons.ts` ships a curated ~90. Adding an icon = add its name there (and to `docs/hugeicons-icon.md`'s list).
- Semantic tokens from the *generated* theme (`--success`, `--warning`, `--info`, `--primary-500`, `--tone`) don't exist in the app chrome theme; previews must not use them (the app's own `components/preview/demos` do).

## Known render warns

- `[GRID_OVERFLOW] escape` on Card (Stats) and Progress: Base UI Progress renders visually hidden 1px `position: fixed` spans (`clip-path: inset(50%)`). Not visible; both cards use `cardMode: "column"`.
- `[TOKENS_MISSING] --available-height, --anchor-width, --transform-origin, --tw`: set at runtime by Base UI positioners / Tailwind internals. Expected.
- `[DTS_STYLE_SYSTEM]` on HugeiconsIcon: SVG presentation props filtered from its `.d.ts`. Fine — `icon`, `size`, `strokeWidth`, `color`, `className` are the API.

## Component findings (repo, not sync)

- `Checkbox` has no indeterminate style — the indicator is always `Tick02Icon`, so `indeterminate` renders as a faint tick. Docs tell the design agent not to use it.
- A disabled checked `Checkbox` and a disabled `RadioGroup` look nearly identical to enabled ones (no dimming on the control itself).

## Re-sync risks

- `docs/*.md` are hand-written from `components/ui` source on 2026-10-15. Variant/size lists, part names and props there go stale silently when a component changes (e.g. a new Button size) — re-read the diff of `components/ui` and update the matching doc.
- `docs/hugeicons-icon.md` duplicates the `icons.ts` name list; keep them in sync.
- The utility safelist in `tailwind.css` is a guess at what designs need. If designs come back with unstyled layout, check the missing class against `_ds_bundle.css` and add its family.
- Fonts were fetched from Google Fonts once and committed; the app gets them via next/font, so a font change in `app/layout.tsx` must be mirrored in `.design-sync/fonts/` and `tailwind.css`.
- Build assumed Node 22.14, playwright 1.49.1 against cached chromium 1148.
