"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  JOB_REPORT_STATUS_BADGE_CLASS,
  JOB_REPORT_STATUS_LABEL,
} from "@/features/admin/jobReports/constants";
import type { IJobReport } from "@/features/admin/jobReports/types";

interface JobReportsTableProps {
  reports: IJobReport[];
  isLoading: boolean;
  onResolve: (report: IJobReport) => void;
  onReject: (report: IJobReport) => void;
  isMutating: boolean;
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("vi-VN");
}

export function JobReportsTable({
  reports,
  isLoading,
  onResolve,
  onReject,
  isMutating,
}: JobReportsTableProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        Chưa có báo cáo nào.
      </p>
    );
  }

  return (
    <div className="rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tin tuyển dụng</TableHead>
            <TableHead>Người báo cáo</TableHead>
            <TableHead>Lý do</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Thời gian</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell className="max-w-48 truncate font-medium text-foreground">
                <Link
                  href={`/jobs/${report.jobId}`}
                  target="_blank"
                  className="hover:underline"
                >
                  {report.job.title}
                </Link>
              </TableCell>
              <TableCell>
                <p className="font-medium text-foreground">
                  {report.user.fullName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {report.user.email}
                </p>
              </TableCell>
              <TableCell className="max-w-64 whitespace-normal text-muted-foreground">
                {report.reason}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={JOB_REPORT_STATUS_BADGE_CLASS[report.status]}
                >
                  {JOB_REPORT_STATUS_LABEL[report.status]}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDateTime(report.createdAt)}
              </TableCell>
              <TableCell className="text-right">
                {report.status === "PENDING" ? (
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isMutating}
                      onClick={() => onResolve(report)}
                    >
                      <Check /> Duyệt
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      disabled={isMutating}
                      onClick={() => onReject(report)}
                    >
                      <X /> Từ chối
                    </Button>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
