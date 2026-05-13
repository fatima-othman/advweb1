import api from '../../../services/api';
import { storage } from '../../../utils/storage';

const STRATEGY_STORAGE_KEY = 'strategai_feature2_reports';

const normalizeFeatureError = (error) => {
  const responseData = error?.response?.data;
  const fieldErrors = responseData?.errors && typeof responseData.errors === 'object'
    ? Object.entries(responseData.errors).reduce((acc, [field, messages]) => {
        acc[field] = Array.isArray(messages) ? messages[0] : String(messages);
        return acc;
      }, {})
    : {};

  return {
    status: error?.response?.status || null,
    message: responseData?.message || 'Request failed. Please try again.',
    fieldErrors,
  };
};

export const getCreditPackages = async () => {
  try {
    const response = await api.get('/credit-packages');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    throw normalizeFeatureError(error);
  }
};

export const getTransactions = async () => {
  try {
    const response = await api.get('/transactions');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    throw normalizeFeatureError(error);
  }
};

export const getCreditsOverview = async () => {
  try {
    const [meResponse, transactionsResponse] = await Promise.all([
      api.get('/me'),
      api.get('/transactions'),
    ]);

    const user = meResponse.data || {};
    const transactions = Array.isArray(transactionsResponse.data) ? transactionsResponse.data : [];

    return { user, transactions };
  } catch (error) {
    throw normalizeFeatureError(error);
  }
};

export const deductCredits = async (payload) => {
  try {
    const response = await api.post('/credits/deduct', payload);
    return response.data;
  } catch (error) {
    throw normalizeFeatureError(error);
  }
};

export const createCheckoutSession = async (payload) => {
  try {
    const response = await api.post('/billing/checkout-session', payload);
    return response.data;
  } catch (error) {
    throw normalizeFeatureError(error);
  }
};

export const createSetupIntent = async () => {
  try {
    const response = await api.post('/billing/setup-intent');
    return response.data;
  } catch (error) {
    throw normalizeFeatureError(error);
  }
};

export const savePaymentMethod = async (payload) => {
  try {
    const response = await api.post('/billing/payment-method', payload);
    return response.data;
  } catch (error) {
    throw normalizeFeatureError(error);
  }
};

export const updateAutoRechargeSettings = async (payload) => {
  try {
    const response = await api.post('/billing/auto-recharge', payload);
    return response.data;
  } catch (error) {
    throw normalizeFeatureError(error);
  }
};

const readReports = () => {
  try {
    const raw = localStorage.getItem(STRATEGY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeReports = (reports) => {
  localStorage.setItem(STRATEGY_STORAGE_KEY, JSON.stringify(reports));
};

const buildFallbackReport = (payload) => {
  const id = String(Date.now());
  const createdAt = new Date().toISOString();

  return {
    id,
    company_name: payload.company_name,
    industry: payload.industry,
    objective: payload.objective,
    budget_range: payload.budget_range,
    timeline: payload.timeline,
    challenges: payload.challenges,
    target_market: payload.target_market,
    summary: `Focus on ${payload.objective.toLowerCase()} over ${payload.timeline.toLowerCase()} with staged execution and weekly KPI tracking.`,
    priorities: [
      'Validate top customer segment and sharpen positioning.',
      'Launch a lean acquisition funnel with measurable milestones.',
      'Track unit economics weekly and adjust spend allocation.',
    ],
    risks: [
      'Unclear product-market fit assumptions.',
      'Overextension of marketing budget early in the cycle.',
      'Execution delays due to limited team bandwidth.',
    ],
    kpis: ['Monthly revenue growth', 'Customer acquisition cost', 'Retention rate'],
    created_at: createdAt,
  };
};

export const requestPasswordReset = async (payload) => {
  try {
    const response = await api.post('/forgot-password', payload, { skipAuthRedirect: true });
    return response.data;
  } catch (error) {
    throw normalizeFeatureError(error);
  }
};

export const submitPasswordReset = async (payload) => {
  try {
    const response = await api.post('/reset-password', payload, { skipAuthRedirect: true });
    return response.data;
  } catch (error) {
    throw normalizeFeatureError(error);
  }
};

export const updateProfile = async (payload) => {
  try {
    const response = await api.put('/profile', payload);
    return response.data?.user || response.data;
  } catch (error) {
    if (!error?.response) {
      const currentUser = storage.getUser() || {};
      const updatedUser = { ...currentUser, ...payload };
      storage.setUser(updatedUser);
      return updatedUser;
    }

    throw normalizeFeatureError(error);
  }
};

export const createStrategyReport = async (payload) => {
  try {
    const response = await api.post('/strategies', payload);
    return response.data?.data || response.data;
  } catch (error) {
    if (!error?.response || error?.response?.status === 404) {
      const report = buildFallbackReport(payload);
      const allReports = [report, ...readReports()];
      writeReports(allReports);
      return report;
    }

    throw normalizeFeatureError(error);
  }
};

export const getStrategyReportById = async (strategyId) => {
  try {
    const response = await api.get(`/strategies/${strategyId}`);
    return response.data?.data || response.data;
  } catch (error) {
    if (!error?.response || error?.response?.status === 404) {
      const report = readReports().find((item) => String(item.id) === String(strategyId));
      if (!report) {
        throw {
          status: 404,
          message: 'Strategy report not found.',
          fieldErrors: {},
        };
      }

      return report;
    }

    throw normalizeFeatureError(error);
  }
};

export const getStrategyHistory = async () => {
  try {
    const response = await api.get('/strategies');
    return response.data?.data || response.data || [];
  } catch (error) {
    if (!error?.response || error?.response?.status === 404) {
      return readReports();
    }

    throw normalizeFeatureError(error);
  }
};
