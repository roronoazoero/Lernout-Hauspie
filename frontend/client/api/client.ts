// src/api/client.ts
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  session_id: string;
  messages: ChatMessage[];
}

export interface ChatResponse {
  output_text: string;
}

export class APIError extends Error {
  status: number;
  code?: string;
  constructor(message: string, status: number, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://lernout-hauspie.onrender.com";

export const chatAPI = {
  sendMessage: async (request: ChatRequest): Promise<ChatResponse> => {
    try {
      const res = await fetch(`${API_BASE_URL}/agent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new APIError(errorData.detail || res.statusText, res.status);
      }

      return await res.json();
    } catch (err: any) {
      console.error("chatAPI error:", err);
      throw new APIError(err.message || "Network error", 0);
    }
  },
};

// Session helper
export const getOrCreateSessionId = (): string => {
  let sessionId = localStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = `session_${Math.random().toString(36).substring(2)}`;
    localStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};
