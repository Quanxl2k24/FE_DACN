import { Briefcase, CalendarClock, TrendingUp, Users, type LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { IRecruitmentDashboardStats } from "@/features/dashboard/types";

interface IStatItem {
  label: string;
  value: string;
  icon: LucideIcon;
}

function buildStats(stats: IRecruitmentDashboardStats): IStatItem[] {
  return [
    { label: "Tin đang tuyển", value: String(stats.activeJobsCount), icon: Briefcase },
    {
      label: "Ứng viên (tin đang tuyển)",
      value: String(stats.applicationsForActiveJobsCount),
      icon: Users,
    },
    {
      label: "Phỏng vấn tuần này",
      value: String(stats.interviewsThisWeekCount),
      icon: CalendarClock,
    },
    { label: "Tỷ lệ đỗ", value: `${stats.successRate}%`, icon: TrendingUp },
  ];
}

interface StatsGridProps {
  stats: IRecruitmentDashboardStats | undefined;
  isLoading: boolean;
}

export function StatsGrid({ stats, isLoading }: StatsGridProps) {
  if (isLoading || !stats) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Skeleton className="h-28 rounded-2xl" />
        <Skeleton className="h-28 rounded-2xl" />
        <Skeleton className="h-28 rounded-2xl" />
        <Skeleton className="h-28 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {buildStats(stats).map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.label}>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4.5" />
                </span>
              </div>
              <span className="text-2xl font-semibold tracking-tight">{stat.value}</span>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
