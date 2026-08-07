import type { IJobFilters } from "@/features/jobs/types";

export const jobsQueryKey = (companyId: string, filters?: IJobFilters) =>
  ["jobs", "list", companyId, filters ?? {}] as const;

export const jobsBaseQueryKey = (companyId: string) =>
  ["jobs", "list", companyId] as const;

export const jobDetailQueryKey = (jobId: string) =>
  ["jobs", "detail", jobId] as const;
