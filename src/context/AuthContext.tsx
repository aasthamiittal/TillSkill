import React, { createContext, useContext, useEffect, useState } from 'react'
import type { AuthUser } from '../lib/api'

type AuthState = {
  token: string | null
  user: AuthUser | null
}

type AuthContextValue = {
  isLoggedIn: boolean
  token: string | null
  user: AuthUser | null
  login: (data: AuthState) => void
  logout: () => void
}

const STORAGE_KEY = 'tillskill_auth'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    if (typeof window === 'undefined') {
      return { token: null, user: null }
    }
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) return { token: null, user: null }
      const parsed = JSON.parse(raw) as AuthState
      return parsed
    } catch {
      return { token: null, user: null }
    }
  })

  useEffect(() => {
    try {
      if (state.token && state.user) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      } else {
        window.localStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      // ignore storage errors
    }
  }, [state])

  const login = (data: AuthState) => {
    setState(data)
  }

  const logout = () => {
    setState({ token: null, user: null })
  }

  const value: AuthContextValue = {
    isLoggedIn: Boolean(state.token && state.user),
    token: state.token,
    user: state.user,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
