import React from 'react'
import { PageHeader } from '../components/Common/PageHeader'

export function WhoWeArePage() {
  return (
    <div className="page">
      <PageHeader
        title="Who We Are"
        subtitle="Human-centred, globally experienced mentors preparing future boardroom leaders."
      />

      <section className="section">
        <h2>The New Challenge</h2>
        <p>
          The educational landscape is shifting rapidly, and not always for the better. We are
          witnessing a rush toward &quot;AI-first&quot; learning, where students rely on chatbots
          that prioritise speed over accuracy.
        </p>
        <p>
          AI models can hallucinate incorrect facts, offer generic answers that miss the context,
          and lack the empathy required to guide a professional through the emotional highs and lows
          of a rigorous qualification. In this environment, students are risking their careers on
          &quot;fast food&quot; education that leaves them with a certificate but without the deep,
          practical understanding required to lead in the boardroom.
        </p>
      </section>

      <section className="section section-alt">
        <h2>Enter TillSkill.com</h2>
        <p>
          TillSkill.com bridges this gap. We were founded on the belief that while tools change, the
          need for human wisdom remains constant. We do not just teach you &quot;what&quot; the
          answer is; we explore &quot;why&quot; it is the answer and &quot;how&quot; you can apply
          it in a real-world international setup.
        </p>
        <p>
          Our approach is built on genuine human interaction: small class sizes, personalised
          accountability, and mentors with decades of global industry experience who view you as a
          future leader, not just a subscription number. We leverage technology to enhance your
          learning, not to replace the teacher.
        </p>
      </section>

      <section className="section">
        <h2>It&apos;s a Continuing Journey</h2>
        <p>
          Our vision extends far beyond the CMA qualification. We are building a comprehensive
          ecosystem for the modern financial leader, expanding our offerings to include other
          prestigious designations and specialised leadership modules.
        </p>
        <p>
          We are also developing professional networks to help you navigate complex career
          transitions and organisational challenges, ensuring that your growth continues long after
          you have passed your exams.
        </p>
      </section>

      <section className="section section-alt">
        <h2>We Hear You — Always</h2>
        <p>
          We are building this community for you. We welcome your suggestions for new courses or
          areas of study where you feel a human touch is missing in the market.
        </p>
        <p>
          While every new addition is subject to the availability of our expert resources—because we
          refuse to compromise on quality—we promise that every suggestion will be seriously
          considered. Join us as we till your skills until you are ready to skill the world.
        </p>
      </section>

      <section id="terms" className="section">
        <h2>Terms and Conditions of Service</h2>
        <p className="muted">
          Last Updated: January 16, 2026 &middot; Business Name: TillSkill™ &middot; Jurisdiction:
          Victoria, Australia
        </p>

        <h3>Regulatory Disclaimer and Accreditation Status</h3>
        <p>
          TillSkill™ is a specialised provider of professional examination preparation for global
          designations. We are not a Registered Training Organisation (RTO) within the Australian
          VET sector and our courses are Non-Nationally Recognised Training (Non-NRT).
        </p>
        <p>
          Our courses do not lead to an AQF qualification or Statement of Attainment. We do not
          issue any certification or diploma, although we may provide a Certificate of Attendance
          for professional development verification.
        </p>
        <p>
          TillSkill™ is an IMA (USA) Silver Approved Learning Partner. Our preparatory training is
          for designations issued by third-party international bodies. These designations are
          awarded solely by those external bodies upon meeting their examination and experience
          requirements.
        </p>

        <h3>Retake Assurance</h3>
        <p>
          Instead of a standard &quot;Pass Guarantee,&quot; diligent students who do not pass their
          external exam may be eligible to re-take the course at no additional tuition cost, subject
          to strict attendance, completion, and effort criteria.
        </p>

        <h3>Key Policies (Summary)</h3>
        <ul>
          <li>Standard digital course access is six months unless otherwise stated.</li>
          <li>
            Refunds are limited and not available once a live class has been attended or digital
            materials accessed.
          </li>
          <li>
            All intellectual property in our materials remains with TillSkill™ or its licensors.
          </li>
          <li>
            We maintain a professional learning environment and may remove students for misconduct.
          </li>
          <li>These Terms are governed by the laws of Victoria, Australia.</li>
        </ul>

        {/* <p className="muted">
          This is a high-level summary for website display. Please refer to your enrolment
          documentation for the full Terms and Conditions text.
        </p> */}
      </section>
    </div>
  )
}

