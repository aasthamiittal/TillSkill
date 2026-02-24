import { Link } from 'react-router-dom'
import { PageHeader } from '../components/Common/PageHeader'

const programSlugs = [
  { slug: 'us-cma', label: 'US CMA' },
  { slug: 'fmaa', label: 'FMAA' },
  { slug: 'csca', label: 'CSCA' },
  { slug: 'excel', label: 'Excel and Finance' },
  { slug: 'others', label: 'Others' },
] as const

export function ProgramsPage() {
  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <PageHeader
            title="Programs"
            subtitle="From foundational finance to advanced management accounting and analytics."
          />
          <p className="programs-intro">
            Choose a program to view details. All our programs share the same rigorous approach and
            TillSkill advantage.
          </p>
          <ul className="programs-list">
            {programSlugs.map(({ slug, label }) => (
              <li key={slug}>
                <Link to={`/programs/${slug}`} className="programs-list-link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
