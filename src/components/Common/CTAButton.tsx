import React from 'react'
import { Link } from 'react-router-dom'

type CTAButtonProps = {
  to?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
}

export function CTAButton({ to, onClick, children, variant = 'primary' }: CTAButtonProps) {
  const className = `btn btn-${variant}`

  if (to) {
    return (
      <Link to={to} className={className} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  )
}

