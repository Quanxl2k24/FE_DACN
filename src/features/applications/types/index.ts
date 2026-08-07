export type ApplicationStatus =
  | "APPLIED"
  | "SCREENING"
  | "INTERVIEW"
  | "OFFERED"
  | "HIRED"
  | "REJECTED";

/** Item trong danh sách GET /candidates/manage/:companyId. */
export interface ICandidate {
  applicationId: string;
  /** userId của ứng viên — dùng làm `candidateId` khi đặt lịch phỏng vấn. */
  userId: string;
  name: string;
  jobId: string;
  jobTitle: string;
  cvUrl: string;
  status: ApplicationStatus;
  appliedAt: string;
}

export interface ICursorPagination {
  nextCursor: string | null;
  hasMore: boolean;
}

export interface IPaginatedResponse<T> {
  data: T[];
  pagination: ICursorPagination;
}

export interface ICandidateFilters {
  name?: string;
  status?: ApplicationStatus;
  jobId?: string;
  onlyActiveJobs?: boolean;
  take?: number;
}

/** Body PATCH /candidates/manage/:companyId/:applicationId/status. */
export interface IUpdateApplicationStatusPayload {
  status: ApplicationStatus;
  note?: string;
}

export type InterviewMode = "ONLINE" | "OFFLINE";

/** Body POST /candidates/manage/:companyId/interviews. */
export interface ICreateInterviewPayload {
  candidateId: string;
  jobId: string;
  mode: InterviewMode;
  location: string;
  interviewerId: string;
  /** ISO 8601, phải ở tương lai. */
  scheduledAt: string;
  note?: string;
}

export interface IInterview {
  id: string;
  applicationId: string;
  interviewerId: string;
  scheduledBy: string;
  mode: InterviewMode;
  location: string;
  scheduledAt: string;
  note: string | null;
}
