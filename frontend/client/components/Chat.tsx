import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { 
  chatAPI, 
  ChatMessage, 
  ChatRequest, 
  ChatResponse, 
  getOrCreateSessionId, 
  APIError 
} from '../api/client';

interface ChatProps {
  placeholder?: string;
  maxMessages?: number;
  disabled?: boolean;
}

interface ChatState {
  messages: ChatMessage[];
  sessionId: string;
  inputValue: string;
}

export const Chat: React.FC<ChatProps> = ({
  placeholder = 'Ask me about medical financing options...',
  maxMessages = 100,
  disabled = false
}) => {
  const [state, setState] = useState<ChatState>({
    messages: [],
    sessionId: getOrCreateSessionId(),
    inputValue: ''
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const retryRequestRef = useRef<ChatRequest | null>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  // Focus input on mount
  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  const sendMessageMutation = useMutation({
    mutationFn: async (request: ChatRequest): Promise<ChatResponse> => {
      // Store request for potential retry
      retryRequestRef.current = request;
      return chatAPI.sendMessage(request);
    },
    onSuccess: (response: ChatResponse) => {
      setState(prev => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            role: 'assistant' as const,
            content: response.output_text
          }
        ],
        inputValue: ''
      }));
      
      // Clear retry request on success
      retryRequestRef.current = null;
      
      // Focus back to input
      setTimeout(() => inputRef.current?.focus(), 100);
    },
    onError: (error: APIError) => {
      console.error('Chat error:', error);
      
      // Add error message to chat if it's not a network/timeout error
      if (error.status !== 0 && error.code !== 'TIMEOUT') {
        setState(prev => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              role: 'assistant' as const,
              content: `I apologize, but I encountered an error: ${error.message}. Please try again.`
            }
          ]
        }));
      }
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = state.inputValue.trim();
    if (!message || disabled || sendMessageMutation.isPending) {
      return;
    }

    // Add user message immediately
    const userMessage: ChatMessage = {
      role: 'user',
      content: message
    };

    const newMessages = [...state.messages, userMessage];
    
    // Limit message history to prevent payload bloat
    const limitedMessages = newMessages.slice(-maxMessages);

    setState(prev => ({
      ...prev,
      messages: limitedMessages,
      inputValue: ''
    }));

    // Send to API
    const request: ChatRequest = {
      session_id: state.sessionId,
      messages: limitedMessages
    };

    sendMessageMutation.mutate(request);
  };

  const handleRetry = () => {
    if (retryRequestRef.current && !sendMessageMutation.isPending) {
      sendMessageMutation.mutate(retryRequestRef.current);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleClearChat = () => {
    if (sendMessageMutation.isPending) return;
    
    setState(prev => ({
      ...prev,
      messages: []
    }));
    
    inputRef.current?.focus();
  };

  const isLoading = sendMessageMutation.isPending;
  const hasError = sendMessageMutation.isError;
  const canRetry = hasError && retryRequestRef.current;

  return (
    <div className="flex flex-col h-full bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <h2 className="text-lg font-semibold text-gray-800">Mortgage Assistant</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            Session: {state.sessionId.slice(-8)}
          </span>
          {state.messages.length > 0 && (
            <button
              onClick={handleClearChat}
              disabled={isLoading}
              className="text-xs px-2 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Clear chat history"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {state.messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p className="text-lg mb-2">👋 Hi! I'm your Mortgage Assistant.</p>
            <p className="mb-2">I can help you with:</p>
            <ul className="text-sm space-y-1 text-left max-w-md mx-auto">
              <li>• Applying for a mortgage</li>
              <li>• Tracking of loan applications</li>
              <li>• Inquiries about loan terms</li>
              <li>• Updating your loan application details</li>
            </ul>
            <p className="text-sm mt-4 text-gray-400">
              Your conversation is secure and session-based.
            </p>
          </div>
        )}

        {state.messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 border border-gray-200'
              }`}
            >
              <div className="whitespace-pre-wrap break-words">
                {message.content}
              </div>
            </div>
          </div>
        ))}

        {/* Loading indicator with enhanced messaging */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-xs lg:max-w-md px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                <span>Processing your request...</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                This may take up to 2 minutes for complex queries
              </div>
            </div>
          </div>
        )}

        {/* Error state with retry option */}
        {hasError && (
          <div className="flex justify-center">
            <div className="max-w-md px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-center">
              <p className="text-red-800 text-sm mb-2">
                {sendMessageMutation.error instanceof APIError 
                  ? `${sendMessageMutation.error.message}`
                  : 'An unexpected error occurred'
                }
              </p>
              {canRetry && (
                <button
                  onClick={handleRetry}
                  className="text-xs px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  aria-label="Retry last message"
                >
                  Retry
                </button>
              )}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <div className="flex-1">
            <textarea
              ref={inputRef}
              value={state.inputValue}
              onChange={(e) => setState(prev => ({ ...prev, inputValue: e.target.value }))}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled || isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              rows={1}
              style={{ minHeight: '40px', maxHeight: '120px' }}
              aria-label="Message input"
            />
          </div>
          <button
            type="submit"
            disabled={disabled || isLoading || !state.inputValue.trim()}
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              'Send'
            )}
          </button>
        </div>
        
        {/* Input hints and status */}
        <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <div className="flex items-center gap-2">
            {state.messages.length > 0 && (
              <span>{state.messages.length} messages in session</span>
            )}
            {isLoading && (
              <span className="text-orange-600 font-medium">⏳ Agent processing...</span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Chat;