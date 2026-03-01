import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../components/Common/PageHeader'
import { CTAButton } from '../components/Common/CTAButton'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { coursesApi, subscriptionsApi } from '../lib/api'
import { enrolCourses, type SubscriptionType } from '../data/courses'

type ProgramGroup = {
  backendSlug: 'us-cma' | 'fmaa' | 'csca' | 'excel' | 'intro'
  subscriptionType: SubscriptionType
  titles: string[]
}

export function CheckoutPage() {
  const { items, clearCart } = useCart()
  const { isLoggedIn, token } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [resultSummary, setResultSummary] = useState<
    { program: string; invoiceNumber?: string; wiseRemittanceDetails?: string }[]
  >([])

  const groups: ProgramGroup[] = useMemo(() => {
    const bySlug = new Map<string, ProgramGroup>()

    for (const cartItem of items) {
      const course = enrolCourses.find((c) => c.id === cartItem.id)
      if (!course || !course.backendSlug || !course.subscriptionType) continue

      const key = course.backendSlug
      if (!bySlug.has(key)) {
        bySlug.set(key, {
          backendSlug: course.backendSlug,
          subscriptionType: course.subscriptionType,
          titles: [],
        })
      }
      bySlug.get(key)!.titles.push(course.title)
    }

    return Array.from(bySlug.values())
  }, [items])

  const handleConfirm = async () => {
    if (!isLoggedIn || !token) {
      navigate('/auth?returnUrl=/checkout')
      return
    }

    if (items.length === 0 || groups.length === 0) {
      showToast('Your cart is empty.')
      navigate('/enrol')
      return
    }

    setSubmitting(true)
    const summary: { program: string; invoiceNumber?: string; wiseRemittanceDetails?: string }[] = []

    try {
      for (const group of groups) {
        const label =
          group.backendSlug === 'us-cma'
            ? 'US CMA'
            : group.backendSlug === 'fmaa'
            ? 'FMAA'
            : group.backendSlug === 'csca'
            ? 'CSCA'
            : 'Excel and Finance'

        if (group.subscriptionType === 'short') {
          await subscriptionsApi.createShort(group.backendSlug, token)
          summary.push({ program: label })
        } else {
          await coursesApi.acceptTerms(group.backendSlug, token)
          const res = await subscriptionsApi.initiateLong(group.backendSlug, token)
          summary.push({
            program: label,
            invoiceNumber: res.invoiceNumber,
            wiseRemittanceDetails: res.wiseRemittanceDetails,
          })
        }
      }

      clearCart()
      setResultSummary(summary)
      showToast('Your enrolment has been registered. Please review the details below.')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to complete checkout'
      showToast(message)
    } finally {
      setSubmitting(false)
    }
  }

  if (items.length === 0 && resultSummary.length === 0) {
    return (
      <div className="page">
        <section className="section">
          <div className="container">
            <PageHeader
              title="Checkout"
              subtitle="Your cart is empty. Browse programs to begin."
            />
            <CTAButton to="/enrol">Browse programs</CTAButton>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <PageHeader
            title="Checkout"
            subtitle="Review your selections and confirm your enrolment with TillSkill™."
          />
          {groups.length > 0 && (
            <>
              <h3>Programs you are enrolling into</h3>
              <ul className="cart-list">
                {groups.map((group) => (
                  <li key={group.backendSlug} className="cart-item">
                    <div>
                      <h4>
                        {group.backendSlug === 'us-cma'
                          ? 'US CMA'
                          : group.backendSlug === 'fmaa'
                          ? 'FMAA'
                          : group.backendSlug === 'csca'
                          ? 'CSCA'
                          : 'Excel and Finance'}{' '}
                        ({group.subscriptionType === 'short' ? 'Short-term' : 'Long-term'})
                      </h4>
                      <p className="muted">
                        {group.titles.length === 1
                          ? group.titles[0]
                          : `${group.titles.length} selected batches/sessions`}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="muted" style={{ marginTop: '1rem' }}>
                By confirming, you acknowledge that you have read and accepted the TillSkill™{' '}
                <a href="/terms-and-conditions">Terms &amp; Conditions</a>. For long-term programs,
                your invoice and Wise remittance details will be generated on the server.
              </p>
              <div className="cart-actions">
                <CTAButton variant="primary" onClick={handleConfirm} disabled={submitting}>
                  {submitting ? 'Processing…' : 'Confirm enrolment'}
                </CTAButton>
              </div>
            </>
          )}

          {resultSummary.length > 0 && (
            <section style={{ marginTop: '2rem' }}>
              <h3>Next steps</h3>
              <ul className="cart-list">
                {resultSummary.map((item) => (
                  <li key={item.program} className="cart-item">
                    <div>
                      <h4>{item.program}</h4>
                      {item.invoiceNumber && (
                        <p className="muted">
                          Invoice number: <strong>{item.invoiceNumber}</strong>
                        </p>
                      )}
                      {item.wiseRemittanceDetails && (
                        <p className="muted">
                          Wise remittance details:{' '}
                          <span>{item.wiseRemittanceDetails}</span>
                        </p>
                      )}
                      {!item.invoiceNumber && (
                        <p className="muted">
                          Short-term session. Payment link or joining instructions will be emailed to
                          you.
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-actions">
                <CTAButton to="/enrol" variant="outline">
                  Back to enrol page
                </CTAButton>
              </div>
            </section>
          )}
        </div>
      </section>
    </div>
  )
}

