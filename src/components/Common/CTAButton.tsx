import React from 'react'
import { Link } from 'react-router-dom'

type CTAButtonProps = {
  to?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  type?: 'button' | 'submit'
}

export function CTAButton({ to, onClick, children, variant = 'primary', type = 'button' }: CTAButtonProps) {
  const className = `btn btn-${variant}`

  if (to) {
    return (
      <Link to={to} className={className} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  )
}

