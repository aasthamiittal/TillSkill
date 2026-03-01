import React from 'react'
import { Link } from 'react-router-dom'
import { CTAButton } from '../components/Common/CTAButton'
import { PageHeader } from '../components/Common/PageHeader'
import { FAQAccordion, type FAQItem } from '../components/Common/FAQAccordion'

const cmaImg = new URL('../assets/CMA-logo.png', import.meta.url).href
const fmaaImg = new URL('../assets/FMAA-logo.png', import.meta.url).href
const cscaImg = new URL('../assets/CSCA-logo.png', import.meta.url).href
// const excelFinanceImg = new URL('../assets/excel-finance-img.png', import.meta.url).href

export const programSlugs = [
  { slug: 'us-cma', label: 'US CMA' },
  { slug: 'fmaa', label: 'FMAA' },
  { slug: 'csca', label: 'CSCA' },
  { slug: 'excel', label: 'Excel and Finance' },
  { slug: 'others', label: 'Others' },
] as const

export type ProgramSlug = (typeof programSlugs)[number]['slug']

type ProgramContentProps = {
  slug: ProgramSlug
}

export function ProgramContent({ slug }: ProgramContentProps) {
  if (slug === 'us-cma') return <UsCmaProgramContent />
  if (slug === 'fmaa') return <FmaaProgramContent />
  if (slug === 'csca') return <CscaProgramContent />
  if (slug === 'excel') return <ExcelProgramContent />
  return <OtherProgramsContent />
}

