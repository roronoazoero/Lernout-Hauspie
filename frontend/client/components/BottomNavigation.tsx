import React from 'react';
import { cn } from '../lib/utils';

// SVG Icons from the Figma design
const ChatIcon = ({ className, active }: { className?: string; active?: boolean }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.75 0.25C6.32597 0.249253 3.15249 2.04466 1.38954 4.97997C-0.373413 7.91527 -0.467421 11.5602 1.14188 14.5825L0.0778124 17.7747C-0.101955 18.3137 0.0383081 18.9081 0.44011 19.3099C0.841913 19.7117 1.43626 19.852 1.97531 19.6722L5.1675 18.6081C8.74938 20.5133 13.1367 20.0013 16.1836 17.3225C19.2306 14.6438 20.3003 10.3582 18.8697 6.56183C17.439 2.76543 13.807 0.251664 9.75 0.25ZM5.625 11.125C5.00368 11.125 4.5 10.6213 4.5 10C4.5 9.37868 5.00368 8.875 5.625 8.875C6.24632 8.875 6.75 9.37868 6.75 10C6.75 10.6213 6.24632 11.125 5.625 11.125ZM9.75 11.125C9.12868 11.125 8.625 10.6213 8.625 10C8.625 9.37868 9.12868 8.875 9.75 8.875C10.3713 8.875 10.875 9.37868 10.875 10C10.875 10.6213 10.3713 11.125 9.75 11.125ZM13.875 11.125C13.2537 11.125 12.75 10.6213 12.75 10C12.75 9.37868 13.2537 8.875 13.875 8.875C14.4963 8.875 15 9.37868 15 10C15 10.6213 14.4963 11.125 13.875 11.125Z" fill={active ? "#1C140D" : "#9C704A"}/>
  </svg>
);

const CalculatorIcon = ({ className, active }: { className?: string; active?: boolean }) => (
  <svg className={className} width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M3.75 9.25H12.75C13.1642 9.25 13.5 8.91421 13.5 8.5V4C13.5 3.58579 13.1642 3.25 12.75 3.25H3.75C3.33579 3.25 3 3.58579 3 4V8.5C3 8.91421 3.33579 9.25 3.75 9.25ZM4.5 4.75H12V7.75H4.5V4.75ZM15 0.25H1.5C0.671573 0.25 0 0.921573 0 1.75V18.25C0 19.0784 0.671573 19.75 1.5 19.75H15C15.8284 19.75 16.5 19.0784 16.5 18.25V1.75C16.5 0.921573 15.8284 0.25 15 0.25ZM15 18.25H1.5V1.75H15V18.25ZM5.625 11.875C5.625 12.4963 5.12132 13 4.5 13C3.87868 13 3.375 12.4963 3.375 11.875C3.375 11.2537 3.87868 10.75 4.5 10.75C5.12132 10.75 5.625 11.2537 5.625 11.875ZM9.375 11.875C9.375 12.4963 8.87132 13 8.25 13C7.62868 13 7.125 12.4963 7.125 11.875C7.125 11.2537 7.62868 10.75 8.25 10.75C8.87132 10.75 9.375 11.2537 9.375 11.875ZM13.125 11.875C13.125 12.4963 12.6213 13 12 13C11.3787 13 10.875 12.4963 10.875 11.875C10.875 11.2537 11.3787 10.75 12 10.75C12.6213 10.75 13.125 11.2537 13.125 11.875ZM5.625 15.625C5.625 16.2463 5.12132 16.75 4.5 16.75C3.87868 16.75 3.375 16.2463 3.375 15.625C3.375 15.0037 3.87868 14.5 4.5 14.5C5.12132 14.5 5.625 15.0037 5.625 15.625ZM9.375 15.625C9.375 16.2463 8.87132 16.75 8.25 16.75C7.62868 16.75 7.125 16.2463 7.125 15.625C7.125 15.0037 7.62868 14.5 8.25 14.5C8.87132 14.5 9.375 15.0037 9.375 15.625ZM13.125 15.625C13.125 16.2463 12.6213 16.75 12 16.75C11.3787 16.75 10.875 16.2463 10.875 15.625C10.875 15.0037 11.3787 14.5 12 14.5C12.6213 14.5 13.125 15.0037 13.125 15.625Z" fill={active ? "#1C140D" : "#99704D"}/>
  </svg>
);

const DocumentsIcon = ({ className, active }: { className?: string; active?: boolean }) => (
  <svg className={className} width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M16.7806 5.71938L11.5306 0.469375C11.3899 0.328758 11.199 0.249844 11 0.25H2C1.17157 0.25 0.5 0.921573 0.5 1.75V18.25C0.5 19.0784 1.17157 19.75 2 19.75H15.5C16.3284 19.75 17 19.0784 17 18.25V6.25C17.0002 6.05103 16.9212 5.86015 16.7806 5.71938ZM11.75 2.81031L14.4397 5.5H11.75V2.81031ZM15.5 18.25H2V1.75H10.25V6.25C10.25 6.66421 10.5858 7 11 7H15.5V18.25Z" fill={active ? "#1C140D" : "#99704D"}/>
  </svg>
);

const ProfileIcon = ({ className, active }: { className?: string; active?: boolean }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M19.8988 17.875C18.4709 15.4066 16.2706 13.6366 13.7028 12.7975C16.3135 11.2433 17.5641 8.13638 16.7582 5.2069C15.9522 2.27741 13.2883 0.247449 10.25 0.247449C7.21167 0.247449 4.54779 2.27741 3.74182 5.2069C2.93585 8.13638 4.18645 11.2433 6.79719 12.7975C4.22938 13.6356 2.02906 15.4056 0.60125 17.875C0.458704 18.1074 0.453527 18.3989 0.587731 18.6363C0.721935 18.8736 0.974375 19.0194 1.24702 19.0171C1.51967 19.0147 1.76958 18.8646 1.89969 18.625C3.66594 15.5725 6.78781 13.75 10.25 13.75C13.7122 13.75 16.8341 15.5725 18.6003 18.625C18.7304 18.8646 18.9803 19.0147 19.253 19.0171C19.5256 19.0194 19.7781 18.8736 19.9123 18.6363C20.0465 18.3989 20.0413 18.1074 19.8988 17.875ZM5 7C5 4.1005 7.3505 1.75 10.25 1.75C13.1495 1.75 15.5 4.1005 15.5 7C15.5 9.8995 13.1495 12.25 10.25 12.25C7.35179 12.2469 5.0031 9.89821 5 7Z" fill={active ? "#1C140D" : "#99704D"}/>
  </svg>
);

interface BottomNavigationProps {
  activeTab: 'chat' | 'calculator' | 'documents' | 'profile';
  onTabChange: (tab: 'chat' | 'calculator' | 'documents' | 'profile') => void;
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'chat' as const, label: 'Chat', icon: ChatIcon },
    { id: 'calculator' as const, label: 'Calculator', icon: CalculatorIcon },
    { id: 'documents' as const, label: 'Documents', icon: DocumentsIcon },
    { id: 'profile' as const, label: 'Profile', icon: ProfileIcon },
  ];

  return (
    <div className="flex border-t border-mortgage-cream bg-white">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className="flex flex-1 flex-col items-center justify-center gap-1 py-3 px-2"
        >
          <div className="flex h-8 w-8 items-center justify-center">
            <Icon active={activeTab === id} className="h-6 w-6" />
          </div>
          <span 
            className={cn(
              "text-xs font-medium leading-[18px]",
              activeTab === id 
                ? "text-mortgage-dark" 
                : "text-mortgage-brown"
            )}
          >
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
