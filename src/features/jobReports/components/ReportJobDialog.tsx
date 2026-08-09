"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { JOB_REPORT_REASON_OPTIONS, buildJobReportReason } from "@/features/jobReports/constants";
import { useCreateJobReport } from "@/features/jobReports/hooks/useCreateJobReport";
import {
  reportJobSchema,
  type ReportJobFormValues,
} from "@/features/jobReports/schemas/reportJobSchema";

interface ReportJobDialogProps {
  jobId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReportJobDialog({ jobId, open, onOpenChange }: ReportJobDialogProps) {
  const { mutate: createReport, isPending } = useCreateJobReport();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReportJobFormValues>({
    resolver: zodResolver(reportJobSchema),
    defaultValues: { details: "" },
  });

  useEffect(() => {
    if (!open) return;
    reset({ reasonCategory: undefined, details: "" });
  }, [open, reset]);

  const onSubmit = (values: ReportJobFormValues) => {
    createReport(
      {
        jobId,
        reason: buildJobReportReason(values.reasonCategory, values.details),
      },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Báo cáo tin tuyển dụng</DialogTitle>
            <DialogDescription>
              Cho chúng tôi biết vấn đề bạn gặp phải với tin tuyển dụng này. Đội
              ngũ quản trị sẽ xem xét và xử lý sớm nhất có thể.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="reportReason">Lý do báo cáo</Label>
              <Controller
                name="reasonCategory"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="reportReason" className="w-full" aria-invalid={!!errors.reasonCategory}>
                      <SelectValue placeholder="Chọn lý do" />
                    </SelectTrigger>
                    <SelectContent>
                      {JOB_REPORT_REASON_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.reasonCategory && (
                <p className="text-sm text-destructive">
                  {errors.reasonCategory.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="reportDetails">Mô tả chi tiết</Label>
              <Textarea
                id="reportDetails"
                rows={4}
                placeholder="Mô tả cụ thể vấn đề bạn gặp phải..."
                aria-invalid={!!errors.details}
                {...register("details")}
              />
              {errors.details && (
                <p className="text-sm text-destructive">{errors.details.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Hủy
            </Button>
            <Button type="submit" variant="destructive" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Đang gửi...
                </>
              ) : (
                "Gửi báo cáo"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
