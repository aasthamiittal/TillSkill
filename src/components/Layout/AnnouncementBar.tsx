import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const STORAGE_KEY = 'tillskill-announcement-dismissed'

type AnnouncementBarProps = {
  onDismissed?: () => void
}

export function AnnouncementBar({ onDismissed }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false)
  const location = useLocation()

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'true') {
        setDismissed(true)
        onDismissed?.()
      }
    } catch {
      // ignore
    }
  }, [])

  const handleClose = () => {
    setDismissed(true)
    onDismissed?.()
    try {
      localStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // ignore
    }
  }

  // Show the announcement panel only on the home page
  if (dismissed || location.pathname !== '/') return null

  const message = (
    <>
      <strong>FREE CMA INTRODUCTORY SESSION</strong>
      {' – '}
      Register to learn how the CMA Qualification can make a difference to your career.{' '}
      <Link to="/intro-sessions" className="announcement-bar-link">
        CLICK HERE.
      </Link>
    </>
  )

  return (
    <div className="announcement-bar" role="banner">
      <div className="announcement-bar-inner">
        <div className="announcement-bar-belt" aria-hidden="false">
          <span className="announcement-bar-text">{message}</span>
          <span className="announcement-bar-text announcement-bar-text--dup" aria-hidden="true">
            {message}
          </span>
        </div>
        <button
          type="button"
          className="announcement-bar-close"
          aria-label="Dismiss announcement"
          onClick={handleClose}
        >
          ×
        </button>
      </div>
    </div>
  )
}
