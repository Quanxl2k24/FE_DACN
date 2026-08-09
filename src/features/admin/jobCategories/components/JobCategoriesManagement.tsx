"use client";

import { useState } from "react";
import { Loader2, Plus } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { JobCategoriesTable } from "@/features/admin/jobCategories/components/JobCategoriesTable";
import { JobCategoryFormDialog } from "@/features/admin/jobCategories/components/JobCategoryFormDialog";
import { useDeleteJobCategory } from "@/features/admin/jobCategories/hooks/useDeleteJobCategory";
import { useGetJobCategories } from "@/features/jobs/hooks/useGetJobCategories";
import type { IJobCategory } from "@/features/jobs/types";

export function JobCategoriesManagement() {
  const { data: categories, isLoading } = useGetJobCategories();
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteJobCategory();

  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<IJobCategory | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<IJobCategory | null>(null);

  const handleCreate = () => {
    setEditingCategory(null);
    setFormOpen(true);
  };

  const handleEdit = (category: IJobCategory) => {
    setEditingCategory(category);
    setFormOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deletingCategory) return;
    deleteCategory(deletingCategory.id, {
      onSuccess: () => setDeletingCategory(null),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button onClick={handleCreate}>
          <Plus /> Thêm danh mục
        </Button>
      </div>

      <JobCategoriesTable
        categories={categories}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={setDeletingCategory}
      />

      <JobCategoryFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        category={editingCategory}
      />

      <AlertDialog
        open={!!deletingCategory}
        onOpenChange={(open) => !open && setDeletingCategory(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xoá danh mục ngành nghề?</AlertDialogTitle>
            <AlertDialogDescription>
              Danh mục &quot;{deletingCategory?.name}&quot; sẽ bị ẩn khỏi hệ thống.
              Các tin tuyển dụng đã gán danh mục này sẽ không bị ảnh hưởng.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
              onClick={handleConfirmDelete}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Đang xoá...
                </>
              ) : (
                "Xoá"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