function UsCmaProgramContent() {
  const cmaFAQs: FAQItem[] = [
    {
      question: 'Who is the US CMA for?',
      answer: (
        <p>
          The US CMA suits finance and accounting students, early-career professionals in
          reporting or FP&amp;A, and anyone aiming for management accounting or business
          partnering roles. You can start with TillSkill™ after Grade 12 while completing your
          degree.
        </p>
      ),
    },
    {
      question: 'How long does prep take?',
      answer: (
        <p>
          Many learners complete prep in 6–8 months. TillSkill™ offers structured batches and
          flexible access to recorded sessions so you can balance work or studies.
        </p>
      ),
    },
    {
      question: 'What is the exam structure?',
      answer: (
        <p>
          Two parts: Part 1 – Financial Planning, Performance and Analytics; Part 2 – Strategic
          Financial Management. TillSkill™ prepares you with curriculum aligned to the latest IMA
          exam specifications.
        </p>
      ),
    },
    {
      question: 'What are the fees and payment options?',
      answer: (
        <p>
          Contact us for current pricing and payment options. Our Terms &amp; Conditions describe
          refunds, retake assurance, and access periods.
        </p>
      ),
    },
  ]

  return (
    <>
      {/* 1. Hero */}
      <section className="section">
        <div className="container">
          <div className="program-hero">
            <div className="program-hero-text">
              <h1 className="program-hero-title">
                US CMA with TillSkill™
                <br />
                Certified Management Accountant
              </h1>
              <p className="program-hero-tagline">
                2-part global management accounting qualification for future-ready finance leaders.
              </p>
            </div>
            <div className="program-hero-logo">
              <img src={cmaImg} alt="CMA® Certified Management Accountant" />
            </div>
          </div>
          <p>
            The Certified Management Accountant (CMA) credential, awarded by the Institute of
            Management Accountants (IMA, USA), is a globally recognised benchmark for management
            accountants and finance professionals who drive planning, analysis, and strategic
            decision-making inside organisations.
          </p>
          <div className="cta-row">
            <CTAButton to="/intro-sessions">Join a free US CMA intro session</CTAButton>
            <CTAButton to="/contact" variant="outline">
              Connect with a TillSkill™ mentor
            </CTAButton>
          </div>
        </div>
      </section>

      {/* 2. Stats strip – reference-style */}
      <section className="section">
        <div className="container">
          <div className="stats-strip">
            <div className="stat-item">
              <span className="stat-value">IMA</span>
              <span className="stat-label">Silver Learning Partner</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">2-part</span>
              <span className="stat-label">US CMA exam</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">6–8 mo</span>
              <span className="stat-label">Structured prep</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">Global</span>
              <span className="stat-label">Boardroom-ready skills</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why choose TillSkill™ for US CMA */}
      <section className="section section-alt">
        <div className="container">
          <PageHeader
            title="Why choose TillSkill™ for US CMA?"
            subtitle="A human-first, exam-focused learning experience inspired by leading global CMA providers."
          />
          <div className="three-column-cards">
            <article className="info-card">
              <h3>Structured 2-part prep</h3>
              <p>
                TillSkill™ breaks the US CMA syllabus into a clear roadmap across Part 1 and Part 2,
                with live classes, guided self-study, and mock exams aligned to the latest testing
                patterns.
              </p>
            </article>
            <article className="info-card">
              <h3>Mentors, not just content</h3>
              <p>
                You learn directly from mentors with international boardroom experience who help you
                understand the &quot;why&quot; and &quot;how&quot; behind concepts, not just exam
                shortcuts.
              </p>
            </article>
            <article className="info-card">
              <h3>Career-focused outcomes</h3>
              <p>
                From planning your exam windows to preparing for interviews and on-the-job
                scenarios, TillSkill™ supports you in building a profile for FP&amp;A, controllership
                and broader management roles.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 4. Who is it for & Eligibility */}
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
                <li>Commerce, finance and business students (from final year undergrad onwards)</li>
                <li>Working accountants and analysts aiming for FP&amp;A or controllership</li>
                <li>Professionals targeting MNCs, consulting or shared services</li>
              </ul>
            </div>
            <div>
              <h3>Requirements to earn your US CMA (IMA)</h3>
              <ul>
                <li>Bachelor&apos;s degree from an accredited institution (or in progress)</li>
                <li>Start early: begin with TillSkill™ after Grade 12 while completing your degree</li>
                <li>Pass both Part 1 and Part 2 of the CMA exam</li>
                <li>Two years of relevant experience (before or within 7 years of passing)</li>
                <li>Active IMA membership</li>
              </ul>
            </div>
          </div>
          <p className="muted" style={{ marginTop: '1rem' }}>
            For detailed policies, refer to the latest IMA guidelines and our{' '}
            <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>.
          </p>
        </div>
      </section>

      {/* 5. Curriculum Part 1 & Part 2 */}
      <section className="section section-alt">
        <div className="container">
          <PageHeader
            title="US CMA exam structure & curriculum"
            subtitle="Two parts, aligned to the latest IMA exam specifications."
          />
          <div className="cma-summary">
            <div className="cma-summary-grid">
              <div className="cma-summary-item">
                <h3>Part 1</h3>
                <p>Financial Planning, Performance and Analytics</p>
              </div>
              <div className="cma-summary-item">
                <h3>Part 2</h3>
                <p>Strategic Financial Management</p>
              </div>
              <div className="cma-summary-item">
                <h3>Timeline</h3>
                <p>Many complete prep in 6–8 months with consistent effort.</p>
              </div>
              <div className="cma-summary-item">
                <h3>Support</h3>
                <p>Live classes, recordings, mocks and 1:1 doubt clearing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Learning experience */}
      <section className="section">
        <div className="container">
          <PageHeader
            title="How you learn with TillSkill™"
            subtitle="Structured, mentor-led preparation so you stay exam-ready."
          />
          <div className="three-column-cards">
            <article className="info-card">
              <h3>Live &amp; recorded classes</h3>
              <p>
                Attend live sessions and catch up with recordings. Curriculum aligned to Part 1 and
                Part 2.
              </p>
            </article>
            <article className="info-card">
              <h3>1:1 doubt clearing</h3>
              <p>
                Personalised guidance from TillSkill™ mentors so you understand the &quot;why&quot;
                and &quot;how&quot;.
              </p>
            </article>
            <article className="info-card">
              <h3>Mock exams &amp; accountability</h3>
              <p>
                Practice tests and progress checks. Limited batch sizes so every learner gets
                attention.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 7. Career outcomes */}
      <section className="section section-alt">
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

      {/* 8. IMA Silver advantage */}
      <section className="section">
        <div className="container">
          <PageHeader
            title="IMA Silver Learning Partner Advantage"
            subtitle="Curriculum and instruction aligned with what global examiners test today."
          />
          <p>
            TillSkill™ as an IMA Silver Approved Learning Partner uses an approved publisher of
            learning and testing material. This accreditation is your guarantee that our curriculum
            meets the highest global standards and is designed to help you pass on your first
            attempt.
          </p>
        </div>
      </section>

      {/* 9. The TillSkill™ Advantage */}
      <section className="section section-alt">
        <div className="container">
          <PageHeader
            title="The TillSkill™ Advantage"
            subtitle="Stay ahead of automation with skills that keep you relevant in every business cycle."
          />
          <div className="three-column-cards">
            <article className="info-card">
              <h3>Jobs on their way out</h3>
              <p>
                Every industrial revolution retires certain roles and creates new ones. TillSkill™
                helps you move beyond repetitive reporting into analysis, planning, and decision
                support.
              </p>
            </article>
            <article className="info-card">
              <h3>From professions to skills</h3>
              <p>
                Titles change; core skills endure. We focus on analytical thinking, business
                partnering, and management communication so you grow beyond narrow job descriptions.
              </p>
            </article>
            <article className="info-card">
              <h3>First-mover advantage</h3>
              <p>
                Whether you are starting out or already working, using TillSkill™ to earn your US
                CMA helps you position yourself early for leadership roles in a rapidly changing
                finance landscape.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 10. How to enrol */}
      <section className="section">
        <div className="container">
          <PageHeader
            title="How to enrol with TillSkill™"
            subtitle="Talk to a mentor, join a free intro session, or enrol in the next batch."
          />
          <div className="cta-row" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
            <CTAButton to="/enrol">Enrol for US CMA</CTAButton>
            <CTAButton to="/intro-sessions" variant="secondary">
              Join a free intro session
            </CTAButton>
            <CTAButton to="/contact" variant="outline">
              Request a callback
            </CTAButton>
          </div>
        </div>
      </section>

      {/* 11. Testimonial */}
      <section className="section section-alt">
        <div className="container">
          <PageHeader
            title="What learners say about TillSkill™"
            subtitle="Real feedback from our community."
          />
          <blockquote className="testimonial">
            <p>
              &quot;The webinar provided me absolute clarity on what career path I should take and
              why. All my questions were answered. Looking forward to commencing the qualification
              with TillSkill™’s support.&quot;
            </p>
            <footer>— Former intro session attendee</footer>
          </blockquote>
        </div>
      </section>

      {/* 12. FAQ */}
      <section className="section">
        <div className="container">
          <PageHeader
            title="Frequently asked questions"
            subtitle="Quick answers about the US CMA and TillSkill™."
          />
          <FAQAccordion items={cmaFAQs} />
        </div>
      </section>

      {/* 13. Final CTA band */}
      <section className="cta-band">
        <div className="container">
          <h2>Ready to become a US CMA with TillSkill™?</h2>
          <p>Talk to an expert, join a free intro session, or enrol in the next batch.</p>
          <div className="cta-band-actions">
            <CTAButton to="/contact">Talk to an expert</CTAButton>
            <CTAButton to="/intro-sessions" variant="outline">
              Join free intro session
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  )
}

