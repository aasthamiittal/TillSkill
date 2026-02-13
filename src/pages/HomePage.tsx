import React from 'react'
import { CTAButton } from '../components/Common/CTAButton'
import { PageHeader } from '../components/Common/PageHeader'
import logo from '../assets/logo.png'

export function HomePage() {
  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">Australia’s Premier IMA Authorised Training Partner</p>
          <h1>Be the Boardroom’s Most Valued Asset.</h1>
          <p className="hero-subtitle">
            Rise above accounting and reporting. Create value as a global management accountant.
          </p>
          <div className="hero-cta-group">
            <CTAButton to="/enrol">Explore All Our Offerings</CTAButton>
            <CTAButton to="/intro-sessions" variant="outline">
              Join a Free Intro Session
            </CTAButton>
          </div>
          <p className="hero-tagline">
            TillSkill™ - Till Your Skill, Till You Skill
          </p>
        </div>
        <div className="hero-visual">
          <div className="hero-logo-card">
            <img src={logo} alt="TillSkill logo" className="hero-logo-image" />
            <p className="hero-logo-caption">
              Finance and management coaching from mentors with global boardroom
              experience.
            </p>
          </div>
        </div>
      </section>

      <section className="section highlight-grid">
        <div className="highlight-card">
          <h2>The US CMA Certification</h2>
          <p>
            Fast-track your global accounting career with TillSkill™. The CMA qualification is the
            global benchmark for management accountants and financial professionals.
          </p>
          <CTAButton to="/programs">Discover the US CMA Path</CTAButton>
        </div>
        <div className="highlight-card">
          <h2>The TillSkill™ Difference</h2>
          <p>
            TillSkill™ is not just another text/video-dump website. We are a community of mentors
            and future leaders.
          </p>
          <ul>
            <li>
              <strong>Humans Over Chatbots:</strong> Real mentors who answer the &quot;Why&quot; and
              &quot;How,&quot; not just the &quot;What.&quot;
            </li>
            <li>
              <strong>Global Experience:</strong> Coaches from top international institutes with
              decades of experience across industries and economies.
            </li>
            <li>
              <strong>Shared Responsibility:</strong> Limited batch sizes so no one is left behind.
            </li>
          </ul>
          <CTAButton to="/who-we-are" variant="secondary">
            Learn more
          </CTAButton>
        </div>
      </section>

      <section className="section section-alt">
        <PageHeader
          title="IMA Silver Learning Partner Advantage"
          subtitle="Your curriculum and instruction aligned with what global examiners are testing today."
        />
        <div className="two-column">
          <p>
            TillSkill™ as an IMA Silver Approved Learning Partner offers preparation through an
            approved publisher of learning and testing material. This accreditation is your
            guarantee that our curriculum and instruction meet the highest global standards.
          </p>
          <p>
            Choosing TillSkill™ gives you a critical edge over candidates relying on unverified
            providers. With us, you are not just taking a course; you are securing a professional
            advantage designed to help you pass on your first attempt.
          </p>
        </div>
      </section>

      <section className="section">
        <PageHeader
          title="No Tall Promises. Just Real Performance."
          subtitle="We promise only what we can fulfil: rigorous preparation, honest feedback, and genuine support."
        />
        <div className="three-column-cards">
          <article className="info-card">
            <h3>Asset Creation</h3>
            <p>
              Our goal is to make you boardroom ready, and then make you a valuable asset in the
              boardroom. Certification is the start; continuous growth is the journey.
            </p>
          </article>
          <article className="info-card">
            <h3>Universal Principles</h3>
            <p>
              We teach management concepts in a way that is universally applicable — for any
              professional who intends to lead an organisation one day, not just accountants.
            </p>
          </article>
          <article className="info-card">
            <h3>Future Ready</h3>
            <p>
              AI will replace jobs, not professionals. We help you become the professional who
              controls and leads innovation.
            </p>
          </article>
        </div>
      </section>
    </div>
  )
}

