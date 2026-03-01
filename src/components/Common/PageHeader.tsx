import React from 'react'

type PageHeaderProps = {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="page-header">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </section>
  )
}

