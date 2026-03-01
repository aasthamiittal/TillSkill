import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PageHeader } from '../components/Common/PageHeader'
import { CTAButton } from '../components/Common/CTAButton'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { enrollmentsApi, subscriptionsApi } from '../lib/api'

type Enrollment = {
  _id: string
  courseTitle?: string
  courseSlug?: string
  type: string
  status: string
  invoiceNumber?: string
  createdAt: string
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    pending: 'Pending',
    awaiting_payment: 'Awaiting payment',
    active: 'Active',
    completed: 'Completed',
    cancelled: 'Cancelled',
  }
  return labels[status] || status
}

export function MyCoursesPage() {
  const { isLoggedIn, token } = useAuth()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { showToast } = useToast()
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [payingId, setPayingId] = useState<string | null>(null)

  useEffect(() => {
    const payment = searchParams.get('payment')
    if (payment === 'success') {
      showToast('Payment successful. Your course is now active.')
      setSearchParams({}, { replace: true })
    } else if (payment === 'cancelled') {
      showToast('Payment was cancelled.')
      setSearchParams({}, { replace: true })
    }
  }, [searchParams, setSearchParams, showToast])

  useEffect(() => {
    if (!isLoggedIn || !token) {
      navigate('/auth?returnUrl=/my-courses')
      return
    }
    let cancelled = false
    enrollmentsApi
      .getMyEnrollments(token)
      .then((data) => {
        if (!cancelled) setEnrollments(data.enrollments || [])
      })
      .catch(() => {
        if (!cancelled) setEnrollments([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [isLoggedIn, token, navigate])

  const handlePayNow = async (enrollmentId: string) => {
    if (!token) return
    setPayingId(enrollmentId)
    try {
      const { checkoutUrl } = await subscriptionsApi.createCheckoutSession(enrollmentId, token)
      window.location.href = checkoutUrl
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Could not start payment')
      setPayingId(null)
    }
  }

  if (!isLoggedIn) return null

  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <PageHeader
            title="My Enrolled Courses"
            subtitle="Courses you have registered for. Invoices and proof of payment can be managed here."
          />
          {loading ? (
            <div className="my-courses-loading">
              <p>Loading your courses…</p>
            </div>
          ) : enrollments.length === 0 ? (
            <div className="my-courses-empty">
              <p>You have not enrolled in any courses yet. Visit Intro Sessions to register.</p>
              <CTAButton to="/enrol">Browse Intro Sessions</CTAButton>
            </div>
          ) : (
            <div className="my-courses-grid">
              {enrollments.map((e) => (
                <article key={e._id} className="enrollment-card">
                  <div className="enrollment-card__header">
                    <h3 className="enrollment-card__title">{e.courseTitle || e.courseSlug || 'Course'}</h3>
                    <span className={`enrollment-card__type enrollment-card__type--${e.type}`}>
                      {e.type === 'long' ? 'Long-term' : 'Short-term'}
                    </span>
                  </div>
                  <div className="enrollment-card__meta">
                    <span className={`enrollment-card__status enrollment-card__status--${e.status}`}>
                      {statusLabel(e.status)}
                    </span>
                    <span className="enrollment-card__date">{formatDate(e.createdAt)}</span>
                  </div>
                  {e.invoiceNumber && (
                    <p className="enrollment-card__invoice">
                      Invoice: <strong>{e.invoiceNumber}</strong>
                    </p>
                  )}
                  {e.type === 'short' && e.status === 'awaiting_payment' && (
                    <div className="enrollment-card__actions">
                      <CTAButton
                        variant="primary"
                        onClick={() => handlePayNow(e._id)}
                        disabled={!!payingId}
                      >
                        {payingId === e._id ? 'Redirecting…' : 'Pay now'}
                      </CTAButton>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
