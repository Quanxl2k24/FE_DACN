"use client";

import { CalendarClock, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  INTERVIEW_RESULT_BADGE_CLASS,
  INTERVIEW_RESULT_TOGGLE_CLASS,
  INTERVIEW_RESULTS,
} from "@/features/interviews/constants";
import type { IInterviewListItem, InterviewResultStatus } from "@/features/interviews/types";
import { formatInterviewDateTime } from "@/features/interviews/utils";
import { cn } from "@/lib/utils";

interface InterviewCardProps {
  interview: IInterviewListItem;
  status: InterviewResultStatus;
  onChangeResult: (interviewId: string, status: InterviewResultStatus) => void;
  onViewDetail: (interview: IInterviewListItem) => void;
}

export function InterviewCard({
  interview,
  status,
  onChangeResult,
  onViewDetail,
}: InterviewCardProps) {
  return (
    <Card className="gap-4 rounded-2xl px-5 [--card-spacing:--spacing(5)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-foreground">
            {interview.candidateName}
          </p>
          <p className="text-sm text-primary">{interview.jobTitle}</p>
        </div>
        <Badge variant="outline" className={INTERVIEW_RESULT_BADGE_CLASS[status]}>
          {status}
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
          {INTERVIEW_RESULTS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onChangeResult(interview.interviewId, option)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                status === option
                  ? INTERVIEW_RESULT_TOGGLE_CLASS[option].active
                  : INTERVIEW_RESULT_TOGGLE_CLASS[option].inactive,
              )}
            >
              {option}
            </button>
          ))}
        </div>
        <Button size="sm" className="rounded-full" onClick={() => onViewDetail(interview)}>
          Chi tiết
        </Button>
      </div>
    </Card>
  );
}
