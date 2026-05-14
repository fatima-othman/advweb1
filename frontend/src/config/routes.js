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
  feature2Home: '/feature2',
  feature2AuthPlus: '/feature2/auth-plus',
  feature2StrategyCore: '/feature2/strategy',
  feature2StrategyNew: '/feature2/strategy/new',
  feature2History: '/feature2/strategy/history',
  feature2StrategyDetails: '/feature2/strategy/:id',
  feature2BusinessPages: '/feature2/business',
  feature2Pricing: '/feature2/business/pricing',
  feature2Contact: '/feature2/business/contact',
  feature2Privacy: '/feature2/business/privacy',
  feature2Terms: '/feature2/business/terms',
  feature2Profile: '/feature2/profile',
};

export const buildStrategyDetailsPath = (id) => `/feature2/strategy/${id}`;

export const NAV_LINKS = {
  public: [
    { label: 'Log in', to: ROUTES.login },
  ],
  private: [
    { label: 'Dashboard', to: ROUTES.dashboard },
    { label: 'Credits', to: ROUTES.dashboardCredits },
    { label: 'Feature 2', to: ROUTES.feature2Home },
  ],
};

export const QUICK_LINKS = [
  { label: 'Home', to: ROUTES.home, protected: false },
  { label: 'Register', to: ROUTES.register, protected: false },
  { label: 'Login', to: ROUTES.login, protected: false },
  { label: 'Dashboard', to: ROUTES.dashboard, protected: true },
  { label: 'Feature 2', to: ROUTES.feature2Home, protected: true },
];
