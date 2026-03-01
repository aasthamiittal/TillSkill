import React, { useState } from 'react'
import { PageHeader } from '../components/Common/PageHeader'
import { CTAButton } from '../components/Common/CTAButton'

export function StudySupportPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="page">
      <section className="section">
        <div className="container two-column">
        <div>
          <PageHeader
            title="Study and Support"
            subtitle="TillSkill™ students can book one-on-one doubt-clearing appointments with mentors."
          />
          <h2>Need Help? Schedule Your Appointment.</h2>
          <p>
            Confused or facing challenges in your studies? Use this form to request a personal
            meeting with your mentor. This session is for TillSkill™ students (Regular/Fast Track)
            and is focused on clarifying doubts, not personal coaching.
          </p>
          <ul>
            <li>Attend classes regularly and review your study material before booking.</li>
            <li>
              Prepare your questions clearly — this is a rehearsal for explaining issues to
              management in real life.
            </li>
            <li>Limit yourself to one session per calendar month unless advised otherwise.</li>
          </ul>
        </div>

        <div>
          {submitted ? (
            <div className="support-confirmation">
              <h3>Thank you for your request.</h3>
              <p>
                Your mentor will review your request and get back to you with a suggested time slot
                and meeting mode.
              </p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Batch Name (required)
                <input required name="batchName" placeholder="e.g. US CMA Part 1&2 Fast Track Jan 2026" />
              </label>
              <div className="form-row">
                <label>
                  First Name
                  <input required name="firstName" />
                </label>
                <label>
                  Last Name
                  <input required name="lastName" />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Email
                  <input required type="email" name="email" />
                </label>
                <label>
                  Phone
                  <input required name="phone" />
                </label>
              </div>
              <label>
                Course (required)
                <input required name="course" placeholder="US CMA / FMAA / CSCA / Excel in Finance" />
              </label>
              <label>
                Subject (brief topics to discuss)
                <input required name="subject" />
              </label>
              <label>
                Further Explanation
                <textarea
                  required
                  name="explanation"
                  rows={4}
                  placeholder="Keep your query short and to-the-point. Explain where you are stuck."
                />
              </label>
              <label>
                Your city and country (for your time zone)
                <input required name="location" />
              </label>
              <div className="form-row">
                <label>
                  Preferred Date 1
                  <input required type="date" name="date1" />
                </label>
                <label>
                  Preferred Time 1 (AET)
                  <input required type="time" name="time1" />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Preferred Date 2
                  <input type="date" name="date2" />
                </label>
                <label>
                  Preferred Time 2 (AET)
                  <input type="time" name="time2" />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Preferred Date 3
                  <input type="date" name="date3" />
                </label>
                <label>
                  Preferred Time 3 (AET)
                  <input type="time" name="time3" />
                </label>
              </div>
              <div className="form-actions">
                <CTAButton variant="primary">Submit request</CTAButton>
              </div>
            </form>
          )}
        </div>
        </div>
      </section>
    </div>
  )
}

