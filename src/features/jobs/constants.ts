import type { JobStatus, RecruiterJobStatus } from "@/features/jobs/types";

/** Trạng thái Recruiter được chọn khi tạo/sửa tin (SUSPENDED do Admin xử lý). */
export const RECRUITER_JOB_STATUSES: RecruiterJobStatus[] = [
  "DRAFT",
  "PUBLISHED",
  "CLOSED",
];

export const JOB_STATUS_LABEL: Record<JobStatus, string> = {
  DRAFT: "Bản nháp",
  PUBLISHED: "Đang tuyển",
  CLOSED: "Đã đóng",
  SUSPENDED: "Bị tạm ngưng",
};

export const JOB_STATUS_BADGE_CLASS: Record<JobStatus, string> = {
  DRAFT: "border-transparent bg-muted text-muted-foreground",
  PUBLISHED: "border-transparent bg-success/10 text-success",
  CLOSED: "border-transparent bg-secondary text-secondary-foreground",
  SUSPENDED: "border-transparent bg-destructive/10 text-destructive",
};
