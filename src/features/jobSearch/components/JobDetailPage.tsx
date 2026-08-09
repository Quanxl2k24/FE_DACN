"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { AxiosError } from "axios";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarClock,
  CalendarDays,
  CalendarX2,
  Flag,
  Heart,
  MapPin,
  ServerCrash,
  Tag,
} from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import type { IApiResponse } from "@/features/auth/types";
import { JOB_STATUS_BADGE_CLASS, JOB_STATUS_LABEL } from "@/features/jobs/constants";
import { useGetJobDetail } from "@/features/jobs/hooks/useGetJobDetail";
import { formatDate, formatExpiredAt, formatSalaryRange } from "@/features/jobs/utils";
import { ExpandableText } from "@/features/jobSearch/components/ExpandableText";
import { JobDetailSidebar } from "@/features/jobSearch/components/JobDetailSidebar";
import { isRecentlyPosted } from "@/features/jobSearch/utils";
import { ReportJobDialog } from "@/features/jobReports/components/ReportJobDialog";
import { useAuthStore } from "@/store/useAuthStore";

interface JobDetailPageProps {
  jobId: string;
}

function QuickInfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl bg-muted/60 p-4 text-center">
      <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-bold text-foreground">{value}</span>
    </div>
  );
}

function SectionHeading({
  id,
  title,
  action,
}: {
  id?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div id={id} className="flex scroll-mt-24 items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <span className="h-5 w-1 rounded-full bg-primary" />
        <h2 className="text-base font-bold text-foreground">{title}</h2>
      </div>
      {action}
    </div>
  );
}

function OverviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="rounded-full bg-muted px-3 py-1 font-medium text-foreground">
        {value}
      </span>
    </div>
  );
}

