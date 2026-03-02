import React from 'react'
import { Link } from 'react-router-dom'
import { CTAButton } from '../components/Common/CTAButton'
import { PageHeader } from '../components/Common/PageHeader'
import { FAQAccordion, type FAQItem } from '../components/Common/FAQAccordion'

const boardroomImage = new URL('../assets/Boardroom-img.png', import.meta.url).href

const cmaFAQs: FAQItem[] = [
  {
    question: 'Who is the US CMA for?',
    answer: (
      <p>
        The US CMA suits finance and accounting students, early-career professionals in reporting
        or FP&amp;A, and anyone aiming for management accounting or business partnering roles in
        MNCs, consulting, or shared services. You can start preparing with TillSkill™ after Grade 12
        while completing your degree.
      </p>
    ),
  },
  {
    question: 'How long does it take to complete the US CMA?',
    answer: (
      <p>
        Many diligent learners complete their prep in 6–8 months. Actual timelines depend on your
        schedule, exam windows, and study pace. TillSkill™ offers structured batches and flexible
        access to recorded sessions so you can balance work or studies.
      </p>
    ),
  },
  {
    question: 'What is the exam structure?',
    answer: (
      <p>
        The US CMA has two parts: Part 1 – Financial Planning, Performance and Analytics; Part 2 –
        Strategic Financial Management. Each part is a computer-based exam. TillSkill™ prepares you
        with curriculum aligned to the latest IMA exam specifications and plenty of practice
        questions and mocks.
      </p>
    ),
  },
  {
    question: 'How does TillSkill™ support differ from self-study?',
    answer: (
      <p>
        TillSkill™ gives you live classes, 1:1 doubt clearing, mock exams, and mentors with global
        boardroom experience. You get structure, accountability, and the &quot;why&quot; behind
        concepts—not just content. As an IMA Silver Approved Learning Partner, we use approved
        learning and testing material.
      </p>
    ),
  },
  {
    question: 'What are the fees and payment options?',
    answer: (
      <p>
        Program fees and inclusions vary by batch and format. Contact us for current pricing and
        payment options. Our Terms &amp; Conditions describe refunds, retake assurance, and access
        periods—we recommend reading them before enrolling.
      </p>
    ),
  },
]

