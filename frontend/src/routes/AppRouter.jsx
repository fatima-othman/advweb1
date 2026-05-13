import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import { ROUTES } from '../config/routes';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../features/feature1/pages/Dashboard';
import DashboardCredits from '../features/feature2/pages/DashboardCredits';
import DashboardHistory from '../features/feature2/pages/DashboardHistory';
import DashboardPricing from '../features/feature2/pages/DashboardPricing';
import Home from '../features/feature1/pages/Home';
import Login from '../features/feature1/pages/Login';
import NotFound from '../features/feature1/pages/NotFound';
import Register from '../features/feature1/pages/Register';

const AppRouter = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.home} element={<Home />} />
          <Route
            path={ROUTES.register}
            element={isAuthenticated ? <Navigate to={ROUTES.dashboard} replace /> : <Register />}
          />
          <Route
            path={ROUTES.login}
            element={isAuthenticated ? <Navigate to={ROUTES.dashboard} replace /> : <Login />}
          />
          <Route
            path={ROUTES.dashboard}
            element={(
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.dashboardCredits}
            element={(
              <ProtectedRoute>
                <DashboardCredits />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.dashboardPricing}
            element={(
              <ProtectedRoute>
                <DashboardPricing />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.dashboardHistory}
            element={(
              <ProtectedRoute>
                <DashboardHistory />
              </ProtectedRoute>
            )}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AppRouter;


