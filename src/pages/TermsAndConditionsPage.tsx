import { Link } from 'react-router-dom'
import { PageHeader } from '../components/Common/PageHeader'
import { CTAButton } from '../components/Common/CTAButton'

export function TermsAndConditionsPage() {
  return (
    <div className="page">
      <section className="section section-alt">
        <div className="container terms-content">
          <PageHeader
            title="Terms and Conditions of Service"
            subtitle="Last Updated: January 16, 2026 · Business Name: Tillskill™ · Jurisdiction: Victoria, Australia"
          />

          <h3>Welcome to Tillskill™</h3>
          <p>
            These Terms and Conditions (&quot;Terms&quot;) govern your use of the Tillskill™
            website, our learning management systems, and your enrolment in our educational
            programs. By accessing our website or enrolling in any of our courses, you agree to be
            bound by these Terms.
          </p>
          <p>Please read these Terms carefully for using this website and before enrolling.</p>

          <h3>1. Regulatory Disclaimer and Accreditation Status</h3>
          <p className="terms-subtitle">
            <strong>IMPORTANT NOTICE REGARDING AUSTRALIAN ACCREDITATION (ASQA COMPLIANCE)</strong>
          </p>
          <p>
            <strong>1.1 Non-RTO Status:</strong> Tillskill™ is a specialized provider of
            professional examination preparation for global designations. Tillskill™ is not a
            Registered Training Organisation (RTO) within the Australian Vocational Education and
            Training (VET) sector.
          </p>
          <p>
            <strong>1.2 No AQF Qualification:</strong> The courses and training offered by
            Tillskill™ are classified as &quot;Non-Nationally Recognised Training&quot; (Non-NRT).
            They do not lead to the issuance of an Australian Qualification Framework (AQF)
            qualification (such as a Certificate IV, Diploma, or Advanced Diploma) or a Statement of
            Attainment.
          </p>
          <p>
            <strong>1.3 Nature of Certification:</strong> Tillskill™ does not issue any
            certification or diploma. However, upon successful completion of a preparatory course
            or event, Tillskill™ students may receive a Certificate of Attendance. This certificate
            is strictly for professional development verification and validates your participation.
            It is not a formal qualification under the Australian law.
          </p>
          <p>
            <strong>1.4 Third-Party Designations:</strong> Tillskill™ provides preparatory training
            for certifications issued by third-party international bodies. Mentions of designations
            such as US CMA (Certified Management Accountant), or others on our website are for
            illustrative purposes to describe the target qualification of our preparation courses.
            The actual professional designations are awarded solely by the respective external
            bodies (e.g., IMA) upon the student&apos;s successful completion of their specific
            examination and experience requirements. Tillskill™ does not award these designations.
          </p>
          <p>
            Tillskill™ is an IMA (USA) Silver Approved Learning Partner. Tillskill™ or the US CMA
            qualification is in no way related to CMA Australia. Tillskill™ offers non-NRT which
            will not lead to an Australian Qualification Framework (AQF) qualification or statement
            of attainment.
          </p>
          <p>
            <strong>Availability:</strong> Tillskill™ may not currently offer coaching for all
            designations mentioned as examples. Students must check the current Course Catalogue for
            active offerings.
          </p>

          <h3>2. Tillskill™ Retake Assurance Policy</h3>
          <p>
            We are committed to your success. Instead of a standard &quot;Pass Guarantee,&quot; we
            offer the Tillskill™ Retake Assurance. This policy allows diligent students who fail
            their external exam to re-take our course at no additional tuition cost, subject to the
            following strict conditions:
          </p>
          <p>
            <strong>2.1 Eligibility Criteria:</strong> To qualify for the Retake Assurance, the
            student must have:
          </p>
          <ul>
            <li>Attended at least 85% of the live classes for the relevant course batch.</li>
            <li>
              Completed 100% of the assigned course materials and mock exams provided by
              Tillskill™.
            </li>
            <li>
              Been assessed by Tillskill™ instructors as &quot;Fit to Sit&quot; for the
              examination prior to the exam date.
            </li>
            <li>
              Attempted the external examination within the immediate testing window following the
              course conclusion.
            </li>
            <li>Provided official proof of the &quot;Fail&quot; result from the certifying body.</li>
          </ul>
          <p>
            <strong>2.2 The Benefit:</strong> Eligible students will be granted free access to one
            (1) subsequent batch of the same course offered by Tillskill™. This is limited to access
            to live classes and digital materials available to that new batch.
          </p>
          <p>
            <strong>2.3 Limitations:</strong>
          </p>
          <ul>
            <li>
              <strong>No Monetary Refund:</strong> Under no circumstances does a failure in the
              exam entitle the student to a monetary refund of fees paid.
            </li>
            <li>
              <strong>Student Commitment:</strong> The student is expected to put in the necessary
              effort to study for and attempt the next examination.
            </li>
            <li>
              <strong>Liability Cap:</strong> Tillskill™&apos;s maximum liability under this policy
              or any other claim is strictly limited to the amount paid by the student to
              Tillskill™ for the course and excludes payment to the Approved Study Material
              provider, fee paid to IMA and other third party payments.
            </li>
            <li>
              <strong>Regulatory Override:</strong> Where Australian Consumer Laws prescribe rights
              that cannot be excluded, those laws shall prevail.
            </li>
          </ul>

          <h3>3. Course Access and Duration</h3>
          <p>
            <strong>3.1 Standard Access Period:</strong> Unless otherwise stated in the specific
            course description, your access to the digital learning platform, recorded videos, and
            course materials is valid for six (6) months from the date of subscription or the start
            date of the cohort (whichever is later).
          </p>
          <p>
            <strong>3.2 Expiration:</strong> After 6 months, access will automatically terminate.
            Extensions may be granted solely at the discretion of Tillskill™ management or under the
            terms of the Retake Assurance policy (Section 2).
          </p>

          <h3>4. Pricing, Payments, and Taxes</h3>
          <p>
            <strong>4.1 Currency:</strong> All course fees are listed and charged in United States
            Dollars (USD) unless explicitly stated otherwise.
          </p>
          <p>
            <strong>4.2 Payment Methods:</strong> Online Payment: We accept major credit/debit cards
            via our secure payment gateway. Bank Transfer / Wise: For students in regions with
            banking restrictions, or who otherwise specifically request, we offer payment via direct
            bank transfer or Wise.
          </p>
          <p>
            <strong>4.3 Bank Charges (Sender Pays):</strong> If paying via Bank Transfer or Wise, the
            student (Sender) bears all transaction fees and bank charges. You must instruct your bank
            to use the &quot;OUR&quot; instruction code (Sender pays all fees). Tillskill™ must
            receive the exact net amount listed on the invoice. If the amount received is short,
            access will be withheld until the balance is cleared.
          </p>
          <p>
            <strong>4.4 One-Time Payment:</strong> Payments are generally one-time fees for the
            specific course duration. Tillskill™ does not engage in unauthorized auto-debiting. If
            you wish to split payments, you must manage this through your own banking arrangements.
          </p>

          <h3>5. Refund, Cancellation, and Discount Clawback Policy</h3>
          <p>
            <strong>5.1 General Refund Policy:</strong> Before Course Start: Cancellations made more
            than 7 days before the cohort start date may be eligible for a refund, minus a 10%
            administrative fee. Cancellation made less than 7 days before the cohort start date
            would be made after 50% fee deduction. After Course Start / Access: Once a student has
            attended one (1) live class OR accessed/downloaded any digital course materials, no refund
            will be issued.
          </p>
          <p>
            <strong>5.2 Group Discount &quot;Clawback&quot; Clause:</strong> If a group of students
            (e.g., 4 or more) enrols together to avail of a &quot;Corporate/Group Discount&quot;
            (e.g., 10%) and subsequently one or more members of the group cancel or withdraw: The
            discount condition is considered breached. The refund for the withdrawing student(s) will
            be calculated by first deducting the discount amount that was invalidly claimed by the
            remaining students. Example: If 4 students pay $900 each (Total $3600) instead of the
            standard $1000, and one student withdraws: The remaining 3 students are now liable for
            the full price ($3000 total). The refund to the withdrawing student will be: $3600
            (Total Paid) - $3000 (Cost of 3 students) = $600 (not $900).
          </p>

          <h3>6. Intellectual Property (IP) Rights</h3>
          <p>
            <strong>6.1 Ownership:</strong> All course materials, including slides, videos, PDFs,
            mock exams, and proprietary methodologies, are the intellectual property of Tillskill™
            or its licensors (such as the IMA or the Training Material provider).
          </p>
          <p>
            <strong>6.2 License:</strong> You are granted a limited, non-exclusive, non-transferable
            license to use the materials for your personal, non-commercial educational use only.
          </p>
          <p>
            <strong>6.3 Prohibitions:</strong> You may not record live sessions, share login
            credentials, or distribute our materials to third parties. Violation of this section
            will result in immediate termination of access without refund, and you will be subject
            to potential legal action.
          </p>

          <h3>7. Student Conduct</h3>
          <p>
            Tillskill™ maintains a professional learning environment. We reserve the right to
            remove any student from the course without refund if they engage in harassment, hate
            speech, disruptive behaviour or illegal activities (such as copyright infringement,
            etc.) towards Tillskill™, the Study Material provider, the respective Institute
            providing the qualification, the instructors or fellow students.
          </p>

          <h3>8. Governing Law</h3>
          <p>
            These Terms are governed by and construed in accordance with the laws of Victoria,
            Australia. Any disputes arising from these Terms shall be subject to the exclusive
            jurisdiction of the courts of Victoria, Australia.
          </p>

          <div className="cta-row">
            <CTAButton to="/intro-sessions">Attend our FREE WEBINAR</CTAButton>
            <CTAButton to="/contact" variant="outline">
              Contact us for personalised guidance
            </CTAButton>
          </div>
          <p className="muted">
            <Link to="/about-us">Back to About Us</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
