import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PageHeader } from '../components/Common/PageHeader'
import { CTAButton } from '../components/Common/CTAButton'
import { useAuth } from '../context/AuthContext'

type Mode = 'signin' | 'signup' | 'forgot'

export function AuthPage() {
  const [mode, setMode] = useState<Mode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const returnUrl = searchParams.get('returnUrl') ?? '/'

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    login(email.trim())
    navigate(returnUrl, { replace: true })
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    login(email.trim())
    navigate(returnUrl, { replace: true })
  }

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder: could show toast "Reset link sent" later
    setMode('signin')
  }

  return (
    <div className="page auth-page">
      <section className="section">
        <div className="container">
          <PageHeader
            title="Welcome to Tillskill™"
            subtitle="Access your learning dashboard, live classes, and resources."
          />
      <div className="auth-panel">
        <div className="auth-tabs">
          <button
            type="button"
            className={mode === 'signin' ? 'is-active' : ''}
            onClick={() => setMode('signin')}
          >
            Sign in
          </button>
          <button
            type="button"
            className={mode === 'signup' ? 'is-active' : ''}
            onClick={() => setMode('signup')}
          >
            Create account
          </button>
          <button
            type="button"
            className={mode === 'forgot' ? 'is-active' : ''}
            onClick={() => setMode('forgot')}
          >
            Forgot password
          </button>
        </div>

        {mode === 'signin' && (
          <form className="auth-form" onSubmit={handleSignIn}>
            <label>
              Email
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              Password
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <div className="form-actions">
              <CTAButton type="submit" variant="primary">Sign in</CTAButton>
            </div>
          </form>
        )}

        {mode === 'signup' && (
          <form className="auth-form" onSubmit={handleSignUp}>
            <label>
              Email
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              Password
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>
              Confirm Password
              <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </label>
            <div className="form-actions">
              <CTAButton type="submit" variant="primary">Create account</CTAButton>
            </div>
          </form>
        )}

        {mode === 'forgot' && (
          <form className="auth-form" onSubmit={handleForgot}>
            <label>
              Email
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <div className="form-actions">
              <CTAButton type="submit" variant="primary">Send reset link</CTAButton>
            </div>
          </form>
        )}
      </div>
        </div>
      </section>
    </div>
  )
}

