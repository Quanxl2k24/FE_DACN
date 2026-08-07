import type { IInterviewFilters } from "@/features/interviews/types";

export const interviewsQueryKey = (
  companyId: string,
  filters?: IInterviewFilters,
) => ["interviews", "list", companyId, filters ?? {}] as const;

export const interviewsBaseQueryKey = (companyId: string) =>
  ["interviews", "list", companyId] as const;
