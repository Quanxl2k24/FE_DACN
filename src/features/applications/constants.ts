import type { ApplicationStatus, InterviewMode } from "@/features/applications/types";

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  "APPLIED",
  "SCREENING",
  "INTERVIEW",
  "OFFERED",
  "HIRED",
  "REJECTED",
];

export const APPLICATION_STATUS_LABEL: Record<ApplicationStatus, string> = {
  APPLIED: "Mới",
  SCREENING: "Đang xem",
  INTERVIEW: "Phỏng vấn",
  OFFERED: "Đạt yêu cầu",
  HIRED: "Đã tuyển",
  REJECTED: "Từ chối",
};

export const APPLICATION_STATUS_BADGE_CLASS: Record<ApplicationStatus, string> = {
  APPLIED: "border-transparent bg-muted text-muted-foreground",
  SCREENING: "border-transparent bg-warning/10 text-warning",
  INTERVIEW: "border-transparent bg-primary/10 text-primary",
  OFFERED: "border-transparent bg-success/10 text-success",
  HIRED: "border-transparent bg-success text-success-foreground",
  REJECTED: "border-transparent bg-destructive/10 text-destructive",
};

/**
 * VALID_TRANSITIONS ở BE (application.service.ts) — HIRED/REJECTED là trạng
 * thái kết thúc, không chuyển tiếp được nữa.
 */
export const APPLICATION_STATUS_TRANSITIONS: Record<ApplicationStatus, ApplicationStatus[]> = {
  APPLIED: ["SCREENING", "INTERVIEW", "REJECTED"],
  SCREENING: ["INTERVIEW", "OFFERED", "REJECTED"],
  INTERVIEW: ["OFFERED", "HIRED", "REJECTED"],
  OFFERED: ["HIRED", "REJECTED"],
  HIRED: [],
  REJECTED: [],
};

export const INTERVIEW_MODES: InterviewMode[] = ["ONLINE", "OFFLINE"];

export const INTERVIEW_MODE_LABEL: Record<InterviewMode, string> = {
  ONLINE: "Trực tuyến",
  OFFLINE: "Trực tiếp",
};
