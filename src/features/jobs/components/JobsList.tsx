"use client";

import { useState } from "react";
import { Briefcase, Loader2, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteJobDialog } from "@/features/jobs/components/DeleteJobDialog";
import { JobCard } from "@/features/jobs/components/JobCard";
import { JobFormSheet } from "@/features/jobs/components/JobFormSheet";
import { JOB_STATUS_LABEL } from "@/features/jobs/constants";
import { useGetJobs } from "@/features/jobs/hooks/useGetJobs";
import type { IJobListItem, JobStatus } from "@/features/jobs/types";

const STATUS_FILTER_OPTIONS: Array<{ value: JobStatus | "ALL"; label: string }> = [
  { value: "ALL", label: "Tất cả trạng thái" },
  { value: "DRAFT", label: JOB_STATUS_LABEL.DRAFT },
  { value: "PUBLISHED", label: JOB_STATUS_LABEL.PUBLISHED },
  { value: "CLOSED", label: JOB_STATUS_LABEL.CLOSED },
  { value: "SUSPENDED", label: JOB_STATUS_LABEL.SUSPENDED },
];

export function JobsList({ companyId }: { companyId: string }) {
  const [keywordDraft, setKeywordDraft] = useState("");
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState<JobStatus | "ALL">("ALL");

  const [formOpen, setFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<IJobListItem | null>(null);
  const [deletingJob, setDeletingJob] = useState<IJobListItem | null>(null);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetJobs(companyId, {
    keyword: keyword || undefined,
    status: status === "ALL" ? undefined : status,
  });

  const jobs = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row">
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setKeyword(keywordDraft.trim());
            }}
          >
            <Input
              placeholder="Tìm theo tiêu đề tin..."
              value={keywordDraft}
              onChange={(e) => setKeywordDraft(e.target.value)}
              className="sm:w-64"
            />
            <Button type="submit" variant="outline" size="icon">
              <Search />
            </Button>
          </form>

          <Select
            value={status}
            onValueChange={(value) => setStatus(value as JobStatus | "ALL")}
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_FILTER_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={() => {
            setEditingJob(null);
            setFormOpen(true);
          }}
        >
          <Plus /> Tạo tin
        </Button>
      </div>

      {isLoading && (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-12 rounded-lg" />
          <Skeleton className="h-12 rounded-lg" />
          <Skeleton className="h-12 rounded-lg" />
        </div>
      )}

      {!isLoading && jobs.length === 0 && (
        <Card className="items-center border-dashed py-10 text-center">
          <CardContent className="flex flex-col items-center gap-2">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Briefcase className="size-6 text-muted-foreground" />
            </div>
            <p className="font-medium">Chưa có tin tuyển dụng nào</p>
            <p className="text-sm text-muted-foreground">
              Tạo tin tuyển dụng đầu tiên để bắt đầu tìm kiếm ứng viên.
            </p>
          </CardContent>
        </Card>
      )}

      {!isLoading && jobs.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={(job) => {
                setEditingJob(job);
                setFormOpen(true);
              }}
              onDelete={setDeletingJob}
            />
          ))}
        </div>
      )}

      {hasNextPage && (
        <Button
          variant="outline"
          className="self-center"
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

      <JobFormSheet
        companyId={companyId}
        open={formOpen}
        onOpenChange={setFormOpen}
        job={editingJob}
      />
      <DeleteJobDialog
        companyId={companyId}
        open={Boolean(deletingJob)}
        onOpenChange={(open) => !open && setDeletingJob(null)}
        job={deletingJob}
      />
    </div>
  );
}
