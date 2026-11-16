import type { UserProject } from '../types';
import { DEFAULT_ADVISOR, INITIAL_USER_PROJECTS } from '../data/mockData';
import { ApiError, fetchWithAuth, getAuthSession } from './authApi';

export interface Advisor {
  name: string;
  title: string;
  avatar?: string | null;
  specialties: string[];
  office?: string;
}

export type DashboardProject = UserProject & { category?: string };

export interface ProjectRequest {
  id: string;
  title: string;
  category: string;
  location: string;
  status: string;
  message: string;
  createdAt: string;
}

export interface DashboardData {
  projects: DashboardProject[];
  requests: ProjectRequest[];
  advisor: Advisor | null;
}

export interface StaffProject {
  id?: string;
  _id?: string;
  title?: string;
  projectTitle?: string;
  status?: string;
  project?: { title?: string };
  progress?: number | { value?: number };
  nextStep?: string;
  dueDate?: string;
  client?: {
    id?: string;
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  budget?: {
    hasBudget?: boolean;
    total?: number;
    engaged?: number;
    available?: number;
    currency?: string;
    referenceAmount?: number;
    plannedAmount?: number;
    committedAmount?: number;
    paidAmount?: number;
    balance?: number;
  };
  timeline?: {
    step: string;
    completed: boolean;
    current?: boolean;
    date?: string;
    description?: string;
  }[];
  documents?: {
    id: string;
    name: string;
    category: string;
    size: string;
    date: string;
  }[];
}

export interface StaffDashboardData {
  summary?: {
    newLeads?: number;
    activeProjects?: number;
    blockedProjects?: number;
    overdueTasks?: number;
    milestonesAtRisk?: number;
    projectsWithBudget?: number;
    totalsByCurrency?: {
      currency: string;
      totalBudget: number;
      plannedAmount: number;
      committedAmount: number;
      paidAmount: number;
      balance: number;
    }[];
  };
  projects?: StaffProject[];
  requests?: ProjectRequest[];
  newLeads?: StaffProject[];
  activeProjects?: StaffProject[];
  blockedProjects?: StaffProject[];
  overdueTasks?: StaffProject[];
  milestonesAtRisk?: StaffProject[];
}

export type StaffDashboardRole = 'admin' | 'advisor' | 'finance';

const API_URL = (import.meta.env.VITE_API_URL || '/api/v1').replace(/\/+$/, '');

export interface StaffPartner {
  id?: string;
  projectTitle: string;
  role: string;
  status: string;
  partner: {
    id?: string;
    name?: string;
    category?: string;
    verificationStatus?: string;
  };
}

export interface StaffExpense {
  id?: string;
  _id?: string;
  projectTitle: string;
  item: string;
  supplier?: string;
  amount: number;
  date?: string;
  status: string;
}

export const fetchStaffPartners = async (
  projects: StaffProject[],
  signal?: AbortSignal
) => {
  const projectRequests = projects.flatMap((project) => {
    const projectId = project.id ?? project._id;
    if (!projectId) return [];

    return [{
      projectId,
      projectTitle: project.title ?? project.projectTitle ?? 'Projet sans titre',
    }];
  });

  const assignments = await Promise.all(
    projectRequests.map(async ({ projectId, projectTitle }) => {
      const response = await fetchWithAuth(
        `${API_URL}/projects/${encodeURIComponent(projectId)}/partners`,
        { signal, headers: { Accept: 'application/json' } }
      );
      const payload = (await response.json().catch(() => null)) as
        | { message?: string; data?: Omit<StaffPartner, 'projectTitle'>[] }
        | null;

      if (!response.ok) {
        throw new ApiError(
          payload?.message ?? `Impossible de charger les partenaires (erreur ${response.status}).`,
          response.status
        );
      }
      if (!Array.isArray(payload?.data)) {
        throw new ApiError('La réponse du serveur ne contient pas une liste de partenaires valide.', response.status);
      }

      return payload.data.map((assignment) => ({ ...assignment, projectTitle }));
    })
  );

  return assignments.flat();
};

export const fetchStaffExpenses = async (
  projects: StaffProject[],
  signal?: AbortSignal
) => {
  const projectRequests = projects.flatMap((project) => {
    const projectId = project.id ?? project._id;
    if (!projectId) return [];

    return [{
      projectId,
      projectTitle: project.title ?? project.projectTitle ?? 'Projet sans titre',
    }];
  });

  const expenses = await Promise.all(
    projectRequests.map(async ({ projectId, projectTitle }) => {
      const response = await fetchWithAuth(
        `${API_URL}/projects/${encodeURIComponent(projectId)}/expenses?page=1&limit=200`,
        { signal, headers: { Accept: 'application/json' } }
      );
      const payload = (await response.json().catch(() => null)) as
        | { message?: string; data?: Omit<StaffExpense, 'projectTitle'>[] }
        | null;

      if (!response.ok) {
        throw new ApiError(
          payload?.message ?? `Impossible de charger les dépenses (erreur ${response.status}).`,
          response.status
        );
      }
      if (!Array.isArray(payload?.data)) {
        throw new ApiError('La réponse du serveur ne contient pas une liste de dépenses valide.', response.status);
      }

      return payload.data.map((expense) => ({ ...expense, projectTitle }));
    })
  );

  return expenses.flat();
};

export const downloadStaffBudgetReport = async () => {
  const response = await fetchWithAuth(
    `${API_URL}/admin/reports/budgets?format=csv`,
    { headers: { Accept: 'text/csv' } }
  );
  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;
    throw new ApiError(
      payload?.message ?? `Impossible de télécharger le rapport (erreur ${response.status}).`,
      response.status
    );
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'elikia-budgets.csv';
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

export async function fetchDashboard(signal?: AbortSignal): Promise<DashboardData> {
  if (import.meta.env.VITE_USE_MOCKS === 'true') {
    return {
      projects: INITIAL_USER_PROJECTS as DashboardProject[],
      requests: [],
      advisor: DEFAULT_ADVISOR as unknown as Advisor,
    };
  }

  const accessToken = getAuthSession()?.tokens.accessToken;
  if (!accessToken) {
    throw new ApiError('Votre session a expiré. Veuillez vous reconnecter.', 401);
  }

  const res = await fetchWithAuth(`${API_URL}/me/dashboard`, {
    signal,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 401) {
    throw new ApiError('Votre session a expiré. Veuillez vous reconnecter.', 401);
  }
  if (!res.ok) {
    throw new ApiError(`Impossible de charger vos projets (erreur ${res.status}).`, res.status);
  }

  const json = await res.json();
  const body = json.data ?? json;

  return {
    projects: Array.isArray(body.projects) ? body.projects : [],
    requests: Array.isArray(body.requests) ? body.requests : [],
    advisor: body.advisor ?? null,
  };
}

export async function fetchStaffDashboard(
  role: StaffDashboardRole,
  signal?: AbortSignal
): Promise<StaffDashboardData> {
  const accessToken = getAuthSession()?.tokens.accessToken;
  if (!accessToken) {
    throw new ApiError('Votre session a expiré. Veuillez vous reconnecter.', 401);
  }

  const endpoint = {
    admin: '/admin/dashboard',
    advisor: '/dashboard/advisor',
    finance: '/dashboard/finance',
  }[role];
  const response = await fetchWithAuth(`${API_URL}${endpoint}`, {
    signal,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const payload = (await response.json().catch(() => null)) as
    | { success?: boolean; message?: string; data?: StaffDashboardData }
    | null;

  if (!response.ok) {
    throw new ApiError(
      payload?.message ?? `Impossible de charger le dashboard (erreur ${response.status}).`,
      response.status
    );
  }
  if (!payload?.data) {
    throw new ApiError(
      'La réponse du serveur ne contient pas les données du dashboard.',
      response.status
    );
  }

  return payload.data;
}
