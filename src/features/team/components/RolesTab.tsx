"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Plus, ShieldCheck, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteRoleDialog } from "@/features/team/components/DeleteRoleDialog";
import { RoleFormDialog } from "@/features/team/components/RoleFormDialog";
import { useGetRoles } from "@/features/team/hooks/useGetRoles";
import type { IRole } from "@/features/team/types";

export function RolesTab({ companyId }: { companyId: string }) {
  const { data: roles, isLoading } = useGetRoles(companyId);
  const [formOpen, setFormOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<IRole | null>(null);
  const [deletingRole, setDeletingRole] = useState<IRole | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Chức danh quyết định những chức năng thành viên được phép sử dụng.
        </p>
        <Button
          onClick={() => {
            setEditingRole(null);
            setFormOpen(true);
          }}
        >
          <Plus /> Tạo chức danh
        </Button>
      </div>

      {isLoading && (
        <div className="grid gap-3 sm:grid-cols-2">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      )}

      {!isLoading && roles?.length === 0 && (
        <Card className="items-center border-dashed py-10 text-center">
          <CardContent className="flex flex-col items-center gap-2">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <ShieldCheck className="size-6 text-muted-foreground" />
            </div>
            <p className="font-medium">Chưa có chức danh nào</p>
            <p className="text-sm text-muted-foreground">
              Tạo chức danh để phân quyền cho thành viên trong công ty.
            </p>
          </CardContent>
        </Card>
      )}

      {!isLoading && roles && roles.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {roles.map((role) => (
            <Card key={role.id}>
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{role.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {role.rolePermissions.length} quyền hạn
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className={buttonVariants({
                        variant: "ghost",
                        size: "icon-sm",
                      })}
                    >
                      <MoreHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingRole(role);
                          setFormOpen(true);
                        }}
                      >
                        <Pencil /> Sửa chức danh
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => setDeletingRole(role)}
                      >
                        <Trash2 /> Xóa chức danh
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {role.rolePermissions.slice(0, 4).map(({ permission }) => (
                    <Badge key={permission.id} variant="outline">
                      {permission.code}
                    </Badge>
                  ))}
                  {role.rolePermissions.length > 4 && (
                    <Badge variant="outline">
                      +{role.rolePermissions.length - 4}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <RoleFormDialog
        companyId={companyId}
        open={formOpen}
        onOpenChange={setFormOpen}
        role={editingRole}
      />
      <DeleteRoleDialog
        companyId={companyId}
        open={Boolean(deletingRole)}
        onOpenChange={(open) => !open && setDeletingRole(null)}
        role={deletingRole}
      />
    </div>
  );
}
