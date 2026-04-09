import './Card.css'

export function Card({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag className={`card ${className}`} {...props}>
      {children}
    </Tag>
  )
}
