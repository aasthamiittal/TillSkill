import { Link } from 'react-router-dom'
import { PageHeader } from '../components/Common/PageHeader'
import { programSlugs } from '../data/programContent'

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
            Tillskill™ advantage.
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
