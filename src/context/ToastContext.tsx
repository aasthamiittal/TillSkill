import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

type ToastContextValue = {
  showToast: (message: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

const TOAST_DURATION_MS = 3000

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  const showToast = useCallback((msg: string) => {
    setMessage(msg)
    setVisible(true)
  }, [])

  useEffect(() => {
    if (!visible || !message) return
    const id = window.setTimeout(() => {
      setVisible(false)
      setMessage(null)
    }, TOAST_DURATION_MS)
    return () => window.clearTimeout(id)
  }, [visible, message])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && message && (
        <div className="toast-viewport" role="status" aria-live="polite">
          <div className="toast">
            <span className="toast-message">{message}</span>
            <button
              type="button"
              className="toast-close"
              aria-label="Close"
              onClick={() => {
                setVisible(false)
                setMessage(null)
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return ctx
}
