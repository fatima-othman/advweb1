import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import { ROUTES } from '../config/routes';
import { useAuth } from '../context/AuthContext';
import {
  DashboardPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
} from '../features/feature1';
import {
  AuthPlus,
  BusinessPages,
  Contact,
  CreditsPage,
  Feature2Home,
  HistoryPage,
  PaymentSuccessPage,
  Pricing,
  PricingPage,
  Privacy,
  ProfileSettings,
  StrategyCore,
  StrategyCreate,
  StrategyHistory,
  StrategyResult,
  Terms,
} from '../features/feature2';
import MainLayout from '../layouts/MainLayout';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

const AppRouter = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route
            path={ROUTES.register}
            element={isAuthenticated ? <Navigate to={ROUTES.dashboard} replace /> : <RegisterPage />}
          />
          <Route
            path={ROUTES.login}
            element={isAuthenticated ? <Navigate to={ROUTES.dashboard} replace /> : <LoginPage />}
          />
          <Route
            path={ROUTES.forgotPassword}
            element={isAuthenticated ? <Navigate to={ROUTES.dashboard} replace /> : <ForgotPassword />}
          />
          <Route
            path={ROUTES.resetPassword}
            element={isAuthenticated ? <Navigate to={ROUTES.dashboard} replace /> : <ResetPassword />}
          />
          <Route
            path={ROUTES.dashboard}
            element={(
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.dashboardCredits}
            element={(
              <ProtectedRoute>
                <CreditsPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.dashboardPricing}
            element={(
              <ProtectedRoute>
                <PricingPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.dashboardHistory}
            element={(
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.dashboardPaymentSuccess}
            element={(
              <ProtectedRoute>
                <PaymentSuccessPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.feature2Home}
            element={(
              <ProtectedRoute>
                <Feature2Home />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.feature2AuthPlus}
            element={(
              <ProtectedRoute>
                <AuthPlus />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.feature2StrategyCore}
            element={(
              <ProtectedRoute>
                <StrategyCore />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.feature2StrategyNew}
            element={(
              <ProtectedRoute>
                <StrategyCreate />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.feature2History}
            element={(
              <ProtectedRoute>
                <StrategyHistory />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.feature2StrategyDetails}
            element={(
              <ProtectedRoute>
                <StrategyResult />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.feature2BusinessPages}
            element={(
              <ProtectedRoute>
                <BusinessPages />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.feature2Pricing}
            element={(
              <ProtectedRoute>
                <Pricing />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.feature2Contact}
            element={(
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.feature2Privacy}
            element={(
              <ProtectedRoute>
                <Privacy />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.feature2Terms}
            element={(
              <ProtectedRoute>
                <Terms />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.feature2Profile}
            element={(
              <ProtectedRoute>
                <ProfileSettings />
              </ProtectedRoute>
            )}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AppRouter;


