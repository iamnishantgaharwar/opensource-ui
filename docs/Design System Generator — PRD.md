# Design System Generator — PRD

Oct 9, 2026 · @Nishant Gaharwar

## Overview

Design System Generator turns one brand color and one typography preference into a ready-to-use design foundation: an 11-step color scale, a type scale, a live component preview and exportable tokens (CSS, Tailwind, JSON).

**Problem.** Teams starting a product or design system today stitch together separate tools: one for color shades (e.g. UI Colors), another for type scales (e.g. Type Scale). Neither shows how the two work together in real UI, and each exports in its own format. The result is copy-paste work, inconsistent tokens and decisions made without seeing them in context.

**Vision.** “Give me a brand color and a typography preference, and I’ll give you the foundation of a complete design system.” The product is a lightweight design-system builder, not two generators side by side. Every generator is an independent token module, so spacing, radius, shadows and more can be added later without reworking the core. The product is free and open source.

## Goals, non-goals and success metrics

**Goals**

1. Generate perceptually even color scales (50–950) for primary, secondary, accent, tertiary and neutral palettes, mapped to shadcn-compatible light and dark roles.
2. Generate a configurable type scale from a base size and ratio, in px or rem.
3. Show both systems together in a live, realistic UI preview that updates instantly.
4. Export the result as copy-ready tokens in CSS, Tailwind and JSON.
5. Build each generator as an independent token module so new modules plug in later.

**Non-goals (v1)**

- User accounts, saved projects or team collaboration
- Figma plugin or direct sync to design tools
- Full component library code generation

**Success metrics** (targets are proposals, to be confirmed)

| Metric | Target | How measured |
| --- | --- | --- |
| Time from landing to first export | Under 2 minutes median | Analytics event timing |
| Sessions that copy or export tokens | 40% or more | Copy/export events per session |
| Preview update latency after an input change | Under 50 ms | Performance instrumentation |
| Return visitors within 30 days | 20% or more | Analytics |
| Color contrast issues caught before export | Warning shown for every failing pair | QA checklist |

## Target users

The primary user is a frontend developer who needs production-ready tokens fast; designers and design-system teams are close secondary users.

| Persona | Context | Main need | What success looks like |
| --- | --- | --- | --- |
| Frontend developer | Starting a new app or adding theming to an existing one | Tokens in the format their stack uses (CSS variables, Tailwind) | Pastes the export into the project and it works first time |
| Product / UI designer | Defining a brand foundation for a new product | See color and type working together in real UI before committing | Shares a preview and token set with developers |
| Design-system team | Maintaining tokens across products | Consistent, structured JSON tokens and a repeatable method | Uses the generator as the starting point for each new theme |
| Founder / indie maker | No dedicated designer | A credible-looking system from one brand color | Ships a consistent UI without design expertise |

## User stories and core flow

The core flow takes a user from one color to exported tokens with no Generate button and no page changes.

