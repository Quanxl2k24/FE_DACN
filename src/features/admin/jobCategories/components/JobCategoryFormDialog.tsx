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
import { useCreateJobCategory } from "@/features/admin/jobCategories/hooks/useCreateJobCategory";
import { useUpdateJobCategory } from "@/features/admin/jobCategories/hooks/useUpdateJobCategory";
import {
  jobCategorySchema,
  type JobCategoryFormValues,
} from "@/features/admin/jobCategories/schemas/jobCategorySchema";
import type { IJobCategory } from "@/features/jobs/types";

interface JobCategoryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Truyền vào khi sửa danh mục có sẵn, để trống khi tạo mới. */
  category?: IJobCategory | null;
}

export function JobCategoryFormDialog({
  open,
  onOpenChange,
  category,
}: JobCategoryFormDialogProps) {
  const isEditing = Boolean(category);
  const { mutate: createCategory, isPending: isCreating } = useCreateJobCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateJobCategory();
  const isPending = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobCategoryFormValues>({
    resolver: zodResolver(jobCategorySchema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (!open) return;
    reset({ name: category?.name ?? "" });
  }, [open, category, reset]);

  const onSubmit = (values: JobCategoryFormValues) => {
    if (category) {
      updateCategory(
        { id: category.id, payload: values },
        { onSuccess: () => onOpenChange(false) },
      );
    } else {
      createCategory(values, { onSuccess: () => onOpenChange(false) });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Cập nhật danh mục ngành nghề" : "Tạo danh mục ngành nghề"}
            </DialogTitle>
            <DialogDescription>
              Danh mục ngành nghề dùng để phân loại tin tuyển dụng trên hệ thống.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-1.5 py-2">
            <Label htmlFor="categoryName">Tên danh mục</Label>
            <Input
              id="categoryName"
              placeholder="VD: Công nghệ thông tin"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
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
                  Đang lưu...
                </>
              ) : isEditing ? (
                "Lưu thay đổi"
              ) : (
                "Tạo danh mục"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
