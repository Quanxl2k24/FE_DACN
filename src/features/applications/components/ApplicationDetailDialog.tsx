"use client";

import { Briefcase, Download } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ApplicationStatusBadge } from "@/features/applications/components/ApplicationStatusBadge";
import type { ICandidate } from "@/features/applications/types";
import { formatAppliedAt, getInitials } from "@/features/applications/utils";

interface ApplicationDetailDialogProps {
  candidate: ICandidate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApplicationDetailDialog({
  candidate,
  open,
  onOpenChange,
}: ApplicationDetailDialogProps) {
  if (!candidate) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle>{candidate.name}</DialogTitle>
              <p className="text-xs text-muted-foreground">
                Ứng tuyển {candidate.jobTitle}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex items-center justify-between rounded-xl bg-muted/50 p-3">
          <span className="text-sm text-muted-foreground">Trạng thái</span>
          <ApplicationStatusBadge status={candidate.status} />
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Briefcase className="size-3.5" />
            {candidate.jobTitle}
          </span>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Nộp hồ sơ ngày {formatAppliedAt(candidate.appliedAt)}
          </p>
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={
              <a href={candidate.cvUrl} target="_blank" rel="noopener noreferrer" />
            }
          >
            <Download /> Tải CV
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
