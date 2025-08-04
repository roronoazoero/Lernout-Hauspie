export interface MortgageInputs {
  loanAmount: number;
  interestRate: number; // Annual percentage rate
  loanTermYears: number;
  downPayment: number;
  propertyPrice?: number;
}

export interface MortgageResults {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  principalAmount: number;
}

/**
 * Calculate monthly mortgage payment using the standard mortgage formula
 */
export function calculateMortgage(inputs: MortgageInputs): MortgageResults {
  const { loanAmount, interestRate, loanTermYears } = inputs;
  
  // Convert annual rate to monthly and percentage to decimal
  const monthlyRate = (interestRate / 100) / 12;
  const numberOfPayments = loanTermYears * 12;
  
  // Calculate monthly payment using mortgage formula
  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  } else {
    // If interest rate is 0
    monthlyPayment = loanAmount / numberOfPayments;
  }
  
  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - loanAmount;
  
  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    principalAmount: loanAmount
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number, currency: string = '$'): string {
  return `${currency}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}`;
}

/**
 * Calculate loan amount from property price and down payment
 */
export function calculateLoanAmount(propertyPrice: number, downPayment: number): number {
  return Math.max(0, propertyPrice - downPayment);
}

/**
 * Validate mortgage inputs
 */
export function validateMortgageInputs(inputs: Partial<MortgageInputs>): string[] {
  const errors: string[] = [];
  
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push('Loan amount must be greater than 0');
  }
  
  if (!inputs.interestRate || inputs.interestRate < 0 || inputs.interestRate > 50) {
    errors.push('Interest rate must be between 0 and 50%');
  }
  
  if (!inputs.loanTermYears || inputs.loanTermYears <= 0 || inputs.loanTermYears > 50) {
    errors.push('Loan term must be between 1 and 50 years');
  }
  
  if (!inputs.downPayment || inputs.downPayment < 0) {
    errors.push('Down payment must be 0 or greater');
  }
  
  return errors;
}
