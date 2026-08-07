"use client";

import { CalendarClock } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCompany } from "@/features/company/hooks/useGetCompanyProfile";
import { InterviewsList } from "@/features/interviews/components/InterviewsList";

export function InterviewsManagement() {
  const { data, isLoading } = useGetCompany();
  const company = data?.[0];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="h-10 w-full max-w-md rounded-lg" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  if (!company) {
    return (
      <Card className="items-center rounded-2xl border-dashed py-12 text-center">
        <CardContent className="flex flex-col items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <CalendarClock className="size-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">Bạn chưa có công ty nào</p>
            <p className="text-sm text-muted-foreground">
              Tạo hồ sơ công ty trước khi quản lý lịch phỏng vấn.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return <InterviewsList companyId={company.id} />;
}
