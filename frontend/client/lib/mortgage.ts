// lib/mortgage.ts - Fixed version with all required properties

export interface MortgageInputs {
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  downPayment: number;
  propertyPrice: number;
}

export interface MortgageResults {
  // Core calculation results
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  
  // Input values for reference
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  downPayment: number;
  propertyPrice: number;
  
  // Additional calculated fields
  loanToValueRatio: number;
  principalAndInterest: number;
}

export function calculateMortgage(inputs: MortgageInputs): MortgageResults {
  const { loanAmount, interestRate, loanTermYears } = inputs;
  
  // Convert annual rate to monthly and years to months
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTermYears * 12;
  
  // Calculate monthly payment using the standard mortgage formula
  const monthlyPayment = monthlyRate === 0 
    ? loanAmount / numPayments
    : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  
  const totalPayment = monthlyPayment * numPayments;
  const totalInterest = totalPayment - loanAmount;
  const loanToValueRatio = (loanAmount / inputs.propertyPrice) * 100;
  
  return {
    monthlyPayment,
    totalInterest,
    totalPayment,
    loanAmount: inputs.loanAmount,
    interestRate: inputs.interestRate,
    loanTermYears: inputs.loanTermYears,
    downPayment: inputs.downPayment,
    propertyPrice: inputs.propertyPrice,
    loanToValueRatio,
    principalAndInterest: monthlyPayment
  };
}

export function validateMortgageInputs(inputs: MortgageInputs): string[] {
  const errors: string[] = [];
  
  if (inputs.loanAmount <= 0) {
    errors.push("Loan amount must be greater than 0");
  }
  
  if (inputs.interestRate < 0 || inputs.interestRate > 30) {
    errors.push("Interest rate must be between 0 and 30%");
  }
  
  if (inputs.loanTermYears <= 0 || inputs.loanTermYears > 50) {
    errors.push("Loan term must be between 1 and 50 years");
  }
  
  if (inputs.downPayment < 0) {
    errors.push("Down payment cannot be negative");
  }
  
  if (inputs.propertyPrice <= 0) {
    errors.push("Property price must be greater than 0");
  }
  
  if (inputs.downPayment >= inputs.propertyPrice) {
    errors.push("Down payment cannot be greater than or equal to property price");
  }
  
  return errors;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}