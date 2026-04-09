export function Section({ title, subtitle, children }) {
  return (
    <section style={{ padding: 'var(--spacing-xl) 0' }}>
      <div style={{ marginBottom: 'var(--spacing-lg)' }}>
        <h2 className="font-bold leading-tight text-3xl text-text m-0">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-base text-text-muted">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </section>
  )
}
