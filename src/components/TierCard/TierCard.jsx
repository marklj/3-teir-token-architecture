import { Card } from '../Card/Card'
import { Badge } from '../Badge/Badge'

export function TierCard({ tier, label, desc, example, subtleBg, badgeColor }) {
  return (
    <Card style={{ background: subtleBg, border: 'none' }}>
      <Badge
        className="bg-surface-raised"
        style={{ color: badgeColor, marginBottom: 'var(--spacing-sm)', display: 'inline-flex' }}
      >
        Tier {tier}
      </Badge>
      <h3 className="font-semibold text-base text-text" style={{ margin: '0 0 0.25rem' }}>
        {label}
      </h3>
      <p className="text-sm text-text-muted" style={{ marginBottom: 'var(--spacing-md)' }}>
        {desc}
      </p>
      <pre className="text-xs bg-surface-raised text-text overflow-x-auto rounded-lg p-3 m-0">
        {example}
      </pre>
    </Card>
  )
}
