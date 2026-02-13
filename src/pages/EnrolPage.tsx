import React, { useState } from 'react'
import { PageHeader } from '../components/Common/PageHeader'
import { enrolCourses } from '../data/courses'
import { CourseCard } from '../components/Enrol/CourseCard'
import { useCart } from '../context/CartContext'

const filters = ['All', 'US CMA - Regular', 'US CMA - Fast Track', 'CSCA', 'FMAA', 'Excel and Finance'] as const
type FilterType = (typeof filters)[number]

export function EnrolPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All')
  const { addToCart } = useCart()

  const filtered = enrolCourses.filter((course) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'FMAA' && course.title.startsWith('FMAA')) return true
    if (activeFilter === 'CSCA' && course.title.includes('CSCA')) return true
    if (activeFilter === 'Excel and Finance' && (course.title.includes('Excel') || course.title.includes('Leases'))) {
      return true
    }
    if (activeFilter === 'US CMA - Regular' && course.title.includes('Regular')) return true
    if (activeFilter === 'US CMA - Fast Track' && course.title.includes('Fast Track')) return true
    return false
  })

  return (
    <div className="page">
      <PageHeader
        title="Enrol with TillSkill"
        subtitle="Choose the cohort or session that fits your goals and schedule."
      />

      <section className="section">
        <p>
          Our expert educational services are designed to provide personalised guidance and support,
          ensuring students achieve their academic goals with confidence. Trust us to elevate your
          learning experience through innovative and tailored solutions.
        </p>
      </section>

      <section className="section">
        <div className="filter-tabs">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`filter-tab ${activeFilter === filter ? 'is-active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="course-grid">
          {filtered.map((course) => (
            <CourseCard
              key={course.id}
              course={{
                id: course.id,
                title: course.title,
                price: course.priceDisplay,
                description: course.description,
                priceDisplay: course.priceDisplay,
                isSale: course.isSale,
                originalPriceDisplay: course.originalPriceDisplay,
              }}
              onAddToCart={() =>
                addToCart({
                  id: course.id,
                  title: course.title,
                  price: course.priceDisplay,
                })
              }
            />
          ))}
        </div>
      </section>
    </div>
  )
}