1. User lands on the app; a sensible default (e.g. #77D3EC, 16px, Major Third) is already rendered so the preview is never empty.
2. User picks or types a brand color; the palette and every preview component update instantly.
3. User sets base font size, ratio, font family and unit; type scale and preview update instantly.
4. User reviews the combined preview (headings, buttons, cards, forms, tables, dashboard).
5. User copies a single value, the whole palette, or a full token file in CSS, Tailwind or JSON.

**User stories**

| ID | As a… | I want to… | So that… | Priority |
| --- | --- | --- | --- | --- |
| US-1 | developer | enter a HEX value and get 11 shades | I have a full scale without hand-tuning | Must |
| US-2 | designer | drag a color picker and see the UI change live | I can judge a color in context | Must |
| US-3 | developer | choose a type ratio preset or enter a custom one | my headings follow a consistent scale | Must |
| US-4 | developer | switch output between px and rem | tokens match my codebase conventions | Must |
| US-5 | designer | see colors and type together in realistic components | I can approve the system before handoff | Must |
| US-6 | developer | copy the tokens as CSS variables, Tailwind config or JSON | I can paste them straight into my project | Must |
| US-7 | any user | copy one shade with a click | I can grab a single value quickly | Must |
| US-8 | any user | reset to defaults | I can start over without reloading | Should |
| US-9 | any user | toggle the app between light and dark mode | I can work in my preferred theme | Should |
| US-10 | any user | share a link that restores my settings | a teammate sees the same system | Should |
| US-11 | designer | see contrast warnings on text and button pairs | the system is accessible from the start | Should |

## Functional requirements

Five feature areas make up v1: color generator, type scale generator, combined preview, token export and app shell.

### 1. Color generator

The color module turns brand colors into **palettes** (50–950 scales) and maps them to **roles** (what each color is for) in light and dark mode. Role names match shadcn/ui theme variables exactly, so a shadcn user can paste the export over their existing theme file.

**Palettes**

| Palette | Input | Purpose |
| --- | --- | --- |
| Primary | Required brand color (default #77D3EC) | Main actions, links, focus rings, selected states |
| Secondary | Optional; picked by the user or auto-suggested | Supporting brand color |
| Accent | Optional; picked by the user or auto-suggested | Sparing highlights: badges, promos, key numbers |
| Tertiary | Optional; picked by the user or auto-suggested | Third brand hue |
| Neutral | Preset: Tinted from primary (default), Neutral, Zinc, Slate, Gray, Stone | Backgrounds, text, borders: 80–90% of the UI |
| Semantic | Success, warning, info and destructive inputs (Tailwind green/amber/blue/red by default) | Alerts, badges, validation; `destructive` is a shadcn role, the others are extra roles |

Each optional brand color has an **Auto-suggest** checkbox (off by default). When it is off and no color is picked, the slot shows an empty "Pick a color" state and its roles fall back to neutral, which is shadcn's default behavior. When it is on, the color is derived from primary by a harmony rule (analogous, complementary, split-complementary, triadic, square) that rotates hue in OKLCH while keeping lightness and chroma.

**Roles (shadcn-compatible)**

| Role variables | Light | Dark |
| --- | --- | --- |
| `background` / `foreground` | white / neutral-950 | neutral-950 / neutral-50 |
| `card`, `popover` (+ `-foreground`) | white / neutral-950 | neutral-900 / neutral-50 |
| `primary` / `primary-foreground` | the input color / white or near-black by contrast | input, or the nearest step readable on dark / by contrast |
| `secondary`, `accent` (+ `-foreground`) | tint: palette-100 / palette-900 (neutral when empty) | palette-900 / palette-100 |
| `muted` / `muted-foreground` | neutral-100 / neutral-500 | neutral-800 / neutral-400 |
| `destructive` | red-600 | red-400 |
| `border`, `input`, `ring` | neutral-200, neutral-200, primary | white 10%, white 15%, primary |
| `chart-1` … `chart-5` | brand palettes, then hues spread around the wheel | same, lighter steps |
| `sidebar-*` | derived from the roles above | derived from the roles above |

shadcn's `secondary` and `accent` are subtle fills (secondary button, menu hover), so by default they are *tinted* with the user's colors. A **Solid** option maps them to the brand colors themselves. Strong uses read the full scales (`--secondary-500` etc.).

**Extra roles** (not in shadcn; exported in a separate, clearly marked block): `tertiary` / `tertiary-foreground`, `subtle-foreground`, `border-strong`, `inverse` / `inverse-foreground`, `overlay`, `selection` / `selection-foreground`, `link` / `link-visited`, `skeleton`.

**Requirements**

| ID | Requirement | Priority |
| --- | --- | --- |
| C-1 | Color picker with drag selection (hue, saturation, lightness) for every brand color | Must |
| C-2 | HEX input with validation; accepts 3- and 6-digit values, with or without # | Must |
| C-3 | Show RGB, HSL and OKLCH for each input and each shade; RGB/HSL also editable as input | Must |
| C-4 | Generate 11 shades (50–950) for primary, secondary, accent, tertiary, neutral and destructive | Must |
| C-5 | The input color is kept exactly; by default it sits at 500, or at the step nearest its lightness (setting) | Must |
| C-6 | Light-to-dark swatch row per palette with each shade’s step, HEX and text-contrast label | Must |
| C-7 | Click a swatch to copy its value; copy a whole palette in one action | Must |
| C-8 | Show WCAG contrast of each shade against white and black (AA / AAA badges) | Should |
| C-9 | Auto-suggest checkbox per optional brand color, with a harmony selector; empty state when off | Must |
| C-10 | Neutral preset selector (Tinted, Neutral, Zinc, Slate, Gray, Stone) | Must |
| C-11 | Role mapping for light and dark mode using shadcn variable names, plus extra roles | Must |
| C-12 | Secondary/accent role style: Subtle (default) or Solid | Should |
| C-13 | Chart palette (`chart-1`…`chart-5`) generated from the brand palettes | Must |
| C-14 | Optional fine controls: hue shift across the scale, saturation curve | Could |

**Generation method.** Shades are interpolated in a perceptual color space (OKLCH) so lightness steps look even and hues do not drift muddy or grey. Lightness targets per step are fixed (lightest at 50, darkest at 950); chroma tapers at the extremes to stay inside the sRGB gamut. Out-of-gamut values are clamped, and the same input always gives the same output. Neutral scales use shadcn's neutral lightness steps with a small, preset-specific chroma, so the Neutral preset reproduces shadcn's default grays exactly.

### 2. Type scale generator

| ID | Requirement | Priority |
| --- | --- | --- |
| T-1 | Base font size input (default 16px; range 10–24px) | Must |
| T-2 | Ratio presets: Minor Second 1.067, Major Second 1.125, Minor Third 1.2, Major Third 1.25, Perfect Fourth 1.333, Augmented Fourth 1.414, Perfect Fifth 1.5, Golden Ratio 1.618 | Must |
| T-3 | Custom ratio input (range 1.01–2.0, two decimals) | Must |
| T-4 | Generate 11 roles: Display, H1–H6, Body Large, Body, Body Small, Caption | Must |
| T-5 | Unit toggle: px or rem (rem relative to a 16px root, configurable) | Must |
| T-6 | Font family selector: system stacks plus a curated set of Google Fonts (e.g. Inter, Roboto, Source Serif), loaded on demand from Google Fonts | Must |
| T-7 | Each role shows its size, a live sample line and a copy button | Must |
| T-8 | Rounding option: none, 0.5px or whole px | Should |
| T-9 | Default line height and letter spacing per role (tighter for headings) | Should |
| T-10 | Separate heading and body font families; font weight per role | Could |

**Scale mapping.** Each role is a step on the scale: size = base × ratio^step. Example at 16px and Major Third (1.25), rounded to whole px:

| Role | Step | Size (px) | Size (rem) |
| --- | --- | --- | --- |
| Display | +7 | 76 | 4.75 |
| H1 | +6 | 61 | 3.81 |
| H2 | +5 | 49 | 3.05 |
| H3 | +4 | 39 | 2.44 |
| H4 | +3 | 31 | 1.95 |
| H5 | +2 | 25 | 1.56 |
| H6 | +1 | 20 | 1.25 |
| Body Large | +0.5 | 18 | 1.12 |
| Body | 0 | 16 | 1 |
| Body Small | −1 | 13 | 0.8 |
| Caption | −2 | 10 | 0.64 |

Caption at 10px falls below a comfortable minimum, so the app warns when any role drops under 12px.

### 3. Combined live preview

| ID | Requirement | Priority |
| --- | --- | --- |
| P-1 | Preview updates on every input change with no Generate button | Must |
| P-2 | Components: navigation bar, page heading, subheading, body text, links, buttons (primary, secondary, ghost, disabled), inputs, badges, alerts, cards, table, sample dashboard section | Must |
| P-3 | All components read colors and sizes only from the generated tokens (no hard-coded values) | Must |
| P-4 | Palette and type scale panels shown alongside the component examples | Must |
| P-5 | Preview can be switched between a light and dark surface | Should |
| P-6 | Hover on a component shows which tokens it uses | Could |

### 4. Token export

| ID | Requirement | Priority |
| --- | --- | --- |
| E-1 | CSS output in shadcn theme format: `:root` and `.dark` blocks with shadcn role variables (OKLCH), palette scales (`--primary-500` etc.) and `--font-size-*` variables | Must |
| E-2 | Tailwind output: v4 `@theme inline` block mapping roles and scales to `--color-*`, and a v3 config object with `colors` and `fontSize` entries | Must |
| E-3 | JSON output: structured tokens with `colors` and `typography` groups | Must |
| E-4 | Copy button per format with confirmation feedback | Must |
| E-5 | Syntax-highlighted code view with tabs per format | Must |
| E-6 | Download each format as a file | Should |
| E-7 | JSON option following the W3C Design Tokens format (`$value`, `$type`) | Could |

### 5. App shell and layout

| ID | Requirement | Priority |
| --- | --- | --- |
| L-1 | Header with product name and section nav: Color, Typography, Preview, Export | Must |
| L-2 | Two-column layout: controls on the left, live preview on the right | Must |
| L-3 | Reset all settings to defaults | Must |
| L-4 | Settings persist locally between visits | Should |
| L-5 | Settings encoded in the URL for sharing | Should |
| L-6 | Light and dark mode for the app itself | Should |
| L-7 | Below 1024px wide, columns stack with controls in a collapsible panel | Must |

## Non-functional requirements and design direction

The tool must feel instant and calm: every change reflects in under 50 ms, and the generated system, not the chrome, is the visual focus.

**Non-functional requirements**

| Area | Requirement |
| --- | --- |
| Performance | Input-to-preview update under 50 ms; color picker drag at 60 fps; initial load under 2 s on a mid-range laptop over 4G |
| Client-side | All generation runs in the browser; no backend needed for v1 |
| Accessibility | App UI meets WCAG 2.1 AA: keyboard operable, visible focus, labelled controls, 4.5:1 text contrast |
| Browser support | Last two versions of Chrome, Edge, Firefox and Safari |
| Responsiveness | Usable from 360px (stacked) to 1920px+ (two-column) |
| Determinism | Same inputs always produce identical tokens, so shared links reproduce exactly |
| Privacy | No sign-in; only anonymous usage analytics |

**UX principles**

- No Generate button: every control applies live.
- Defaults first: the app opens on a complete, good-looking system.
- One click to copy anything, with clear confirmation.
- Minimal UI: no settings that most users will never touch on the main surface; advanced options sit behind an expander.

**Visual direction**

- A professional developer/design-tool feel with its own identity, inspired by but not copying UI Colors and Type Scale.
- Neutral app chrome so the user’s brand color is the only strong color on screen.
- Clean spacing system, clear hierarchy, minimal borders, subtle background layers, strong typography.
- Interactive controls (sliders, segmented toggles, swatches) over plain form fields where possible.
- Light and dark mode for the app shell.

## Technical architecture

Each generator is an independent token module: it takes its own settings and returns a slice of one shared token tree, which both the preview and every exporter read.

&#91;embedded content: architecture · settings → modules → token tree → preview and export\]

Adding spacing or shadows later means writing one new module and registering it; the preview, export formats and settings store need no changes.

**Module contract** (illustrative)

```ts
interface TokenModule<Settings> {
  id: string;                    // "color", "typography", "spacing"
  label: string;                 // shown in nav and controls
  defaults: Settings;
  Controls: Component<Settings>; // left-panel UI
  generate(s: Settings): TokenGroup; // pure, deterministic
}
```

**Key decisions**

- `generate` is a pure function, so output is testable and shareable links reproduce exactly.
- Exporters walk the token tree generically; a new module’s tokens appear in CSS, Tailwind and JSON automatically.
- The preview consumes tokens only as CSS custom properties, so updates are a single style recalculation, not a re-render of every component.
- Settings live in one client-side store, mirrored to the URL and local storage.

**Suggested stack** (to confirm): React + TypeScript, Vite, a small state library, culori for OKLCH color math, Shiki or Prism for code highlighting, static hosting (no backend in v1).

## Release plan, future modules, risks and open questions

v1 ships the two core modules, the preview and export; every later release adds one token module at a time.

**Release phases**

1. **MVP** — color module, type module, combined preview, CSS/Tailwind/JSON export, reset, responsive layout.
2. **v1.1** — shareable URLs, local persistence, contrast warnings, file download, app dark mode.
3. **v1.2** — a generated dark-mode palette and other color refinements (semantic colors moved into v1).
4. **v2** — spacing, border radius, shadows, breakpoints and other modules from the list below.

**Future modules** (each an independent token module)

- Spacing scale · Border radius scale · Shadows / elevation · Breakpoints · Z-index scale
- Grid system · Icon sizing · Motion / animation tokens
- Semantic colors · Dark mode palette · Component tokens

**Risks**

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Generated shades look uneven or muddy for some hues (yellows, very dark inputs) | Users distrust the output | Perceptual (OKLCH) interpolation, gamut clamping, a test set of 50+ brand colors reviewed by a designer |
| Very light or dark input colors don’t fit naturally at step 500 | Odd-looking scale | Auto-place input at the nearest lightness step, with a manual override |
| Tailwind config format changes (v3 vs v4) | Exports break in user projects | Support both formats; version the export templates |
| Too close to UI Colors / Type Scale | Weak differentiation | Lead with the combined preview and unified export, own visual identity |
| Module architecture adds overhead for v1 | Slower MVP | Keep the module interface small; build color and type as the first two implementations |

**Open questions**

- [ ] Should the input color always be 500, or auto-placed by lightness by default?
- [ ] Decided: fonts are loaded from Google Fonts (final curated list still to pick).
- [ ] Tailwind v3 config, v4 `@theme`, or both at launch?
- [ ] Decided: free and open source (license still to pick, e.g. MIT).
- [ ] Which analytics tool, and what events count as “export”?
- [ ] Should typography tokens include line height and letter spacing in v1, or only font sizes?
