import React, { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.png'

const whoWeAreItems = [
  { to: '/who-we-are', label: 'About Us' },
  { to: '/who-we-are#terms', label: 'Terms & Conditions' },
]

const programsItems = [
  { to: '/programs/us-cma', label: 'US CMA' },
  { to: '/programs/fmaa', label: 'FMAA' },
  { to: '/programs/csca', label: 'CSCA' },
  { to: '/programs/excel', label: 'Excel and Finance' },
  { to: '/programs/others', label: 'Others' },
]

const contactItems = [
  { to: '/intro-sessions', label: 'Intro Sessions' },
  { to: '/study-support', label: 'Study Support' },
  { to: '/contact', label: 'Contact US' },
]

function isProgramsActive(pathname: string) {
  return pathname === '/programs' || pathname.startsWith('/programs/')
}

function isContactActive(pathname: string) {
  return ['/intro-sessions', '/study-support', '/contact'].includes(pathname)
}

function isWhoWeAreActive(pathname: string) {
  return pathname === '/who-we-are'
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [dropdown, setDropdown] = useState<'who' | 'programs' | 'contact' | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
    setDropdown(null)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!dropdown) return
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dropdown])

  const closeAll = () => {
    setOpen(false)
    setDropdown(null)
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" onClick={closeAll}>
          <img src={logo} alt="TillSkill logo" className="navbar-logo" />
          <span className="navbar-title">TillSkill</span>
        </Link>

        <button
          className="navbar-toggle"
          aria-label="Toggle navigation"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav ref={navRef} className={`navbar-nav ${open ? 'is-open' : ''}`}>
          <NavLink to="/" className={({ isActive }) => `navbar-link ${isActive ? 'is-active' : ''}`} onClick={closeAll}>
            Home
          </NavLink>

          {/* Who We Are dropdown */}
          <div className="navbar-dropdown">
            <button
              type="button"
              className={`navbar-link navbar-dropdown-trigger ${isWhoWeAreActive(location.pathname) ? 'is-active' : ''}`}
              onClick={() => setDropdown((d) => (d === 'who' ? null : 'who'))}
              aria-expanded={dropdown === 'who'}
              aria-haspopup="true"
            >
              Who We Are
              <span className="navbar-dropdown-chevron" aria-hidden />
            </button>
            <div className={`navbar-dropdown-menu ${dropdown === 'who' ? 'is-open' : ''}`}>
              {whoWeAreItems.map((item) => (
                <Link key={item.to} to={item.to} className="navbar-dropdown-link" onClick={closeAll}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Programs dropdown */}
          <div className="navbar-dropdown">
            <button
              type="button"
              className={`navbar-link navbar-dropdown-trigger ${isProgramsActive(location.pathname) ? 'is-active' : ''}`}
              onClick={() => setDropdown((d) => (d === 'programs' ? null : 'programs'))}
              aria-expanded={dropdown === 'programs'}
              aria-haspopup="true"
            >
              Programs
              <span className="navbar-dropdown-chevron" aria-hidden />
            </button>
            <div className={`navbar-dropdown-menu ${dropdown === 'programs' ? 'is-open' : ''}`}>
              {programsItems.map((item) => (
                <Link key={item.to} to={item.to} className="navbar-dropdown-link" onClick={closeAll}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <NavLink to="/enrol" className={({ isActive }) => `navbar-link ${isActive ? 'is-active' : ''}`} onClick={closeAll}>
            Enrol
          </NavLink>

          {/* Contact dropdown */}
          <div className="navbar-dropdown">
            <button
              type="button"
              className={`navbar-link navbar-dropdown-trigger ${isContactActive(location.pathname) ? 'is-active' : ''}`}
              onClick={() => setDropdown((d) => (d === 'contact' ? null : 'contact'))}
              aria-expanded={dropdown === 'contact'}
              aria-haspopup="true"
            >
              Contact
              <span className="navbar-dropdown-chevron" aria-hidden />
            </button>
            <div className={`navbar-dropdown-menu ${dropdown === 'contact' ? 'is-open' : ''}`}>
              {contactItems.map((item) => (
                <Link key={item.to} to={item.to} className="navbar-dropdown-link" onClick={closeAll}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <NavLink to="/auth" className={({ isActive }) => `navbar-link navbar-cta ${isActive ? 'is-active' : ''}`} onClick={closeAll}>
            Sign in
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => `navbar-link navbar-cart ${isActive ? 'is-active' : ''}`} aria-label="Cart" onClick={closeAll}>
            Cart
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
