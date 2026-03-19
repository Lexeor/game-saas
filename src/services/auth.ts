export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
}

export interface BackendAuthResponse {
  user: AuthUser;
  token: string;
}

const API_URL = import.meta.env.VITE_API_URL ?? '';
const MOCK_AUTH = import.meta.env.VITE_MOCK_AUTH === 'true';

const MOCK_RESPONSE: BackendAuthResponse = {
  user: {
    id: 'mock-user-1',
    email: 'dev@gamenest.io',
    name: 'Dev User',
    avatar: null,
  },
  token: 'mock-jwt-token',
};

/**
 * Exchanges a Google authorization code for a session token from the backend.
 * Backend endpoint: POST /api/auth/google
 * Expected body: { code: string }
 * Expected response: { user: AuthUser, token: string }
 */
export async function authenticateWithGoogle(code: string): Promise<BackendAuthResponse> {
  if (MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 400)); // simulate network
    return MOCK_RESPONSE;
  }

  const res = await fetch(`${API_URL}/api/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });

  if (!res.ok) {
    const message = await res.text().catch(() => `HTTP ${res.status}`);
    throw new Error(message || `Auth failed: ${res.status}`);
  }

  return res.json() as Promise<BackendAuthResponse>;
}

/**
 * Invalidates the session on the backend.
 * Backend endpoint: POST /api/auth/logout
 */
export async function logoutFromBackend(token: string): Promise<void> {
  if (MOCK_AUTH) return;

  await fetch(`${API_URL}/api/auth/logout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
}
