import React from 'react';

interface ApplicationSuccessProps {
  onBack: () => void;
  onCheckStatus: () => void;
}

export default function ApplicationSuccess({ onBack, onCheckStatus }: ApplicationSuccessProps) {
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
        <div className="flex-1 pr-12"></div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-start bg-white">
        {/* Title Section */}
        <div className="px-4 py-5 text-center">
          <h1 className="text-[28px] font-bold leading-[35px] text-[#1C140D]">
            Application Submitted Successfully
          </h1>
        </div>

        {/* Description Section */}
        <div className="px-4 py-3 text-center">
          <p className="text-base leading-6 text-[#1C140D]">
            Your mortgage application has been successfully submitted. Our team will review your application within 3-5 business days. You will receive an email notification with further instructions.
          </p>
        </div>

        {/* Check Status Button */}
        <div className="px-4 py-3">
          <button
            onClick={onCheckStatus}
            className="flex h-12 items-center justify-center rounded-3xl bg-[#FF8A44] px-5"
          >
            <span className="text-base font-bold leading-6 text-[#1C140D]">
              Check status
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
