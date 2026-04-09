import { useState, useEffect } from 'react'
import { Button }     from './components/Button/Button'
import { Badge }      from './components/Badge/Badge'
import { Card }       from './components/Card/Card'
import { TierCard }   from './components/TierCard/TierCard'
import { Section }    from './components/Section/Section'
import { TokenLabel } from './components/TokenLabel/TokenLabel'

const BRANDS = ['red', 'emerald', 'rose', 'amber']

export default function App() {
  const [brand, setBrand] = useState('red')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-brand', brand)
    document.documentElement.classList.toggle('dark', darkMode)
  }, [brand, darkMode])

  return (
    <div style={{ minHeight: '100dvh' }}>
      {/* ── Top bar ── */}
      <header
        className="sticky top-0 z-10 backdrop-blur-sm border-b border-border"
        style={{
          background: 'color-mix(in oklch, var(--color-surface-raised) 90%, transparent)',
        }}
      >
        <div
          className="max-w-4xl mx-auto flex items-center justify-between"
          style={{ padding: 'var(--spacing-sm) var(--spacing-lg)' }}
        >
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl text-text">Token Demo</span>
            <Badge className="bg-interactive-subtle text-interactive">Tailwind 4</Badge>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <div className="flex gap-1">
              {BRANDS.map(b => (
                <Button
                  key={b}
                  variant={brand === b ? 'primary' : 'ghost'}
                  className="text-xs"
                  style={{ padding: '0.25em 0.75em' }}
                  onClick={() => setBrand(b)}
                >
                  {b}
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              className="text-xs"
              style={{ padding: '0.25em 0.75em' }}
              onClick={() => setDarkMode(d => !d)}
            >
              {darkMode ? '☀ Light' : '☾ Dark'}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto" style={{ padding: '0 var(--spacing-lg)' }}>

        {/* ── Hero ── */}
        <section className="text-center" style={{ padding: 'var(--spacing-section) 0' }}>
          <Badge
            className="bg-interactive-subtle text-interactive"
            style={{ marginBottom: 'var(--spacing-md)', display: 'inline-flex' }}
          >
            Three-Tier Token Architecture
          </Badge>
          <h1
            className="font-extrabold leading-tight text-5xl text-text"
            style={{ margin: '0 0 var(--spacing-md)' }}
          >
            Perceptual color.<br />
            <span className="text-interactive">Zero JavaScript.</span>
          </h1>
          <p
            className="w-full text-lg text-text-muted"
            style={{ marginBottom: 'var(--spacing-xl)' }}
          >
            oklch primitives → semantic tokens → Tailwind utilities.
            Dark mode and multi-brand theming via pure CSS.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button>Primary action</Button>
            <Button variant="ghost">Ghost action</Button>
          </div>
        </section>

        <hr className="border-border" />

        {/* ── Tier 1: Primitives ── */}
        <Section
          title="Tier 1 — Primitives"
          subtitle="Raw oklch values. Never referenced in HTML. Change --brand-hue and the whole palette shifts perceptually."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <h3
                className="font-semibold uppercase tracking-wide text-xs text-text-muted"
                style={{ marginBottom: 'var(--spacing-md)' }}
              >
                Brand scale (derived from hue driver)
              </h3>
              <div className="grid grid-cols-7 gap-1">
                {[10, 30, 50, 60, 70, 85, 95].map(n => (
                  <div key={n} className="text-center">
                    <div className="h-10 rounded" style={{ background: `var(--brand-${n})` }} />
                    <span className="text-xs text-text-muted">{n}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <code className="text-xs text-text-muted">
                  --brand-60: oklch(0.60 var(--brand-chroma) var(--brand-hue))
                </code>
              </div>
            </Card>

            <Card>
              <h3
                className="font-semibold uppercase tracking-wide text-xs text-text-muted"
                style={{ marginBottom: 'var(--spacing-md)' }}
              >
                Neutral scale (tinted to brand hue)
              </h3>
              <div className="grid grid-cols-8 gap-1">
                {['05', 10, 20, 50, 70, 90, 95, 98].map(n => (
                  <div key={n} className="text-center">
                    <div
                      className="h-10 rounded border border-border"
                      style={{ background: `var(--neutral-${n})` }}
                    />
                    <span className="text-xs text-text-muted">{n}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <code className="text-xs text-text-muted">
                  e.g. --neutral-95: oklch(0.96 0.003 var(--brand-hue))
                </code>
              </div>
            </Card>
          </div>

          <Card className="mt-4">
            <h3
              className="font-semibold uppercase tracking-wide text-xs text-text-muted"
              style={{ marginBottom: 'var(--spacing-sm)' }}
            >
              Status primitives (fixed hues — not brand-shifted)
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Success', solid: 'var(--green-60)', subtle: 'var(--green-85)' },
                { label: 'Warning', solid: 'var(--amber-60)', subtle: 'var(--amber-90)' },
                { label: 'Danger',  solid: 'var(--red-55)',   subtle: 'var(--red-90)' },
              ].map(({ label, solid, subtle }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded shrink-0" style={{ background: solid }} />
                  <div
                    className="h-8 w-8 rounded shrink-0 border border-border"
                    style={{ background: subtle }}
                  />
                  <span className="text-sm text-text-muted">{label}</span>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        <hr className="border-border" />

        {/* ── Tier 2: Semantic tokens ── */}
        <Section
          title="Tier 2 — Semantic tokens"
          subtitle="Purpose-named. Dark mode reassigns which primitive each token points to — no HTML changes needed."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <h3
                className="font-semibold uppercase tracking-wide text-xs text-text-muted"
                style={{ marginBottom: 'var(--spacing-md)' }}
              >
                Surface hierarchy
              </h3>
              <div className="space-y-2">
                {[
                  ['--color-canvas',         'Page background'],
                  ['--color-surface',        'Component background'],
                  ['--color-surface-raised', 'Cards, dropdowns'],
                  ['--color-surface-sunken', 'Inset, code blocks'],
                ].map(([token, desc]) => (
                  <div key={token} className="flex items-center gap-3">
                    <div
                      className="h-8 w-12 rounded shrink-0 border border-border"
                      style={{ background: `var(${token})` }}
                    />
                    <div>
                      <code className="text-xs text-text">{token}</code>
                      <p className="text-xs text-text-muted m-0">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3
                className="font-semibold uppercase tracking-wide text-xs text-text-muted"
                style={{ marginBottom: 'var(--spacing-md)' }}
              >
                Interactive states
              </h3>
              <div className="space-y-2">
                {[
                  ['--color-interactive',        'Default interactive'],
                  ['--color-interactive-hover',  'Hover state'],
                  ['--color-interactive-subtle', 'Background tint'],
                  ['--color-interactive-border', 'Outline / ring'],
                ].map(([token, desc]) => (
                  <div key={token} className="flex items-center gap-3">
                    <div
                      className="h-8 w-12 rounded shrink-0 border border-border"
                      style={{ background: `var(${token})` }}
                    />
                    <div>
                      <code className="text-xs text-text">{token}</code>
                      <p className="text-xs text-text-muted m-0">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="mt-4">
            <h3
              className="font-semibold uppercase tracking-wide text-xs text-text-muted"
              style={{ marginBottom: 'var(--spacing-md)' }}
            >
              Status tokens (dark mode swaps all status colors automatically)
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-success-subtle" style={{ padding: 'var(--spacing-md)' }}>
                <Badge className="bg-success text-white">Success</Badge>
                <p className="text-sm text-success" style={{ margin: '0.5rem 0 0' }}>
                  Operation completed.
                </p>
              </div>
              <div className="rounded-lg bg-warning-subtle" style={{ padding: 'var(--spacing-md)' }}>
                <Badge className="bg-warning text-white">Warning</Badge>
                <p className="text-sm text-warning" style={{ margin: '0.5rem 0 0' }}>
                  Review required.
                </p>
              </div>
              <div className="rounded-lg bg-danger-subtle" style={{ padding: 'var(--spacing-md)' }}>
                <Badge className="bg-danger text-white">Danger</Badge>
                <p className="text-sm text-danger" style={{ margin: '0.5rem 0 0' }}>
                  Action destructive.
                </p>
              </div>
            </div>
          </Card>
        </Section>

        <hr className="border-border" />

        {/* ── Tier 3: Tailwind utilities ── */}
        <Section
          title="Tier 3 — Tailwind utilities"
          subtitle="@theme inline bridges the gap: utilities reference the CSS var, so values stay live at runtime."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <h3
                className="font-semibold uppercase tracking-wide text-xs text-text-muted"
                style={{ marginBottom: 'var(--spacing-md)' }}
              >
                Semantic color utilities in use
              </h3>
              <div className="space-y-2">
                <div
                  className="rounded-md font-medium bg-interactive text-text-on-brand text-sm"
                  style={{ padding: '0.5rem 0.75rem' }}
                >
                  <code>bg-interactive text-text-on-brand</code>
                </div>
                <div
                  className="rounded-md bg-surface-raised border border-border text-sm"
                  style={{ padding: '0.5rem 0.75rem' }}
                >
                  <code className="text-text">bg-surface-raised border-border</code>
                </div>
                <div
                  className="rounded-md bg-surface-sunken text-sm"
                  style={{ padding: '0.5rem 0.75rem' }}
                >
                  <code className="text-text-muted">bg-surface-sunken text-text-muted</code>
                </div>
              </div>
            </Card>

            <Card>
              <h3
                className="font-semibold uppercase tracking-wide text-xs text-text-muted"
                style={{ marginBottom: 'var(--spacing-md)' }}
              >
                Fluid type scale (resize window to see)
              </h3>
              <div className="space-y-1">
                {['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'].map(size => (
                  <div key={size} className="flex items-baseline gap-3">
                    <span
                      className="font-medium text-text"
                      style={{ fontSize: `var(--text-${size})` }}
                    >
                      Aa
                    </span>
                    <code className="text-xs text-text-muted">text-{size}</code>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="mt-4">
            <h3
              className="font-semibold uppercase tracking-wide text-xs text-text-muted"
              style={{ marginBottom: 'var(--spacing-md)' }}
            >
              How{' '}
              <code className="bg-surface-sunken text-xs px-1 rounded">bg-interactive</code>
              {' '}resolves at runtime
            </h3>
            <div className="flex flex-col gap-1">
              <TokenLabel tier={3} name=".bg-interactive { background: var(--color-interactive) }" description="Tailwind utility — @theme inline makes it reference the var" />
              <TokenLabel tier={2} name="--color-interactive: var(--brand-60)"                     description="Semantic token maps to a primitive" />
              <TokenLabel tier={1} name="--brand-60: oklch(0.60 var(--brand-chroma) var(--brand-hue))" description="Primitive resolves to a perceptual oklch value" />
            </div>
          </Card>
        </Section>

        <hr className="border-border" />

        {/* ── Fluid spacing ── */}
        <Section
          title="Fluid spacing"
          subtitle="clamp() scales smoothly between viewport sizes — no media queries needed."
        >
          <Card>
            <div className="space-y-3">
              {['xs', 'sm', 'md', 'lg', 'xl', '2xl'].map(size => (
                <div key={size} className="flex items-center gap-4">
                  <code
                    className="shrink-0 text-xs text-text-muted"
                    style={{ width: '3rem' }}
                  >
                    {size}
                  </code>
                  <div
                    className="h-5 rounded bg-interactive"
                    style={{ width: `var(--spacing-${size})`, opacity: 0.5 }}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Section>

        <hr className="border-border" />

        {/* ── Multi-brand theming ── */}
        <Section
          title="Multi-brand theming"
          subtitle="Only --brand-hue and --brand-chroma change. The entire oklch palette shifts perceptually and uniformly."
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BRANDS.map(b => (
              <Card
                key={b}
                as="button"
                className="text-center cursor-pointer"
                style={{
                  border: brand === b
                    ? '2px solid var(--color-interactive)'
                    : '1px solid var(--color-border)',
                  transition: 'border-color 150ms ease',
                }}
                onClick={() => setBrand(b)}
              >
                <div
                  className="h-8 w-8 rounded-full mx-auto mb-2"
                  style={{ background: `oklch(0.60 var(--${b}-chroma) var(--${b}-hue))` }}
                />
                <span className="block font-medium capitalize text-sm text-text">{b}</span>
                {brand === b && (
                  <span className="block mt-1 text-xs text-interactive">active</span>
                )}
              </Card>
            ))}
          </div>
          <p className="mt-4 text-sm text-text-muted">
            Each swatch renders{' '}
            <code className="bg-surface-sunken text-xs px-1 rounded">
              oklch(0.60 var(--{'{brand}'}-chroma) var(--{'{brand}'}-hue))
            </code>
            {' '}— named primitives from{' '}
            <code className="bg-surface-sunken text-xs px-1 rounded">primitives.css</code>
            {' '}referenced directly, without a{' '}
            <code className="bg-surface-sunken text-xs px-1 rounded">[data-brand]</code>
            {' '}scope on the element.
          </p>
        </Section>

        <hr className="border-border" />

        {/* ── Architecture summary ── */}
        <Section
          title="Architecture summary"
          subtitle="Each card is a TierCard component using .card and .badge from @layer components — overridable by any utility class in markup."
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <TierCard
              tier={1}
              label="Primitives"
              desc="Raw oklch values. Static. Never in HTML. Brand hue/chroma drivers power the whole palette."
              example={'--brand-60:\n  oklch(0.60\n    var(--brand-chroma)\n    var(--brand-hue))'}
              subtleBg="var(--color-warning-subtle)"
              badgeColor="var(--color-warning)"
            />
            <TierCard
              tier={2}
              label="Semantic"
              desc="Purpose-named tokens that point to primitives. Dark mode swaps values here — not in HTML."
              example={'--color-interactive:\n  var(--brand-60)'}
              subtleBg="var(--color-success-subtle)"
              badgeColor="var(--color-success)"
            />
            <TierCard
              tier={3}
              label="Utilities"
              desc="@theme inline makes Tailwind classes reference the vars — they stay live at runtime."
              example={'@theme inline {\n  --color-interactive:\n    var(--color-interactive);\n}'}
              subtleBg="var(--color-interactive-subtle)"
              badgeColor="var(--color-interactive)"
            />
          </div>
        </Section>

      </main>

      <footer
        className="text-center text-sm text-text-muted border-t border-border"
        style={{ padding: 'var(--spacing-xl) var(--spacing-lg)' }}
      >
        Tailwind 4 · oklch · @theme inline · fluid clamp() · zero JS theming
      </footer>
    </div>
  )
}
