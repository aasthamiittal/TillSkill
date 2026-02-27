import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <h3 className="footer-title">Tillskill™</h3>
          <p className="footer-text">
            Till your skill, till you skill. Australia’s premier IMA authorised
            training partner.
          </p>
        </div>
        <div className="footer-links">
          <Link to="/about-us">About</Link>
          <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
          <Link to="/programs">Programs</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-meta">
          <p>© {new Date().getFullYear()} Tillskill™. All rights reserved.</p>
          <p className="footer-small">
            Tillskill™ is an IMA (USA) Silver Approved Learning Partner. Courses
            are non-NRT and do not lead to AQF qualifications.
          </p>
        </div>
      </div>
    </footer>
  )
}

