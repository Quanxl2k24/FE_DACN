import type { JobReportStatus } from "@/features/admin/jobReports/types";

export const JOB_REPORT_STATUS_LABEL: Record<JobReportStatus, string> = {
  PENDING: "Chờ xử lý",
  RESOLVED: "Đã duyệt",
  REJECTED: "Đã từ chối",
};

export const JOB_REPORT_STATUS_BADGE_CLASS: Record<JobReportStatus, string> = {
  PENDING: "border-transparent bg-warning/10 text-warning",
  RESOLVED: "border-transparent bg-success/10 text-success",
  REJECTED: "border-transparent bg-destructive/10 text-destructive",
};
