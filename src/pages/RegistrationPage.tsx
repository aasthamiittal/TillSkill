import React, { useState } from 'react'
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom'
import { PageHeader } from '../components/Common/PageHeader'
import { CTAButton } from '../components/Common/CTAButton'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { authApi, coursesApi, subscriptionsApi } from '../lib/api'
import { introSessions } from '../data/courses'

const registrationImage = new URL('../assets/Registration-page.png', import.meta.url).href

const SHORT_SLUGS = ['excel', 'intro']
function isShort(slug: string) {
  return SHORT_SLUGS.includes(slug)
}

const STREAM_OPTIONS = [
  { value: '', label: 'Select…' },
  { value: 'accounting-finance', label: 'Accounting / Finance' },
  { value: 'non-accounting-finance', label: 'Non-accounting / Non-finance' },
]

const QUALIFICATION_OPTIONS = [
  { value: '', label: 'Select…' },
  { value: 'undergraduate', label: 'Undergraduate student' },
  { value: 'postgraduate', label: 'Post graduate student' },
  { value: 'job-fresher', label: 'Job - Fresher' },
  { value: 'job-2plus', label: 'Job - 2+ years of experience' },
]

const COURSE_INTEREST_OPTIONS = [
  { value: '', label: 'Select…' },
  { value: 'cma-both', label: 'CMA Both Parts' },
  { value: 'cma-part1', label: 'CMA Part 1' },
  { value: 'cma-part2', label: 'CMA Part 2' },
]

const ENGLISH_OPTIONS = [
  { value: '', label: 'Select…' },
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]

// Common time zones (IANA id as value, label for display)
const TIMEZONE_OPTIONS = [
  { value: '', label: 'Select your time zone…' },
  { value: 'Asia/Kolkata', label: 'IST — India (Asia/Kolkata)' },
  { value: 'Asia/Dubai', label: 'GST — UAE (Asia/Dubai)' },
  { value: 'Asia/Singapore', label: 'SGT — Singapore' },
  { value: 'Asia/Hong_Kong', label: 'HKT — Hong Kong' },
  { value: 'Asia/Tokyo', label: 'JST — Japan (Asia/Tokyo)' },
  { value: 'Australia/Sydney', label: 'AEST/AEDT — Sydney' },
  { value: 'Europe/London', label: 'GMT/BST — UK (Europe/London)' },
  { value: 'Europe/Paris', label: 'CET/CEST — Paris' },
  { value: 'Europe/Berlin', label: 'CET/CEST — Berlin' },
  { value: 'America/New_York', label: 'EST/EDT — Eastern (US)' },
  { value: 'America/Chicago', label: 'CST/CDT — Central (US)' },
  { value: 'America/Denver', label: 'MST/MDT — Mountain (US)' },
  { value: 'America/Los_Angeles', label: 'PST/PDT — Pacific (US)' },
  { value: 'America/Toronto', label: 'Eastern — Toronto' },
  { value: 'America/Sao_Paulo', label: 'BRT — São Paulo' },
  { value: 'Africa/Cairo', label: 'EET — Cairo' },
  { value: 'Africa/Johannesburg', label: 'SAST — Johannesburg' },
  { value: 'Pacific/Auckland', label: 'NZST/NZDT — Auckland' },
]

