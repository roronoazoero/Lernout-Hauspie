import React, { useState } from 'react';

interface EditDetailsProps {
  onBack: () => void;
  onSave: (data: EditDetailsData) => void;
}

interface EditDetailsData {
  fullName: string;
  email: string;
  phoneNumber: string;
  annualIncome: string;
  downPayment: string;
  creditScore: string;
}

export default function EditDetails({ onBack, onSave }: EditDetailsProps) {
  const [formData, setFormData] = useState<EditDetailsData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    annualIncome: '',
    downPayment: '',
    creditScore: ''
  });

  const handleInputChange = (field: keyof EditDetailsData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

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
          Edit Details
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Personal Information Section */}
        <div className="px-4 py-5">
          <h2 className="text-[22px] font-bold text-[#1C140D] mb-3">Personal Information</h2>
        </div>

        {/* Personal Information Fields */}
        <div className="space-y-0">
          {/* Full Name */}
          <div className="px-4 py-3">
            <div className="flex flex-col">
              <label className="text-base text-[#1C140D] leading-6 mb-2">Full Name</label>
              <div className="flex h-16 items-center rounded-xl bg-[#F5EDE8] px-4">
                <input
                  type="text"
                  placeholder=""
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full bg-transparent text-base leading-6 text-[#1C140D] placeholder:text-[#99704D] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="px-4 py-3">
            <div className="flex flex-col">
              <label className="text-base text-[#1C140D] leading-6 mb-2">Email</label>
              <div className="flex h-16 items-center rounded-xl bg-[#F5EDE8] px-4">
                <input
                  type="email"
                  placeholder=""
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-transparent text-base leading-6 text-[#1C140D] placeholder:text-[#99704D] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div className="px-4 py-3">
            <div className="flex flex-col">
              <label className="text-base text-[#1C140D] leading-6 mb-2">Phone Number</label>
              <div className="flex h-16 items-center rounded-xl bg-[#F5EDE8] px-4">
                <input
                  type="tel"
                  placeholder=""
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className="w-full bg-transparent text-base leading-6 text-[#1C140D] placeholder:text-[#99704D] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Financial Details Section */}
        <div className="px-4 py-5 mt-4">
          <h2 className="text-[22px] font-bold text-[#1C140D] mb-3">Financial Details</h2>
        </div>

        {/* Financial Details Fields */}
        <div className="space-y-0">
          {/* Annual Income */}
          <div className="px-4 py-3">
            <div className="flex flex-col">
              <label className="text-base text-[#1C140D] leading-6 mb-2">Annual Income</label>
              <div className="flex h-16 items-center rounded-xl bg-[#F5EDE8] px-4">
                <input
                  type="text"
                  placeholder=""
                  value={formData.annualIncome}
                  onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                  className="w-full bg-transparent text-base leading-6 text-[#1C140D] placeholder:text-[#99704D] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Down Payment */}
          <div className="px-4 py-3">
            <div className="flex flex-col">
              <label className="text-base text-[#1C140D] leading-6 mb-2">Down Payment</label>
              <div className="flex h-16 items-center rounded-xl bg-[#F5EDE8] px-4">
                <input
                  type="text"
                  placeholder=""
                  value={formData.downPayment}
                  onChange={(e) => handleInputChange('downPayment', e.target.value)}
                  className="w-full bg-transparent text-base leading-6 text-[#1C140D] placeholder:text-[#99704D] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Credit Score */}
          <div className="px-4 py-3">
            <div className="flex flex-col">
              <label className="text-base text-[#1C140D] leading-6 mb-2">Credit Score</label>
              <div className="flex h-16 items-center rounded-xl bg-[#F5EDE8] px-4">
                <input
                  type="text"
                  placeholder=""
                  value={formData.creditScore}
                  onChange={(e) => handleInputChange('creditScore', e.target.value)}
                  className="w-full bg-transparent text-base leading-6 text-[#1C140D] placeholder:text-[#99704D] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="px-4 py-3 mt-4">
          <button
            onClick={handleSave}
            className="flex h-12 w-full items-center justify-center rounded-3xl bg-[#FF8A44]"
          >
            <span className="text-base font-bold leading-6 text-[#1C140D]">
              Save Changes
            </span>
          </button>
        </div>

        {/* Bottom spacing */}
        <div className="h-24"></div>
      </div>
    </div>
  );
}
