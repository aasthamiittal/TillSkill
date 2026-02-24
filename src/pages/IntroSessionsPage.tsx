import { PageHeader } from '../components/Common/PageHeader'
import { introSessions } from '../data/courses'
import { CTAButton } from '../components/Common/CTAButton'

export function IntroSessionsPage() {
  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <PageHeader
            title="Monthly Introductory Webinars"
            subtitle="Get absolute clarity on the US CMA before you enrol."
          />
          <p>
          Want to know more before enrolling for the US CMA course? Join our monthly 1-hour
          Introductory Webinar where we answer your questions, such as:
        </p>
        <ul>
          <li>What is the US CMA qualification? How is it different from other qualifications?</li>
          <li>What is the demand and outcome of this qualification?</li>
          <li>How long does it take to qualify and what support will you receive?</li>
          <li>Is it relevant if you are not an accountant?</li>
        </ul>
        <p className="muted">
          Don’t miss the special offer for attendees of this month’s webinar.
        </p>
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

      <section className="section">
        <div className="container">
        <blockquote className="testimonial">
          <p>
            “The webinar provided me absolute clarity on what career path I should take and why. All
            my questions were answered. Looking forward to commencing the qualification with
            TillSkill’s support.”
          </p>
          <footer>Former Attendee</footer>
        </blockquote>
        <blockquote className="testimonial">
          <p>
            “What I really found useful was that the webinar did not coerce me to pursue the
            qualification. Rather, it helped me weigh my options. Definitely recommended to young
            students.”
          </p>
          <footer>Former Attendee</footer>
        </blockquote>
        </div>
      </section>
    </div>
  )
}

