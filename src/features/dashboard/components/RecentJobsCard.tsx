import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { JOB_STATUS_BADGE_CLASS, JOB_STATUS_LABEL } from "@/features/jobs/constants";
import type { IJobListItem } from "@/features/jobs/types";
import { formatDate, getApplicationCount } from "@/features/jobs/utils";

interface RecentJobsCardProps {
  jobs: IJobListItem[];
  isLoading: boolean;
}

export function RecentJobsCard({ jobs, isLoading }: RecentJobsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tin tuyển dụng gần đây</CardTitle>
        <CardAction>
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href="/dashboard/jobs">Xem tất cả</Link>}
          />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col divide-y divide-border">
        {isLoading && (
          <div className="flex flex-col gap-2 py-1">
            <Skeleton className="h-12 rounded-lg" />
            <Skeleton className="h-12 rounded-lg" />
          </div>
        )}
        {!isLoading && jobs.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Chưa có tin tuyển dụng nào.
          </p>
        )}
        {!isLoading &&
          jobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">{job.title}</span>
                <span className="text-xs text-muted-foreground">
                  {job.province ?? job.address ?? "Chưa cập nhật"} · Đăng{" "}
                  {formatDate(job.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden text-sm text-muted-foreground sm:block">
                  {getApplicationCount(job)} ứng viên
                </span>
                <Badge variant="outline" className={JOB_STATUS_BADGE_CLASS[job.status]}>
                  {JOB_STATUS_LABEL[job.status]}
                </Badge>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
