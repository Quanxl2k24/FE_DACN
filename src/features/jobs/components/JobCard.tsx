"use client";

import { useState } from "react";
import { Ban, Eye, MapPin, Pencil, Trash2, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JOB_STATUS_BADGE_CLASS, JOB_STATUS_LABEL } from "@/features/jobs/constants";
import { JobDetailDialog } from "@/features/jobs/components/JobDetailDialog";
import { useUpdateJob } from "@/features/jobs/hooks/useUpdateJob";
import type { IJobListItem } from "@/features/jobs/types";
import {
  formatExpiredAt,
  formatSalaryRange,
  getApplicationCount,
  isJobExpired,
} from "@/features/jobs/utils";

interface JobCardProps {
  job: IJobListItem;
  onEdit: (job: IJobListItem) => void;
  onDelete: (job: IJobListItem) => void;
}

export function JobCard({ job, onEdit, onDelete }: JobCardProps) {
  const { mutate: updateJob, isPending: isClosing } = useUpdateJob();
  const applicationCount = getApplicationCount(job);
  const expired = isJobExpired(job.expiredAt);
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-lg font-bold text-foreground">{job.title}</p>
            {job.category && <Badge variant="secondary">{job.category.name}</Badge>}
          </div>
          <p className="text-sm text-muted-foreground">{job.company.name}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => setDetailOpen(true)}
          >
            <Eye />
            <span className="sr-only">Xem chi tiết</span>
          </Button>
          <Badge
            variant="outline"
            className={JOB_STATUS_BADGE_CLASS[job.status]}
          >
            {JOB_STATUS_LABEL[job.status]}
          </Badge>
        </div>
      </div>

      <JobDetailDialog
        jobId={job.id}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-success/10 p-3">
          <p className="text-[11px] font-medium tracking-wide text-success/80 uppercase">
            Lương
          </p>
          <p className="mt-0.5 text-sm font-bold text-success">
            {formatSalaryRange(job.salaryMin, job.salaryMax)}
          </p>
        </div>
        <div className="rounded-xl bg-primary/10 p-3">
          <p className="text-[11px] font-medium tracking-wide text-primary/80 uppercase">
            Ứng viên
          </p>
          <p className="mt-0.5 text-sm font-bold text-primary">
            {applicationCount}
          </p>
        </div>
        <div className="rounded-xl bg-warning/10 p-3">
          <p className="text-[11px] font-medium tracking-wide text-warning/80 uppercase">
            Hạn
          </p>
          <p
            className={`mt-0.5 text-sm font-bold ${expired ? "text-destructive" : "text-foreground"}`}
          >
            {formatExpiredAt(job.expiredAt)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <MapPin className="size-3.5" />
          {job.address ? `${job.address}, ${job.province ?? ""}` : (job.province ?? "—")}
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="size-3.5" />
          {applicationCount} hồ sơ
        </span>
      </div>

      <div className="h-px bg-border" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            disabled={job.status === "SUSPENDED"}
            onClick={() => onEdit(job)}
          >
            <Pencil /> Sửa
          </Button>
          {job.status === "PUBLISHED" && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={isClosing}
              onClick={() =>
                updateJob({ id: job.id, payload: { status: "CLOSED" } })
              }
            >
              <Ban /> Đóng tuyển
            </Button>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => onDelete(job)}
        >
          <Trash2 /> Xóa
        </Button>
      </div>
    </div>
  );
}
