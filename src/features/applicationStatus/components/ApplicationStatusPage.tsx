"use client";

import Link from "next/link";
import type { AxiosError } from "axios";
import { AlertCircle, ArrowLeft, FileQuestion, ServerCrash } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { withRoleGuard } from "@/core/guards/RoleGuard";
import type { IApiResponse } from "@/features/auth/types";
import { ApplicationTimeline } from "@/features/applicationStatus/components/ApplicationTimeline";
import { useGetApplicationStatus } from "@/features/applicationStatus/hooks/useGetApplicationStatus";
import { formatStepDate } from "@/features/applicationStatus/utils";

function ApplicationStatusPageBase({ jobId }: { jobId: string }) {
  const { data, isLoading, isError, error } = useGetApplicationStatus(jobId);

  const axiosError = error as AxiosError<IApiResponse> | null;
  const statusCode = axiosError?.response?.status;
  const errorMessage = axiosError?.response?.data?.message;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href={`/jobs/${jobId}`}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Quay lại tin tuyển dụng
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Trạng thái ứng tuyển
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Theo dõi hành trình ứng tuyển của bạn theo từng vị trí.
        </p>
      </div>

      {isLoading && <Skeleton className="h-64 rounded-2xl" />}

      {!isLoading && isError && (
        <Card className="items-center rounded-2xl border-dashed py-16 text-center">
          <CardContent className="flex flex-col items-center gap-3">
            <div className="flex size-14 items-center justify-center rounded-full bg-muted">
              {statusCode === 404 ? (
                <FileQuestion className="size-6 text-muted-foreground" />
              ) : (
                <ServerCrash className="size-6 text-muted-foreground" />
              )}
            </div>
            <p className="text-lg font-semibold text-foreground">
              {statusCode === 404 ? "Bạn chưa ứng tuyển vào tin này" : "Đã có lỗi xảy ra"}
            </p>
            <p className="max-w-sm text-sm text-muted-foreground">
              {errorMessage ?? "Vui lòng thử lại sau."}
            </p>
            <Link
              href={`/jobs/${jobId}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              Xem lại tin tuyển dụng
            </Link>
          </CardContent>
        </Card>
      )}

      {!isLoading && !isError && data && (
        <Card className="rounded-2xl p-6">
          <div className="flex flex-wrap items-baseline gap-2">
            <h2 className="text-lg font-bold text-foreground">{data.jobTitle}</h2>
          </div>

          {data.isRejected && (
            <div className="mt-4 flex items-start gap-3 rounded-xl bg-destructive/10 p-4">
              <AlertCircle className="mt-0.5 size-4.5 shrink-0 text-destructive" />
              <div className="text-sm">
                <p className="font-semibold text-destructive">
                  Hồ sơ chưa phù hợp ở vị trí này
                </p>
                {data.rejectedNote && (
                  <p className="mt-0.5 text-destructive/90">{data.rejectedNote}</p>
                )}
                {data.rejectedAt && (
                  <p className="mt-1 text-xs text-destructive/70">
                    Cập nhật ngày {formatStepDate(data.rejectedAt)}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="mt-6">
            <ApplicationTimeline steps={data.steps} currentStatus={data.currentStatus} />
          </div>
        </Card>
      )}
    </div>
  );
}

export const ApplicationStatusPage = withRoleGuard(ApplicationStatusPageBase, ["APPLICANT"]);
