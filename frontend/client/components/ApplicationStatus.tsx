import React from 'react';

interface ApplicationStatusProps {
  onBack: () => void;
  onEditApplication: () => void;
}

export default function ApplicationStatus({ onBack, onEditApplication }: ApplicationStatusProps) {
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
        <h1 className="flex-1 pr-12 text-center text-lg font-bold leading-6 text-[#1C140D]">
          Application Status
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Application Progress Section */}
        <div className="px-4 py-4">
          <div className="mb-3">
            <h3 className="text-base text-[#1C140D] leading-6">Application Progress</h3>
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 bg-[#E8D9CF] rounded-sm overflow-hidden mb-3">
            <div className="h-full bg-[#FF8A44] rounded-sm" style={{ width: '55%' }}></div>
          </div>
          
          <p className="text-sm text-[#99704D] leading-[21px]">
            Estimated completion: 2 weeks
          </p>
        </div>

        {/* Current Status Section */}
        <div className="px-4 py-5">
          <h2 className="text-[22px] font-bold text-[#1C140D] mb-4">Current Status</h2>
        </div>

        {/* Status Items */}
        <div className="px-4 space-y-0">
          {/* Application Status */}
          <div className="flex h-18 items-center gap-4 py-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F2EDE8]">
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" className="h-6 w-6">
                <path fillRule="evenodd" clipRule="evenodd" d="M17.0306 5.71938L11.7806 0.469375C11.6399 0.328758 11.449 0.249844 11.25 0.25H2.25C1.42157 0.25 0.75 0.921573 0.75 1.75V18.25C0.75 19.0784 1.42157 19.75 2.25 19.75H15.75C16.5784 19.75 17.25 19.0784 17.25 18.25V6.25C17.2502 6.05103 17.1712 5.86015 17.0306 5.71938ZM12 2.81031L14.6897 5.5H12V2.81031ZM15.75 18.25H2.25V1.75H10.5V6.25C10.5 6.66421 10.8358 7 11.25 7H15.75V18.25Z" fill="#1C140D"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base text-[#1C140D] leading-6">Application Status</span>
              <span className="text-sm text-[#99704D] leading-[21px]">Under Review</span>
            </div>
          </div>

          {/* Estimated Update */}
          <div className="flex h-18 items-center gap-4 py-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F2EDE8]">
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" className="h-6 w-6">
                <path fillRule="evenodd" clipRule="evenodd" d="M16.5 2H14.25V1.25C14.25 0.835786 13.9142 0.5 13.5 0.5C13.0858 0.5 12.75 0.835786 12.75 1.25V2H5.25V1.25C5.25 0.835786 4.91421 0.5 4.5 0.5C4.08579 0.5 3.75 0.835786 3.75 1.25V2H1.5C0.671573 2 0 2.67157 0 3.5V18.5C0 19.3284 0.671573 20 1.5 20H16.5C17.3284 20 18 19.3284 18 18.5V3.5C18 2.67157 17.3284 2 16.5 2ZM3.75 3.5V4.25C3.75 4.66421 4.08579 5 4.5 5C4.91421 5 5.25 4.66421 5.25 4.25V3.5H12.75V4.25C12.75 4.66421 13.0858 5 13.5 5C13.9142 5 14.25 4.66421 14.25 4.25V3.5H16.5V6.5H1.5V3.5H3.75ZM16.5 18.5H1.5V8H16.5V18.5ZM7.5 10.25V16.25C7.5 16.6642 7.16421 17 6.75 17C6.33579 17 6 16.6642 6 16.25V11.4631L5.58562 11.6713C5.2149 11.8566 4.76411 11.7063 4.57875 11.3356C4.39339 10.9649 4.54365 10.5141 4.91437 10.3287L6.41438 9.57875C6.64695 9.46237 6.92322 9.47478 7.14442 9.61155C7.36563 9.74832 7.50019 9.98993 7.5 10.25ZM13.0462 13.1047L11.25 15.5H12.75C13.1642 15.5 13.5 15.8358 13.5 16.25C13.5 16.6642 13.1642 17 12.75 17H9.75C9.46592 17 9.20622 16.8395 9.07918 16.5854C8.95214 16.3313 8.97955 16.0273 9.15 15.8L11.8481 12.2028C12.0153 11.9802 12.0455 11.6833 11.9264 11.4316C11.8073 11.1799 11.5586 11.0149 11.2804 11.003C11.0023 10.9912 10.7404 11.1344 10.6003 11.375C10.4702 11.6146 10.2203 11.7647 9.94765 11.7671C9.675 11.7694 9.42256 11.6236 9.28836 11.3863C9.15415 11.1489 9.15933 10.8574 9.30188 10.625C9.81124 9.74353 10.849 9.31391 11.8324 9.57743C12.8158 9.84095 13.4997 10.7319 13.5 11.75C13.5016 12.2391 13.3421 12.7152 13.0462 13.1047Z" fill="#1C140D"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base text-[#1C140D] leading-6">Estimated Update</span>
              <span className="text-sm text-[#99704D] leading-[21px]">Next update: 3 days</span>
            </div>
          </div>
        </div>

        {/* Application Timeline Section */}
        <div className="px-4 py-5">
          <h2 className="text-[22px] font-bold text-[#1C140D] mb-4">Application Timeline</h2>
        </div>

        {/* Timeline */}
        <div className="px-4">
          <div className="space-y-2">
            {/* Application Submitted - Completed */}
            <div className="flex items-start gap-2">
              <div className="flex flex-col items-center w-10">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.2806 7.21937C14.4215 7.36005 14.5006 7.55094 14.5006 7.75C14.5006 7.94906 14.4215 8.13995 14.2806 8.28063L9.03063 13.5306C8.88995 13.6715 8.69906 13.7506 8.5 13.7506C8.30094 13.7506 8.11005 13.6715 7.96937 13.5306L5.71938 11.2806C5.42632 10.9876 5.42632 10.5124 5.71938 10.2194C6.01243 9.92632 6.48757 9.92632 6.78063 10.2194L8.5 11.9397L13.2194 7.21937C13.3601 7.07854 13.5509 6.99941 13.75 6.99941C13.9491 6.99941 14.1399 7.07854 14.2806 7.21937ZM19.75 10C19.75 15.3848 15.3848 19.75 10 19.75C4.61522 19.75 0.25 15.3848 0.25 10C0.25 4.61522 4.61522 0.25 10 0.25C15.3824 0.255684 19.7443 4.61758 19.75 10ZM18.25 10C18.25 5.44365 14.5563 1.75 10 1.75C5.44365 1.75 1.75 5.44365 1.75 10C1.75 14.5563 5.44365 18.25 10 18.25C14.5542 18.2448 18.2448 14.5542 18.25 10Z" fill="#1C140D"/>
                  </svg>
                </div>
                <div className="w-0.5 h-4 bg-[#E8D9CF]"></div>
              </div>
              <div className="flex-1 py-3">
                <span className="text-base text-[#1C140D] leading-6">Application Submitted</span>
              </div>
            </div>

            {/* Under Review - Current */}
            <div className="flex items-start gap-2">
              <div className="flex flex-col items-center w-10">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10 0.25C4.61522 0.25 0.25 4.61522 0.25 10C0.25 15.3848 4.61522 19.75 10 19.75C15.3848 19.75 19.75 15.3848 19.75 10C19.7443 4.61758 15.3824 0.255684 10 0.25ZM10 18.25C5.44365 18.25 1.75 14.5563 1.75 10C1.75 5.44365 5.44365 1.75 10 1.75C14.5563 1.75 18.25 5.44365 18.25 10C18.2448 14.5542 14.5542 18.2448 10 18.25ZM16 10C16 10.4142 15.6642 10.75 15.25 10.75H10C9.58579 10.75 9.25 10.4142 9.25 10V4.75C9.25 4.33579 9.58579 4 10 4C10.4142 4 10.75 4.33579 10.75 4.75V9.25H15.25C15.6642 9.25 16 9.58579 16 10Z" fill="#1C140D"/>
                  </svg>
                </div>
                <div className="w-0.5 h-4 bg-[#E8D9CF]"></div>
              </div>
              <div className="flex-1 py-3">
                <span className="text-base text-[#1C140D] leading-6">Under Review</span>
              </div>
            </div>

            {/* Pending Documents - Future */}
            <div className="flex items-start gap-2">
              <div className="flex flex-col items-center w-10">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M17.0306 5.71938L11.7806 0.469375C11.6399 0.328758 11.449 0.249844 11.25 0.25H2.25C1.42157 0.25 0.75 0.921573 0.75 1.75V18.25C0.75 19.0784 1.42157 19.75 2.25 19.75H15.75C16.5784 19.75 17.25 19.0784 17.25 18.25V6.25C17.2502 6.05103 17.1712 5.86015 17.0306 5.71938ZM12 2.81031L14.6897 5.5H12V2.81031ZM15.75 18.25H2.25V1.75H10.5V6.25C10.5 6.66421 10.8358 7 11.25 7H15.75V18.25Z" fill="#1C140D"/>
                  </svg>
                </div>
                <div className="w-0.5 h-4 bg-[#E8D9CF]"></div>
              </div>
              <div className="flex-1 py-3">
                <span className="text-base text-[#1C140D] leading-6">Pending Documents</span>
              </div>
            </div>

            {/* Approved - Future */}
            <div className="flex items-start gap-2">
              <div className="flex flex-col items-center w-10">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.2806 7.21937C14.4215 7.36005 14.5006 7.55094 14.5006 7.75C14.5006 7.94906 14.4215 8.13995 14.2806 8.28063L9.03063 13.5306C8.88995 13.6715 8.69906 13.7506 8.5 13.7506C8.30094 13.7506 8.11005 13.6715 7.96937 13.5306L5.71938 11.2806C5.42632 10.9876 5.42632 10.5124 5.71938 10.2194C6.01243 9.92632 6.48757 9.92632 6.78063 10.2194L8.5 11.9397L13.2194 7.21937C13.3601 7.07854 13.5509 6.99941 13.75 6.99941C13.9491 6.99941 14.1399 7.07854 14.2806 7.21937ZM19.75 10C19.75 15.3848 15.3848 19.75 10 19.75C4.61522 19.75 0.25 15.3848 0.25 10C0.25 4.61522 4.61522 0.25 10 0.25C15.3824 0.255684 19.7443 4.61758 19.75 10ZM18.25 10C18.25 5.44365 14.5563 1.75 10 1.75C5.44365 1.75 1.75 5.44365 1.75 10C1.75 14.5563 5.44365 18.25 10 18.25C14.5542 18.2448 18.2448 14.5542 18.25 10Z" fill="#1C140D"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1 py-3">
                <span className="text-base text-[#1C140D] leading-6">Approved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Application Button */}
        <div className="px-4 py-3 mt-4">
          <button
            onClick={onEditApplication}
            className="flex h-10 items-center justify-center rounded-lg bg-[#FF8A44] px-4"
          >
            <span className="text-sm font-bold leading-[21px] text-[#1C140D]">
              Edit Application
            </span>
          </button>
        </div>

        {/* Bottom spacing */}
        <div className="h-6"></div>
      </div>
    </div>
  );
}
