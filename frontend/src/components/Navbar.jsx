import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { NAV_LINKS, ROUTES } from '../config/routes';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';

const MotionNav = motion.nav;

const Icon = ({ name }) => {
  const icons = {
    login: (
      <>
        <path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" />
        <path d="M14 16l4-4-4-4" />
        <path d="M18 12H9" />
      </>
    ),
    credits: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),
    feature2: (
      <>
        <path d="M12 3l7 4v10l-7 4-7-4V7l7-4Z" />
        <path d="M9.5 11.5 12 9l2.5 2.5L12 14z" />
      </>
    ),
    dashboard: (
      <path d="M3 11.5 12 4l9 7.5M5 10.5V20h14v-9.5" />
    ),
    overview: (
      <>
        <path d="M4 18h16" />
        <path d="M7 18V9" />
        <path d="M12 18V5" />
        <path d="M17 18v-7" />
      </>
    ),
    pricing: (
      <>
        <path d="M12 4v16" />
        <path d="M17 8.5c0-2-1.8-3.5-5-3.5S7 6.4 7 8.3c0 2 1.9 2.8 5 3.6 3 .8 5 1.5 5 3.8 0 2-1.8 3.8-5 3.8S7 18 7 16.1" />
      </>
    ),
    history: (
      <>
        <path d="M3 12a9 9 0 1 0 2.6-6.4" />
        <path d="M3 4v4h4" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    logout: (
      <>
        <path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" />
        <path d="M14 16l4-4-4-4" />
        <path d="M18 12H9" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="M6 6l12 12" />
        <path d="M18 6 6 18" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
};

const iconByPath = {
  [ROUTES.login]: 'login',
  [ROUTES.dashboard]: 'dashboard',
  [ROUTES.dashboardCredits]: 'credits',
  [ROUTES.feature2Home]: 'feature2',
};

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
    { label: 'Dashboard', to: ROUTES.dashboard, icon: 'dashboard' },
    { label: 'Overview', to: ROUTES.dashboardCredits, icon: 'overview' },
    { label: 'Pricing', to: ROUTES.dashboardPricing, icon: 'pricing' },
    { label: 'History', to: ROUTES.dashboardHistory, icon: 'history' },
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
              <span className="nav-icon"><Icon name={mobileOpen ? 'close' : 'menu'} /></span>
              <span>{mobileOpen ? 'Close' : 'Menu'}</span>
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
                    {iconByPath[item.to] ? (
                      <span className="nav-icon"><Icon name={iconByPath[item.to]} /></span>
                    ) : null}
                    {item.label}
                  </NavLink>
                ))
              ) : (
                <div className="dashboard-nav-links">
                  {dashboardTabs.map((item) => (
                    <NavLink key={item.to} to={item.to} className="nav-link">
                      <span className="nav-icon"><Icon name={item.icon} /></span>
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
                    {isLoggingOut ? <LoadingSpinner label="" small /> : (
                      <>
                        <span className="nav-icon"><Icon name="logout" /></span>
                        {!isDashboardArea ? 'Logout' : null}
                      </>
                    )}
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
