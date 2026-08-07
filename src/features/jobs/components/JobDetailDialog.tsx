"use client";

import { Building2, Mail, MapPin, Phone, Globe } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { JOB_STATUS_BADGE_CLASS, JOB_STATUS_LABEL } from "@/features/jobs/constants";
import { useGetJobDetail } from "@/features/jobs/hooks/useGetJobDetail";
import { formatDate, formatExpiredAt, formatSalaryRange } from "@/features/jobs/utils";

interface JobDetailDialogProps {
  jobId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JobDetailDialog({ jobId, open, onOpenChange }: JobDetailDialogProps) {
  const { data: job, isLoading } = useGetJobDetail(jobId ?? undefined, open);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] w-full overflow-y-auto sm:max-w-2xl">
        {isLoading && (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        )}

        {!isLoading && job && (
          <>
            <DialogHeader>
              <div className="flex items-start justify-between gap-3 pr-6">
                <DialogTitle className="text-lg">{job.title}</DialogTitle>
                <Badge
                  variant="outline"
                  className={`shrink-0 ${JOB_STATUS_BADGE_CLASS[job.status]}`}
                >
                  {JOB_STATUS_LABEL[job.status]}
                </Badge>
              </div>
            </DialogHeader>

            <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
              <Avatar size="lg">
                <AvatarImage src={job.company.logoUrl ?? undefined} alt={job.company.name} />
                <AvatarFallback>
                  <Building2 className="size-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5 text-sm">
                <span className="font-semibold text-foreground">{job.company.name}</span>
                {job.company.website && (
                  <a
                    href={job.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                  >
                    <Globe className="size-3" />
                    {job.company.website}
                  </a>
                )}
              </div>
              <div className="ml-auto flex flex-col gap-1 text-xs text-muted-foreground">
                {job.company.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="size-3" />
                    {job.company.email}
                  </span>
                )}
                {job.company.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="size-3" />
                    {job.company.phone}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl bg-success/10 p-3">
                <p className="text-[11px] font-medium tracking-wide text-success/80 uppercase">
                  Lương
                </p>
                <p className="mt-0.5 text-sm font-bold text-success">
                  {formatSalaryRange(job.salaryMin, job.salaryMax)}
                </p>
              </div>
              <div className="rounded-xl bg-warning/10 p-3">
                <p className="text-[11px] font-medium tracking-wide text-warning/80 uppercase">
                  Hạn nộp
                </p>
                <p className="mt-0.5 text-sm font-bold text-foreground">
                  {formatExpiredAt(job.expiredAt)}
                </p>
              </div>
              <div className="col-span-2 rounded-xl bg-primary/10 p-3">
                <p className="text-[11px] font-medium tracking-wide text-primary/80 uppercase">
                  Địa điểm
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-sm font-bold text-primary">
                  <MapPin className="size-3.5 shrink-0" />
                  {job.address ? `${job.address}, ${job.province ?? ""}` : (job.province ?? "—")}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {job.jobSkills.length === 0 && (
                <span className="text-sm text-muted-foreground">
                  Chưa yêu cầu kỹ năng cụ thể.
                </span>
              )}
              {job.jobSkills.map((jobSkill) => (
                <Badge key={jobSkill.skillId} variant="secondary">
                  {jobSkill.skill?.name ?? `Kỹ năng #${jobSkill.skillId}`}
                </Badge>
              ))}
            </div>

            <Separator />

            <div className="flex flex-col gap-4 text-sm">
              {job.description && (
                <div>
                  <p className="mb-1 font-semibold text-foreground">Mô tả công việc</p>
                  <p className="whitespace-pre-line text-muted-foreground">
                    {job.description}
                  </p>
                </div>
              )}
              {job.requirements && (
                <div>
                  <p className="mb-1 font-semibold text-foreground">Yêu cầu ứng viên</p>
                  <p className="whitespace-pre-line text-muted-foreground">
                    {job.requirements}
                  </p>
                </div>
              )}
              {job.benefits && (
                <div>
                  <p className="mb-1 font-semibold text-foreground">Quyền lợi</p>
                  <p className="whitespace-pre-line text-muted-foreground">
                    {job.benefits}
                  </p>
                </div>
              )}
            </div>

            <Separator />

            <p className="text-xs text-muted-foreground">
              Đăng ngày {formatDate(job.createdAt)} · Cập nhật lần cuối{" "}
              {formatDate(job.updatedAt)}
            </p>
          </>
        )}

        {!isLoading && !job && (
          <div className="flex flex-col items-center gap-2 py-10 text-center text-sm text-muted-foreground">
            Không tải được chi tiết tin tuyển dụng.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
