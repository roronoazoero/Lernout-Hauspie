import React, { useState } from 'react';
import { MortgageResults } from '../lib/mortgage';
import Chat from './Chat'; // Import your agent chat

interface MortgageChatProps {
  mortgageResults?: MortgageResults | null;
  onFillApplication: () => void;
  onBack?: () => void;
}

export default function MortgageChat({ mortgageResults, onFillApplication, onBack }: MortgageChatProps) {
  const [chatStarted, setChatStarted] = useState(false);

  // Show application choice screen if chat hasn't started
  if (!chatStarted) {
    return (
      <div className="flex h-full w-full flex-col bg-white">
        {/* Header */}
        <div className="flex items-center justify-between bg-white px-4 py-4 border-b border-gray-100">
          <button 
            onClick={onBack}
            className="flex h-12 w-12 items-center justify-center"
          >
            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" className="h-6 w-6">
              <path fillRule="evenodd" clipRule="evenodd" d="M18 8C18 8.41421 17.6642 8.75 17.25 8.75H2.56031L8.03063 14.2194C8.32368 14.5124 8.32368 14.9876 8.03063 15.2806C7.73757 15.5737 7.26243 15.5737 6.96937 15.2806L0.219375 8.53063C0.0785422 8.38995 -0.000590086 8.19906 -0.000590086 8C-0.000590086 7.80094 0.0785422 7.61005 0.219375 7.46937L6.96937 0.719375C7.26243 0.426319 7.73757 0.426319 8.03063 0.719375C8.32368 1.01243 8.32368 1.48757 8.03063 1.78062L2.56031 7.25H17.25C17.6642 7.25 18 7.58579 18 8Z" fill="#1C140D"/>
            </svg>
          </button>
          <h1 className="flex-1 pr-12 text-center text-lg font-bold leading-6 text-mortgage-dark">
            Medical Financing Help
          </h1>
        </div>

        {/* Mortgage Summary (if available) */}
        {mortgageResults && (
          <div className="border-b border-gray-100 px-4 py-4">
            <h2 className="mb-4 text-lg font-bold text-mortgage-dark">
              Your Calculation Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-mortgage-brown">Loan Amount:</span>
                <span className="text-sm text-mortgage-dark font-medium">
                  ${mortgageResults.loanAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-mortgage-brown">Interest Rate:</span>
                <span className="text-sm text-mortgage-dark font-medium">
                  {mortgageResults.interestRate}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-mortgage-brown">Monthly Payment:</span>
                <span className="text-sm text-mortgage-dark font-medium">
                  ${mortgageResults.monthlyPayment.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 px-4 py-4">
          <div className="mb-6">
            <div className="mb-2">
              <span className="text-sm text-mortgage-brown">Choose Your Next Step</span>
            </div>
            <div className="rounded-xl bg-mortgage-cream p-4">
              <p className="text-base leading-6 text-mortgage-dark">
                How would you like to proceed with your mortgage loan application?
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onFillApplication}
              className="flex h-12 w-full items-center justify-center rounded-2xl bg-primary px-4"
            >
              <span className="text-sm font-bold leading-[21px] text-white">
                📋 Fill in Application Form
              </span>
            </button>
            
            <button
              onClick={() => setChatStarted(true)}
              className="flex h-12 w-full items-center justify-center rounded-2xl bg-mortgage-cream px-4 border-2 border-primary"
            >
              <span className="text-sm font-bold leading-[21px] text-primary">
                💬 Chat with Mortgage Assistant
              </span>
            </button>
          </div>

          <div className="mt-4 px-2">
            <p className="text-xs text-gray-500 text-center">
              The Mortgage Assistant can help you understand your financing options, 
              answer questions about mortgage loans, and guide you through the process.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show the actual agent chat interface
  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between bg-white px-4 py-3 border-b border-gray-100">
        <button 
          onClick={() => setChatStarted(false)}
          className="flex h-10 w-10 items-center justify-center"
        >
          <svg width="18" height="16" viewBox="0 0 18 16" fill="none" className="h-5 w-5">
            <path fillRule="evenodd" clipRule="evenodd" d="M18 8C18 8.41421 17.6642 8.75 17.25 8.75H2.56031L8.03063 14.2194C8.32368 14.5124 8.32368 14.9876 8.03063 15.2806C7.73757 15.5737 7.26243 15.5737 6.96937 15.2806L0.219375 8.53063C0.0785422 8.38995 -0.000590086 8.19906 -0.000590086 8C-0.000590086 7.80094 0.0785422 7.61005 0.219375 7.46937L6.96937 0.719375C7.26243 0.426319 7.73757 0.426319 8.03063 0.719375C8.32368 1.01243 8.32368 1.48757 8.03063 1.78062L2.56031 7.25H17.25C17.6642 7.25 18 7.58579 18 8Z" fill="#1C140D"/>
          </svg>
        </button>
        <h1 className="flex-1 pr-10 text-center text-base font-bold leading-6 text-mortgage-dark">
          MedFi Assistant Chat
        </h1>
      </div>

      {/* Agent Chat Component */}
      <div className="flex-1 flex flex-col">
        <Chat 
/*          className="flex-1 border-0 rounded-none shadow-none"*/
          placeholder="Ask about OP loans, payment plans..."
        />
        
        {/* Action buttons at bottom */}
        <div className="border-t border-gray-100 p-3">
          <div className="flex gap-2">
            <button
              onClick={onFillApplication}
              className="flex-1 h-10 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Continue to Application
            </button>
            <button
              onClick={() => setChatStarted(false)}
              className="px-4 h-10 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}