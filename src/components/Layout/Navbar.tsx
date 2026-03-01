import React, { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
// import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
const logo = new URL('../../assets/logo.png', import.meta.url).href

const whoWeAreItems = [
  { to: '/about-us', label: 'About Us' },
  { to: '/terms-and-conditions', label: 'Terms & Conditions' },
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
  { to: '/contact', label: 'Contact Us' },
  { to: '/for-corporates', label: 'For Corporates' },
]

function isProgramsActive(pathname: string) {
  return pathname === '/programs' || pathname.startsWith('/programs/')
}

function isContactActive(pathname: string) {
  return ['/intro-sessions', '/study-support', '/contact', '/for-corporates'].includes(pathname)
}

function isWhoWeAreActive(pathname: string) {
  return pathname === '/about-us' || pathname === '/terms-and-conditions'
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [dropdown, setDropdown] = useState<'who' | 'programs' | 'contact' | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const location = useLocation()
  // const { items } = useCart()  // Cart commented out
  const { isLoggedIn, logout } = useAuth()
  // const cartCount = items.length  // Cart commented out

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" onClick={closeAll}>
          <img src={logo} alt="TillSkill™ logo" className="navbar-logo" />
          <span className="navbar-title">TillSkill™</span>
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

          {isLoggedIn && (
            <NavLink to="/my-courses" className={({ isActive }) => `navbar-link ${isActive ? 'is-active' : ''}`} onClick={closeAll}>
              My Enrolled Courses
            </NavLink>
          )}

          <NavLink to="/enrol" className={({ isActive }) => `navbar-link ${isActive ? 'is-active' : ''}`} onClick={closeAll}>
            Intro Sessions
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

          {isLoggedIn ? (
            <button
              type="button"
              className="navbar-link navbar-cta"
              onClick={() => {
                logout()
                closeAll()
              }}
            >
              Sign out
            </button>
          ) : (
            <NavLink to="/auth" className={({ isActive }) => `navbar-link navbar-cta ${isActive ? 'is-active' : ''}`} onClick={closeAll}>
              Sign in
            </NavLink>
          )}
          {/* Cart commented out – registration flow used instead
          <NavLink to="/cart" className={({ isActive }) => `navbar-link navbar-cart ${isActive ? 'is-active' : ''}`} aria-label="Cart" onClick={closeAll}>
            <ShoppingCartOutlinedIcon sx={{ fontSize: 26 }} className="navbar-cart-icon" />
            {cartCount > 0 && (
              <span className="navbar-cart-count" aria-label={`${cartCount} items in cart`}>
                {cartCount}
              </span>
            )}
          </NavLink>
          */}
        </nav>
      </div>
    </header>
  )
}
