"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { IJobListItem } from "@/features/jobs/types";

interface CandidatesAdvancedFiltersSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobs: IJobListItem[];
  jobId: string;
  onJobIdChange: (jobId: string) => void;
  onlyActiveJobs: boolean;
  onOnlyActiveJobsChange: (value: boolean) => void;
  onReset: () => void;
}

export function CandidatesAdvancedFiltersSheet({
  open,
  onOpenChange,
  jobs,
  jobId,
  onJobIdChange,
  onlyActiveJobs,
  onOnlyActiveJobsChange,
  onReset,
}: CandidatesAdvancedFiltersSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Bộ lọc nâng cao</SheetTitle>
          <SheetDescription>
            Thu hẹp danh sách ứng viên theo vị trí ứng tuyển hoặc tin đang hoạt động.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 px-4">
          <div className="flex flex-col gap-1.5">
            <Label>Vị trí ứng tuyển</Label>
            <Select value={jobId} onValueChange={(value) => onJobIdChange(value ?? "ALL")}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tất cả vị trí" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Tất cả vị trí</SelectItem>
                {jobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Label className="flex items-center gap-2 text-sm font-normal">
            <Checkbox
              checked={onlyActiveJobs}
              onCheckedChange={(checked) => onOnlyActiveJobsChange(checked === true)}
            />
            Chỉ hiển thị ứng viên của tin đang tuyển
          </Label>
        </div>

        <SheetFooter className="flex-row justify-end gap-2">
          <Button variant="outline" onClick={onReset}>
            Đặt lại
          </Button>
          <Button onClick={() => onOpenChange(false)}>Áp dụng</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
