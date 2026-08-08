export type ApplicationStepKey =
  | "APPLIED"
  | "SCREENING"
  | "INTERVIEW"
  | "INTERVIEW_PASSED"
  | "OFFERED"
  | "HIRED";

export interface IApplicationStatusStep {
  key: ApplicationStepKey;
  label: string;
  reached: boolean;
  note: string | null;
  /** ISO datetime — null nếu step chưa đạt tới. */
  at: string | null;
}

/** Response GET /jobs/:id/application-status. */
export interface IApplicationStatusTimeline {
  jobId: string;
  jobTitle: string;
  /** Có thể là "REJECTED" — trạng thái này không nằm trong danh sách `steps`. */
  currentStatus: string;
  isRejected: boolean;
  rejectedNote: string | null;
  rejectedAt: string | null;
  steps: IApplicationStatusStep[];
}
