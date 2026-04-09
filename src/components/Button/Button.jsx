import './Button.css'

export function Button({ variant = 'primary', className = '', children, ...props }) {
  return (
    <button
      className={`${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