export function RegistrationPage() {
  const { slug } = useParams<{ slug: string }>()
  const [searchParams] = useSearchParams()
  const isCorporate = searchParams.get('for') === 'corporate'
  const navigate = useNavigate()
  const { login, token } = useAuth()
  const { showToast } = useToast()
  const [step, setStep] = useState<'form' | 'terms' | 'done'>('form')
  const [submitting, setSubmitting] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [courseInfo, setCourseInfo] = useState<{
    title: string
    feeAmount?: number
    currency?: string
    termsContent?: string
    wiseRemittanceDetails?: string
  } | null>(null)
  const [longResult, setLongResult] = useState<{
    invoiceNumber: string
    wiseRemittanceDetails?: string
  } | null>(null)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    timezone: '',
    streamOfEducation: '',
    qualification: '',
    courseInterest: '',
    infoSessionId: '',
    englishComfortable: '',
    contactAddress: '',
  })
  const [corporateForm, setCorporateForm] = useState({
    organisationName: '',
    contactPersonName: '',
    email: '',
    phone: '',
    timezone: '',
    message: '',
    password: '',
    confirmPassword: '',
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)

  if (!slug) {
    return (
      <div className="page">
        <section className="section">
          <div className="container">
            <PageHeader title="Invalid course" subtitle="Please choose a course from Intro Sessions." />
            <Link to="/enrol">Back to Intro Sessions</Link>
          </div>
        </section>
      </div>
    )
  }

  const short = isShort(slug)

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      showToast('Passwords do not match')
      return
    }
    if (!form.email || !form.password) {
      showToast('Email and password are required')
      return
    }
    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('firstName', form.firstName.trim())
      fd.append('lastName', form.lastName.trim())
      fd.append('email', form.email.trim())
      fd.append('phone', form.phone.trim())
      fd.append('password', form.password)
      fd.append('timezone', form.timezone.trim())
      fd.append('streamOfEducation', form.streamOfEducation)
      fd.append('qualification', form.qualification)
      fd.append('courseInterest', form.courseInterest)
      fd.append('infoSessionId', form.infoSessionId.trim())
      fd.append('englishComfortable', form.englishComfortable)
      if (form.contactAddress) fd.append('contactAddress', form.contactAddress.trim())
      if (resumeFile) fd.append('resume', resumeFile)

      const res = await authApi.registerFormData(fd)
      login({ token: res.token, user: res.user })

      if (short) {
        const shortRes = await subscriptionsApi.createShort(slug, res.token)
        if (shortRes.checkoutUrl) {
          window.location.href = shortRes.checkoutUrl
          return
        }
        setStep('done')
        showToast('You are registered. Payment can be made online when configured.')
      } else {
        const { course, terms } = await coursesApi.getBySlug(slug)
        setCourseInfo({
          title: course.title,
          feeAmount: course.feeAmount,
          currency: course.currency,
          termsContent: terms?.content,
          wiseRemittanceDetails: course.wiseRemittanceDetails,
        })
        setStep('terms')
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCorporateFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (corporateForm.password !== corporateForm.confirmPassword) {
      showToast('Passwords do not match')
      return
    }
    if (!corporateForm.email || !corporateForm.password || !corporateForm.organisationName.trim() || !corporateForm.contactPersonName.trim()) {
      showToast('Organisation name, contact person, email and password are required')
      return
    }
    setSubmitting(true)
    try {
      const res = await authApi.registerCorporate({
        organisationName: corporateForm.organisationName.trim(),
        contactPersonName: corporateForm.contactPersonName.trim(),
        email: corporateForm.email.trim().toLowerCase(),
        phone: corporateForm.phone.trim(),
        timezone: corporateForm.timezone.trim(),
        message: corporateForm.message.trim() || undefined,
        password: corporateForm.password,
      })
      login({ token: res.token, user: res.user })
      if (short) {
        const shortRes = await subscriptionsApi.createShort(slug, res.token)
        if (shortRes.checkoutUrl) {
          window.location.href = shortRes.checkoutUrl
          return
        }
        setStep('done')
        showToast('Your organisation is registered. We’ll follow up with next steps.')
      } else {
        setStep('done')
        showToast('Your organisation is registered. We’ll follow up with next steps.')
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setSubmitting(false)
    }
  }

  const handleTermsContinue = async () => {
    if (!termsAccepted) {
      showToast('Please accept the terms and fee structure')
      return
    }
    if (!token) {
      showToast('Session expired. Please sign in again.')
      navigate('/auth')
      return
    }
    setSubmitting(true)
    try {
      await coursesApi.acceptTerms(slug!, token)
      const res = await subscriptionsApi.initiateLong(slug!, token)
      setLongResult({
        invoiceNumber: res.invoiceNumber,
        wiseRemittanceDetails: res.wiseRemittanceDetails,
      })
      setStep('done')
      showToast('Invoice generated. Remit payment and send proof via email.')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to complete registration')
    } finally {
      setSubmitting(false)
    }
  }

  const handleLoggedInEnrol = async () => {
    if (!token) return
    setSubmitting(true)
    try {
      if (short) {
        const shortRes = await subscriptionsApi.createShort(slug, token)
        if (shortRes.checkoutUrl) {
          window.location.href = shortRes.checkoutUrl
          return
        }
        setStep('done')
        showToast('You are enrolled. Payment can be made online when configured.')
      } else {
        const { course, terms } = await coursesApi.getBySlug(slug)
        setCourseInfo({
          title: course.title,
          feeAmount: course.feeAmount,
          currency: course.currency,
          termsContent: terms?.content,
          wiseRemittanceDetails: course.wiseRemittanceDetails,
        })
        setStep('terms')
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Enrolment failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <PageHeader
            title={isCorporate ? 'Corporate Registration' : short ? 'Student Registration' : 'Register for course'}
            subtitle={
              step === 'form' && !token
                ? isCorporate
                  ? 'Register your organisation. Your employees can then use the package under your account.'
                  : 'Enter your details. Email will be your username. Payment for short-term courses can be made online (cards/UPI).'
                : step === 'form' && token
                ? "You're already registered. Enrol in this course below."
                : step === 'terms'
                ? 'Review terms and fee structure, then accept to generate your invoice.'
                : 'Registration complete.'
            }
          />

          {isCorporate && step === 'form' && !token && (
            <div className="form-block registration-page__corporate-notice" role="status">
              <p className="registration-page__corporate-badge">
                Register your organisation once. Employees will use the package under your account. We’ll follow up with tailored options for your organisation.
              </p>
            </div>
          )}

          {step === 'form' && token && (
            <div className="form-block registration-page__logged-in">
              <p>You are logged in. No need to register again — just confirm enrolment for this course.</p>
              <div className="form-actions">
                <CTAButton variant="primary" onClick={handleLoggedInEnrol} disabled={submitting}>
                  {submitting ? 'Enrolling…' : 'Enrol in this course'}
                </CTAButton>
                <Link to="/enrol" className="btn btn-outline" style={{ marginLeft: '0.5rem' }}>
                  Back to courses
                </Link>
              </div>
            </div>
          )}

          {step === 'form' && !token && (
            isCorporate ? (
              <div className="registration-page__layout">
                <form className="form-block form-block--wide" onSubmit={handleCorporateFormSubmit}>
                  <label>
                    Organisation name
                    <input
                      type="text"
                      required
                      value={corporateForm.organisationName}
                      onChange={(e) => setCorporateForm((f) => ({ ...f, organisationName: e.target.value }))}
                      placeholder="Your company or organisation name"
                    />
                  </label>
                  <label>
                    Contact person name
                    <input
                      type="text"
                      required
                      value={corporateForm.contactPersonName}
                      onChange={(e) => setCorporateForm((f) => ({ ...f, contactPersonName: e.target.value }))}
                      placeholder="Full name of primary contact"
                    />
                  </label>
                  <label>
                    Email (this will be your username)
                    <input
                      type="email"
                      required
                      value={corporateForm.email}
                      onChange={(e) => setCorporateForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="Email"
                    />
                  </label>
                  <div className="form-row">
                    <label>
                      Phone number with ISD Code
                      <input
                        type="tel"
                        value={corporateForm.phone}
                        onChange={(e) => setCorporateForm((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="e.g. +91 9876543210"
                      />
                    </label>
                    <label>
                      Time zone
                      <select
                        value={corporateForm.timezone}
                        onChange={(e) => setCorporateForm((f) => ({ ...f, timezone: e.target.value }))}
                      >
                        {TIMEZONE_OPTIONS.map((o) => (
                          <option key={o.value || 'empty'} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label>
                    Message (optional)
                    <textarea
                      rows={3}
                      value={corporateForm.message}
                      onChange={(e) => setCorporateForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Number of employees, preferred schedule, or any questions"
                    />
                  </label>
                  <div className="form-row">
                    <label>
                      Password
                      <input
                        type="password"
                        required
                        value={corporateForm.password}
                        onChange={(e) => setCorporateForm((f) => ({ ...f, password: e.target.value }))}
                        placeholder="Password"
                      />
                    </label>
                    <label>
                      Confirm password
                      <input
                        type="password"
                        required
                        value={corporateForm.confirmPassword}
                        onChange={(e) => setCorporateForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                        placeholder="Confirm password"
                      />
                    </label>
                  </div>
                  <div className="form-actions">
                    <CTAButton type="submit" variant="primary" disabled={submitting}>
                      {submitting ? 'Registering…' : 'Register organisation'}
                    </CTAButton>
                    <Link to="/for-corporates" className="btn btn-outline" style={{ marginLeft: '0.5rem' }}>
                      Cancel
                    </Link>
                  </div>
                </form>
                <div className="registration-page__media">
                  <img src={registrationImage} alt="" className="registration-page__image" />
                </div>
              </div>
            ) : (
            <div className="registration-page__layout">
              <form className="form-block form-block--wide" onSubmit={handleFormSubmit}>
              <div className="form-row">
                <label>
                  First Name
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                    placeholder="First name"
                  />
                </label>
                <label>
                  Last Name
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                    placeholder="Last name"
                  />
                </label>
              </div>
              <label>
                Email (this will be your username)
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="Email"
                />
              </label>
              <div className="form-row">
                <label>
                  Phone number with ISD Code
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="e.g. +91 9876543210"
                  />
                </label>
                <label>
                  Your time zone
                  <select
                    value={form.timezone}
                    onChange={(e) => setForm((f) => ({ ...f, timezone: e.target.value }))}
                  >
                    {TIMEZONE_OPTIONS.map((o) => (
                      <option key={o.value || 'empty'} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="form-row">
                <label>
                  Password
                  <input
                    type="password"
                    required
                    value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                    placeholder="Password"
                  />
                </label>
                <label>
                  Confirm password
                  <input
                    type="password"
                    required
                    value={form.confirmPassword}
                    onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                    placeholder="Confirm password"
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Stream of education
                  <select
                    value={form.streamOfEducation}
                    onChange={(e) => setForm((f) => ({ ...f, streamOfEducation: e.target.value }))}
                  >
                    {STREAM_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Qualification
                  <select
                    value={form.qualification}
                    onChange={(e) => setForm((f) => ({ ...f, qualification: e.target.value }))}
                  >
                    {QUALIFICATION_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <p className="form-note">
                Note: You need to be at least pursuing your graduation to pursue CMA.
              </p>
              <div className="form-row">
                <label>
                  Name of the course you are interested in
                  <select
                    value={form.courseInterest}
                    onChange={(e) => setForm((f) => ({ ...f, courseInterest: e.target.value }))}
                  >
                    {COURSE_INTEREST_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Info Session you would like to attend
                  <select
                    value={form.infoSessionId}
                    onChange={(e) => setForm((f) => ({ ...f, infoSessionId: e.target.value }))}
                  >
                    <option value="">Select…</option>
                    {introSessions.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="form-row">
                <label>
                  All classes will be conducted in English. Are you comfortable with it?
                  <select
                    value={form.englishComfortable}
                    onChange={(e) => setForm((f) => ({ ...f, englishComfortable: e.target.value }))}
                  >
                    {ENGLISH_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  If you are working, attach your resume (PDF/Word, max 5MB)
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
                  />
                </label>
              </div>
              <div className="form-actions">
                <CTAButton type="submit" variant="primary" disabled={submitting}>
                  {submitting ? 'Registering…' : 'Register'}
                </CTAButton>
                <Link to="/enrol" className="btn btn-outline" style={{ marginLeft: '0.5rem' }}>
                  Cancel
                </Link>
              </div>
            </form>
              <div className="registration-page__media">
                <img src={registrationImage} alt="" className="registration-page__image" />
              </div>
            </div>
            )
          )}

          {step === 'terms' && courseInfo && (
            <>
              <div className="form-block">
                <h3>Fee structure</h3>
                <p>
                  {courseInfo.title}:{' '}
                  {courseInfo.feeAmount != null && courseInfo.feeAmount > 0
                    ? `${courseInfo.currency || 'USD'} ${courseInfo.feeAmount}`
                    : 'Contact for pricing'}
                </p>
                {courseInfo.termsContent && (
                  <>
                    <h3>Terms and conditions</h3>
                    <div className="terms-preview" style={{ whiteSpace: 'pre-wrap', marginBottom: '1rem' }}>
                      {courseInfo.termsContent}
                    </div>
                  </>
                )}
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  I have read and accept the terms, conditions, and fee structure. I understand that on acceptance an
                  invoice will be generated and I will remit payment and send proof via email. Enrolment completes when
                  payment is received; login details will be issued within 24 hours.
                </label>
              </div>
              <div className="form-actions">
                <CTAButton variant="primary" onClick={handleTermsContinue} disabled={submitting || !termsAccepted}>
                  {submitting ? 'Processing…' : 'Continue'}
                </CTAButton>
              </div>
            </>
          )}

          {step === 'done' && (
            <div className="form-block">
              {isCorporate ? (
                <>
                  <p>
                    <strong>Your organisation is registered.</strong> We&apos;ll follow up with next steps and options for your employees to use the package.
                  </p>
                  <div className="form-actions">
                    <CTAButton to="/for-corporates" variant="primary">
                      Back to For Corporates
                    </CTAButton>
                    {/* <CTAButton to="/my-courses" variant="outline" style={{ marginLeft: '0.5rem' }}>
                      My account
                    </CTAButton> */}
                  </div>
                </>
              ) : short ? (
                <>
                  <p>
                    <strong>You are registered.</strong> Payment can be made online on the website using cards/UPI. Your
                    course will appear in My Enrolled Courses. An invoice will be generated and saved; you can download
                    it from My Enrolled Courses.
                  </p>
                  <div className="form-actions">
                    <CTAButton to="/my-courses" variant="primary">
                      My Enrolled Courses
                    </CTAButton>
                  </div>
                </>
              ) : (
                <>
                  {longResult && (
                    <p>
                      <strong>Invoice generated.</strong> Invoice number: {longResult.invoiceNumber}. Remittance
                      details: {longResult.wiseRemittanceDetails || 'See invoice.'} Remit the money and send proof of
                      payment via email. Enrolment is complete when payment is received; login details will be issued
                      within 24 hours. The invoice will be saved and available in My Enrolled Courses.
                    </p>
                  )}
                  <div className="form-actions">
                    <CTAButton to="/my-courses" variant="primary">
                      My Enrolled Courses
                    </CTAButton>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
