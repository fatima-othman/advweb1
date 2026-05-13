import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { NAV_LINKS, ROUTES } from '../config/routes';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';

const MotionNav = motion.nav;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const links = isAuthenticated ? NAV_LINKS.private : NAV_LINKS.public;
  const isAuthScreen = location.pathname === ROUTES.login || location.pathname === ROUTES.register;
  const isDashboardArea = isAuthenticated && location.pathname.startsWith('/dashboard');

  const dashboardTabs = [
    { label: 'Dashboard', to: ROUTES.dashboard },
    { label: 'Overview', to: ROUTES.dashboardCredits },
    { label: 'Pricing', to: ROUTES.dashboardPricing },
    { label: 'History', to: ROUTES.dashboardHistory },
  ];

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await logout();
      navigate(ROUTES.login);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className={`navbar-wrapper${isScrolled ? ' navbar-scrolled' : ''}`}>
      <div className="container navbar">
        <Link className="brand" to={ROUTES.home}>
          StrategAI
        </Link>

        {!isAuthScreen ? (
          <>
            <button
              type="button"
              className="navbar-menu-toggle"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label="Toggle menu"
            >
              {mobileOpen ? 'Close' : 'Menu'}
            </button>

            <MotionNav
              className={`nav-links${mobileOpen ? ' nav-links-open' : ''}`}
              aria-label="Main Navigation"
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
            >
              {!isDashboardArea ? (
                links.map((item) => (
                  <NavLink key={item.to} to={item.to} className="nav-link">
                    {item.label}
                  </NavLink>
                ))
              ) : (
                <div className="dashboard-nav-links">
                  {dashboardTabs.map((item) => (
                    <NavLink key={item.to} to={item.to} className="nav-link">
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}

              {!isAuthenticated ? (
                <Link to={ROUTES.register} className="btn-primary nav-cta">
                  Get started
                </Link>
              ) : (
                <div className="navbar-auth-area">
                  {isDashboardArea ? (
                    <div className="navbar-user">
                      <strong>{user?.name || 'Demo User'}</strong>
                      <span>{user?.email || 'demo@strategai.com'}</span>
                    </div>
                  ) : null}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={isDashboardArea ? 'navbar-logout-icon' : 'btn-secondary nav-cta-btn'}
                    aria-label="Logout"
                    title="Logout"
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? <LoadingSpinner label="" small /> : (isDashboardArea ? '->' : 'Logout')}
                  </button>
                </div>
              )}
            </MotionNav>
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Navbar;
