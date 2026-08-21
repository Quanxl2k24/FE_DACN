import type { IMyApplicationFilters } from "@/features/myApplications/types";

export const myApplicationsQueryKey = (filters?: IMyApplicationFilters) =>
  ["my-applications", "list", filters ?? {}] as const;
