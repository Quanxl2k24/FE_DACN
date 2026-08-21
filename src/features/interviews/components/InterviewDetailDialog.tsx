"use client";

import { CalendarClock, Download, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { INTERVIEW_RESULT_BADGE_CLASS } from "@/features/interviews/constants";
import type { IInterviewListItem } from "@/features/interviews/types";
import { formatInterviewDateTime } from "@/features/interviews/utils";

interface InterviewDetailDialogProps {
  interview: IInterviewListItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InterviewDetailDialog({
  interview,
  open,
  onOpenChange,
}: InterviewDetailDialogProps) {
  if (!interview) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{interview.candidateName}</DialogTitle>
          <DialogDescription>Ứng tuyển {interview.jobTitle}</DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between rounded-xl bg-muted/50 p-3">
          <span className="text-sm text-muted-foreground">Kết quả</span>
          <Badge
            variant="outline"
            className={INTERVIEW_RESULT_BADGE_CLASS[interview.status]}
          >
            {interview.status}
          </Badge>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <span className="flex items-center gap-2 text-muted-foreground">
            <CalendarClock className="size-3.5" />
            {formatInterviewDateTime(interview.scheduledAt)}
          </span>
          <span className="flex items-center gap-2 text-muted-foreground">
            <User className="size-3.5" />
            {interview.interviewer}
          </span>
        </div>

        <Separator />

        <Button
          variant="outline"
          size="sm"
          className="self-start"
          nativeButton={false}
          render={<a href={interview.cvUrl} target="_blank" rel="noopener noreferrer" />}
        >
          <Download /> Tải CV
        </Button>
      </DialogContent>
    </Dialog>
  );
}
