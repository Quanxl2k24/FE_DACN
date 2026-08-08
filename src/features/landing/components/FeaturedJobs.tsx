"use client";

import Link from "next/link";
import { Building2, Clock, MapPin } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPublicJobs } from "@/features/jobs/hooks/useGetPublicJobs";
import { formatDate, formatSalaryRange } from "@/features/jobs/utils";

export function FeaturedJobs() {
  const { data, isLoading } = useGetPublicJobs({ take: 6 });
  const jobs = data?.pages[0]?.data ?? [];

  return (
    <section id="featured-jobs" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Việc làm nổi bật
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Những vị trí tuyển dụng mới nhất từ các doanh nghiệp hàng đầu
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-1.5"
          nativeButton={false}
          render={<Link href="/jobs">Xem tất cả việc làm</Link>}
        />
      </div>

      {isLoading && (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      )}

      {!isLoading && jobs.length === 0 && (
        <p className="mt-10 rounded-2xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
          Chưa có tin tuyển dụng nào.
        </p>
      )}

      {!isLoading && jobs.length > 0 && (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="ring-1 ring-border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <CardContent className="flex h-full flex-col gap-4">
                <div className="flex items-start gap-3">
                  <Avatar size="lg">
                    <AvatarImage src={job.company.logoUrl ?? undefined} alt={job.company.name} />
                    <AvatarFallback>
                      <Building2 className="size-4.5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Link
                      href={`/jobs/${job.id}`}
                      className="font-semibold text-foreground hover:text-primary hover:underline"
                    >
                      {job.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">{job.company.name}</p>
                  </div>
                </div>

                {job.category && (
                  <Badge variant="secondary" className="w-fit">
                    {job.category.name}
                  </Badge>
                )}

                <div className="mt-auto flex flex-col gap-2 border-t border-border pt-4 text-sm">
                  <span className="font-semibold text-success">
                    {formatSalaryRange(job.salaryMin, job.salaryMax)}
                  </span>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3.5" />
                      {job.province ?? job.address ?? "Chưa cập nhật"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" />
                      Đăng {formatDate(job.createdAt)}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full gap-1.5"
                  nativeButton={false}
                  render={<Link href={`/jobs/${job.id}`}>Ứng tuyển ngay</Link>}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
