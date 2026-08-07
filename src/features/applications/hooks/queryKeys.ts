import type { ICandidateFilters } from "@/features/applications/types";

export const candidatesQueryKey = (
  companyId: string,
  filters?: ICandidateFilters,
) => ["candidates", "list", companyId, filters ?? {}] as const;

export const candidatesBaseQueryKey = (companyId: string) =>
  ["candidates", "list", companyId] as const;
