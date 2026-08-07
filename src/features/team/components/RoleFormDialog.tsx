"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useCreateRole } from "@/features/team/hooks/useCreateRole";
import { useGetPermissions } from "@/features/team/hooks/useGetPermissions";
import { useUpdateRole } from "@/features/team/hooks/useUpdateRole";
import {
  roleSchema,
  type RoleFormValues,
} from "@/features/team/schemas/roleSchema";
import type { IPermission, IRole } from "@/features/team/types";

interface RoleFormDialogProps {
  companyId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Truyền vào khi sửa chức danh có sẵn, để trống khi tạo mới. */
  role?: IRole | null;
}

export function RoleFormDialog({
  companyId,
  open,
  onOpenChange,
  role,
}: RoleFormDialogProps) {
  const isEditing = Boolean(role);
  const { data: permissions, isLoading: isLoadingPermissions } =
    useGetPermissions();
  const { mutate: createRole, isPending: isCreating } = useCreateRole();
  const { mutate: updateRole, isPending: isUpdating } = useUpdateRole();
  const isPending = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: { name: "", permissionIds: [] },
  });

  const permissionIds = watch("permissionIds");

  useEffect(() => {
    if (!open) return;
    reset({
      name: role?.name ?? "",
      permissionIds: role?.rolePermissions.map((rp) => rp.permissionId) ?? [],
    });
  }, [open, role, reset]);

  const togglePermission = (permissionId: number, checked: boolean) => {
    setValue(
      "permissionIds",
      checked
        ? [...permissionIds, permissionId]
        : permissionIds.filter((id) => id !== permissionId),
      { shouldValidate: true },
    );
  };

  const groupedPermissions = (permissions ?? []).reduce<
    Record<string, IPermission[]>
  >((acc, permission) => {
    (acc[permission.module] ??= []).push(permission);
    return acc;
  }, {});

  const onSubmit = (values: RoleFormValues) => {
    if (role) {
      updateRole(
        { companyId, roleId: role.id, payload: values },
        { onSuccess: () => onOpenChange(false) },
      );
    } else {
      createRole(
        { companyId, payload: values },
        { onSuccess: () => onOpenChange(false) },
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Cập nhật chức danh" : "Tạo chức danh mới"}
            </DialogTitle>
            <DialogDescription>
              Chọn các quyền hạn mà chức danh này được phép thực hiện trong
              công ty.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="roleName">Tên chức danh</Label>
            <Input
              id="roleName"
              placeholder="VD: HR Executive"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Quyền hạn</Label>
            {isLoadingPermissions ? (
              <p className="text-sm text-muted-foreground">
                Đang tải danh sách quyền...
              </p>
            ) : (
              <div className="flex max-h-72 flex-col gap-4 overflow-y-auto rounded-lg border border-border p-3">
                {Object.entries(groupedPermissions).map(
                  ([module, perms]) => (
                    <div key={module} className="flex flex-col gap-2">
                      <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        {module}
                      </span>
                      {perms.map((permission) => (
                        <label
                          key={permission.id}
                          className="flex items-start gap-2 text-sm"
                        >
                          <Checkbox
                            className="mt-0.5"
                            checked={permissionIds.includes(permission.id)}
                            onCheckedChange={(checked) =>
                              togglePermission(permission.id, checked === true)
                            }
                          />
                          <span>
                            <span className="font-medium">
                              {permission.code}
                            </span>
                            <span className="block text-xs text-muted-foreground">
                              {permission.description}
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  ),
                )}
              </div>
            )}
            {errors.permissionIds && (
              <p className="text-sm text-destructive">
                {errors.permissionIds.message}
              </p>
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
            <Button type="submit" disabled={isPending || isLoadingPermissions}>
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Đang lưu...
                </>
              ) : isEditing ? (
                "Lưu thay đổi"
              ) : (
                "Tạo chức danh"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
