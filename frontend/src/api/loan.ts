import { LoanApplication, ApplicantSummary } from '../types/loan';

// Prefer your FastAPI if available: GET /loan-applications/:id
const API_BASE = import.meta.env.VITE_API_BASE ?? 'https://lernout-hauspie.onrender.com';

async function fetchFromBackend(id: number): Promise<LoanApplication | null> {
  try {
    const res = await fetch(`${API_BASE}/loan-applications/${id}`, { credentials: 'include' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Fallback to bundled JSON row you provided
async function fetchFromLocalJson(id: number): Promise<LoanApplication | null> {
  // The file is a single-row array; import via Vite as a static asset
  const data = await import('../../loanapplication_row1_information.json');
  const row: LoanApplication | undefined = data.default.find((r: any) => r.id === id);
  return row ?? null;
}

export async function getLoanApplication(id: number): Promise<LoanApplication> {
  const backend = await fetchFromBackend(id);
  if (backend) return backend;
  const local = await fetchFromLocalJson(id);
  if (local) return local;
  throw new Error('Loan application not found');
}

export function toApplicantSummary(a: LoanApplication): ApplicantSummary {
  const fullName = `${a.firstName} ${a.lastName}`.trim();
  const annualIncomeFormatted = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(a.annualincome);
  const loanTermYears = Math.max(1, Math.round(a.loanduration / 12) || a.loanduration); // JSON gives 48 months -> 4 years
  const interestRatePercent = Math.round((a.interestrate ?? 0) * 10000) / 100; // 0.3009996 -> 30.1%
  const downPaymentEstimate = Math.max(0, Math.min(a.savingsaccountbalance, a.totalassets - a.totalliabilities));

  return {
    id: a.id,
    fullName,
    contactNumber: a.phoneNumber,
    email: a.email,
    annualIncomeFormatted,
    downPaymentEstimate,
    loanAmount: a.loanamount,
    loanTermYears,
    interestRatePercent,
  };
}
