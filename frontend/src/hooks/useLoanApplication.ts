import { useQuery } from '@tanstack/react-query';
import { getLoanApplication, toApplicantSummary } from '../api/loan';
import type { LoanApplication, ApplicantSummary } from '../types/loan';

export function useLoanApplication(id: number): {
  isLoading: boolean;
  error: unknown;
  data: LoanApplication | undefined;
  summary: ApplicantSummary | undefined;
} {
  const query = useQuery({
    queryKey: ['loan-application', id],
    queryFn: () => getLoanApplication(id),
    staleTime: 5 * 60 * 1000,
  });

  return {
    isLoading: query.isLoading,
    error: query.error,
    data: query.data,
    summary: query.data ? toApplicantSummary(query.data) : undefined,
  };
}
