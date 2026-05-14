import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV_LINKS, ROUTES } from '../config/routes.js'

function Navbar() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = NAV_LINKS.public

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8)
    }

    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <header className={`navbar-wrapper${isScrolled ? ' navbar-scrolled' : ''}`}>
      <div className="container navbar">
        <Link className="brand" to={ROUTES.home}>
          StrategAI
        </Link>

        <button
          type="button"
          className="navbar-menu-toggle"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          {mobileOpen ? 'Close' : 'Menu'}
        </button>

        <nav
          className={`nav-links${mobileOpen ? ' nav-links-open' : ''}`}
          aria-label="Main Navigation"
        >
          {links.map((item) => (
            <NavLink key={item.to} to={item.to} className="nav-link">
              {item.label}
            </NavLink>
          ))}

          <NavLink to={ROUTES.report} className="btn-primary nav-cta">
            Get started
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
