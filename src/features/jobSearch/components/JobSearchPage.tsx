"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPublicJobs } from "@/features/jobs/hooks/useGetPublicJobs";
import { JobFiltersSidebar } from "@/features/jobSearch/components/JobFiltersSidebar";
import { JobSearchBar } from "@/features/jobSearch/components/JobSearchBar";
import { PublicJobCard } from "@/features/jobSearch/components/PublicJobCard";

const TAKE = 12;

function JobSearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("keyword") ?? "");
  const [province, setProvince] = useState(searchParams.get("province") ?? "");
  const [categoryId, setCategoryId] = useState(searchParams.get("categoryId") ?? "");
  const [salaryFromMillion, setSalaryFromMillion] = useState(0);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetPublicJobs({
      keyword: keyword || undefined,
      province: province || undefined,
      categoryId: categoryId ? Number(categoryId) : undefined,
      salaryFrom: salaryFromMillion > 0 ? salaryFromMillion * 1_000_000 : undefined,
      take: TAKE,
    });

  const jobs = data?.pages.flatMap((page) => page.data) ?? [];

  const handleSearchSubmit = () => {
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("keyword", keyword.trim());
    if (province) params.set("province", province);
    const query = params.toString();
    router.replace(`/jobs${query ? `?${query}` : ""}`);
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Tìm việc làm
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {jobs.length}
          {hasNextPage ? "+" : ""} cơ hội phù hợp với bạn
        </p>
      </div>

      <JobSearchBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        province={province}
        onProvinceChange={setProvince}
        onSubmit={handleSearchSubmit}
      />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <JobFiltersSidebar
          categoryId={categoryId}
          onCategoryIdChange={setCategoryId}
          salaryFromMillion={salaryFromMillion}
          onSalaryFromMillionChange={setSalaryFromMillion}
        />

        <div className="flex flex-col gap-6">
          {isLoading && (
            <div className="grid gap-6 sm:grid-cols-2">
              <Skeleton className="h-56 rounded-2xl" />
              <Skeleton className="h-56 rounded-2xl" />
              <Skeleton className="h-56 rounded-2xl" />
              <Skeleton className="h-56 rounded-2xl" />
            </div>
          )}

          {!isLoading && jobs.length === 0 && (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border py-16 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                <SearchX className="size-6 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground">
                Không tìm thấy việc làm phù hợp
              </p>
              <p className="text-sm text-muted-foreground">
                Thử thay đổi từ khoá hoặc bộ lọc tìm kiếm.
              </p>
            </div>
          )}

          {!isLoading && jobs.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2">
              {jobs.map((job) => (
                <PublicJobCard key={job.id} job={job} />
              ))}
            </div>
          )}

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
        </div>
      </div>
    </div>
  );
}

export function JobSearchPage() {
  return (
    <Suspense fallback={null}>
      <JobSearchPageContent />
    </Suspense>
  );
}
