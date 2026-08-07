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
import { useDeleteRole } from "@/features/team/hooks/useDeleteRole";
import type { IRole } from "@/features/team/types";

interface DeleteRoleDialogProps {
  companyId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: IRole | null;
}

export function DeleteRoleDialog({
  companyId,
  open,
  onOpenChange,
  role,
}: DeleteRoleDialogProps) {
  const { mutate: deleteRole, isPending } = useDeleteRole();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa chức danh &quot;{role?.name}&quot;?</AlertDialogTitle>
          <AlertDialogDescription>
            Thành viên đang giữ chức danh này sẽ mất toàn bộ quyền hạn liên
            quan. Hành động này không thể hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Hủy</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isPending}
            onClick={() => {
              if (!role) return;
              deleteRole(
                { companyId, roleId: role.id },
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
              "Xóa chức danh"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
