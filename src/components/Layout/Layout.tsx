import React from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

type LayoutProps = {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="app-root">
      <Navbar />
      <main className="app-main">{children}</main>
      <Footer />
    </div>
  )
}

