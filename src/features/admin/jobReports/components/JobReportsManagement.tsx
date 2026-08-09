"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { JobReportsTable } from "@/features/admin/jobReports/components/JobReportsTable";
import { useGetJobReports } from "@/features/admin/jobReports/hooks/useGetJobReports";
import { useUpdateJobReportStatus } from "@/features/admin/jobReports/hooks/useUpdateJobReportStatus";
import type { IJobReport } from "@/features/admin/jobReports/types";

export function JobReportsManagement() {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetJobReports();
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateJobReportStatus();

  const [resolvingReport, setResolvingReport] = useState<IJobReport | null>(null);

  const reports = data?.pages.flatMap((page) => page.data) ?? [];

  const handleReject = (report: IJobReport) => {
    updateStatus({ id: report.id, payload: { status: "REJECTED" } });
  };

  const handleConfirmResolve = () => {
    if (!resolvingReport) return;
    updateStatus(
      { id: resolvingReport.id, payload: { status: "RESOLVED" } },
      { onSuccess: () => setResolvingReport(null) },
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <JobReportsTable
        reports={reports}
        isLoading={isLoading}
        onResolve={setResolvingReport}
        onReject={handleReject}
        isMutating={isUpdating}
      />

      {hasNextPage && (
        <Button
          variant="outline"
          className="self-center rounded-full"
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Đang tải...
            </>
          ) : (
            "Tải thêm"
          )}
        </Button>
      )}

      <AlertDialog
        open={!!resolvingReport}
        onOpenChange={(open) => !open && setResolvingReport(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Duyệt báo cáo này?</AlertDialogTitle>
            <AlertDialogDescription>
              Tin tuyển dụng &quot;{resolvingReport?.job.title}&quot; sẽ bị
              chuyển sang trạng thái <strong>tạm khóa (SUSPENDED)</strong> ngay
              sau khi duyệt. Hành động này không thể tự động hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdating}>Hủy</AlertDialogCancel>
            <AlertDialogAction disabled={isUpdating} onClick={handleConfirmResolve}>
              {isUpdating ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                "Duyệt & khóa tin"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