function FmaaProgramContent() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="program-hero">
            <div className="program-hero-text">
              <PageHeader
                title="FMAA with TillSkill™"
                subtitle="Foundational Management Accounting and Analytics to prepare you for advanced professional designations."
              />
            </div>
            <div className="program-hero-logo">
              <img src={fmaaImg} alt="FMAA pathway with TillSkill™" />
            </div>
          </div>
          <p>
            The FMAA pathway at TillSkill™ is designed for learners who want to build a strong base
            in accounting, cost management, decision-making and analytics before stepping into
            advanced qualifications such as the US CMA.
          </p>
          <h3>Who is FMAA ideal for?</h3>
          <ul>
            <li>Students in the early years of their commerce, finance or business studies.</li>
            <li>Professionals from non-finance backgrounds who want to transition into finance.</li>
            <li>Learners who prefer to master fundamentals before attempting global exams.</li>
          </ul>
          <div className="cta-row">
            <CTAButton to="/intro-sessions">Discuss the FMAA pathway</CTAButton>
            <CTAButton to="/contact" variant="outline">
              Ask how FMAA fits your goals
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <PageHeader
            title="How FMAA works at TillSkill™"
            subtitle="Concept clarity, application and analytics in a single learning track."
          />
          <div className="three-column-cards">
            <article className="info-card">
              <h3>Strong accounting core</h3>
              <p>
                Build comfort with financial statements, costing, budgeting and performance
                measurement through live explanation and guided practice.
              </p>
            </article>
            <article className="info-card">
              <h3>Analytics and tools</h3>
              <p>
                Learn to interpret data, work with spreadsheets and basic dashboards so you can
                support business decisions from day one.
              </p>
            </article>
            <article className="info-card">
              <h3>Bridge to global programs</h3>
              <p>
                Use FMAA as a launchpad into qualifications like the US CMA by getting used to
                international-style questions and case-based learning.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}

