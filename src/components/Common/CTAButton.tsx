import React from 'react'
import { Link } from 'react-router-dom'

type CTAButtonProps = {
  to?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function CTAButton({ to, onClick, children, variant = 'primary', type = 'button', disabled }: CTAButtonProps) {
  const className = `btn btn-${variant}`

  if (to) {
    return (
      <Link to={to} className={className} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

