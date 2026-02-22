import { PageHeader } from '../components/Common/PageHeader'
import { CTAButton } from '../components/Common/CTAButton'

export function ProgramsPage() {
  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <PageHeader
            title="Programs"
            subtitle="From foundational finance to advanced management accounting and analytics."
          />
          <h2>US CMA: The Global Gold Standard</h2>
        <p>
          The Certified Management Accountant (CMA) certification, awarded by the Institute of
          Management Accountants (IMA, USA), is the global benchmark for management accountants and
          financial professionals.
        </p>
        <h3>Requirements to Earn Your CMA</h3>
        <ul>
          <li>Education: Bachelor’s degree from an accredited college/university (can be in progress).</li>
          <li>Commencement: You can start your CMA journey after passing Grade 12.</li>
          <li>Examination: Pass both Part 1 and Part 2 of the CMA exam.</li>
          <li>Experience: Two continuous years of professional experience in management accounting or financial management.</li>
          <li>Membership: Active membership with the IMA.</li>
        </ul>
        <div className="cta-row">
          <CTAButton to="/intro-sessions">Attend Our Free Webinar</CTAButton>
          <CTAButton to="/contact" variant="outline">
            Contact us for personalised guidance
          </CTAButton>
        </div>
        <p className="muted">
          Refer to our Terms &amp; Conditions for full details of our policies and accreditation
          status.
        </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
        <h2>The TillSkill Advantage</h2>
        <p>
          AI is replacing jobs, not professionals. Our programs are designed to help you become the
          professional who will govern AI in your organisation.
        </p>
        <div className="three-column-cards">
          <article className="info-card">
            <h3>Jobs on Their Way Out</h3>
            <p>
              Every industrial revolution weeds out old professions and creates new. We help you
              prepare for the inevitable shifts ahead instead of clinging to yesterday&apos;s roles.
            </p>
          </article>
          <article className="info-card">
            <h3>From Professions to Skills</h3>
            <p>
              Stenographer, computer operator, Excel expert — many standalone professions have
              turned into essential skills. Lifelong learning is not optional anymore; it is the new
              normal.
            </p>
          </article>
          <article className="info-card">
            <h3>First Mover Advantage</h3>
            <p>
              Whether you are entering the workforce or already in it, the future will be different
              from today. Prepare early and gain the first mover advantage.
            </p>
          </article>
        </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
        <h2>Other Programs</h2>
        <div className="two-column">
          <div>
            <h3>FMAA</h3>
            <p>
              Finance for Managers and Aspiring Analysts (FMAA) makes finance simple and practical
              for decision-makers who may not come from an accounting background.
            </p>
          </div>
          <div>
            <h3>CSCA</h3>
            <p>
              The Certified in Strategy and Competitive Analysis (CSCA) designation complements your
              CMA by deepening strategic thinking and competitive analysis skills.
            </p>
          </div>
        </div>
        <div className="two-column">
          <div>
            <h3>Excel &amp; Finance</h3>
            <p>
              Excel in Finance focuses on real-world financial modelling and analysis, using Excel
              as the tool to drive insight and decision-making.
            </p>
          </div>
          <div className="stacked-cta">
            <p>
              Many of these offerings are upcoming or have limited seats. Stay tuned and let us know
              your interest.
            </p>
            <CTAButton to="/contact">Tell us what you need</CTAButton>
          </div>
        </div>
        </div>
      </section>
    </div>
  )
}

