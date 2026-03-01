import React from 'react'
import type { Course } from '../../context/CartContext'
import { CTAButton } from '../Common/CTAButton'

type CourseCardProps = {
  course: Course & {
    description: string
    priceDisplay?: string
    isSale?: boolean
    originalPriceDisplay?: string
  }
  onAddToCart: () => void
  /** Slug for registration route e.g. us-cma, excel, intro */
  registerSlug?: string
}

export function CourseCard({ course, onAddToCart, registerSlug }: CourseCardProps) {
  return (
    <article className="course-card">
      <h3>{course.title}</h3>
      <p className="course-description">{course.description}</p>
      {/* Pricing removed – registration flow used instead
      <div className="course-price-row">
        <span className={`course-price ${course.isSale ? 'is-sale' : ''}`}>
          {course.priceDisplay}
        </span>
        {course.isSale && course.originalPriceDisplay && (
          <span className="course-original-price">{course.originalPriceDisplay}</span>
        )}
      </div>
      */}
      <div className="course-actions">
        <CTAButton variant="secondary" to="/programs">
          Learn More
        </CTAButton>
        {registerSlug ? (
          <CTAButton variant="primary" to={`/register/${registerSlug}`}>
            Register for Free
          </CTAButton>
        ) : (
          <CTAButton variant="primary" onClick={onAddToCart}>
            Register for Free
          </CTAButton>
        )}
      </div>
    </article>
  )
}

