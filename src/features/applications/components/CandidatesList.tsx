"use client";

import { useState } from "react";
import { Loader2, Search, SlidersHorizontal, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApplicationDetailDialog } from "@/features/applications/components/ApplicationDetailDialog";
import { CandidateCard } from "@/features/applications/components/CandidateCard";
import { CandidatesAdvancedFiltersSheet } from "@/features/applications/components/CandidatesAdvancedFiltersSheet";
import { ScheduleInterviewDialog } from "@/features/applications/components/ScheduleInterviewDialog";
import {
  APPLICATION_STATUS_LABEL,
  APPLICATION_STATUSES,
} from "@/features/applications/constants";
import { useGetCandidates } from "@/features/applications/hooks/useGetCandidates";
import { useUpdateApplicationStatus } from "@/features/applications/hooks/useUpdateApplicationStatus";
import type { ApplicationStatus, ICandidate } from "@/features/applications/types";
import { useGetJobs } from "@/features/jobs/hooks/useGetJobs";
import { OfferFormDialog } from "@/features/offers/components/OfferFormDialog";
import { useGetOffer } from "@/features/offers/hooks/useGetOffer";

export function CandidatesList({ companyId }: { companyId: string }) {
  const [nameDraft, setNameDraft] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<ApplicationStatus | "ALL">("ALL");
  const [jobId, setJobId] = useState<string>("ALL");
  const [onlyActiveJobs, setOnlyActiveJobs] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [interviewCandidate, setInterviewCandidate] = useState<ICandidate | null>(null);
  const [offerCandidate, setOfferCandidate] = useState<ICandidate | null>(null);

  // Chỉ lấy trang đầu để đổ dữ liệu cho dropdown lọc theo vị trí.
  const { data: jobsData } = useGetJobs(companyId, { take: 50 });
  const jobs = jobsData?.pages[0]?.data ?? [];

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetCandidates(companyId, {
      name: name || undefined,
      status: status === "ALL" ? undefined : status,
      jobId: jobId === "ALL" ? undefined : jobId,
      onlyActiveJobs: onlyActiveJobs || undefined,
    });

  const { mutate: updateStatus } = useUpdateApplicationStatus();
  // Cùng query key với CandidateCard nên dùng lại cache, không gọi lại API.
  const { data: offerForDialog } = useGetOffer(
    companyId,
    offerCandidate?.applicationId,
    Boolean(offerCandidate),
  );

  const candidates = data?.pages.flatMap((page) => page.data) ?? [];
  const viewing = candidates.find((c) => c.applicationId === viewingId) ?? null;
  const hasAdvancedFilters = jobId !== "ALL" || onlyActiveJobs;

  const handleResetAdvancedFilters = () => {
    setJobId("ALL");
    setOnlyActiveJobs(false);
  };

  const handleSelectStatus = (candidate: ICandidate, next: ApplicationStatus) => {
    // Đặt lịch phỏng vấn có API riêng (tự động chuyển status sang INTERVIEW),
    // các trạng thái khác gọi thẳng API cập nhật trạng thái.
    if (next === "INTERVIEW") {
      setInterviewCandidate(candidate);
      return;
    }
    updateStatus({ companyId, applicationId: candidate.applicationId, payload: { status: next } });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Ứng viên</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {candidates.length}
          {hasNextPage ? "+" : ""} hồ sơ trong hệ thống
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form
          className="relative w-full sm:max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
            setName(nameDraft.trim());
          }}
        >
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm theo tên ứng viên..."
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            className="h-10 rounded-full pl-9"
          />
        </form>

        <Button
          variant="outline"
          className="relative self-start rounded-full sm:self-auto"
          onClick={() => setFiltersOpen(true)}
        >
          <SlidersHorizontal /> Bộ lọc nâng cao
          {hasAdvancedFilters && (
            <span className="absolute -top-1 -right-1 flex size-2.5 rounded-full bg-primary ring-2 ring-white" />
          )}
        </Button>
      </div>

      <div className="flex justify-center">
        <Tabs
          value={status}
          onValueChange={(value) =>
            setStatus((value as ApplicationStatus | "ALL" | null) ?? "ALL")
          }
        >
          <TabsList className="h-auto flex-wrap justify-center gap-1 rounded-2xl border border-border/60 bg-white p-1.5 shadow-sm">
            <TabsTrigger value="ALL" className="rounded-xl px-4 py-1.5">
              Tất cả
            </TabsTrigger>
            {APPLICATION_STATUSES.map((s) => (
              <TabsTrigger key={s} value={s} className="rounded-xl px-4 py-1.5">
                {APPLICATION_STATUS_LABEL[s]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {isLoading && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-40 rounded-2xl" />
        </div>
      )}

      {!isLoading && candidates.length === 0 && (
        <Card className="items-center rounded-2xl border-dashed py-10 text-center">
          <CardContent className="flex flex-col items-center gap-2">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Users className="size-6 text-muted-foreground" />
            </div>
            <p className="font-medium">Không tìm thấy ứng viên nào</p>
            <p className="text-sm text-muted-foreground">
              Thử thay đổi từ khóa hoặc bộ lọc tìm kiếm.
            </p>
          </CardContent>
        </Card>
      )}

      {!isLoading && candidates.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2">
          {candidates.map((candidate) => (
            <CandidateCard
              key={candidate.applicationId}
              companyId={companyId}
              candidate={candidate}
              onView={(c) => setViewingId(c.applicationId)}
              onSelectStatus={handleSelectStatus}
              onSendOffer={(c) => setOfferCandidate(c)}
            />
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

      <CandidatesAdvancedFiltersSheet
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        jobs={jobs}
        jobId={jobId}
        onJobIdChange={setJobId}
        onlyActiveJobs={onlyActiveJobs}
        onOnlyActiveJobsChange={setOnlyActiveJobs}
        onReset={handleResetAdvancedFilters}
      />

      <ApplicationDetailDialog
        companyId={companyId}
        candidate={viewing}
        open={Boolean(viewingId)}
        onOpenChange={(open) => !open && setViewingId(null)}
      />

      <ScheduleInterviewDialog
        companyId={companyId}
        candidate={interviewCandidate}
        open={Boolean(interviewCandidate)}
        onOpenChange={(open) => !open && setInterviewCandidate(null)}
      />

      <OfferFormDialog
        companyId={companyId}
        candidate={offerCandidate}
        offer={offerForDialog ?? null}
        open={Boolean(offerCandidate)}
        onOpenChange={(open) => !open && setOfferCandidate(null)}
      />
    </div>
  );
}
