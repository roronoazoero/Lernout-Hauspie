// frontend/client/client.ts
const BASE = import.meta.env.VITE_API_BASE ?? 'https://lernout-hauspie.onrender.com';

export async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    credentials: 'include',
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} ${res.statusText} for ${path} • ${text}`);
  }
  return res.json() as Promise<T>;
}

export function apiBase() {
  return BASE;
}
