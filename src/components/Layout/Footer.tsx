import React from 'react'
import { Link } from 'react-router-dom'

const logoUrl = new URL('../../assets/logo.png', import.meta.url).href

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo-link" aria-label="TillSkill home">
            <img src={logoUrl} alt="TillSkill™" className="footer-logo" />
          </Link>
          <h3 className="footer-title">TillSkill™</h3>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link to="/about-us">About</Link>
          <Link to="/programs">Programs</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
        </nav>
        <div className="footer-meta">
          <p className="footer-copyright">
         Copyright © {new Date().getFullYear()} TillSkill™. All Rights Reserved.
          </p>
          <div className="footer-legal">
            <p>
              TillSkill™ is an IMA (USA) Silver Approved Learning Partner. TillSkill™ or the US CMA
              qualification offered by IMA <br/> USA is in no way related to CMA Australia.
            </p>
            <p>
              TillSkill™ offers non-NRT which will not lead to an Australian Qualification Framework
              (AQF) qualification or  <br/>statement of attainment.
            </p>
            <p>
              Please refer to our{' '}
              <Link to="/terms-and-conditions">Terms and Conditions</Link> for more details.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

