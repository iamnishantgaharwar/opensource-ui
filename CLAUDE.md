@AGENTS.md

# Design System Generator

Turns brand colors and a typography preference into a design foundation (color palettes + shadcn-compatible roles, type scale), shows it in a live preview and exports tokens (CSS, Tailwind, JSON). Product spec: `docs/Design System Generator — PRD.md` — read the relevant section before building a feature.

## Commands

- `npm run dev` — dev server
- `npm test` — Vitest unit tests
- `npm run typecheck` / `npm run lint` / `npm run format`

Before calling work done, run `npm test`, `npm run typecheck` and `npm run lint`.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 (CSS-first, no `tailwind.config`) · shadcn/ui on **Base UI** · Hugeicons · next-themes · culori (OKLCH color math) · Vitest.

Everything runs client-side; there is no backend. Keep the app compatible with a static export (`output: "export"`): no Route Handlers, Server Actions, cookies/headers or other request-time server features.

## Architecture

- `lib/tokens/` — the token-module contract (`TokenModule`, `Token`, `TokenGroup`) and the module registry. Preview and exporters read the generated token tree, never a specific module's internals.
- `lib/modules/<module>/` — one folder per generator (`color` today; `typography`, `spacing`… later). Each exports `settings`, pure `generate*` functions and a `<name>Module` registered in `lib/tokens/registry.ts`.
- `lib/tokens/css.ts` and `lib/export/` — read the token tree generically. A token is published as a CSS variable when it has `$css` (its name without `--`); `$dark` holds its dark-mode value. Exporters: shadcn/Tailwind v4 CSS, Tailwind v3 (HSL channels + config), W3C JSON.
- `components/ui/` — shadcn components (generated). `components/` — app components composed from them (`color/`, `preview/`, `export/`).
- The component preview is its own route: `app/preview/` (sidebar layout) and `app/preview/[slug]` (one page per component, prerendered). Add a page by adding an entry to `components/preview/catalog.ts` and its demo to `components/preview/demos/index.ts`. Demos render inside `PreviewSurface`, which applies the generated theme.
- `app/` — routes and layout only; keep logic in `lib/` and UI in `components/`.

Rules:
- Generators are **pure and deterministic**: no `Date`, `Math.random`, DOM or React in `lib/modules`. Same settings → identical tokens (shared links depend on it).
- Every generator change comes with Vitest tests next to the code (`*.test.ts`).
- Adding a module means one new folder + one line in the registry; preview and exporters must not need changes.

## Two separate themes — never mix them

1. **App chrome theme** — the shadcn variables in `app/globals.css` (neutral). Used by the app's own UI (controls, header, panels). The chrome stays neutral so the user's brand color is the only strong color on screen.
2. **Generated theme** — the user's design system. It is applied **only inside the preview container**, by setting the generated CSS variables (`--primary`, `--background`, `--primary-500`, …) as inline style on that wrapper (plus a `.dark` scope for dark preview). Preview components use the normal shadcn utility classes (`bg-primary`, `text-muted-foreground`), so they pick up the generated values through the cascade.

Never write generated values into `:root` or `globals.css`, and never hard-code colors or font sizes in preview components (PRD P-3). Tokens shadcn doesn't define (e.g. `--link`, `--success`, `--primary-500`) are used with Tailwind's variable syntax: `text-(--link)`, `bg-(--success)/10`.

The `dark:` variant in `globals.css` is scoped so a preview with `data-preview-mode="light"` stays light inside the dark app; keep that when editing the variant.

## shadcn/ui

- **Use existing shadcn components first.** Check `components/ui/` before building anything. If a component is missing, add it with the CLI — don't hand-write it:
  `npx shadcn@latest add <component>`
- **This project uses Base UI, not Radix.** Don't write Radix APIs from memory. Look up usage first:
  `npx shadcn@latest docs <component>`
  - Primitives come from `@base-ui/react/*`, not `@radix-ui/*`.
  - Use the `render` prop to change the rendered element, not `asChild`. When a button renders a non-`<button>` element, also pass `nativeButton={false}`: `<Button nativeButton={false} render={<a href="…" />}>Docs</Button>`.
- **Don't edit generated files in `components/ui/`** beyond small, deliberate fixes. Compose wrappers in `components/` or customize through `className` and variants.
- **Style with theme tokens**, not raw colors: `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary text-primary-foreground`, `ring-ring`. No `bg-white`, `text-gray-500`, hex values or arbitrary colors in components.
- Use `cn()` from `@/lib/utils` to merge classes; use `cva` for variants, following `components/ui/button.tsx`. Keep `data-slot` attributes on component roots.
- Respect the variant semantics: `default` for the primary action, `secondary`/`outline`/`ghost` for lesser actions, `destructive` only for destructive actions.
- Dark mode is class-based (`next-themes`, `.dark` on `<html>`). Use `dark:` variants only when a token can't express the difference.

## Icons

Hugeicons only (no lucide):

```tsx
import { HugeiconsIcon } from "@hugeicons/react"
import { Copy01Icon } from "@hugeicons/core-free-icons"

<HugeiconsIcon icon={Copy01Icon} />
```

Icon-only buttons need an `aria-label`.

## Next.js

This Next.js version differs from older ones — read `node_modules/next/dist/docs/` before using a framework API (see AGENTS.md).
- Components are Server Components by default. Add `"use client"` only to interactive leaf components (controls, preview, copy buttons), not to layouts or pages.
- Load app fonts with `next/font`. User-selected Google Fonts in the preview are loaded on demand at runtime (a `<link>` to Google Fonts), not through `next/font`.

## Code style

- Prettier: no semicolons, double quotes, trailing commas (es5), Tailwind classes auto-sorted. Run `npm run format`.
- TypeScript strict; no `any` (use `unknown` + narrowing or precise types). Prefer `as const` objects over enums.
- Import through the `@/` alias. Files are kebab-case; components are PascalCase named exports.
- Comments explain *why*, not what. Keep functions small and pure where possible.

## UX, accessibility and performance

- No Generate button: every control applies live. One click to copy anything, with visible confirmation.
- WCAG 2.1 AA for the app: every input has a label, focus is visible, everything is keyboard operable, text contrast is at least 4.5:1.
- Input-to-preview update under 50 ms; color-picker drag at 60 fps. Derive tokens with `useMemo` from settings, and update the preview by changing CSS variables rather than re-rendering every component with new props.
- Layout: two columns (controls left, preview right) from 1024px; below that, columns stack and the controls sit in a collapsible panel. Usable from 360px.
