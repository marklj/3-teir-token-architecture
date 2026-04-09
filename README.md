# Three-Tier Token Architecture

A React + Vite demo of a scalable CSS design token system built on **Tailwind 4**, **oklch perceptual color**, and **fluid type/spacing**. Demonstrates class-based dark mode and multi-brand theming entirely in CSS — no CSS-in-JS, no runtime color calculations.

## Core Concept

Design tokens are organized into three tiers, each with a distinct responsibility:

```
Tier 1: Primitives  →  Tier 2: Semantic tokens  →  Tier 3: Tailwind utilities
raw values              purpose-named vars            generated from @theme inline
never in HTML           override for dark/brand        live var() references
```

### Tier 1 — Primitives (`src/styles/tokens/primitives.css`)

Raw values. Never referenced in HTML markup. Includes:

- **Brand scale** — `--brand-10` through `--brand-95`, derived from two driver vars:
  ```css
  --brand-hue: 25;
  --brand-chroma: 0.26;
  --brand-60: oklch(0.60 var(--brand-chroma) var(--brand-hue));
  ```
  Changing `--brand-hue` shifts the entire brand palette perceptually and uniformly.

- **Neutral scale** — `--neutral-03` through `--neutral-98`, low-chroma and brand-hue tinted for harmony.

- **Named brand primitives** — `--red-hue`, `--emerald-hue`, etc. let you reference a specific brand's color directly without a `[data-brand]` scope:
  ```css
  oklch(0.60 var(--emerald-chroma) var(--emerald-hue))
  ```

- **Status primitives** — fixed-hue greens, ambers, reds independent of the brand scale.

- **Shadow scale** — `--shadow-sm`, `--shadow-md`, `--shadow-lg`.

- **Border radius scale** — `--radius-sm` through `--radius-full`.

- **Fluid type scale** — `--text-xs` through `--text-5xl` using `clamp()`.

- **Fluid spacing scale** — `--spacing-xs` through `--spacing-section` using `clamp()`.

### Tier 2 — Semantic tokens (`src/styles/tokens/semantic.css`)

Purpose-named tokens that map primitives to roles. Dark mode and brand theming only reassign values here — HTML never changes.

The **two-step `@theme inline` pattern** bridges Tier 2 to Tailwind utilities:

```css
/* Step 1 — define in :root so dark mode and brand scopes can override */
:root {
  --color-interactive: var(--brand-60);
}

/* Step 2 — self-reference in @theme inline so Tailwind generates a
   utility that reads the var at runtime, not baked at build time */
@theme inline {
  --color-interactive: var(--color-interactive);
}
```

This generates `.bg-interactive { background: var(--color-interactive) }` — a live reference that responds to dark mode and brand overrides.

> Collapsing this to a single `@theme inline` block bakes the primitive value into the utility at build time, breaking dark mode.

Type and spacing tokens also appear in `@theme inline` for utility generation, but they could use plain `@theme` — they never get reassigned at runtime.

### Tier 3 — Tailwind utilities + component classes

**Utilities** are generated from the `@theme inline` bridge. Because they reference CSS vars rather than static values, they stay live at runtime:

```
.bg-interactive { background: var(--color-interactive) }
                                       ↓ resolves at runtime
                     oklch(0.60 var(--brand-chroma) var(--brand-hue))
                                       ↓
                         oklch(0.60 0.26 25)  ← red brand, light mode
                         oklch(0.70 0.26 25)  ← red brand, dark mode
```

**Component classes** (`.card`, `.btn-primary`, `.btn-ghost`, `.badge`) are defined in `@layer components` — one CSS file per component, colocated and self-imported. Because they're in a named layer, utility classes in markup always override them.

## Dark Mode

Class-based only — no `prefers-color-scheme` media query in CSS. This ensures the demo toggle works regardless of OS setting:

```css
:root.dark {
  --color-canvas:      var(--neutral-05);
  --color-interactive: var(--brand-70);
}
```

`:root.dark` has specificity `(0,2,0)` vs `:root` at `(0,1,0)`, so dark overrides reliably win. The toggle sets the class via `useEffect`:

```js
document.documentElement.classList.toggle('dark', darkMode)
```

## Multi-Brand Theming

Each brand has named hue/chroma primitives in `primitives.css`. The `[data-brand]` rules in `brands.css` assign them to the driver vars when a brand scope is active:

```css
/* primitives.css */
--emerald-hue: 160;  --emerald-chroma: 0.18;

/* brands.css */
[data-brand="emerald"] {
  --brand-hue: var(--emerald-hue);
  --brand-chroma: var(--emerald-chroma);
}
```

Setting `data-brand` on `<html>` cascades through every element. Because `--brand-hue` and `--brand-chroma` drive the entire brand scale via `calc()` and `oklch()`, the whole palette shifts with two variable changes.

## Fluid Type & Spacing

All type and spacing tokens use `clamp()` — they scale smoothly between viewport widths with no breakpoints:

```css
--text-3xl:     clamp(1.875rem, 1.5rem  + 1.875vw, 2.5rem);
--spacing-xl:   clamp(1.5rem,   1rem    + 2.5vw,   3rem);
```

## File Structure

```
src/
├── index.css                        Entry point; imports token layers and utilities
├── App.jsx                          Demo UI; brand/dark state managed on <html>
├── styles/
│   ├── tokens/
│   │   ├── primitives.css           Tier 1: raw values (color, radius, shadow, type, spacing)
│   │   └── semantic.css             Tier 2: purpose tokens + @theme inline bridge
│   ├── themes/
│   │   ├── dark.css                 :root.dark overrides
│   │   └── brands.css               [data-brand] rules
│   └── utilities.css                @variant and @utility definitions
└── components/
    ├── Button/
    │   ├── Button.css               @layer components { .btn-primary, .btn-ghost }
    │   └── Button.jsx               imports ./Button.css
    ├── Badge/
    │   ├── Badge.css                @layer components { .badge }
    │   └── Badge.jsx                imports ./Badge.css
    ├── Card/
    │   ├── Card.css                 @layer components { .card }
    │   └── Card.jsx                 imports ./Card.css, supports `as` prop
    ├── TierCard/
    │   └── TierCard.jsx             composes <Card> and <Badge> — no new CSS class
    ├── Section/
    │   └── Section.jsx              utility classes only — no CSS file
    └── TokenLabel/
        └── TokenLabel.jsx           composes <Badge> — no CSS file
```

A CSS file exists alongside a component only when that component introduces a new `@layer components` class. Components that compose existing classes don't need one. Adding a new component never requires touching `index.css`.

## Getting Started

```bash
npm install
npm run dev
```

Requires Node 18+. Uses Tailwind 4 via `@tailwindcss/vite` — no `tailwind.config.js` needed.

## Stack

| Tool | Version | Role |
|---|---|---|
| React | 19 | UI |
| Vite | 8 | Dev server + build |
| Tailwind CSS | 4 | Utility generation via `@theme inline` |
| `@tailwindcss/vite` | 4 | Zero-config Tailwind integration |
