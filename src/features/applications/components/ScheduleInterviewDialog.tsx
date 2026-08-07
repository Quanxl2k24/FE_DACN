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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { INTERVIEW_MODE_LABEL, INTERVIEW_MODES } from "@/features/applications/constants";
import { useCreateInterview } from "@/features/applications/hooks/useCreateInterview";
import {
  scheduleInterviewSchema,
  type ScheduleInterviewFormValues,
} from "@/features/applications/schemas/scheduleInterviewSchema";
import type { ICandidate, InterviewMode } from "@/features/applications/types";
import { useGetMembers } from "@/features/team/hooks/useGetMembers";

interface ScheduleInterviewDialogProps {
  companyId: string;
  candidate: ICandidate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScheduleInterviewDialog({
  companyId,
  candidate,
  open,
  onOpenChange,
}: ScheduleInterviewDialogProps) {
  const { data: members, isLoading: isLoadingMembers } = useGetMembers(companyId);
  const { mutate: createInterview, isPending } = useCreateInterview();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ScheduleInterviewFormValues>({
    resolver: zodResolver(scheduleInterviewSchema),
    defaultValues: { mode: "ONLINE", location: "", interviewerId: "", scheduledAt: "", note: "" },
  });

  useEffect(() => {
    if (open) {
      reset({ mode: "ONLINE", location: "", interviewerId: "", scheduledAt: "", note: "" });
    }
  }, [open, reset]);

  if (!candidate) return null;

  const onSubmit = (values: ScheduleInterviewFormValues) => {
    createInterview(
      {
        companyId,
        payload: {
          candidateId: candidate.userId,
          jobId: candidate.jobId,
          mode: values.mode as InterviewMode,
          location: values.location,
          interviewerId: values.interviewerId,
          scheduledAt: new Date(values.scheduledAt).toISOString(),
          note: values.note || undefined,
        },
      },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Đặt lịch phỏng vấn</DialogTitle>
            <DialogDescription>
              {candidate.name} — {candidate.jobTitle}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-1.5">
            <Label>Hình thức</Label>
            <Controller
              name="mode"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full" aria-invalid={!!errors.mode}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {INTERVIEW_MODES.map((mode) => (
                      <SelectItem key={mode} value={mode}>
                        {INTERVIEW_MODE_LABEL[mode]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="interviewLocation">Địa điểm / Link phỏng vấn</Label>
            <Input
              id="interviewLocation"
              placeholder="Phòng họp A / https://meet.google.com/..."
              aria-invalid={!!errors.location}
              {...register("location")}
            />
            {errors.location && (
              <p className="text-sm text-destructive">{errors.location.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Người phỏng vấn</Label>
            <Controller
              name="interviewerId"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full" aria-invalid={!!errors.interviewerId}>
                    <SelectValue
                      placeholder={isLoadingMembers ? "Đang tải..." : "Chọn người phỏng vấn"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {members?.map(({ user }) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.interviewerId && (
              <p className="text-sm text-destructive">{errors.interviewerId.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="interviewScheduledAt">Thời gian phỏng vấn</Label>
            <Input
              id="interviewScheduledAt"
              type="datetime-local"
              aria-invalid={!!errors.scheduledAt}
              {...register("scheduledAt")}
            />
            {errors.scheduledAt && (
              <p className="text-sm text-destructive">{errors.scheduledAt.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="interviewNote">Ghi chú (không bắt buộc)</Label>
            <Textarea
              id="interviewNote"
              placeholder="Mời phỏng vấn vòng 1..."
              {...register("note")}
            />
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
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Đang đặt lịch...
                </>
              ) : (
                "Đặt lịch"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
