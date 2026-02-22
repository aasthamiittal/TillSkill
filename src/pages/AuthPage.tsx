import { useState } from 'react'
import { PageHeader } from '../components/Common/PageHeader'
import { CTAButton } from '../components/Common/CTAButton'

type Mode = 'signin' | 'signup' | 'forgot'

export function AuthPage() {
  const [mode, setMode] = useState<Mode>('signin')

  return (
    <div className="page auth-page">
      <section className="section">
        <div className="container">
          <PageHeader
            title="Welcome to TillSkill"
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
          <form className="auth-form">
            <label>
              Email
              <input type="email" required />
            </label>
            <label>
              Password
              <input type="password" required />
            </label>
            <div className="form-actions">
              <CTAButton variant="primary">Sign in</CTAButton>
            </div>
          </form>
        )}

        {mode === 'signup' && (
          <form className="auth-form">
            <label>
              Email
              <input type="email" required />
            </label>
            <label>
              Password
              <input type="password" required />
            </label>
            <label>
              Confirm Password
              <input type="password" required />
            </label>
            <div className="form-actions">
              <CTAButton variant="primary">Create account</CTAButton>
            </div>
          </form>
        )}

        {mode === 'forgot' && (
          <form className="auth-form">
            <label>
              Email
              <input type="email" required />
            </label>
            <div className="form-actions">
              <CTAButton variant="primary">Send reset link</CTAButton>
            </div>
          </form>
        )}
      </div>
        </div>
      </section>
    </div>
  )
}

