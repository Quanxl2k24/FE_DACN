"use client";

import { Loader2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteJob } from "@/features/jobs/hooks/useDeleteJob";
import type { IJobListItem } from "@/features/jobs/types";

interface DeleteJobDialogProps {
  companyId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: IJobListItem | null;
}

export function DeleteJobDialog({
  companyId,
  open,
  onOpenChange,
  job,
}: DeleteJobDialogProps) {
  const { mutate: deleteJob, isPending } = useDeleteJob();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa tin &quot;{job?.title}&quot;?</AlertDialogTitle>
          <AlertDialogDescription>
            Tin tuyển dụng sẽ biến mất khỏi mọi danh sách và ứng viên không
            thể xem hay ứng tuyển nữa. Hành động này không thể hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Hủy</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isPending}
            onClick={() => {
              if (!job) return;
              deleteJob(
                { id: job.id, companyId },
                { onSuccess: () => onOpenChange(false) },
              );
            }}
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Đang xóa...
              </>
            ) : (
              "Xóa tin"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
