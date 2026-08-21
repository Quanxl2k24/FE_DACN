import type { ApplicationStatus } from "@/features/applications/types";

/** Item trong danh sách GET /jobs/applications/me. */
export interface IMyApplicationItem {
  applicationId: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogoUrl: string | null;
  appliedAt: string;
  status: ApplicationStatus;
}

export interface ICursorPagination {
  nextCursor: string | null;
  hasMore: boolean;
}

export interface IPaginatedResponse<T> {
  data: T[];
  pagination: ICursorPagination;
}

export interface IMyApplicationFilters {
  take?: number;
}
