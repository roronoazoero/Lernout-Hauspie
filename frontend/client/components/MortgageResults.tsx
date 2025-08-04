import React from 'react';
import { MortgageResults, formatCurrency } from '../lib/mortgage';

// Back arrow icon
const BackIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M18 8C18 8.41421 17.6642 8.75 17.25 8.75H2.56031L8.03063 14.2194C8.32368 14.5124 8.32368 14.9876 8.03063 15.2806C7.73757 15.5737 7.26243 15.5737 6.96937 15.2806L0.219375 8.53063C0.0785422 8.38995 -0.000590086 8.19906 -0.000590086 8C-0.000590086 7.80094 0.0785422 7.61005 0.219375 7.46937L6.96937 0.719375C7.26243 0.426319 7.73757 0.426319 8.03063 0.719375C8.32368 1.01243 8.32368 1.48757 8.03063 1.78062L2.56031 7.25H17.25C17.6642 7.25 18 7.58579 18 8Z" fill="#1C140D"/>
  </svg>
);

interface MortgageResultsProps {
  results: MortgageResults;
  onBack: () => void;
  onRecalculate: () => void;
  onStartApplication: () => void;
}

export default function MortgageResults({ 
  results, 
  onBack, 
  onRecalculate, 
  onStartApplication 
}: MortgageResultsProps) {
  return (
    <div className="flex h-full w-full flex-col bg-white relative">
      {/* Background Image - matches the Figma design */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-gradient-to-b from-white to-gray-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between bg-white px-4 py-4 border-b border-gray-100">
          <button onClick={onBack} className="flex h-12 w-12 items-center justify-center">
            <BackIcon className="h-6 w-6" />
          </button>
          <h1 className="flex-1 pr-12 text-center text-lg font-bold leading-6 text-mortgage-dark">
            Mortgage Calculator
          </h1>
        </div>

        {/* Results Section */}
        <div className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold leading-8 text-mortgage-dark">
              Results
            </h2>
          </div>

          {/* Monthly Payment */}
          <div className="mb-6 flex items-center justify-between">
            <span className="text-base font-medium leading-6 text-mortgage-brown">
              Monthly Payment
            </span>
            <span className="text-2xl font-bold leading-8 text-mortgage-dark">
              {formatCurrency(results.monthlyPayment)}
            </span>
          </div>

          {/* Total Interest */}
          <div className="mb-8 flex items-center justify-between">
            <span className="text-base font-medium leading-6 text-mortgage-brown">
              Total Interest
            </span>
            <span className="text-2xl font-bold leading-8 text-mortgage-dark">
              {formatCurrency(results.totalInterest)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {/* Re-calculate Button */}
            <button
              onClick={onRecalculate}
              className="flex h-12 w-full items-center justify-center rounded-3xl bg-mortgage-cream px-5"
            >
              <span className="text-sm font-bold leading-[21px] text-mortgage-dark">
                Re-calculate
              </span>
            </button>

            {/* Start Application Button */}
            <button
              onClick={onStartApplication}
              className="flex h-12 w-full items-center justify-center rounded-3xl bg-primary px-5"
            >
              <span className="text-sm font-bold leading-[21px] text-mortgage-dark">
                Start Application
              </span>
            </button>
          </div>

          {/* Extra Spacing */}
          <div className="h-20" />
        </div>
      </div>
    </div>
  );
}
