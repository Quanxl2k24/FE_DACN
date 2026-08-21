"use client";

import { CalendarClock, Loader2, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  INTERVIEW_RESULT_ACTIONS,
  INTERVIEW_RESULT_BADGE_CLASS,
  INTERVIEW_RESULT_TOGGLE_CLASS,
} from "@/features/interviews/constants";
import type { IInterviewListItem, InterviewResultInput } from "@/features/interviews/types";
import { formatInterviewDateTime } from "@/features/interviews/utils";
import { cn } from "@/lib/utils";

interface InterviewCardProps {
  interview: IInterviewListItem;
  isUpdating: boolean;
  onSetResult: (interviewId: string, result: InterviewResultInput) => void;
  onViewDetail: (interview: IInterviewListItem) => void;
}

export function InterviewCard({
  interview,
  isUpdating,
  onSetResult,
  onViewDetail,
}: InterviewCardProps) {
  // Chỉ cho đổi kết quả khi phỏng vấn còn ở trạng thái chờ — khớp với ràng
  // buộc chuyển trạng thái đơn ứng tuyển phía BE (OFFERED/REJECTED là trạng
  // thái cuối, không đổi lại được).
  const canSetResult = interview.status === "Chưa có kết quả";

  return (
    <Card className="gap-4 rounded-2xl px-5 [--card-spacing:--spacing(5)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-foreground">
            {interview.candidateName}
          </p>
          <p className="text-sm text-primary">{interview.jobTitle}</p>
        </div>
        <Badge
          variant="outline"
          className={INTERVIEW_RESULT_BADGE_CLASS[interview.status]}
        >
          {interview.status}
        </Badge>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <CalendarClock className="size-4.5" />
        </div>
        <p className="truncate text-sm font-medium text-foreground">
          {formatInterviewDateTime(interview.scheduledAt)}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
          <User className="size-4.5" />
        </div>
        <p className="truncate text-sm text-foreground">{interview.interviewer}</p>
      </div>

      <Separator />

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {isUpdating ? (
            <span className="flex items-center gap-1.5 px-1 text-xs text-muted-foreground">
              <Loader2 className="size-3.5 animate-spin" /> Đang lưu...
            </span>
          ) : (
            INTERVIEW_RESULT_ACTIONS.map(({ label, result }) => (
              <button
                key={result}
                type="button"
                disabled={!canSetResult}
                onClick={() => onSetResult(interview.interviewId, result)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                  canSetResult
                    ? INTERVIEW_RESULT_TOGGLE_CLASS[label].inactive
                    : "border border-border text-muted-foreground",
                )}
              >
                {label}
              </button>
            ))
          )}
        </div>
        <Button size="sm" className="rounded-full" onClick={() => onViewDetail(interview)}>
          Chi tiết
        </Button>
      </div>
    </Card>
  );
}
