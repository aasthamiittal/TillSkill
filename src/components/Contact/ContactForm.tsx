import React, { useState } from 'react'
import { CTAButton } from '../Common/CTAButton'

export function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoUrl = `mailto:support@tillskill.com?subject=${encodeURIComponent(
      formState.subject || 'TillSkill™ enquiry',
    )}&body=${encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`,
    )}`

    window.location.href = mailtoUrl
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Name
          <input
            required
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Your full name"
          />
        </label>
        <label>
          Email
          <input
            required
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label>
        Subject
        <input
          required
          name="subject"
          value={formState.subject}
          onChange={handleChange}
          placeholder="How can we help you?"
        />
      </label>
      <label>
        Message
        <textarea
          required
          name="message"
          rows={5}
          value={formState.message}
          onChange={handleChange}
          placeholder="Share any questions or details about your learning goals."
        />
      </label>
      <div className="form-actions">
        <CTAButton variant="primary">Send message</CTAButton>
      </div>
    </form>
  )
}

