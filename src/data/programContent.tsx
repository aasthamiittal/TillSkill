import { Link } from 'react-router-dom'
import { CTAButton } from '../components/Common/CTAButton'
import cmaImg from '../assets/cma-img.png'

/**
 * Single source of program content. All program pages (US CMA, FMAA, CSCA, Excel and Finance, Others)
 * display this same content as per requirement.
 */
export function ProgramContent() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="program-hero">
            <div className="program-hero-text">
              <h1 className="program-hero-title">
                The US CMA
                <br />
                Qualification
              </h1>
              <p className="program-hero-tagline">The Global Gold Standard</p>
            </div>
            <div className="program-hero-logo">
              <img src={cmaImg} alt="CMA® Certified Management Accountant" />
            </div>
          </div>
          <p>
            The Certified Management Accountant (CMA) certification, awarded by the Institute of
            Management Accountants (IMA, USA), is the global benchmark for management accountants
            and financial professionals.
          </p>
          <h3>Requirements to Earn Your CMA</h3>
          <ul>
            <li>Education: Bachelor&apos;s degree from an accredited college/university.</li>
            <li>Commencement: After passing your Grade 12.</li>
            <li>Examination: Pass both Part 1 and Part 2 of the CMA exam.</li>
            <li>
              Experience: Two continuous years of professional experience in management accounting
              or financial management.
            </li>
            <li>Membership: Active membership with the IMA.</li>
          </ul>
          <div className="cta-row">
            <CTAButton to="/intro-sessions">Attend our FREE WEBINAR for further details</CTAButton>
            <CTAButton to="/contact" variant="outline">
              Contact us for personalised guidance
            </CTAButton>
          </div>
          <p className="muted">
            Refer to our <Link to="/terms-and-conditions">T&amp;C here</Link>.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>The TillSkill Advantage</h2>
          <p>
            AI is replacing jobs, not professionals.
            <br />
            Become a professional who will govern AI in your organisation.
          </p>
          <div className="three-column-cards">
            <article className="info-card">
              <h3>Jobs on Their Way Out</h3>
              <p>
                Every industrial revolution weeds out old professions and creates new. Are you still
                satisfied with continuing doing what you have been doing so far, or are you
                preparing for the inevitable?
              </p>
            </article>
            <article className="info-card">
              <h3>From Professions To Skills</h3>
              <p>
                Nobody needs a stenographer, computer operator, or an Excel expert. All these
                professions are already turned into skills that professionals are required to
                possess. Lifelong learning is no longer just a statement - it is the reality today.
              </p>
            </article>
            <article className="info-card">
              <h3>First Mover Advantage</h3>
              <p>
                Whether you are someone looking to enter the workforce, or have been in there for
                some time, know this - the future will be quite different from the present. Good
                that you survived the past and the present. Now prepare for the future and gain the
                first mover advantage.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
