import React from 'react'
import type { Course } from '../../context/CartContext'
import { CTAButton } from '../Common/CTAButton'

type CourseCardProps = {
  course: Course & {
    description: string
    priceDisplay: string
    isSale?: boolean
    originalPriceDisplay?: string
  }
  onAddToCart: () => void
}

export function CourseCard({ course, onAddToCart }: CourseCardProps) {
  return (
    <article className="course-card">
      <h3>{course.title}</h3>
      <p className="course-description">{course.description}</p>
      <div className="course-price-row">
        <span className={`course-price ${course.isSale ? 'is-sale' : ''}`}>
          {course.priceDisplay}
        </span>
        {course.isSale && course.originalPriceDisplay && (
          <span className="course-original-price">{course.originalPriceDisplay}</span>
        )}
      </div>
      <div className="course-actions">
        <CTAButton variant="secondary" to="/programs">
          Learn More
        </CTAButton>
        <CTAButton variant="primary" onClick={onAddToCart}>
          Add to Cart
        </CTAButton>
      </div>
    </article>
  )
}

