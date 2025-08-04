import React, { useState } from 'react';
import { MortgageResults } from '../lib/mortgage';

interface MortgageChatProps {
  mortgageResults?: MortgageResults | null;
  onFillApplication: () => void;
  onBack?: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'support' | 'user';
  content: string;
  timestamp: Date;
}

export default function MortgageChat({ mortgageResults, onFillApplication, onBack }: MortgageChatProps) {
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'support',
      content: "What is your marital status?",
      timestamp: new Date()
    }
  ]);
  const [messageInput, setMessageInput] = useState('');

  const handleStartChat = () => {
    setChatStarted(true);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: messageInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageInput('');

    // Simulate bot response based on conversation context
    setTimeout(() => {
      let botResponse = '';
      if (messageInput.toLowerCase().includes('divorced')) {
        botResponse = "Sorry to hear that! Do you have any kids?";
      } else if (messageInput.toLowerCase().includes('married')) {
        botResponse = "That's great! How long have you been married?";
      } else {
        botResponse = "Thank you for that information. Let me help you proceed with your mortgage application.";
      }

      const newBotMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'support',
        content: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newBotMessage]);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: reply,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
  };

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
            Mortgage Chat
          </h1>
        </div>

        {/* Content */}
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

  // Show chat interface
  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between bg-white px-4 py-4 border-b border-gray-100">
        <button 
          onClick={() => setChatStarted(false)}
          className="flex h-12 w-12 items-center justify-center"
        >
          <svg width="18" height="16" viewBox="0 0 18 16" fill="none" className="h-6 w-6">
            <path fillRule="evenodd" clipRule="evenodd" d="M18 8C18 8.41421 17.6642 8.75 17.25 8.75H2.56031L8.03063 14.2194C8.32368 14.5124 8.32368 14.9876 8.03063 15.2806C7.73757 15.5737 7.26243 15.5737 6.96937 15.2806L0.219375 8.53063C0.0785422 8.38995 -0.000590086 8.19906 -0.000590086 8C-0.000590086 7.80094 0.0785422 7.61005 0.219375 7.46937L6.96937 0.719375C7.26243 0.426319 7.73757 0.426319 8.03063 0.719375C8.32368 1.01243 8.32368 1.48757 8.03063 1.78062L2.56031 7.25H17.25C17.6642 7.25 18 7.58579 18 8Z" fill="#1C140D"/>
          </svg>
        </button>
        <h1 className="flex-1 pr-12 text-center text-lg font-bold leading-6 text-mortgage-dark">
          Mortgage Chat
        </h1>
      </div>

      {/* Mortgage Calculation Summary */}
      {(mortgageResults || chatStarted) && (
        <div className="border-b border-gray-100 px-4 py-4">
          <h2 className="mb-6 text-lg font-bold text-mortgage-dark">
            Mortgage Calculation Summary
          </h2>

          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="flex-1 border-t border-gray-200 pt-5">
                <div className="text-sm text-mortgage-brown mb-1">Loan Amount</div>
                <div className="text-sm text-mortgage-dark font-medium">
                  ${mortgageResults ? mortgageResults.loanAmount.toLocaleString() : '250,000'}
                </div>
              </div>
              <div className="flex-1 border-t border-gray-200 pt-5">
                <div className="text-sm text-mortgage-brown mb-1">Interest Rate</div>
                <div className="text-sm text-mortgage-dark font-medium">
                  {mortgageResults ? mortgageResults.interestRate : '4.5'}%
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-5">
              <div className="text-sm text-mortgage-brown mb-1">Loan Term</div>
              <div className="text-sm text-mortgage-dark font-medium">
                {mortgageResults ? mortgageResults.loanTermYears : '30'} years
              </div>
            </div>
          </div>

          <div className="mt-6 text-base text-mortgage-dark">
            Chat with our mortgage assistant to discuss your options.
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[280px] ${message.sender === 'user' ? 'ml-12' : 'mr-12'}`}>
                <div className="mb-1">
                  <span className={`text-sm ${message.sender === 'user' ? 'text-right' : 'text-left'} text-mortgage-brown`}>
                    {message.sender === 'user' ? 'Ethan' : 'Mortgage Bot'}
                  </span>
                </div>
                <div className={`rounded-xl p-3 ${
                  message.sender === 'user' 
                    ? 'bg-primary text-white' 
                    : 'bg-mortgage-cream text-mortgage-dark'
                }`}>
                  <p className="text-base leading-6">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Reply buttons */}
        {messages.length === 1 && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => handleQuickReply('Recently divorced')}
              className="rounded-xl bg-primary px-4 py-3 text-white"
            >
              Recently divorced
            </button>
          </div>
        )}

        {messages.length === 3 && (
          <div className="mt-4 space-y-2">
            <div className="text-center text-sm text-mortgage-brown mb-2">Ethan</div>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => handleQuickReply('No, I don\'t have children')}
                className="rounded-2xl bg-mortgage-cream px-4 py-2 text-sm font-bold text-mortgage-dark"
              >
                No
              </button>
              <button
                onClick={() => handleQuickReply('Yes, I have 2 children')}
                className="rounded-2xl bg-primary px-4 py-2 text-sm font-bold text-white"
              >
                Yes
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex-1">
            <div className="flex h-12 items-center rounded-xl bg-mortgage-cream px-4">
              <input
                type="text"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="w-full bg-transparent text-base text-mortgage-brown placeholder:text-mortgage-brown focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Continue/Cancel buttons - show when there are multiple messages */}
        {messages.length >= 2 && (
          <div className="flex gap-3">
            <button
              onClick={() => onFillApplication()}
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
