import { useState, useEffect } from 'react'

const BRANDS = ['red', 'emerald', 'rose', 'amber']

function TokenLabel({ tier, name, description }) {
  const colors = {
    1: { bg: 'var(--color-warning-subtle)', color: 'var(--color-warning)' },
    2: { bg: 'var(--color-success-subtle)', color: 'var(--color-success)' },
    3: { bg: 'var(--color-interactive-subtle)', color: 'var(--color-interactive)' },
  }
  return (
    <div className="flex items-start gap-2 py-1">
      <span
        className="badge shrink-0"
        style={{ background: colors[tier].bg, color: colors[tier].color }}
      >
        T{tier}
      </span>
      <div>
        <code className="text-xs font-mono" style={{ color: 'var(--color-text)' }}>{name}</code>
        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{description}</p>
      </div>
    </div>
  )
}

function Section({ title, subtitle, children }) {
  return (
    <section style={{ padding: 'var(--spacing-xl) 0' }}>
      <div style={{ marginBottom: 'var(--spacing-lg)' }}>
        <h2
          className="font-bold leading-tight"
          style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-text)', margin: 0 }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="mt-2"
            style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)' }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </section>
  )
}

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
        className="sticky top-0 z-10 backdrop-blur-sm"
        style={{
          borderBottom: '1px solid var(--color-border)',
          background: 'color-mix(in oklch, var(--color-surface-raised) 90%, transparent)',
        }}
      >
        <div
          className="max-w-4xl mx-auto flex items-center justify-between"
          style={{ padding: 'var(--spacing-sm) var(--spacing-lg)' }}
        >
          <div className="flex items-center gap-2">
            <span className="font-bold" style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text)' }}>
              Token Demo
            </span>
            <span
              className="badge"
              style={{ background: 'var(--color-interactive-subtle)', color: 'var(--color-interactive)' }}
            >
              Tailwind 4
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <div className="flex gap-1">
              {BRANDS.map(b => (
                <button
                  key={b}
                  onClick={() => setBrand(b)}
                  className={brand === b ? 'btn-primary' : 'btn-ghost'}
                  style={{ padding: '0.25em 0.75em', fontSize: 'var(--text-xs)' }}
                >
                  {b}
                </button>
              ))}
            </div>
            <button
              onClick={() => setDarkMode(d => !d)}
              className="btn-ghost"
              style={{ padding: '0.25em 0.75em', fontSize: 'var(--text-xs)' }}
            >
              {darkMode ? '☀ Light' : '☾ Dark'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto" style={{ padding: '0 var(--spacing-lg)' }}>

        {/* ── Hero ── */}
        <section className="text-center" style={{ padding: 'var(--spacing-section) 0' }}>
          <span
            className="badge"
            style={{
              background: 'var(--color-interactive-subtle)',
              color: 'var(--color-interactive)',
              marginBottom: 'var(--spacing-md)',
              display: 'inline-flex',
            }}
          >
            Three-Tier Token Architecture
          </span>
          <h1
            className="font-extrabold leading-tight"
            style={{ fontSize: 'var(--text-5xl)', color: 'var(--color-text)', margin: '0 0 var(--spacing-md)' }}
          >
            Perceptual color.<br />
            <span style={{ color: 'var(--color-interactive)' }}>Zero JavaScript.</span>
          </h1>
          <p
            className="w-full"
            style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-xl)' }}
          >
            oklch primitives → semantic tokens → Tailwind utilities.
            Dark mode and multi-brand theming via pure CSS.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button className="btn-primary">Primary action</button>
            <button className="btn-ghost">Ghost action</button>
          </div>
        </section>

        <hr style={{ borderColor: 'var(--color-border)' }} />

        {/* ── Tier 1: Primitives ── */}
        <Section
          title="Tier 1 — Primitives"
          subtitle="Raw oklch values. Never referenced in HTML. Change --brand-hue and the whole palette shifts perceptually."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="card">
              <h3
                className="font-semibold uppercase tracking-wide"
                style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-md)' }}
              >
                Brand scale (derived from hue driver)
              </h3>
              <div className="grid grid-cols-7 gap-1">
                {[10, 30, 50, 60, 70, 85, 95].map(n => (
                  <div key={n} className="text-center">
                    <div
                      className="h-10 rounded"
                      style={{ background: `var(--brand-${n})` }}
                    />
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{n}</span>
                  </div>
                ))}
              </div>
              <div
                className="mt-3 pt-3"
                style={{ borderTop: '1px solid var(--color-border)' }}
              >
                <code style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  oklch(0.60 var(--brand-chroma) var(--brand-hue))
                </code>
              </div>
            </div>

            <div className="card">
              <h3
                className="font-semibold uppercase tracking-wide"
                style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-md)' }}
              >
                Neutral scale (tinted to brand hue)
              </h3>
              <div className="grid grid-cols-8 gap-1">
                {['05', 10, 20, 50, 70, 90, 95, 98].map(n => (
                  <div key={n} className="text-center">
                    <div
                      className="h-10 rounded"
                      style={{
                        background: `var(--neutral-${n})`,
                        border: '1px solid var(--color-border)',
                      }}
                    />
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{n}</span>
                  </div>
                ))}
              </div>
              <div
                className="mt-3 pt-3"
                style={{ borderTop: '1px solid var(--color-border)' }}
              >
                <code style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  oklch(0.96 0.003 var(--brand-hue))
                </code>
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <h3
              className="font-semibold uppercase tracking-wide"
              style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-sm)' }}
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
                    className="h-8 w-8 rounded shrink-0"
                    style={{ background: subtle, border: '1px solid var(--color-border)' }}
                  />
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <hr style={{ borderColor: 'var(--color-border)' }} />

        {/* ── Tier 2: Semantic tokens ── */}
        <Section
          title="Tier 2 — Semantic tokens"
          subtitle="Purpose-named. Dark mode reassigns which primitive each token points to — no HTML changes needed."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="card">
              <h3
                className="font-semibold uppercase tracking-wide"
                style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-md)' }}
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
                      className="h-8 w-12 rounded shrink-0"
                      style={{ background: `var(${token})`, border: '1px solid var(--color-border)' }}
                    />
                    <div>
                      <code style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text)' }}>{token}</code>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3
                className="font-semibold uppercase tracking-wide"
                style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-md)' }}
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
                      className="h-8 w-12 rounded shrink-0"
                      style={{ background: `var(${token})`, border: '1px solid var(--color-border)' }}
                    />
                    <div>
                      <code style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text)' }}>{token}</code>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <h3
              className="font-semibold uppercase tracking-wide"
              style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-md)' }}
            >
              Status tokens (dark mode swaps subtle backgrounds automatically)
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div
                className="rounded-lg"
                style={{ padding: 'var(--spacing-md)', background: 'var(--color-success-subtle)' }}
              >
                <span className="badge" style={{ background: 'var(--color-success)', color: 'white' }}>Success</span>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-success)', margin: '0.5rem 0 0' }}>
                  Operation completed.
                </p>
              </div>
              <div
                className="rounded-lg"
                style={{ padding: 'var(--spacing-md)', background: 'var(--color-warning-subtle)' }}
              >
                <span className="badge" style={{ background: 'var(--color-warning)', color: 'white' }}>Warning</span>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-warning)', margin: '0.5rem 0 0' }}>
                  Review required.
                </p>
              </div>
              <div
                className="rounded-lg"
                style={{ padding: 'var(--spacing-md)', background: 'var(--color-danger-subtle)' }}
              >
                <span className="badge" style={{ background: 'var(--color-danger)', color: 'white' }}>Danger</span>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-danger)', margin: '0.5rem 0 0' }}>
                  Action destructive.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <hr style={{ borderColor: 'var(--color-border)' }} />

        {/* ── Tier 3: Tailwind utilities ── */}
        <Section
          title="Tier 3 — Tailwind utilities"
          subtitle="@theme inline bridges the gap: utilities reference the CSS var, so values stay live at runtime."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="card">
              <h3
                className="font-semibold uppercase tracking-wide"
                style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-md)' }}
              >
                Semantic color utilities in use
              </h3>
              <div className="space-y-2">
                <div
                  className="rounded-md font-medium"
                  style={{
                    padding: '0.5rem 0.75rem',
                    background: 'var(--color-interactive)',
                    color: 'var(--color-text-on-brand)',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  <code>bg-interactive text-text-on-brand</code>
                </div>
                <div
                  className="rounded-md"
                  style={{
                    padding: '0.5rem 0.75rem',
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  <code style={{ color: 'var(--color-text)' }}>bg-surface-raised border-border</code>
                </div>
                <div
                  className="rounded-md"
                  style={{
                    padding: '0.5rem 0.75rem',
                    background: 'var(--color-surface-sunken)',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  <code style={{ color: 'var(--color-text-muted)' }}>bg-surface-sunken text-text-muted</code>
                </div>
              </div>
            </div>

            <div className="card">
              <h3
                className="font-semibold uppercase tracking-wide"
                style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-md)' }}
              >
                Fluid type scale (resize window to see)
              </h3>
              <div className="space-y-1">
                {['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'].map(size => (
                  <div key={size} className="flex items-baseline gap-3">
                    <span
                      className="font-medium"
                      style={{ fontSize: `var(--text-${size})`, color: 'var(--color-text)' }}
                    >
                      Aa
                    </span>
                    <code style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                      text-{size}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <h3
              className="font-semibold uppercase tracking-wide"
              style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-md)' }}
            >
              How <code style={{ background: 'var(--color-surface-sunken)', padding: '0 0.25rem', borderRadius: '0.25rem' }}>
                bg-interactive
              </code> resolves at runtime
            </h3>
            <div className="flex flex-col gap-1">
              <TokenLabel tier={3} name=".bg-interactive { background: var(--color-interactive) }" description="Tailwind utility — @theme inline makes it reference the var" />
              <TokenLabel tier={2} name="--color-interactive: var(--brand-60)"             description="Semantic token maps to a primitive" />
              <TokenLabel tier={1} name="brand-60: oklch(0.60 var(--brand-chroma) var(--brand-hue))" description="Primitive resolves to a perceptual oklch value" />
            </div>
          </div>
        </Section>

        <hr style={{ borderColor: 'var(--color-border)' }} />

        {/* ── Fluid spacing ── */}
        <Section
          title="Fluid spacing"
          subtitle="clamp() scales smoothly between viewport sizes — no media queries needed."
        >
          <div className="card">
            <div className="space-y-3">
              {['xs', 'sm', 'md', 'lg', 'xl', '2xl'].map(size => (
                <div key={size} className="flex items-center gap-4">
                  <code
                    className="shrink-0"
                    style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', width: '3rem' }}
                  >
                    {size}
                  </code>
                  <div
                    className="h-5 rounded"
                    style={{
                      width: `var(--spacing-${size})`,
                      background: 'var(--color-interactive)',
                      opacity: 0.5,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </Section>

        <hr style={{ borderColor: 'var(--color-border)' }} />

        {/* ── Multi-brand theming ── */}
        <Section
          title="Multi-brand theming"
          subtitle="Only --brand-hue and --brand-chroma change. The entire oklch palette shifts perceptually and uniformly."
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BRANDS.map(b => (
              <button
                key={b}
                onClick={() => setBrand(b)}
                className="card text-center cursor-pointer"
                style={{
                  border: brand === b
                    ? '2px solid var(--color-interactive)'
                    : '1px solid var(--color-border)',
                  transition: 'border-color 150ms ease',
                }}
              >
                <div
                  className="h-8 w-8 rounded-full mx-auto mb-2"
                  style={{ background: `oklch(0.60 var(--${b}-chroma) var(--${b}-hue))` }}
                />
                <span
                  className="block font-medium capitalize"
                  style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text)' }}
                >
                  {b}
                </span>
                {brand === b && (
                  <span
                    className="block mt-1"
                    style={{ fontSize: 'var(--text-xs)', color: 'var(--color-interactive)' }}
                  >
                    active
                  </span>
                )}
              </button>
            ))}
          </div>
          <p
            className="mt-4"
            style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}
          >
            Each swatch renders{' '}
            <code
              style={{
                background: 'var(--color-surface-sunken)',
                padding: '0 0.25rem',
                borderRadius: '0.25rem',
                fontSize: 'var(--text-xs)',
              }}
            >
              var(--brand-60)
            </code>
            {' '}— the same variable, different values per{' '}
            <code
              style={{
                background: 'var(--color-surface-sunken)',
                padding: '0 0.25rem',
                borderRadius: '0.25rem',
                fontSize: 'var(--text-xs)',
              }}
            >
              [data-brand]
            </code>{' '}
            scope.
          </p>
        </Section>

        <hr style={{ borderColor: 'var(--color-border)' }} />

        {/* ── Architecture summary ── */}
        <Section title="Architecture summary">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                tier: 1,
                label: 'Primitives',
                desc: 'Raw oklch values. Static. Never in HTML. Brand hue/chroma drivers power the whole palette.',
                example: 'brand-60:\n  oklch(0.60\n    var(--brand-chroma)\n    var(--brand-hue))',
                subtleBg: 'var(--color-warning-subtle)',
                badgeBg: 'var(--color-warning)',
              },
              {
                tier: 2,
                label: 'Semantic',
                desc: 'Purpose-named tokens that point to primitives. Dark mode swaps values here — not in HTML.',
                example: '--color-interactive:\n  var(--brand-60)',
                subtleBg: 'var(--color-success-subtle)',
                badgeBg: 'var(--color-success)',
              },
              {
                tier: 3,
                label: 'Utilities',
                desc: '@theme inline makes Tailwind classes reference the vars — they stay live at runtime.',
                example: '@theme inline {\n  --color-interactive:\n    var(--color-interactive);\n}',
                subtleBg: 'var(--color-interactive-subtle)',
                badgeBg: 'var(--color-interactive)',
              },
            ].map(({ tier, label, desc, example, subtleBg, badgeBg }) => (
              <div
                key={tier}
                className="card"
                style={{ background: subtleBg, border: 'none' }}
              >
                <span
                  className="badge"
                  style={{
                    background: 'var(--color-surface-raised)',
                    color: badgeBg,
                    marginBottom: 'var(--spacing-sm)',
                    display: 'inline-flex',
                  }}
                >
                  Tier {tier}
                </span>
                <h3
                  className="font-semibold"
                  style={{ fontSize: 'var(--text-base)', color: 'var(--color-text)', margin: '0 0 0.25rem' }}
                >
                  {label}
                </h3>
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-muted)',
                    marginBottom: 'var(--spacing-md)',
                  }}
                >
                  {desc}
                </p>
                <pre
                  style={{
                    fontSize: 'var(--text-xs)',
                    background: 'var(--color-surface-raised)',
                    borderRadius: '0.5rem',
                    padding: '0.75rem',
                    color: 'var(--color-text)',
                    overflowX: 'auto',
                    margin: 0,
                  }}
                >
                  {example}
                </pre>
              </div>
            ))}
          </div>
        </Section>

      </main>

      <footer
        className="text-center"
        style={{
          borderTop: '1px solid var(--color-border)',
          padding: 'var(--spacing-xl) var(--spacing-lg)',
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-muted)',
        }}
      >
        Tailwind 4 · oklch · @theme inline · fluid clamp() · zero JS theming
      </footer>
    </div>
  )
}
