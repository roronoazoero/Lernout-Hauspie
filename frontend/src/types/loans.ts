export interface LoanApplication {
  idx: number;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  applicationdate: string;
  age: number;
  annualincome: number;
  creditscore: number;
  employmentstatus: string;
  educationlevel: string;
  experience: number;
  loanamount: number;
  loanduration: number;
  maritalstatus: string;
  numberofdependents: number;
  homeownershipstatus: string;
  monthlydebtpayments: number;
  creditcardutilizationrate: number;
  numberofopencreditlines: number;
  numberofcreditinquiries: number;
  debttoincomeratio: number;
  bankruptcyhistory: number;
  loanpurpose: string;
  previousloandefaults: number;
  paymenthistory: number;
  lengthofcredithistory: number;
  savingsaccountbalance: number;
  checkingaccountbalance: number;
  totalassets: number;
  totalliabilities: number;
  monthlyincome: number;
  utilitybillspaymenthistory: number;
  jobtenure: number;
  networth: number;
  baseinterestrate: number;
  interestrate: number;
  monthlyloanpayment: number;
  totaldebttoincomeratio: number;
  loanapproved: number;
  riskscore: number;
}

export interface ApplicantSummary {
  id: number;
  fullName: string;
  contactNumber: string;
  email: string;
  annualIncomeFormatted: string;
  downPaymentEstimate: number;
  loanAmount: number;
  loanTermYears: number;
  interestRatePercent: number;
}