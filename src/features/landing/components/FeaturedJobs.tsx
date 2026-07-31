import Link from "next/link";
import { ArrowRight, Clock, Heart, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { featuredJobs, formatSalary } from "@/features/landing/data";

export function FeaturedJobs() {
  return (
    <section
      id="featured-jobs"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
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
          render={<Link href="/login">Xem tất cả việc làm</Link>}
        />
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredJobs.map((job) => (
          <Card
            key={job.id}
            className="ring-1 ring-border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <CardContent className="flex h-full flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
                    {job.companyInitial}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">
                      {job.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {job.company}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Lưu tin"
                  className="text-muted-foreground transition-colors hover:text-destructive"
                >
                  <Heart className="size-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-2 border-t border-border pt-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-success">
                    {formatSalary(job.salaryFrom)} - {formatSalary(job.salaryTo)}
                  </span>
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-foreground">
                    {job.employmentType}
                  </span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" />
                    {job.postedAgo}
                  </span>
                </div>
              </div>

              <Button
                className="w-full gap-1.5"
                nativeButton={false}
                render={<Link href="/login">
                  Ứng tuyển ngay
                  <ArrowRight className="size-4" />
                </Link>}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