export function JobDetailPage({ jobId }: JobDetailPageProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const { data: job, isLoading, isError, error } = useGetJobDetail(jobId, true);
  const [reportOpen, setReportOpen] = useState(false);

  const axiosError = error as AxiosError<IApiResponse> | null;
  const statusCode = axiosError?.response?.status;
  const errorMessage = axiosError?.response?.data?.message;

  const handleApply = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    toast.info("Tính năng ứng tuyển đang được phát triển.");
  };

  const handleSave = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    toast.info("Tính năng lưu tin đang được phát triển.");
  };

  const handleReport = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    setReportOpen(true);
  };

  return (
    <div className="bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/jobs"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Quay lại tìm việc
        </Link>

        {isLoading && (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="flex flex-col gap-5">
              <Skeleton className="h-56 rounded-2xl" />
              <Skeleton className="h-80 rounded-2xl" />
            </div>
            <div className="flex flex-col gap-5">
              <Skeleton className="h-64 rounded-2xl" />
              <Skeleton className="h-40 rounded-2xl" />
            </div>
          </div>
        )}

        {!isLoading && isError && (
          <Card className="items-center rounded-2xl border-dashed py-20 text-center">
            <CardContent className="flex flex-col items-center gap-3">
              <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                {statusCode === 404 ? (
                  <CalendarX2 className="size-6 text-muted-foreground" />
                ) : (
                  <ServerCrash className="size-6 text-muted-foreground" />
                )}
              </div>
              <p className="text-lg font-semibold text-foreground">
                {statusCode === 404
                  ? "Không tìm thấy tin tuyển dụng"
                  : statusCode === 400
                    ? "Tin tuyển dụng không khả dụng"
                    : "Đã có lỗi xảy ra"}
              </p>
              <p className="max-w-sm text-sm text-muted-foreground">
                {errorMessage ??
                  "Tin tuyển dụng có thể đã bị gỡ, hết hạn hoặc đường dẫn không chính xác."}
              </p>
              <Button variant="outline" nativeButton={false} render={<Link href="/jobs" />}>
                Xem các tin tuyển dụng khác
              </Button>
            </CardContent>
          </Card>
        )}

        {!isLoading && !isError && job && (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
            {/* Cột trái — nội dung chính */}
            <div className="flex flex-col gap-5">
              <Card className="rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {job.title}
                    </h1>
                    <Badge variant="outline" className={JOB_STATUS_BADGE_CLASS[job.status]}>
                      {JOB_STATUS_LABEL[job.status]}
                    </Badge>
                  </div>
                  <Avatar size="lg" className="shrink-0">
                    <AvatarImage src={job.company.logoUrl ?? undefined} alt={job.company.name} />
                    <AvatarFallback>
                      <Building2 className="size-5" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <p className="mt-1 text-muted-foreground">{job.company.name}</p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-2xl font-bold text-primary">
                    {formatSalaryRange(job.salaryMin, job.salaryMax)}
                  </p>
                  {job.benefits && (
                    <a
                      href="#benefits"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      Xem phúc lợi
                      <ArrowRight className="size-3.5" />
                    </a>
                  )}
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  <QuickInfoItem
                    icon={MapPin}
                    label="Địa điểm"
                    value={job.province ?? job.address ?? "—"}
                  />
                  <QuickInfoItem
                    icon={CalendarDays}
                    label="Ngày đăng"
                    value={formatDate(job.createdAt)}
                  />
                  <QuickInfoItem
                    icon={CalendarClock}
                    label="Hạn nộp"
                    value={formatExpiredAt(job.expiredAt)}
                  />
                </div>

                {job.category && (
                  <div className="mt-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground">
                      <Tag className="size-3.5" />
                      {job.category.name}
                      {isRecentlyPosted(job.createdAt) && (
                        <Badge className="px-1.5 py-0 text-[10px]">Mới</Badge>
                      )}
                    </span>
                  </div>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" className="flex-1 gap-2" onClick={handleApply}>
                    Ứng tuyển ngay
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 rounded-full"
                    onClick={handleSave}
                  >
                    <Heart className="size-4" />
                    Lưu tin
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="gap-2 rounded-full text-muted-foreground hover:text-destructive"
                    onClick={handleReport}
                  >
                    <Flag className="size-4" />
                    Báo cáo
                  </Button>
                </div>

                <ReportJobDialog
                  jobId={job.id}
                  open={reportOpen}
                  onOpenChange={setReportOpen}
                />

                {isAuthenticated && user?.type === "APPLICANT" && (
                  <Link
                    href={`/application-status/${job.id}`}
                    className="mt-3 inline-flex items-center gap-1 self-start text-sm font-medium text-primary hover:underline"
                  >
                    Xem trạng thái ứng tuyển của bạn cho vị trí này
                    <ArrowRight className="size-3.5" />
                  </Link>
                )}
              </Card>

              <Card className="rounded-2xl p-6">
                <SectionHeading title="Tổng quan" />
                <div className="mt-4 flex flex-col divide-y divide-border">
                  {job.category && <OverviewRow label="Ngành nghề" value={job.category.name} />}
                  <OverviewRow
                    label="Địa điểm"
                    value={
                      job.address
                        ? `${job.address}, ${job.province ?? ""}`
                        : (job.province ?? "—")
                    }
                  />
                  <OverviewRow
                    label="Mức lương"
                    value={formatSalaryRange(job.salaryMin, job.salaryMax)}
                  />
                  <OverviewRow label="Hạn nộp" value={formatExpiredAt(job.expiredAt)} />
                  <OverviewRow label="Ngày đăng" value={formatDate(job.createdAt)} />
                  <OverviewRow label="Cập nhật lần cuối" value={formatDate(job.updatedAt)} />
                </div>

                {job.description && (
                  <>
                    <Separator className="my-6" />
                    <SectionHeading title="Mô tả công việc" />
                    <div className="mt-3">
                      <ExpandableText text={job.description} />
                    </div>
                  </>
                )}

                {job.requirements && (
                  <>
                    <Separator className="my-6" />
                    <SectionHeading title="Yêu cầu ứng viên" />
                    <div className="mt-3">
                      <ExpandableText text={job.requirements} />
                    </div>
                  </>
                )}

                {job.benefits && (
                  <>
                    <Separator className="my-6" />
                    <SectionHeading id="benefits" title="Quyền lợi" />
                    <div className="mt-3">
                      <ExpandableText text={job.benefits} />
                    </div>
                  </>
                )}
              </Card>
            </div>

            {/* Cột phải — sidebar */}
            <div className="lg:sticky lg:top-24">
              <JobDetailSidebar job={job} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
