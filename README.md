# Three-Tier Token Architecture

A React + Vite demo exploring a scalable CSS design token system built on **Tailwind 4**, **oklch perceptual color**, and **fluid type/spacing**. It demonstrates class-based dark mode and multi-brand theming entirely in CSS — no CSS-in-JS, no runtime color calculations.

## Core Concept

Design tokens are organized into three tiers, each with a distinct responsibility:

```
Tier 1: Primitives  →  Tier 2: Semantic tokens  →  Tier 3: Tailwind utilities
raw oklch values        purpose-named vars            generated from @theme inline
never in HTML           override for dark/brand        live var() references
```

### Tier 1 — Primitives (`src/styles/tokens/primitives.css`)

Raw `oklch` values. Never referenced in HTML markup. Two driver variables — `--brand-hue` and `--brand-chroma` — power the entire brand scale perceptually:

```css
--brand-60: oklch(0.60 var(--brand-chroma) var(--brand-hue));
--neutral-95: oklch(0.96 0.003 var(--brand-hue));
```

Changing `--brand-hue` shifts every brand-derived color simultaneously while maintaining consistent perceptual lightness and contrast.

### Tier 2 — Semantic tokens (`src/styles/tokens/semantic.css`)

Purpose-named tokens that map primitives to roles. Dark mode and brand theming only touch this layer — HTML never changes:

```css
:root {
  --color-canvas:      var(--neutral-98);
  --color-interactive: var(--brand-60);
}
```

The `@theme inline` self-reference pattern bridges Tier 2 to Tailwind utilities:

```css
@theme inline {
  --color-canvas:      var(--color-canvas);      /* generates bg-color-canvas */
  --color-interactive: var(--color-interactive); /* generates bg-interactive  */
}
```

This generates utilities that emit `var(--color-canvas)` rather than baking the resolved value. Without `inline`, Tailwind would bake the primitive at build time and dark mode overrides would have no effect on utility classes.

### Tier 3 — Tailwind utilities

Generated automatically from the `@theme inline` block. Because the utilities reference CSS vars rather than static values, they stay live at runtime:

```
.bg-interactive { background: var(--color-interactive) }
                                        ↓ resolves at runtime
                      oklch(0.60 var(--brand-chroma) var(--brand-hue))
                                        ↓
                          oklch(0.60 0.26 25)  ← red brand, light mode
                          oklch(0.70 0.26 25)  ← red brand, dark mode
```

## Dark Mode

Implemented with a single class on `<html>` — no media query in CSS:

```css
:root.dark {
  --color-canvas:      var(--neutral-05);
  --color-interactive: var(--brand-70);
}
```

`:root.dark` has specificity `(0,2,0)` vs `:root` at `(0,1,0)`, so dark overrides reliably win without cascade hacks. Class-only theming (rather than relying on `prefers-color-scheme`) means the demo toggle works regardless of OS setting:

```js
useEffect(() => {
  document.documentElement.classList.toggle('dark', darkMode)
}, [darkMode])
```

## Multi-Brand Theming

Each brand defines named hue/chroma primitives in `:root`, which the `[data-brand]` rules then assign to the driver vars:

```css
:root {
  --emerald-hue: 160;  --emerald-chroma: 0.18;
}

[data-brand="emerald"] {
  --brand-hue: var(--emerald-hue);
  --brand-chroma: var(--emerald-chroma);
}
```

Setting `data-brand` on `<html>` cascades through every element. Named vars also allow direct color previews without needing a scoped `data-brand` attribute:

```jsx
// Preview any brand's color without data-brand scope:
style={{ background: `oklch(0.60 var(--${brand}-chroma) var(--${brand}-hue))` }}
```

## Fluid Type & Spacing

All type and spacing tokens use `clamp()` — they scale smoothly between viewport widths with no breakpoints:

```css
--text-3xl:     clamp(1.875rem, 1.5rem  + 1.875vw, 2.5rem);
--spacing-xl:   clamp(1.5rem,   1rem    + 2.5vw,   3rem);
```

## File Structure

```
src/
├── index.css                      Entry point; imports all layers in order
├── App.jsx                        Demo UI; brand/dark state on <html>
└── styles/
    ├── tokens/
    │   ├── primitives.css         Tier 1: raw oklch values
    │   └── semantic.css           Tier 2: purpose tokens + @theme inline bridge
    ├── themes/
    │   ├── dark.css               :root.dark overrides
    │   └── brands.css             Named hue/chroma vars + [data-brand] rules
    └── components.css             @layer components, @utility, @variant
```

## Getting Started

```bash
npm install
npm run dev
```

Requires Node 18+. Uses Tailwind 4 via the `@tailwindcss/vite` plugin — no `tailwind.config.js` needed.

## Stack

| Tool | Version | Role |
|---|---|---|
| React | 19 | UI |
| Vite | 8 | Dev server + build |
| Tailwind CSS | 4 | Utility generation via `@theme inline` |
| `@tailwindcss/vite` | 4 | Zero-config Tailwind integration |
