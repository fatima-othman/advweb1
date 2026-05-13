import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../config/routes';

const CreditsFeatureHeader = () => {
  return (
    <section className="credits-header-wrap">
      <div>
        <h1>StrategAI</h1>
        <p>AI Business Strategy Generator</p> 
      </div>

      <nav className="credits-tabs" aria-label="Credits Tabs">
        <NavLink to={ROUTES.dashboardCredits} end className={({ isActive }) => `credits-tab${isActive ? ' active' : ''}`}>Overview</NavLink>
        <NavLink to={ROUTES.dashboardPricing} className={({ isActive }) => `credits-tab${isActive ? ' active' : ''}`}>Pricing</NavLink>
        <NavLink to={ROUTES.dashboardHistory} className={({ isActive }) => `credits-tab${isActive ? ' active' : ''}`}>History</NavLink>
      </nav>
    </section>
  );
};

export default CreditsFeatureHeader;

