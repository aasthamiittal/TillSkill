import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'tillskill-announcement-dismissed'

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'true') setDismissed(true)
    } catch {
      // ignore
    }
  }, [])

  const handleClose = () => {
    setDismissed(true)
    try {
      localStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // ignore
    }
  }

  if (dismissed) return null

  return (
    <div className="announcement-bar" role="banner">
      <div className="announcement-bar-inner">
        <p className="announcement-bar-text">
          <strong>FREE CMA INTRODUCTORY SESSION</strong>
          {' – '}
          Register to learn how the CMA Qualification can make a difference to your career.{' '}
          <Link to="/intro-sessions" className="announcement-bar-link">
            CLICK HERE.
          </Link>
        </p>
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
