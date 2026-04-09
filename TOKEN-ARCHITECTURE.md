# Three-Tier Token Architecture

A reference for what belongs in each tier and why.

---

## Core Principle

Every value in the system lives at exactly one tier. Higher tiers reference lower tiers — they never introduce raw values of their own. The further up the stack, the more *meaning* and the less *specifics*.

```
Tier 1 (Primitives) → Tier 2 (Semantic) → Tier 3 (Utilities / Components)
    raw values            named intent            usage in HTML/JSX
```

---

## Tier 1 — Primitives

**What belongs here:** Raw perceptual values and scale definitions. Nothing more.

- Color values: `oklch(0.60 0.26 25)`
- A complete, named scale: `--brand-10` through `--brand-95`
- Radius steps: `--radius-sm`, `--radius-lg`
- The brand drivers (`--brand-hue`, `--brand-chroma`) that the whole palette derives from

**What does NOT belong here:** Anything with semantic meaning. `--brand-60` is fine. `--color-interactive` is not — that's Tier 2.

**Rule:** If you find yourself reaching for a Tier 1 token in a component or in HTML, stop. You're skipping a tier.

```css
/* Tier 1 — primitives.css */
:root {
  --brand-hue:    25;
  --brand-chroma: 0.26;

  --brand-60: oklch(0.60 var(--brand-chroma) var(--brand-hue));
  --brand-85: oklch(0.85 calc(var(--brand-chroma) * 0.5) var(--brand-hue));

  --neutral-10:  oklch(0.18 0.010 var(--brand-hue));
  --neutral-100: oklch(1 0 0);

  --radius-sm: 0.375rem;
  --radius-lg: 0.75rem;
}
```

---

## Tier 2 — Semantic Tokens

**What belongs here:** Named intent that maps a primitive to a purpose.

- `--color-interactive` → points to `--brand-60`
- `--color-surface-raised` → points to `--neutral-100`
- `--shadow-sm` → a specific shadow value for this elevation level
- `--text-base`, `--spacing-lg` → fluid clamp() values for the type/spacing scale

Semantic tokens are what your components and utilities consume. They answer the question *"what is this color for?"* rather than *"what is this color?"*

**The two-step pattern** is required for any token that changes at runtime (colors, shadows). It prevents Tailwind from baking the resolved value at build time, which would break dark mode and brand switching:

```css
/* Step 1 — establish the runtime mapping in :root */
:root {
  --color-interactive: var(--brand-60);
  --shadow-sm: 0 1px 2px oklch(0 0 0 / 0.06);
}

/* Step 2 — tell Tailwind to generate a utility that reads the var at runtime */
@theme inline {
  --color-interactive: var(--color-interactive);
  --shadow-sm: var(--shadow-sm);
}
```

Without Step 1, dark mode overrides in `:root.dark` have nothing to override — the value only exists inside `@theme`.

Without Step 2, Tailwind generates `background-color: oklch(0.60 0.26 25)` at build time instead of `background-color: var(--color-interactive)`, so dark mode changes are ignored.

**Static tokens** (radius, type scale, spacing) technically only need Step 2 since they never change at runtime. They're included in `@theme inline` for consistency and to generate Tailwind utilities.

**Theme overrides** live in separate files that only reassign Tier 2 tokens:

```css
/* dark.css */
:root.dark {
  --color-interactive: var(--brand-70);   /* lighter for dark bg contrast */
  --shadow-sm: 0 2px 6px oklch(0 0 0 / 0.60); /* higher opacity for visibility */
}
```

Dark mode never touches primitives. It only remaps which primitive a semantic token points to.

---

## Tier 3 — Utilities and Component Classes

**What belongs here:** The translation from semantic tokens into CSS rules that components and markup actually use.

There are two forms:

### `@utility` — Single-purpose, composable

Used for design-state patterns that aren't expressible in Tailwind's built-in utilities:

```css
@utility focus-ring {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
  border-radius: inherit;
}

@utility surface-raised {
  background: var(--color-surface-raised);
  box-shadow: var(--shadow-md);
}
```

These generate utility classes (`focus-ring`, `surface-raised`) that behave exactly like Tailwind's built-ins — they can be overridden by other utilities in the markup.

### `@layer components` — Multi-property component defaults

Used when a component has a stable combination of styles that always travel together:

```css
@layer components {
  .card {
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    background: var(--color-surface-raised);
    box-shadow: var(--shadow-sm);
    padding: var(--spacing-lg);
  }
}
```

Component classes are lower specificity than utilities, so a `className="card rounded-xl"` on a component correctly overrides just the radius.

**Per-component CSS files:** Each component that introduces a `@layer components` class gets its own CSS file, colocated with the component and self-imported. Components that only use utilities or compose other components do not need a CSS file.

```
src/components/
  Button/
    Button.jsx     ← imports './Button.css'
    Button.css     ← @layer components { .btn-primary { ... } }
  Card/
    Card.jsx
    Card.css
  TierCard/
    TierCard.jsx   ← no CSS file — uses Card + Badge + Tailwind utilities only
```

---

## Quick Decision Guide

| You have...                              | It belongs in...    |
|------------------------------------------|---------------------|
| A raw color value (`oklch(...)`)         | Tier 1 primitives   |
| A brand scale step (`--brand-60`)        | Tier 1 primitives   |
| A named purpose (`--color-interactive`)  | Tier 2 semantic     |
| A shadow or elevation definition         | Tier 2 semantic     |
| Fluid type or spacing (`clamp(...)`)     | Tier 2 semantic     |
| A design-state pattern (focus ring)      | Tier 3 `@utility`   |
| A stable multi-property component style  | Tier 3 `@layer components` |
| One-off layout or spacing in markup      | Tailwind utilities in JSX |

---

## The One Rule

> **Never let a tier skip a level.** Components reference semantic tokens. Semantic tokens reference primitives. Primitives are defined once and never reference anything above them.

If a component reaches for `--brand-60` directly, the next designer who changes the brand hue will get a surprise — the component won't follow. If a semantic token introduces a raw oklch value, dark mode overrides won't have a clean hook to swap it. Every shortcut breaks exactly one of those guarantees.
