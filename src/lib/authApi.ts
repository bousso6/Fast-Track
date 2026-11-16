const API_URL = (import.meta.env.VITE_API_URL || '/api/v1').replace(/\/+$/, '');

export interface ApiErrorDetail {
  champ?: string;
  message: string;
}

export class ApiError extends Error {
  status: number;
  details?: ApiErrorDetail[];

  constructor(message: string, status: number, details?: ApiErrorDetail[]) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export interface AuthUser {
  id?: string;
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
  isEmailVerified: boolean;
  isActive?: boolean;
  countryOfResidence?: string;
  cityOfResidence?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  accessExpiresIn?: string | number;
  refreshExpiresIn?: string | number;
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  countryOfResidence?: string;
  cityOfResidence?: string;
  consent?: boolean;
}

export interface AuthSession {
  user: AuthUser;
  tokens: AuthTokens;
}

const SESSION_KEY = 'elikia.auth.session';
export const AUTH_SESSION_EXPIRED_EVENT = 'elikia:session-expired';

const expireAuthSession = () => {
  clearAuthSession();
  window.dispatchEvent(new Event(AUTH_SESSION_EXPIRED_EVENT));
};

export const saveAuthSession = (session: AuthSession) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const getAuthSession = (): AuthSession | null => {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;

    const session = JSON.parse(raw) as AuthSession;
    if (!session?.user || !session?.tokens?.accessToken) return null;

    return session;
  } catch {
    return null;
  }
};

export const getStoredUser = (): AuthUser | null => getAuthSession()?.user ?? null;

export const clearAuthSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

let refreshInProgress: Promise<AuthSession> | null = null;

const refreshAuthSession = () => {
  if (!refreshInProgress) {
    const session = getAuthSession();
    if (!session?.tokens.refreshToken) {
      clearAuthSession();
      return Promise.reject(
        new ApiError('Votre session a expiré. Veuillez vous reconnecter.', 401)
      );
    }

    refreshInProgress = request<{ user: AuthUser; tokens: AuthTokens }>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: session.tokens.refreshToken }),
    })
      .then((response) => {
        if (!response.data?.user || !response.data.tokens?.accessToken) {
          throw new ApiError('Réponse de renouvellement de session invalide.', 500);
        }

        const renewedSession: AuthSession = {
          user: response.data.user,
          tokens: response.data.tokens,
        };
        saveAuthSession(renewedSession);
        return renewedSession;
      })
      .catch((error: unknown) => {
        if (error instanceof ApiError && error.status === 401) {
            expireAuthSession();
          throw new ApiError('Votre session a expiré. Veuillez vous reconnecter.', 401);
        }
        throw error;
      })
      .finally(() => {
        refreshInProgress = null;
      });
  }

  return refreshInProgress;
};

export const fetchWithAuth = async (
  input: RequestInfo | URL,
  options: RequestInit = {}
) => {
  const session = getAuthSession();
  if (!session?.tokens.accessToken) {
    expireAuthSession();
    throw new ApiError('Votre session a expiré. Veuillez vous reconnecter.', 401);
  }

  const send = (accessToken: string) => {
    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${accessToken}`);
    return fetch(input, { ...options, headers });
  };

  const response = await send(session.tokens.accessToken);
  if (response.status !== 401) return response;

  const renewedSession = await refreshAuthSession();
  const retryResponse = await send(renewedSession.tokens.accessToken);
  if (retryResponse.status === 401) {
    expireAuthSession();
    throw new ApiError('Votre session a expiré. Veuillez vous reconnecter.', 401);
  }

  return retryResponse;
};

interface ApiEnvelope<T> {
  success: boolean;
  message?: string;
  data?: T;
}

interface ApiErrorPayload {
  message?: string;
  details?: ApiErrorDetail[];
}

const request = async <T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiEnvelope<T>> => {
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const payload = (await response.json().catch(() => null)) as
    | (ApiEnvelope<T> & ApiErrorPayload)
    | null;

  if (!response.ok) {
    throw new ApiError(
      payload?.message || 'Une erreur est survenue. Veuillez réessayer.',
      response.status,
      payload?.details
    );
  }

  return payload ?? { success: true };
};

export const register = (input: RegisterInput) =>
  request<{ user: AuthUser }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(input),
  });

export const login = (email: string, password: string) =>
  request<{ user: AuthUser; tokens: AuthTokens }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const logout = (accessToken: string) =>
  request<never>('/auth/logout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

export const verifyEmail = (token: string) =>
  request<{ user: AuthUser }>('/auth/verify-email', {
    method: 'POST',
    body: JSON.stringify({ token }),
  });

export const resendVerification = (email: string) =>
  request<never>('/auth/resend-verification', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

export const forgotPassword = (email: string) =>
  request<never>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

export const resetPassword = (token: string, password: string) =>
  request<never>('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, password }),
  });

export const getApiErrorMessage = (error: unknown) => {
  if (error instanceof ApiError) {
    if (error.details?.length) {
      return error.details.map((detail) => detail.message).filter(Boolean).join(' ');
    }
    return error.message;
  }

  if (error instanceof TypeError) {
    return 'Impossible de joindre le serveur. Vérifiez que le backend est démarré.';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Une erreur est survenue. Veuillez réessayer.';
};
