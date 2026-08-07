import type { InterviewResultStatus } from "@/features/interviews/types";

/** Đúng thứ tự hiển thị trên toggle kết quả: Đạt — Chờ (Chưa có kết quả) — Trượt. */
export const INTERVIEW_RESULTS: InterviewResultStatus[] = [
  "Đạt",
  "Chưa có kết quả",
  "Trượt",
];

export const INTERVIEW_RESULT_BADGE_CLASS: Record<InterviewResultStatus, string> = {
  "Chưa có kết quả": "border-transparent bg-warning/10 text-warning",
  "Đạt": "border-transparent bg-success/10 text-success",
  "Trượt": "border-transparent bg-destructive/10 text-destructive",
};

export const INTERVIEW_RESULT_TOGGLE_CLASS: Record<
  InterviewResultStatus,
  { active: string; inactive: string }
> = {
  "Đạt": {
    active: "bg-success text-success-foreground",
    inactive: "border border-success/30 text-success hover:bg-success/10",
  },
  "Chưa có kết quả": {
    active: "bg-foreground text-background",
    inactive: "border border-border text-muted-foreground hover:bg-muted",
  },
  "Trượt": {
    active: "bg-destructive text-white",
    inactive: "border border-destructive/30 text-destructive hover:bg-destructive/10",
  },
};
