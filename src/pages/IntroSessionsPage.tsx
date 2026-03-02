import React from 'react'
import { PageHeader } from '../components/Common/PageHeader'
import { introSessions } from '../data/courses'
import { CTAButton } from '../components/Common/CTAButton'

export function IntroSessionsPage() {
  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <PageHeader
            title="Introductory Webinars – March 2026"
            subtitle="Get absolute clarity on the US CMA certification before you enrol."
          />
          <p>
            Want to know more before enrolling for the US CMA course? Join our monthly 1.5-hour
            Introductory Webinars where we answer your questions, such as:
          </p>
          <ul>
            <li>
              What is the US CMA qualification? How is it different from other professional accounting
              qualifications?
            </li>
            <li>What is the demand and outcome of this qualification?</li>
            <li>How long does it take to qualify and what support will you receive?</li>
            <li>Is it relevant if you are not an accountant?</li>
            <li>Why start your journey with TillSkill?</li>
          </ul>
          <p className="muted">Don’t miss the special offer for attendees of this month’s webinar.</p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="course-grid">
            {introSessions.map((session) => (
              <article key={session.id} className="course-card">
                <h3>{session.title}</h3>
                <p className="course-description">
                  Not sure where to start? Join our FREE live webinar on the US CMA certification.
                </p>
                <div className="course-price-row">
                  <span className="course-price">{session.priceDisplay}</span>
                </div>
                <div className="course-actions">
                  <CTAButton variant="primary">Register for free</CTAButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

