import { Badge } from '../Badge/Badge'

const TIER_COLORS = {
  1: { bg: 'var(--color-warning-subtle)',     color: 'var(--color-warning)' },
  2: { bg: 'var(--color-success-subtle)',     color: 'var(--color-success)' },
  3: { bg: 'var(--color-interactive-subtle)', color: 'var(--color-interactive)' },
}

export function TokenLabel({ tier, name, description }) {
  const { bg, color } = TIER_COLORS[tier]
  return (
    <div className="flex items-start gap-2 py-1">
      <Badge className="shrink-0" style={{ background: bg, color }}>
        T{tier}
      </Badge>
      <div>
        <code className="text-xs font-mono text-text">{name}</code>
        <p className="text-xs mt-0.5 text-text-muted">{description}</p>
      </div>
    </div>
  )
}
