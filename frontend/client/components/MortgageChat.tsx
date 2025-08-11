import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  chatAPI,
  getOrCreateSessionId,
  APIError,
  ChatMessage,
  ChatRequest,
  ChatResponse,
} from "../api/client";
import { MortgageResults } from "../lib/mortgage";

interface MortgageChatProps {
  mortgageResults?: MortgageResults | null;
  onFillApplication: () => void;
  onBack?: () => void;
  maxMessages?: number;
  placeholder?: string;
  disabled?: boolean;
}

export default function MortgageChat({
  mortgageResults,
  onFillApplication = () => console.warn("onFillApplication not provided"),
  onBack,
  maxMessages = 100,
  placeholder = "Ask me about mortgage options…",
  disabled = false,
}: MortgageChatProps) {
  // session + chat state
  const [sessionId] = useState<string>(() => getOrCreateSessionId());
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [chatStarted, setChatStarted] = useState(false);

  // keep a ref to retry the last request
  const retryRequestRef = useRef<ChatRequest | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // initial greeting (shown when no messages yet)
  const showWelcome = messages.length === 0;

  // scroll to bottom as messages change
  useEffect(
    () => endRef.current?.scrollIntoView({ behavior: "smooth" }),
    [messages],
  );

  // focus input when chat becomes active
  useEffect(() => {
    if (chatStarted && !disabled) inputRef.current?.focus();
  }, [chatStarted, disabled]);

  const sendMessageMutation = useMutation({
    mutationFn: async (request: ChatRequest): Promise<ChatResponse> => {
      retryRequestRef.current = request;
      return chatAPI.sendMessage(request);
    },
    onSuccess: (resp) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: resp.output_text },
      ]);
      retryRequestRef.current = null;
      setTimeout(() => inputRef.current?.focus(), 80);
    },
    onError: (error: APIError) => {
      // Put a user-friendly line in the chat (unless it was a plain network/timeout)
      if (error.status !== 0 && error.code !== "TIMEOUT") {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `I hit an error: ${error.message}. Please try again in a moment.`,
          },
        ]);
      }
    },
  });

  const isLoading = sendMessageMutation.isPending;
  const hasError = sendMessageMutation.isError;
  const canRetry = !!retryRequestRef.current && hasError;

  const handleStartChat = () => setChatStarted(true);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text || disabled || isLoading) return;

    const userMsg: ChatMessage = { role: "user", content: text };
    const next = [...messages, userMsg];
    const limited = next.slice(-maxMessages);
    setMessages(limited);
    setInputValue("");

    const request: ChatRequest = {
      session_id: sessionId,
      messages: limited,
    };
    sendMessageMutation.mutate(request);
  };

  const handleRetry = () => {
    if (retryRequestRef.current && !isLoading) {
      sendMessageMutation.mutate(retryRequestRef.current);
    }
  };

  // keep your mortgage summary
  const summary = useMemo(() => {
    if (!mortgageResults) return null;
    return {
      loanAmount: mortgageResults.loanAmount.toLocaleString(),
      rate: mortgageResults.interestRate,
      term: mortgageResults.loanTermYears,
    };
  }, [mortgageResults]);

  // --- pre-chat splash screen (your original “choose path” UI) ---
  if (!chatStarted) {
    return (
      <div className="flex h-full w-full flex-col bg-white">
        <div className="flex items-center justify-between bg-white px-4 py-4 border-b border-gray-100">
          <button
            onClick={onBack}
            className="flex h-12 w-12 items-center justify-center"
          >
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 8C18 8.41421 17.6642 8.75 17.25 8.75H2.56031L8.03063 14.2194C8.32368 14.5124 8.32368 14.9876 8.03063 15.2806C7.73757 15.5737 7.26243 15.5737 6.96937 15.2806L0.219375 8.53063C0.0785422 8.38995 -0.000590086 8.19906 -0.000590086 8C-0.000590086 7.80094 0.0785422 7.61005 0.219375 7.46937L6.96937 0.719375C7.26243 0.426319 7.73757 0.426319 8.03063 0.719375C8.32368 1.01243 8.32368 1.48757 8.03063 1.78062L2.56031 7.25H17.25C17.6642 7.25 18 7.58579 18 8Z"
                fill="#1C140D"
              />
            </svg>
          </button>
          <h1 className="flex-1 pr-12 text-center text-lg font-bold leading-6 text-mortgage-dark">
            Mortgage Chat
          </h1>
        </div>

        <div className="flex-1 px-4 py-4">
          <div className="mb-6">
            <div className="mb-2">
              <span className="text-sm text-mortgage-brown">Support</span>
            </div>
            <div className="rounded-xl bg-mortgage-cream p-4">
              <p className="text-base leading-6 text-mortgage-dark">
                Select how you wish to proceed with the application:
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onFillApplication}
              className="flex h-10 w-full items-center justify-center rounded-2xl bg-primary px-4"
            >
              <span className="text-sm font-bold leading-[21px] text-white">
                Fill in Application
              </span>
            </button>

            <button
              onClick={handleStartChat}
              className="flex h-10 w-full items-center justify-center rounded-2xl bg-mortgage-cream px-4"
            >
              <span className="text-sm font-bold leading-[21px] text-mortgage-dark">
                Start Application Chat
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- chat screen ---
  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between bg-white px-4 py-4 border-b border-gray-100">
        <button
          onClick={() => setChatStarted(false)}
          className="flex h-12 w-12 items-center justify-center"
        >
          <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            className="h-6 w-6"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18 8C18 8.41421 17.6642 8.75 17.25 8.75H2.56031L8.03063 14.2194C8.32368 14.5124 8.32368 14.9876 8.03063 15.2806C7.73757 15.5737 7.26243 15.5737 6.96937 15.2806L0.219375 8.53063C0.0785422 8.38995 -0.000590086 8.19906 -0.000590086 8C-0.000590086 7.80094 0.0785422 7.61005 0.219375 7.46937L6.96937 0.719375C7.26243 0.426319 7.73757 0.426319 8.03063 0.719375C8.32368 1.01243 8.32368 1.48757 8.03063 1.78062L2.56031 7.25H17.25C17.6642 7.25 18 7.58579 18 8Z"
              fill="#1C140D"
            />
          </svg>
        </button>
        <h1 className="flex-1 pr-12 text-center text-lg font-bold leading-6 text-mortgage-dark">
          Mortgage Chat
        </h1>
        <span className="text-xs text-mortgage-brown">
          Session: {sessionId.slice(-8)}
        </span>
      </div>

      {/* Summary */}
      {(mortgageResults || chatStarted) && (
        <div className="border-b border-gray-100 px-4 py-4">
          <h2 className="mb-6 text-lg font-bold text-mortgage-dark">
            Mortgage Calculation Summary
          </h2>
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="flex-1 border-t border-gray-200 pt-5">
                <div className="text-sm text-mortgage-brown mb-1">
                  Loan Amount
                </div>
                <div className="text-sm text-mortgage-dark font-medium">
                  ${summary ? summary.loanAmount : "250,000"}
                </div>
              </div>
              <div className="flex-1 border-t border-gray-200 pt-5">
                <div className="text-sm text-mortgage-brown mb-1">
                  Interest Rate
                </div>
                <div className="text-sm text-mortgage-dark font-medium">
                  {summary ? summary.rate : "4.5"}%
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-5">
              <div className="text-sm text-mortgage-brown mb-1">Loan Term</div>
              <div className="text-sm text-mortgage-dark font-medium">
                {summary ? summary.term : "30"} years
              </div>
            </div>
          </div>
          <div className="mt-6 text-base text-mortgage-dark">
            Chat with our mortgage assistant to discuss your options.
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* welcome / help cards */}
        {showWelcome && (
          <div className="mb-6 max-w-[280px] mr-12">
            <div className="mb-1">
              <span className="text-sm text-left text-mortgage-brown">
                Mortgage Bot
              </span>
            </div>
            <div className="rounded-xl p-3 bg-mortgage-cream text-mortgage-dark">
              <p className="text-base leading-6">
                👋 Hi! I’m your mortgage assistant. Ask me anything about rates,
                terms, or the application.
              </p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {messages.map((m, idx) => {
            const isUser = m.role === "user";
            return (
              <div
                key={idx}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[280px] ${isUser ? "ml-12" : "mr-12"}`}>
                  <div className="mb-1">
                    <span
                      className={`text-sm ${isUser ? "text-right" : "text-left"} text-mortgage-brown`}
                    >
                      {isUser ? "You" : "Mortgage Bot"}
                    </span>
                  </div>
                  <div
                    className={`rounded-xl p-3 ${isUser ? "bg-primary text-white" : "bg-mortgage-cream text-mortgage-dark"}`}
                  >
                    <p className="text-base leading-6 whitespace-pre-wrap break-words">
                      {m.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* loading bubble */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[280px] mr-12 rounded-xl p-3 bg-mortgage-cream text-mortgage-dark border border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600" />
                  <span>Processing your request…</span>
                </div>
                <div className="text-xs text-mortgage-brown mt-1">
                  This may take up to 2 minutes.
                </div>
              </div>
            </div>
          )}

          {/* error + retry */}
          {hasError && (
            <div className="flex justify-center">
              <div className="max-w-md px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-center">
                <p className="text-red-800 text-sm mb-2">
                  Something went wrong sending the last message.
                </p>
                {canRetry && (
                  <button
                    onClick={handleRetry}
                    className="text-xs px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Retry
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div ref={endRef} />
      </div>

      {/* composer */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1">
            <div className="flex h-12 items-center rounded-xl bg-mortgage-cream px-4">
              <input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={disabled || isLoading}
                className="w-full bg-transparent text-base text-mortgage-brown placeholder:text-mortgage-brown focus:outline-none disabled:opacity-50"
              />
            </div>
          </div>
          <button
            onClick={handleSend}
            disabled={disabled || isLoading || !inputValue.trim()}
            className="flex h-10 min-w-[84px] items-center justify-center rounded-2xl bg-primary px-4 disabled:opacity-50"
          >
            <span className="text-sm font-bold leading-[21px] text-white">
              {isLoading ? "…" : "Send"}
            </span>
          </button>
        </div>

        {/* continue / cancel */}
        {messages.length >= 1 && (
          <div className="flex gap-3">
            <button
              onClick={onFillApplication}
              className="flex h-10 min-w-[84px] flex-1 items-center justify-center rounded-2xl bg-primary px-4"
            >
              <span className="text-sm font-bold leading-[21px] text-white">
                Continue
              </span>
            </button>
            <button
              onClick={() => setChatStarted(false)}
              className="flex h-10 min-w-[84px] items-center justify-center rounded-2xl bg-mortgage-cream px-4"
            >
              <span className="text-sm font-bold leading-[21px] text-mortgage-dark">
                Cancel
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
