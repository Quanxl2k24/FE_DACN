"use client";

import { Building2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useGetCompany } from "@/features/company/hooks/useGetCompanyProfile";
import { MembersTab } from "@/features/team/components/MembersTab";
import { RolesTab } from "@/features/team/components/RolesTab";

export function TeamManagement() {
  const { data, isLoading } = useGetCompany();
  const company = data?.[0];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="h-8 w-48 rounded-lg" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (!company) {
    return (
      <Card className="items-center border-dashed py-12 text-center">
        <CardContent className="flex flex-col items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <Building2 className="size-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">Bạn chưa có công ty nào</p>
            <p className="text-sm text-muted-foreground">
              Tạo hồ sơ công ty trước khi quản lý nhân sự & phân quyền.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Tabs defaultValue="members">
      <TabsList>
        <TabsTrigger value="members">Thành viên</TabsTrigger>
        <TabsTrigger value="roles">Chức danh</TabsTrigger>
      </TabsList>
      <TabsContent value="members" className="mt-4">
        <MembersTab companyId={company.id} />
      </TabsContent>
      <TabsContent value="roles" className="mt-4">
        <RolesTab companyId={company.id} />
      </TabsContent>
    </Tabs>
  );
}
