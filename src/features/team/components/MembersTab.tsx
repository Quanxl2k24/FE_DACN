"use client";

import { useState } from "react";
import { Plus, Users } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { InviteMemberDialog } from "@/features/team/components/InviteMemberDialog";
import { useGetMembers } from "@/features/team/hooks/useGetMembers";

export function MembersTab({ companyId }: { companyId: string }) {
  const { data: members, isLoading } = useGetMembers(companyId);
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Thành viên đang tham gia công ty và chức danh của họ.
        </p>
        <Button onClick={() => setInviteOpen(true)}>
          <Plus /> Mời thành viên
        </Button>
      </div>

      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-20 rounded-2xl" />
          <Skeleton className="h-20 rounded-2xl" />
        </div>
      )}

      {!isLoading && members?.length === 0 && (
        <Card className="items-center border-dashed py-10 text-center">
          <CardContent className="flex flex-col items-center gap-2">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Users className="size-6 text-muted-foreground" />
            </div>
            <p className="font-medium">Chưa có thành viên nào</p>
            <p className="text-sm text-muted-foreground">
              Mời thành viên vào công ty để cùng quản lý tuyển dụng.
            </p>
          </CardContent>
        </Card>
      )}

      {!isLoading && members && members.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {members.map(({ user }) => (
            <Card key={user.id} className="flex-row items-center gap-3 rounded-2xl p-4">
              <Avatar size="lg">
                <AvatarFallback>
                  {user.fullName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <p className="truncate font-medium text-foreground">
                  {user.fullName}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>
              <Badge variant="outline">{user.role.name}</Badge>
            </Card>
          ))}
        </div>
      )}

      <InviteMemberDialog
        companyId={companyId}
        open={inviteOpen}
        onOpenChange={setInviteOpen}
      />
    </div>
  );
}
