import React from 'react';

interface ApplicationSummaryProps {
  onBack: () => void;
  onSubmit: () => void;
  onEdit: (section: string) => void;
}

export default function ApplicationSummary({ onBack, onSubmit, onEdit }: ApplicationSummaryProps) {
  const personalInfo = {
    name: 'Kia Björkqvist',
    dateOfBirth: '1985-07-15',
    contactNumber: '+358 (45) 123-456-78'
  };

  const propertyDetails = {
    address: '123 Maple Street, Anytown, USA',
    purchasePrice: '$450,000',
    propertyType: 'Single Family Home'
  };

  const financialStatus = {
    annualIncome: '€85,000',
    occupation: 'Self-employed',
    downPayment: '€90,000'
  };

  return (
    <div className="flex h-full w-full flex-col bg-[#FCFAF7]">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#FCFAF7] px-4 py-4 border-b border-gray-100">
        <button 
          onClick={onBack}
          className="flex h-12 w-12 items-center justify-center"
        >
          <svg width="18" height="16" viewBox="0 0 18 16" fill="none" className="h-6 w-6">
            <path fillRule="evenodd" clipRule="evenodd" d="M18 8C18 8.41421 17.6642 8.75 17.25 8.75H2.56031L8.03063 14.2194C8.32368 14.5124 8.32368 14.9876 8.03063 15.2806C7.73757 15.5737 7.26243 15.5737 6.96937 15.2806L0.219375 8.53063C0.0785422 8.38995 -0.000590086 8.19906 -0.000590086 8C-0.000590086 7.80094 0.0785422 7.61005 0.219375 7.46937L6.96937 0.719375C7.26243 0.426319 7.73757 0.426319 8.03063 0.719375C8.32368 1.01243 8.32368 1.48757 8.03063 1.78062L2.56031 7.25H17.25C17.6642 7.25 18 7.58579 18 8Z" fill="#1A140F"/>
          </svg>
        </button>
        <h1 className="flex-1 pr-12 text-center text-lg font-bold leading-6 text-[#1A140F]">
          Application Summary
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Personal Information Section */}
        <div className="px-4 py-5">
          <h2 className="text-[22px] font-bold text-[#1A140F] mb-3">Personal Information</h2>
        </div>

        <div className="px-4 space-y-0">
          {/* Name */}
          <div className="border-t border-[#E5E8EB] py-5">
            <div className="mb-1">
              <span className="text-sm text-[#8C7059] leading-[21px]">Name</span>
            </div>
            <div>
              <span className="text-sm text-[#1A140F] leading-[21px]">{personalInfo.name}</span>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="border-t border-[#E5E8EB] py-5">
            <div className="mb-1">
              <span className="text-sm text-[#8C7059] leading-[21px]">Date of Birth</span>
            </div>
            <div>
              <span className="text-sm text-[#1A140F] leading-[21px]">{personalInfo.dateOfBirth}</span>
            </div>
          </div>

          {/* Contact Number */}
          <div className="border-t border-[#E5E8EB] py-5">
            <div className="mb-1">
              <span className="text-sm text-[#8C7059] leading-[21px]">Contact Number</span>
            </div>
            <div>
              <span className="text-sm text-[#1A140F] leading-[21px]">{personalInfo.contactNumber}</span>
            </div>
          </div>
        </div>

        {/* Edit Personal Info Button */}
        <div className="px-4 py-4">
          <button
            onClick={() => onEdit('personal')}
            className="flex h-14 w-full items-center justify-between px-4 bg-[#FCFAF7]"
          >
            <span className="text-base text-[#1A140F] leading-6">Edit</span>
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" className="h-6 w-6">
              <path fillRule="evenodd" clipRule="evenodd" d="M18.3103 4.87844L14.1216 0.68875C13.8402 0.407371 13.4587 0.249289 13.0608 0.249289C12.6629 0.249289 12.2813 0.407371 12 0.68875L0.439687 12.25C0.157107 12.5303 -0.00127172 12.9123 0 13.3103V17.5C0 18.3284 0.671573 19 1.5 19H5.68969C6.08773 19.0013 6.46966 18.8429 6.75 18.5603L18.3103 7C18.5917 6.71869 18.7498 6.3371 18.7498 5.93922C18.7498 5.54133 18.5917 5.15975 18.3103 4.87844ZM5.68969 17.5H1.5V13.3103L9.75 5.06031L13.9397 9.25L5.68969 17.5ZM15 8.18875L10.8103 4L13.0603 1.75L17.25 5.93875L15 8.18875Z" fill="#1A140F"/>
            </svg>
          </button>
        </div>

        {/* Property Details Section */}
        <div className="px-4 py-5">
          <h2 className="text-[22px] font-bold text-[#1A140F] mb-3">Property Details</h2>
        </div>

        <div className="px-4 space-y-0">
          {/* Address */}
          <div className="border-t border-[#E5E8EB] py-5">
            <div className="mb-1">
              <span className="text-sm text-[#8C7059] leading-[21px]">Address</span>
            </div>
            <div>
              <span className="text-sm text-[#1A140F] leading-[21px]">{propertyDetails.address}</span>
            </div>
          </div>

          {/* Purchase Price */}
          <div className="border-t border-[#E5E8EB] py-5">
            <div className="mb-1">
              <span className="text-sm text-[#8C7059] leading-[21px]">Purchase Price</span>
            </div>
            <div>
              <span className="text-sm text-[#1A140F] leading-[21px]">{propertyDetails.purchasePrice}</span>
            </div>
          </div>

          {/* Property Type */}
          <div className="border-t border-[#E5E8EB] py-5">
            <div className="mb-1">
              <span className="text-sm text-[#8C7059] leading-[21px]">Property Type</span>
            </div>
            <div>
              <span className="text-sm text-[#1A140F] leading-[21px]">{propertyDetails.propertyType}</span>
            </div>
          </div>
        </div>

        {/* Edit Property Details Button */}
        <div className="px-4 py-4">
          <button
            onClick={() => onEdit('property')}
            className="flex h-14 w-full items-center justify-between px-4 bg-[#FCFAF7]"
          >
            <span className="text-base text-[#1A140F] leading-6">Edit</span>
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" className="h-6 w-6">
              <path fillRule="evenodd" clipRule="evenodd" d="M18.3103 4.87844L14.1216 0.68875C13.8402 0.407371 13.4587 0.249289 13.0608 0.249289C12.6629 0.249289 12.2813 0.407371 12 0.68875L0.439687 12.25C0.157107 12.5303 -0.00127172 12.9123 0 13.3103V17.5C0 18.3284 0.671573 19 1.5 19H5.68969C6.08773 19.0013 6.46966 18.8429 6.75 18.5603L18.3103 7C18.5917 6.71869 18.7498 6.3371 18.7498 5.93922C18.7498 5.54133 18.5917 5.15975 18.3103 4.87844ZM5.68969 17.5H1.5V13.3103L9.75 5.06031L13.9397 9.25L5.68969 17.5ZM15 8.18875L10.8103 4L13.0603 1.75L17.25 5.93875L15 8.18875Z" fill="#1A140F"/>
            </svg>
          </button>
        </div>

        {/* Financial Status Section */}
        <div className="px-4 py-5">
          <h2 className="text-[22px] font-bold text-[#1A140F] mb-3">Financial Status</h2>
        </div>

        <div className="px-4 space-y-0">
          {/* Annual Income & Occupation in one row */}
          <div className="border-t border-[#E5E8EB] py-5 flex gap-6">
            <div className="flex-1">
              <div className="mb-1">
                <span className="text-sm text-[#8C7059] leading-[21px]">Annual Income</span>
              </div>
              <span className="text-sm text-[#1A140F] leading-[21px]">{financialStatus.annualIncome}</span>
            </div>
            <div className="flex-1">
              <div className="mb-1">
                <span className="text-sm text-[#8C7059] leading-[21px]">Occupation</span>
              </div>
              <span className="text-sm text-[#1A140F] leading-[21px]">{financialStatus.occupation}</span>
            </div>
          </div>

          {/* Down Payment */}
          <div className="border-t border-[#E5E8EB] py-5">
            <div className="mb-1">
              <span className="text-sm text-[#8C7059] leading-[21px]">Down Payment</span>
            </div>
            <div>
              <span className="text-sm text-[#1A140F] leading-[21px]">{financialStatus.downPayment}</span>
            </div>
          </div>
        </div>

        {/* Edit Financial Status Button */}
        <div className="px-4 py-4">
          <button
            onClick={() => onEdit('financial')}
            className="flex h-14 w-full items-center justify-between px-4 bg-[#FCFAF7]"
          >
            <span className="text-base text-[#1A140F] leading-6">Edit</span>
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" className="h-6 w-6">
              <path fillRule="evenodd" clipRule="evenodd" d="M18.3103 4.87844L14.1216 0.68875C13.8402 0.407371 13.4587 0.249289 13.0608 0.249289C12.6629 0.249289 12.2813 0.407371 12 0.68875L0.439687 12.25C0.157107 12.5303 -0.00127172 12.9123 0 13.3103V17.5C0 18.3284 0.671573 19 1.5 19H5.68969C6.08773 19.0013 6.46966 18.8429 6.75 18.5603L18.3103 7C18.5917 6.71869 18.7498 6.3371 18.7498 5.93922C18.7498 5.54133 18.5917 5.15975 18.3103 4.87844ZM5.68969 17.5H1.5V13.3103L9.75 5.06031L13.9397 9.25L5.68969 17.5ZM15 8.18875L10.8103 4L13.0603 1.75L17.25 5.93875L15 8.18875Z" fill="#1A140F"/>
            </svg>
          </button>
        </div>

        {/* Bottom spacing */}
        <div className="h-6"></div>
      </div>

      {/* Submit Button */}
      <div className="px-4 py-3 bg-[#FCFAF7]">
        <button
          onClick={onSubmit}
          className="flex h-12 w-full items-center justify-center rounded-3xl bg-[#FF8A44]"
        >
          <span className="text-base font-bold leading-6 text-[#1A140F]">
            Submit Application
          </span>
        </button>
        <div className="h-5"></div>
      </div>
    </div>
  );
}
