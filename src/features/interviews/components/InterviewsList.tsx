"use client";

import { useMemo, useState } from "react";
import { CalendarX2, Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScheduleInterviewDialog } from "@/features/applications/components/ScheduleInterviewDialog";
import type { ICandidate } from "@/features/applications/types";
import { CandidateSearchDialog } from "@/features/interviews/components/CandidateSearchDialog";
import { InterviewCard } from "@/features/interviews/components/InterviewCard";
import { InterviewDetailDialog } from "@/features/interviews/components/InterviewDetailDialog";
import { WeeklyCalendarStrip } from "@/features/interviews/components/WeeklyCalendarStrip";
import { useGetInterviews } from "@/features/interviews/hooks/useGetInterviews";
import type { IInterviewListItem, InterviewResultStatus } from "@/features/interviews/types";
import { getCurrentWeekDays, isSameDay } from "@/features/interviews/utils";

export function InterviewsList({ companyId }: { companyId: string }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [candidateSearchOpen, setCandidateSearchOpen] = useState(false);
  const [scheduleCandidate, setScheduleCandidate] = useState<ICandidate | null>(null);
  // BE không trả applicationId ở endpoint này nên không thể gọi PATCH đổi
  // trạng thái đơn từ đây — chỉ đổi tạm trên UI để xem trước, không lưu server.
  const [statusOverrides, setStatusOverrides] = useState<
    Record<string, InterviewResultStatus>
  >({});

  const weekDays = useMemo(() => getCurrentWeekDays(), []);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetInterviews(companyId, { take: 20 });

  const interviews = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  const getStatus = (interview: IInterviewListItem) =>
    statusOverrides[interview.interviewId] ?? interview.status;

  const interviewCountByDay = useMemo(() => {
    const map = new Map<string, number>();
    interviews.forEach((interview) => {
      const key = new Date(interview.scheduledAt).toDateString();
      map.set(key, (map.get(key) ?? 0) + 1);
    });
    return map;
  }, [interviews]);

  const filteredInterviews = useMemo(() => {
    const sorted = [...interviews].sort(
      (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
    );
    if (!selectedDate) return sorted;
    return sorted.filter((interview) => isSameDay(new Date(interview.scheduledAt), selectedDate));
  }, [interviews, selectedDate]);

  const viewing = interviews.find((it) => it.interviewId === viewingId) ?? null;

  const handleChangeResult = (interviewId: string, status: InterviewResultStatus) => {
    setStatusOverrides((prev) => ({ ...prev, [interviewId]: status }));
    toast.info(`Đã đổi kết quả thành "${status}" trên giao diện — chưa lưu server.`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Phỏng vấn</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sắp xếp và theo dõi kết quả phỏng vấn
          </p>
        </div>
        <Button className="rounded-full" onClick={() => setCandidateSearchOpen(true)}>
          <Plus /> Đặt lịch phỏng vấn
        </Button>
      </div>

      <WeeklyCalendarStrip
        days={weekDays}
        interviewCountByDay={interviewCountByDay}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      {isLoading && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-48 rounded-2xl" />
        </div>
      )}

      {!isLoading && filteredInterviews.length === 0 && (
        <Card className="items-center rounded-2xl border-dashed py-10 text-center">
          <CardContent className="flex flex-col items-center gap-2">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <CalendarX2 className="size-6 text-muted-foreground" />
            </div>
            <p className="font-medium">Không có lịch phỏng vấn</p>
            <p className="text-sm text-muted-foreground">
              {selectedDate
                ? "Chọn ngày khác hoặc bấm lại để xem cả tuần."
                : "Đặt lịch phỏng vấn để bắt đầu."}
            </p>
          </CardContent>
        </Card>
      )}

      {!isLoading && filteredInterviews.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2">
          {filteredInterviews.map((interview) => (
            <InterviewCard
              key={interview.interviewId}
              interview={interview}
              status={getStatus(interview)}
              onChangeResult={handleChangeResult}
              onViewDetail={(it) => setViewingId(it.interviewId)}
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

      <InterviewDetailDialog
        interview={viewing}
        status={viewing ? getStatus(viewing) : "Chưa có kết quả"}
        open={Boolean(viewingId)}
        onOpenChange={(open) => !open && setViewingId(null)}
      />

      <CandidateSearchDialog
        companyId={companyId}
        open={candidateSearchOpen}
        onOpenChange={setCandidateSearchOpen}
        onSelect={(candidate) => {
          setScheduleCandidate(candidate);
          setCandidateSearchOpen(false);
        }}
      />

      <ScheduleInterviewDialog
        companyId={companyId}
        candidate={scheduleCandidate}
        open={Boolean(scheduleCandidate)}
        onOpenChange={(open) => !open && setScheduleCandidate(null)}
      />
    </div>
  );
}