function CscaProgramContent() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="program-hero">
            <div className="program-hero-text">
              <PageHeader
                title="CSCA-focused learning with TillSkill™"
                subtitle="Deepen your strategic analysis and competitive positioning skills."
              />
            </div>
            <div className="program-hero-logo">
              <img src={cscaImg} alt="CSCA strategy-focused learning with TillSkill™" />
            </div>
          </div>
          <p>
            TillSkill™ offers a specialised track for learners who want to strengthen their skills
            in strategy, competitive analysis and long-term value creation, complementing
            management accounting knowledge with strategic thinking.
          </p>
          <h3>What you focus on</h3>
          <ul>
            <li>
              Understanding business models, industry forces and sources of competitive advantage.
            </li>
            <li>Linking financial outcomes to strategic choices and execution.</li>
            <li>Working with case studies that mirror boardroom-level discussions.</li>
          </ul>
          <div className="cta-row">
            <CTAButton to="/intro-sessions">Explore the strategy track</CTAButton>
            <CTAButton to="/contact" variant="outline">
              Speak to a strategy mentor
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <PageHeader
            title="Build strategic finance capability"
            subtitle="Move from &quot;reporting the numbers&quot; to shaping the numbers."
          />
          <div className="three-column-cards">
            <article className="info-card">
              <h3>Structured frameworks</h3>
              <p>
                Learn practical strategy and competitiveness frameworks that can be applied to
                real-world organisations, not just textbooks.
              </p>
            </article>
            <article className="info-card">
              <h3>Case-based learning</h3>
              <p>
                Work through scenarios that require you to evaluate options, quantify impact, and
                recommend actions to leadership teams.
              </p>
            </article>
            <article className="info-card">
              <h3>Mentor-led discussions</h3>
              <p>
                Participate in guided discussions with TillSkill™ mentors who have experience in
                strategy, consulting, or leadership roles.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}

function ExcelProgramContent() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="program-hero">
            <div className="program-hero-text">
              <PageHeader
                title="Excel and Finance with TillSkill™"
                subtitle="Hands-on spreadsheet skills for modern finance and analytics roles."
              />
            </div>
            {/* <div className="program-hero-logo">
              <img src={excelFinanceImg} alt="Excel and Finance with TillSkill™" />
            </div> */}
          </div>
          <p>
            The Excel and Finance program at TillSkill™ is designed for learners who want to move
            beyond basic formulas into structured financial analysis, modelling and reporting that
            supports real business decisions.
          </p>
          <h3>Key outcomes</h3>
          <ul>
            <li>Confident use of Excel for analysis, dashboards and management reporting.</li>
            <li>Building models for budgeting, forecasting and scenario planning.</li>
            <li>
              Working with real-world finance use cases aligned to management accounting concepts.
            </li>
          </ul>
          <div className="cta-row">
            <p className="program-coming-soon">Sessions Launching Soon</p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <PageHeader
            title="Practical, mentor-led Excel learning"
            subtitle="Learn the shortcuts, habits and structures used by working finance professionals."
          />
          <div className="three-column-cards">
            <article className="info-card">
              <h3>Real finance problems</h3>
              <p>
                Classes are anchored around budgeting, variance analysis, working capital, and
                management reporting scenarios you will actually encounter at work.
              </p>
            </article>
            <article className="info-card">
              <h3>Templates and checklists</h3>
              <p>
                Build a personal library of templates and best-practice structures you can reuse
                across roles and organisations.
              </p>
            </article>
            <article className="info-card">
              <h3>Guided practice</h3>
              <p>
                Work through exercises with the support of TillSkill™ mentors so you can ask
                questions and correct mistakes in real time.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}

function OtherProgramsContent() {
  return (
    <>
      <section className="section">
        <div className="container">
          <PageHeader
            title="Other programs with TillSkill™"
            subtitle="Specialised workshops and pathways for emerging and experienced finance professionals."
          />
          <p>
            Beyond our flagship programs, TillSkill™ also develops short courses and workshops in
            areas such as leadership for finance professionals, communication for analysts, and
            specialised technical topics requested by our learner community.
          </p>
          <p>
            If you have a particular area in mind, our mentors can help you understand whether
            there is an existing track that fits, or whether we are in the process of designing a
            new one.
          </p>
          <div className="cta-row">
            <CTAButton to="/contact">Share what you want to learn</CTAButton>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <PageHeader
            title="A living catalogue of learning"
            subtitle="We expand our offerings based on real learner demand and mentor capacity."
          />
          <div className="three-column-cards">
            <article className="info-card">
              <h3>Human-centred design</h3>
              <p>
                Every new program at TillSkill™ is built around real learner questions and
                workplace scenarios, not just theoretical demand.
              </p>
            </article>
            <article className="info-card">
              <h3>Quality over volume</h3>
              <p>
                We only launch programs when we have mentors with the right depth of experience to
                guide you, even if that means fewer courses overall.
              </p>
            </article>
            <article className="info-card">
              <h3>Community-driven topics</h3>
              <p>
                Suggestions from the TillSkill™ community directly influence what we build next,
                keeping our catalogue relevant and practical.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
