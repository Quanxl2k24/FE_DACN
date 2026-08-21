"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import type { ICandidate } from "@/features/applications/types";
import { useCreateOffer } from "@/features/offers/hooks/useCreateOffer";
import {
  offerFormSchema,
  type OfferFormValues,
} from "@/features/offers/schemas/offerFormSchema";
import type { IOffer } from "@/features/offers/types";

interface OfferFormDialogProps {
  companyId: string;
  candidate: ICandidate | null;
  /** Offer hiện có (nếu đang sửa lời mời còn PENDING) — null nếu gửi mới. */
  offer: IOffer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function toDateInputValue(value: string | null): string {
  if (!value) return "";
  return value.slice(0, 10);
}

export function OfferFormDialog({
  companyId,
  candidate,
  offer,
  open,
  onOpenChange,
}: OfferFormDialogProps) {
  const { mutate: createOffer, isPending } = useCreateOffer();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OfferFormValues>({
    resolver: zodResolver(offerFormSchema),
  });

  useEffect(() => {
    if (!open) return;
    reset({
      salary: offer ? String(offer.salary) : "",
      startDate: toDateInputValue(offer?.startDate ?? null),
      responseDeadline: toDateInputValue(offer?.responseDeadline ?? null),
      note: offer?.note ?? "",
    });
  }, [open, offer, reset]);

  if (!candidate) return null;

  const onSubmit = (values: OfferFormValues) => {
    createOffer(
      {
        companyId,
        applicationId: candidate.applicationId,
        payload: {
          salary: Number(values.salary),
          startDate: values.startDate || undefined,
          responseDeadline: values.responseDeadline || undefined,
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
            <DialogTitle>{offer ? "Chỉnh sửa lời mời" : "Gửi lời mời nhận việc"}</DialogTitle>
            <DialogDescription>
              {candidate.name} — {candidate.jobTitle}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="offerSalary">Mức lương đề nghị (VNĐ)</Label>
            <Input
              id="offerSalary"
              type="number"
              min={0}
              step={1000000}
              placeholder="20000000"
              aria-invalid={!!errors.salary}
              {...register("salary")}
            />
            {errors.salary && (
              <p className="text-sm text-destructive">{errors.salary.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="offerStartDate">Ngày bắt đầu dự kiến (không bắt buộc)</Label>
            <Input
              id="offerStartDate"
              type="date"
              aria-invalid={!!errors.startDate}
              {...register("startDate")}
            />
            {errors.startDate && (
              <p className="text-sm text-destructive">{errors.startDate.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="offerResponseDeadline">Hạn phản hồi (không bắt buộc)</Label>
            <Input
              id="offerResponseDeadline"
              type="date"
              aria-invalid={!!errors.responseDeadline}
              {...register("responseDeadline")}
            />
            {errors.responseDeadline && (
              <p className="text-sm text-destructive">{errors.responseDeadline.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="offerNote">Ghi chú (không bắt buộc)</Label>
            <Textarea
              id="offerNote"
              placeholder="Bao gồm bảo hiểm sức khỏe, 12 ngày phép/năm..."
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
                  Đang gửi...
                </>
              ) : (
                "Gửi lời mời"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
