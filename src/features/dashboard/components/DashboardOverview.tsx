"use client";

import Link from "next/link";
import { Building2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCompany } from "@/features/company/hooks/useGetCompanyProfile";
import { PassedCandidatesCard } from "@/features/dashboard/components/PassedCandidatesCard";
import { RecentJobsCard } from "@/features/dashboard/components/RecentJobsCard";
import { StatsGrid } from "@/features/dashboard/components/StatsGrid";
import { useGetDashboardStats } from "@/features/dashboard/hooks/useGetDashboardStats";
import { useGetJobs } from "@/features/jobs/hooks/useGetJobs";

export function DashboardOverview() {
  const { data: companies, isLoading: isLoadingCompany } = useGetCompany();
  const company = companies?.[0];

  const { data: stats, isLoading: isLoadingStats } = useGetDashboardStats(company?.id);
  const { data: jobsData, isLoading: isLoadingJobs } = useGetJobs(company?.id, { take: 4 });
  const recentJobs = jobsData?.pages[0]?.data ?? [];

  if (isLoadingCompany) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-9 w-64 rounded-lg" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <Card className="items-center rounded-2xl border-dashed py-12 text-center">
        <CardContent className="flex flex-col items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <Building2 className="size-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">Bạn chưa có công ty nào</p>
            <p className="text-sm text-muted-foreground">
              Tạo hồ sơ công ty để bắt đầu xem thống kê tuyển dụng.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Tổng quan</h1>
          <p className="text-sm text-muted-foreground">
            Theo dõi hiệu quả tuyển dụng và hoạt động ứng viên gần đây.
          </p>
        </div>
        <Button nativeButton={false} render={<Link href="/dashboard/jobs" />}>
          <Plus /> Đăng tin tuyển dụng
        </Button>
      </div>

      <StatsGrid stats={stats} isLoading={isLoadingStats} />

      <div className="grid gap-6 xl:grid-cols-2">
        <RecentJobsCard jobs={recentJobs} isLoading={isLoadingJobs} />
        <PassedCandidatesCard candidates={stats?.passedCandidates ?? []} isLoading={isLoadingStats} />
      </div>
    </div>
  );
}
