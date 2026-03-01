const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.DEV ? 'http://localhost:4000' : '')).replace(/\/+$/, '');

function apiUrl(path: string) {
  const p = path.startsWith('/') ? path : `/${path}`;
  return API_BASE_URL ? `${API_BASE_URL}${p}` : p;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

async function request<T>(
  path: string,
  options: {
    method?: HttpMethod;
    body?: unknown;
    token?: string | null;
  } = {},
): Promise<T> {
  const { method = 'GET', body, token } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(apiUrl(path), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const data = (await res.json()) as { message?: string };
      if (data.message) message = data.message;
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }

  return (await res.json()) as T;
}

export type AuthUser = {
  id: string;
  email: string;
  name?: string | null;
  role: string;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

export const authApi = {
  async registerFormData(formData: FormData): Promise<AuthResponse> {
    const headers: HeadersInit = {};
    const token = undefined;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const res = await fetch(apiUrl('/api/auth/register'), {
      method: 'POST',
      headers,
      body: formData,
    });
    if (!res.ok) {
      let message = `Request failed with status ${res.status}`;
      try {
        const data = (await res.json()) as { message?: string };
        if (data.message) message = data.message;
      } catch {
        // ignore
      }
      throw new Error(message);
    }
    return res.json() as Promise<AuthResponse>;
  },

  async register(payload: {
    email: string;
    password: string;
    name?: string;
    contactAddress?: string;
    phone?: string;
  }): Promise<AuthResponse> {
    return request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: payload,
    });
  },

  async registerCorporate(payload: {
    organisationName: string;
    contactPersonName: string;
    email: string;
    phone?: string;
    timezone?: string;
    message?: string;
    password: string;
  }): Promise<AuthResponse> {
    return request<AuthResponse>('/api/auth/register-corporate', {
      method: 'POST',
      body: payload,
    });
  },

  async login(payload: { email: string; password: string }): Promise<AuthResponse> {
    return request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: payload,
    });
  },
};

export const coursesApi = {
  async getBySlug(slug: string): Promise<{
    course: { _id: string; slug: string; title: string; type: string; feeAmount?: number; currency?: string; wiseRemittanceDetails?: string };
    terms: { version: string; content: string } | null;
  }> {
    return request<{
      course: { _id: string; slug: string; title: string; type: string; feeAmount?: number; currency?: string; wiseRemittanceDetails?: string };
      terms: { version: string; content: string } | null;
    }>(`/api/courses/${slug}`);
  },

  async acceptTerms(
    slug: string,
    token: string,
  ): Promise<{
    message: string;
    termsVersion: string;
  }> {
    return request<{
      message: string;
      termsVersion: string;
    }>(`/api/courses/${slug}/accept-terms`, {
      method: 'POST',
      token,
    });
  },
};

export const subscriptionsApi = {
  async createShort(
    slug: string,
    token: string
  ): Promise<{ enrollmentId: string; checkoutUrl?: string; message: string }> {
    return request<{ enrollmentId: string; checkoutUrl?: string; message: string }>(
      `/api/subscriptions/short/${slug}`,
      { method: 'POST', token }
    );
  },

  async createCheckoutSession(
    enrollmentId: string,
    token: string
  ): Promise<{ checkoutUrl: string }> {
    return request<{ checkoutUrl: string }>(
      `/api/subscriptions/enrollment/${enrollmentId}/checkout-session`,
      { method: 'POST', token }
    );
  },

  async initiateLong(
    slug: string,
    token: string,
  ): Promise<{
    enrollmentId: string;
    invoiceNumber: string;
    wiseRemittanceDetails?: string;
    message: string;
  }> {
    return request<{
      enrollmentId: string;
      invoiceNumber: string;
      wiseRemittanceDetails?: string;
      message: string;
    }>(`/api/subscriptions/long/${slug}/initiate`, {
      method: 'POST',
      token,
    });
  },
};

export const enrollmentsApi = {
  async getMyEnrollments(token: string): Promise<{
    enrollments: Array<{
      _id: string;
      studentId?: string;
      courseTitle?: string;
      courseSlug?: string;
      type: string;
      status: string;
      invoiceNumber?: string;
      createdAt: string;
    }>;
    userId?: string;
  }> {
    return request<{
      enrollments: Array<{
        _id: string;
        studentId?: string;
        courseTitle?: string;
        courseSlug?: string;
        type: string;
        status: string;
        invoiceNumber?: string;
        createdAt: string;
      }>;
      userId?: string;
    }>('/api/me/enrollments', { token });
  },
};

