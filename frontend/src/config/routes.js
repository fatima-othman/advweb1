export const ROUTES = {
  home: '/',
  register: '/register',
  login: '/login',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  dashboard: '/dashboard',
  dashboardCredits: '/dashboard/credits',
  dashboardPricing: '/dashboard/pricing',
  dashboardHistory: '/dashboard/history',
};

export const NAV_LINKS = {
  public: [
    { label: 'Log in', to: ROUTES.login },
  ],
  private: [
    { label: 'Dashboard', to: ROUTES.dashboard },
    { label: 'Credits', to: ROUTES.dashboardCredits },
  ],
};

export const QUICK_LINKS = [
  { label: 'Home', to: ROUTES.home, protected: false },
  { label: 'Register', to: ROUTES.register, protected: false },
  { label: 'Login', to: ROUTES.login, protected: false },
  { label: 'Dashboard', to: ROUTES.dashboard, protected: true },
];
