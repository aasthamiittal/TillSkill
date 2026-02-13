import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/logo.png'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/who-we-are', label: 'Who We Are' },
  { to: '/programs', label: 'Programs' },
  { to: '/enrol', label: 'Enrol' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" onClick={() => setOpen(false)}>
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

        <nav className={`navbar-nav ${open ? 'is-open' : ''}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `navbar-link ${isActive ? 'is-active' : ''}`
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/auth"
            className={({ isActive }) =>
              `navbar-link navbar-cta ${isActive ? 'is-active' : ''}`
            }
            onClick={() => setOpen(false)}
          >
            Sign in
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `navbar-link navbar-cart ${isActive ? 'is-active' : ''}`
            }
            aria-label="Cart"
            onClick={() => setOpen(false)}
          >
            Cart
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

