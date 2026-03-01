import React from 'react'
import { PageHeader } from '../components/Common/PageHeader'

const logo = new URL('../assets/logo.png', import.meta.url).href

export function AboutUsPage() {
  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <div className="program-hero">
            <div className="program-hero-text">
              <PageHeader
                title="Who We Are"
                subtitle="Human-centred, globally experienced mentors preparing future boardroom leaders."
              />
            </div>
            <div className="program-hero-logo">
              <img src={logo} alt="TillSkill™ logo" />
            </div>
          </div>
          <h2>About Us</h2>
          <h3>The New Challenge</h3>
          <p>
            The educational landscape is shifting rapidly, and not always for the better. We are
            witnessing a rush toward &quot;AI-first&quot; learning, where students have to
            increasingly rely on chatbots that prioritise speed over accuracy. While technology is
            a powerful tool, it often fails to understand the nuance of a student&apos;s unique
            struggle. AI models can &quot;hallucinate&quot; incorrect facts, offer generic answers
            that miss the context of the question, and lack the empathy required to guide a
            professional through the emotional highs and lows of a rigorous qualification. In this
            environment, students are risking their careers on &quot;fast food&quot; education that
            leaves them with a certificate but without the deep, practical understanding required to
            lead in the boardroom.
          </p>
          <h3>Enter TillSkill™</h3>
          <p>
            This is where TillSkill™ steps in to bridge the gap. We were founded on the belief
            that while tools change, the need for human wisdom remains constant. At TillSkill™, we
            do not just teach you &quot;what&quot; the answer is; we explore &quot;why&quot; it is
            the answer and &quot;how&quot; you can apply it in a real-world international setup.
            Our approach is built on genuine human interaction: small class sizes, personalised
            accountability, and mentors with decades of global industry experience who view you as a
            future leader, not just a subscription number. We leverage technology to enhance your
            learning, not to replace the teacher, ensuring you become a global management accountant
            who can control innovation rather than be replaced by it.
          </p>
          <h3>It&apos;s a Continuing Journey</h3>
          <p>
            Our vision extends far beyond the CMA qualification. We are actively building a
            comprehensive ecosystem for the modern financial leader. TillSkill™ will keep
            expanding its bouquet of offerings to include other prestigious designations, along with
            specialised leadership modules. Furthermore, we are developing professional networks
            designed to assist professionals in navigating complex career transitions and
            organisational challenges, ensuring that your growth continues long after you have passed
            your exams.
          </p>
          <h3>We Hear You - Always</h3>
          <p>
            We are building this community for you, and we believe that the best way to grow is by
            listening. We welcome your suggestions for new courses or areas of study where you feel
            a &quot;human touch&quot; is missing in the market. While every new addition is subject
            to the availability of our expert resources—because we refuse to compromise on
            quality—we promise that every suggestion will be seriously considered. Join us as we
            till your skills until you are ready to skill the world.
          </p>
        </div>
      </section>
    </div>
  )
}
