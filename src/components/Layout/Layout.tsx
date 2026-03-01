import React, { useState, useEffect } from 'react'
import { AnnouncementBar } from './AnnouncementBar'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

const STORAGE_KEY = 'tillskill-announcement-dismissed'

type LayoutProps = {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [announcementDismissed, setAnnouncementDismissed] = useState(() => {
    try {
      return typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    const onStorage = () => {
      try {
        setAnnouncementDismissed(localStorage.getItem(STORAGE_KEY) === 'true')
      } catch {
        // ignore
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return (
    <div className={`app-root${announcementDismissed ? ' announcement-dismissed' : ''}`}>
      <Navbar />
      <AnnouncementBar onDismissed={() => setAnnouncementDismissed(true)} />
      <main className="app-main">{children}</main>
      <Footer />
    </div>
  )
}

