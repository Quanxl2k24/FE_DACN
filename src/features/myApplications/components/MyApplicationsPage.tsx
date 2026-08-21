"use client";

import { useMemo } from "react";
import { Briefcase, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { withRoleGuard } from "@/core/guards/RoleGuard";
import { MyApplicationCard } from "@/features/myApplications/components/MyApplicationCard";
import { useGetMyApplications } from "@/features/myApplications/hooks/useGetMyApplications";

function MyApplicationsPageBase() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetMyApplications({ take: 20 });

  const applications = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Việc làm đã ứng tuyển
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Danh sách các tin tuyển dụng bạn đã nộp hồ sơ.
        </p>
      </div>

      {isLoading && (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
        </div>
      )}

      {!isLoading && applications.length === 0 && (
        <Card className="items-center rounded-2xl border-dashed py-16 text-center">
          <CardContent className="flex flex-col items-center gap-3">
            <div className="flex size-14 items-center justify-center rounded-full bg-muted">
              <Briefcase className="size-6 text-muted-foreground" />
            </div>
            <p className="text-lg font-semibold text-foreground">
              Bạn chưa ứng tuyển tin nào
            </p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Tìm việc làm phù hợp và ứng tuyển để theo dõi tiến trình tại đây.
            </p>
          </CardContent>
        </Card>
      )}

      {!isLoading && applications.length > 0 && (
        <div className="flex flex-col gap-4">
          {applications.map((application) => (
            <MyApplicationCard key={application.applicationId} application={application} />
          ))}
        </div>
      )}

      {hasNextPage && (
        <div className="mt-6 flex justify-center">
          <Button
            variant="outline"
            className="rounded-full"
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
        </div>
      )}
    </div>
  );
}

export const MyApplicationsPage = withRoleGuard(MyApplicationsPageBase, ["APPLICANT"]);
