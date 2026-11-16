import type { PageRoute } from '../types';

const DASHBOARD_BY_ROLE: Record<string, PageRoute> = {
  admin: 'admin-dashboard',
  administrator: 'admin-dashboard',
  administrateur: 'admin-dashboard',
  advisor: 'advisor-dashboard',
  conseiller: 'advisor-dashboard',
  finance: 'finance-dashboard',
};

export const getDashboardRoute = (role?: string | null): PageRoute => {
  const normalizedRole = role?.trim().toLowerCase();
  return (normalizedRole && DASHBOARD_BY_ROLE[normalizedRole]) || 'dashboard';
};
