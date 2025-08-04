import React from 'react';

// Nordic bank configuration with proper branding colors
const banks = [
  { id: 'op', name: 'OP', displayName: 'OP', color: '#FF6B35', textColor: '#FFFFFF' },
  { id: 'aktia', name: 'Aktia', displayName: 'Aktia', color: '#00B04F', textColor: '#FFFFFF' },
  { id: 'danske', name: 'Danske Bank', displayName: 'Danske Bank', color: '#003755', textColor: '#FFFFFF' },
  { id: 'nordea', name: 'Nordea', displayName: 'Nordea', color: '#00319C', textColor: '#FFFFFF' },
  { id: 'omasp', name: 'Oma Säästöpankki', displayName: 'omasp', color: '#4CAF50', textColor: '#FFFFFF' },
  { id: 'pop', name: 'POP Pankki', displayName: 'POP Pankki', color: '#00C851', textColor: '#FFFFFF' },
  { id: 'sp', name: 'S-Pankki', displayName: 'S-Pankki', color: '#4CAF50', textColor: '#FFFFFF' },
  { id: 'handelsbanken', name: 'Handelsbanken', displayName: 'SHB', color: '#0F2027', textColor: '#FFFFFF' },
];

interface BankSelectionProps {
  onCancel: () => void;
  onBankSelect: (bankId: string) => void;
}

export default function BankSelection({ onCancel, onBankSelect }: BankSelectionProps) {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Header */}
      <div className="flex flex-col items-center px-4 py-4">
        <div className="flex h-12 w-full items-center justify-center">
          <h1 className="text-lg font-bold leading-6 text-mortgage-dark">
            Log in
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4">
        <div className="px-2 py-3 mb-6">
          <h2 className="text-xl font-bold leading-7 text-mortgage-dark">
            Select your bank to log in
          </h2>
        </div>

        {/* Bank Grid */}
        <div className="grid grid-cols-3 gap-3 px-2 mb-8">
          {banks.map((bank) => (
            <button
              key={bank.id}
              onClick={() => onBankSelect(bank.id)}
              className="flex h-24 w-full items-center justify-center rounded-xl border border-gray-300 bg-white p-4 transition-all duration-200 hover:border-primary hover:shadow-sm focus:border-primary focus:outline-none active:scale-95"
            >
              <div
                className="flex h-16 w-full items-center justify-center rounded-lg font-bold text-sm"
                style={{
                  backgroundColor: bank.color,
                  color: bank.textColor
                }}
              >
                {bank.displayName.length > 8 ?
                  bank.displayName.split(' ').map(word => word.charAt(0)).join('').substring(0, 2) :
                  bank.displayName
                }
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="px-4 pb-8">
        <button
          onClick={onCancel}
          className="flex h-10 w-auto min-w-[114px] items-center justify-center rounded-2xl bg-mortgage-cream px-4 mx-auto"
        >
          <span className="text-sm font-bold leading-[21px] text-mortgage-dark">
            Cancel log-in
          </span>
        </button>
      </div>
    </div>
  );
}
