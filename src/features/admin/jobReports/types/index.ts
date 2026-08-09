export type JobReportStatus = "PENDING" | "RESOLVED" | "REJECTED";

export interface IJobReportJobRef {
  id: string;
  title: string;
}

export interface IJobReportUserRef {
  id: string;
  email: string;
  fullName: string;
}

/** Item trong danh sách GET /job-reports — sắp theo createdAt giảm dần. */
export interface IJobReport {
  id: string;
  jobId: string;
  userId: string;
  reason: string;
  status: JobReportStatus;
  createdAt: string;
  job: IJobReportJobRef;
  user: IJobReportUserRef;
}

export interface IUpdateJobReportStatusPayload {
  status: JobReportStatus;
}