export function HomePage() {
  return (
    <div className="page home-page">
      {/* Hero – original content kept */}
      <section className="hero">
        <div className="container">
          <div className="hero-text">
            <p className="eyebrow">Australia’s Premier IMA Authorised Training Partner</p>
            <h1>Be the Boardroom’s Most Valued Asset.</h1>
            <p className="hero-subtitle">
              Rise above accounting and reporting. Create value as a global management accountant.
            </p>
            <div className="hero-cta-group">
              <CTAButton to="/intro-sessions" variant="outline">
                Join a Free Intro Session
              </CTAButton>
            </div>
            <p className="hero-tagline">
              TillSkill™ - Till Your Skill, Till You Skill
            </p>
          </div>
          <div className="hero-visual">
            {/* <div className="hero-logo-card"> */}
              <img src={boardroomImage} alt="Boardroom – global management accounting" className="hero-logo-image" />

            {/* </div> */}
          </div>
        </div>
      </section>

      {/* Stats strip – original content kept */}
      <section className="section">
        <div className="container">
          <div className="stats-strip">
            <div className="stat-item">
              <span className="stat-value">IMA</span>
              <span className="stat-label">Silver Learning Partner</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">2-part</span>
              <span className="stat-label">Examination</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">Flexible</span>
              <span className="stat-label">Study at your pace</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">Global</span>
              <span className="stat-label">Boardroom-ready skills</span>
            </div>
          </div>
        </div>
      </section>

      {/* US CMA summary – original content kept */}
      <section className="section">
        <div className="container">
          <div className="cma-summary">
            <h2 className="cma-summary-title">US CMA: Certified Management Accountant</h2>
            <div className="cma-summary-grid">
              <div className="cma-summary-item">
                <h3>Exam structure</h3>
                <p>2 papers to clear – Part 1 and Part 2.</p>
              </div>
              <div className="cma-summary-item">
                <h3>Typical timeline</h3>
                <p>9–15 months. Many diligent learners complete their prep in lesser time.*</p>
              </div>
              <div className="cma-summary-item">
                <h3>For students & professionals</h3>
                <p>Live plus recorded sessions designed for working schedules.</p>
              </div>
              <div className="cma-summary-item">
                <h3>1:1 doubt clearing</h3>
                <p>Personalised guidance available on request to keep you exam-ready at every step.</p>
              </div>
            </div>
            <p className="cma-summary-footnote">
              *Indicative only. Actual timelines and outcomes vary by learner, effort and exam
              window selection.
            </p>
          </div>
        </div>
      </section>

      {/* Highlight cards – original content kept */}
      <section className="section section-alt">
        <div className="container">
          <div className="highlight-grid">
            <div className="highlight-card">
              <h2>The US CMA Certification</h2>
              <p>
                Fast-track your global accounting career with TillSkill™. The CMA qualification is the
                global benchmark for management accountants and financial professionals.
              </p>
              <CTAButton to="/programs">Discover the US CMA Path</CTAButton>
            </div>
            <div className="highlight-card">
              <h2>The TillSkill™ Difference</h2>
              <p>
                TillSkill™ is not just another text/video-dump website. We are a community of mentors
                and future leaders.
              </p>
              <ul>
                <li>
                  <strong>Humans Over Chatbots:</strong> Real mentors who answer the &quot;Why&quot; and
                  &quot;How,&quot; not just the &quot;What.&quot;
                </li>
                <li>
                  <strong>Global Experience:</strong> Coaches from top international institutes with
                  decades of experience across industries and economies.
                </li>
                <li>
                  <strong>Shared Responsibility:</strong> Limited batch sizes so no one is left behind.
                </li>
              </ul>
              <CTAButton to="/about-us" variant="secondary">
                Learn more
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* IMA Silver – original content kept */}
      <section className="section">
        <div className="container">
          <PageHeader
            title="IMA Silver Learning Partner Advantage"
            subtitle="Your curriculum and instruction aligned with what global examiners are testing today."
          />
          <div className="two-column">
            <p>
              TillSkill™ as an IMA Silver Approved Learning Partner offers preparation through an
              approved publisher of learning and testing material. This accreditation is your
              guarantee that our curriculum and instruction meet the highest global standards.
            </p>
            <p>
              Choosing TillSkill™ gives you a critical edge over candidates relying on unverified
              providers. With us, you are not just taking a course; you are securing a professional
              advantage designed to help you pass on your first attempt.
            </p>
          </div>
        </div>
      </section>

      {/* No Tall Promises – original content kept */}
      <section className="section section-alt">
        <div className="container">
          <PageHeader
            title="No Tall Promises. Just Real Performance."
            subtitle="We promise only what we can fulfil: rigorous preparation, honest feedback, and genuine support."
          />
          <div className="three-column-cards">
            <article className="info-card">
              <h3>Asset Creation</h3>
              <p>
                Our goal is to make you boardroom ready, and then make you a valuable asset in the
                boardroom. Certification is the start; continuous growth is the journey.
              </p>
            </article>
            <article className="info-card">
              <h3>Universal Principles</h3>
              <p>
                We teach management concepts in a way that is universally applicable — for any
                professional who intends to lead an organisation one day, not just accountants.
              </p>
            </article>
            <article className="info-card">
              <h3>Future Ready</h3>
              <p>
                AI will replace jobs, not professionals. We help you become the professional who
                controls and leads innovation.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* NEW: Who is it for? (Eligibility & ideal learners) */}
      <section className="section">
        <div className="container">
          <PageHeader
            title="Who is the US CMA for?"
            subtitle="Students and professionals who want to lead in finance and management accounting."
          />
          <div className="two-column">
            <div>
              <h3>Ideal for</h3>
              <ul>
                <li>Commerce, finance and business students (from Year 2 undergrad onwards)</li>
                <li>Working accountants and analysts aiming for FP&amp;A or controllership</li>
                <li>Professionals targeting MNCs, consulting or shared services</li>
              </ul>
            </div>
            <div>
              <h3>Eligibility (IMA)</h3>
              <ul>
                <li>Bachelor’s degree from an accredited institution (or in progress)</li>
                <li>Pass both Part 1 and Part 2 of the CMA exam</li>
                <li>Two years of relevant experience (before or within 7 years of passing)</li>
                <li>Active IMA membership</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: How you learn with TillSkill™ */}
      <section className="section section-alt">
        <div className="container">
          <PageHeader
            title="How you learn with TillSkill™"
            subtitle="Structured, mentor-led preparation so you stay exam-ready and career-ready."
          />
          <div className="three-column-cards">
            <article className="info-card">
              <h3>Live &amp; recorded classes</h3>
              <p>
                Attend live sessions and catch up with recordings. Curriculum is broken into clear
                modules aligned to Part 1 and Part 2.
              </p>
            </article>
            <article className="info-card">
              <h3>1:1 doubt clearing</h3>
              <p>
                Personalised guidance from TillSkill™ mentors (on request) so you understand the
                &quot;why&quot; and &quot;how&quot;, not just the &quot;what&quot;.
              </p>
            </article>
            <article className="info-card">
              <h3>Mock exams &amp; accountability</h3>
              <p>
                Practice tests and progress checks. Limited batch sizes so every learner gets
                attention and stays on track.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* NEW: Career outcomes */}
      <section className="section">
        <div className="container">
          <PageHeader
            title="Career outcomes with the US CMA"
            subtitle="Position yourself for roles in FP&amp;A, controllership, and strategic finance."
          />
          <div className="two-column">
            <p>
              The US CMA opens doors to management accountant, FP&amp;A analyst, finance manager,
              and business partner roles in MNCs, consulting firms, and shared services. TillSkill™
              prepares you for the exam and for the interview and workplace scenarios that follow.
            </p>
            <p>
              Our mentors bring decades of global experience. You learn not only to pass the exam
              but to think and communicate like a future boardroom leader.
            </p>
          </div>
        </div>
      </section>

      {/* NEW: How to enrol */}
      <section className="section section-alt">
        <div className="container">
          <PageHeader
            title="How to enrol with TillSkill™"
            subtitle="Attend the information webinar, ask questions to remove your doubts, enrol, and start your CMA journey."
          />
          <div className="cta-row" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
            <CTAButton to="/programs">Attend the information webnair</CTAButton>
            <CTAButton to="/enrol" variant="secondary">
              Enrol for US CMA
            </CTAButton>
            <CTAButton to="/intro-sessions" variant="outline">
              Attend Introductory Webinar
            </CTAButton>
          </div>
        </div>
      </section>

      {/* NEW: FAQ */}
      <section className="section section-alt">
        <div className="container">
          <PageHeader
            title="Frequently asked questions"
            subtitle="Quick answers about the US CMA and TillSkill™."
          />
          <FAQAccordion items={cmaFAQs} />
        </div>
      </section>

      {/* NEW: Final CTA band */}
      {/* <section className="cta-band">
        <div className="container">
          <h2>Ready to become a US CMA with TillSkill™?</h2>
          <p>Have doubts? Attend the Introductory Webinar to get clarity, then enrol in the next batch.</p>
          <div className="cta-band-actions">
            <CTAButton to="/intro-sessions">Attend Introductory Webinar</CTAButton>
            <CTAButton to="/enrol" variant="outline">
              Enrol for US CMA
            </CTAButton>
          </div>
        </div>
      </section> */}
    </div>
  )
}
