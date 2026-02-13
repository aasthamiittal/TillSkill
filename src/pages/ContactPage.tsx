import { PageHeader } from '../components/Common/PageHeader'
import { ContactForm } from '../components/Contact/ContactForm'
import { CTAButton } from '../components/Common/CTAButton'

export function ContactPage() {
  return (
    <div className="page">
      <PageHeader
        title="Contact TillSkill"
        subtitle="Have questions about the US CMA or our other programs? We are here to help."
      />

      <section className="section two-column">
        <div>
          <h2>Let&apos;s talk about your goals</h2>
          <p>
            Whether you are a student, working professional, or organisation, we can help you map
            the right learning pathway. Share your questions and we&apos;ll respond with
            personalised guidance.
          </p>
          <p className="muted">
            You can also write to us directly at{' '}
            <a href="mailto:support@tillskill.com">support@tillskill.com</a>.
          </p>
          <div className="stacked-cta">
            <CTAButton to="/intro-sessions">Join a free US CMA intro webinar</CTAButton>
            <CTAButton to="/study-support" variant="outline">
              Schedule a study support appointment
            </CTAButton>
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </section>
    </div>
  )
}

