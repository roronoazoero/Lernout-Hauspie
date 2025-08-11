import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
    mutations: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    },
  },
});

// API Types matching your backend contracts
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  session_id: string;
  messages: ChatMessage[];
}

export interface ChatResponse {
  output_text: string;
  meta?: {
    session_id: string;
    correlation_id: string;
    response_time_ms: number;
    flow_id: string;
    [key: string]: any;
  };
}

export interface ChatError {
  error: {
    detail: string;
    code: string;
    correlation_id: string;
  };
}

// API Configuration - Increased timeout for agent processing
const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'https://lernout-hauspie.onrender.com';
const API_TIMEOUT = 120000; // 2 minutes for agent processing

class APIError extends Error {
  public status: number;
  public code: string;
  public correlationId?: string;

  constructor(message: string, status: number, code: string = 'UNKNOWN_ERROR', correlationId?: string) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.code = code;
    this.correlationId = correlationId;
  }
}

// HTTP Client with proper error handling and timeouts
export class ChatAPIClient {
  private baseURL: string;
  private timeout: number;

  constructor(baseURL: string = API_BASE_URL, timeout: number = API_TIMEOUT) {
    this.baseURL = baseURL.replace(/\/$/, ''); // Remove trailing slash
    this.timeout = timeout;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      console.log(`Making request to: ${this.baseURL}${endpoint}`);
      
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorData: ChatError;
        try {
          errorData = await response.json();
        } catch {
          throw new APIError(
            `HTTP ${response.status}: ${response.statusText}`,
            response.status
          );
        }

        throw new APIError(
          errorData.error.detail,
          response.status,
          errorData.error.code,
          errorData.error.correlation_id
        );
      }

      const result = await response.json();
      console.log('API Response:', result);
      return result;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof APIError) {
        throw error;
      }

      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new APIError('Agent is taking longer than expected. Please try again.', 408, 'TIMEOUT');
      }

      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new APIError('Network error - please check your connection', 0, 'NETWORK_ERROR');
      }

      throw new APIError(
        error instanceof Error ? error.message : 'An unexpected error occurred',
        0,
        'UNKNOWN_ERROR'
      );
    }
  }

  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    // Validate request before sending
    if (!request.session_id?.trim()) {
      throw new APIError('Session ID is required', 400, 'VALIDATION_ERROR');
    }

    if (!request.messages || request.messages.length === 0) {
      throw new APIError('At least one message is required', 400, 'VALIDATION_ERROR');
    }

    // Ensure messages have valid roles and content
    for (const message of request.messages) {
      if (!['user', 'assistant', 'system'].includes(message.role)) {
        throw new APIError(`Invalid message role: ${message.role}`, 400, 'VALIDATION_ERROR');
      }
      if (!message.content?.trim()) {
        throw new APIError('Message content cannot be empty', 400, 'VALIDATION_ERROR');
      }
    }

    console.log('Sending message to agent:', request);

    return this.makeRequest<ChatResponse>('/agent', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async checkHealth(): Promise<{ status: string; timestamp: number; langflow_client_ready: boolean }> {
    return this.makeRequest<{ status: string; timestamp: number; langflow_client_ready: boolean }>('/health');
  }
}

// Export singleton instance
export const chatAPI = new ChatAPIClient();

// Utility functions for session management
export function generateSessionId(): string {
  // Generate a UUID v4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getStoredSessionId(): string | null {
  if (typeof window === 'undefined') return null;
  
  try {
    return sessionStorage.getItem('chat_session_id');
  } catch {
    return null;
  }
}

export function storeSessionId(sessionId: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.setItem('chat_session_id', sessionId);
  } catch {
    // Silently fail if storage is not available
  }
}

export function getOrCreateSessionId(): string {
  let sessionId = getStoredSessionId();
  
  if (!sessionId) {
    sessionId = generateSessionId();
    storeSessionId(sessionId);
  }
  
  return sessionId;
}

// Export the APIError class for use in components
export { APIError };