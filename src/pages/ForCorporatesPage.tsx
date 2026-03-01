import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/Common/PageHeader'
import { CTAButton } from '../components/Common/CTAButton'
const corporateImg = new URL('../assets/Corporate-image.png', import.meta.url).href


const CORPORATE_PACKAGE = {
  title: 'Corporate Package',
  description:
    'Register your organisation once. Your employees get access to our US CMA intro sessions and learning resources under your corporate package — no need for each employee to register separately.',
  priceDisplay: 'Contact for pricing',
  features: [
    'Organisation registers once; employees use the package under your account',
    'Access to introductory sessions and learning resources for your team',
    'Ideal for L&D, finance and accounting teams',
    'Flexible scheduling and tailored support for your organisation',
  ],
}

export function ForCorporatesPage() {
  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <PageHeader
            title="For Corporates"
            subtitle="Register your organisation once. Your employees use the package."
          />
          <p>
            TillSkill™ offers a corporate package: your organisation registers, and employees get
            access to our US CMA intro sessions and learning resources under that package — no
            need for each employee to sign up individually.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="for-corporates__layout">
            <div className="course-card for-corporates__card">
              <h3>{CORPORATE_PACKAGE.title}</h3>
              <p className="course-description">{CORPORATE_PACKAGE.description}</p>
              <ul className="for-corporates-features">
                {CORPORATE_PACKAGE.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <div className="course-price-row">
                <span className="course-price">{CORPORATE_PACKAGE.priceDisplay}</span>
              </div>
              <div className="course-actions">
                <CTAButton variant="primary" to="/register/intro?for=corporate">
                  Register your organisation
                </CTAButton>
              </div>
            </div>
            <div className="for-corporates__media">
              <img src={corporateImg} alt="Corporate learning with TillSkill" className="for-corporates__image" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="muted">
            Need a different scope or multiple batches?{' '}
            <Link to="/contact">Contact us</Link> and we’ll tailor a package for your organisation.
          </p>
        </div>
      </section>
    </div>
  )
}
