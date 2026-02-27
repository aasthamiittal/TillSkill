import React, { useState } from 'react'

export type FAQItem = {
  question: string
  answer: React.ReactNode
}

type FAQAccordionProps = {
  items: FAQItem[]
  className?: string
}

export function FAQAccordion({ items, className = '' }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className={`faq-accordion ${className}`.trim()}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div key={index} className="faq-item">
            <button
              type="button"
              className="faq-question"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              <span>{item.question}</span>
              <span className="faq-icon" aria-hidden>{isOpen ? '−' : '+'}</span>
            </button>
            <div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              className={`faq-answer ${isOpen ? 'is-open' : ''}`}
              aria-hidden={!isOpen}
            >
              <div className="faq-answer-inner">{item.answer}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
