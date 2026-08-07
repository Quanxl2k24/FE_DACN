import type { Metadata } from "next";
import { TeamManagement } from "@/features/team/components/TeamManagement";

export const metadata: Metadata = {
  title: "Nhân sự & Phân quyền | ATS Platform",
};

export default function DashboardTeamPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Nhân sự & Phân quyền
        </h1>
        <p className="text-sm text-muted-foreground">
          Quản lý thành viên tham gia công ty và chức danh tùy chỉnh cho từng
          vai trò.
        </p>
      </div>
      <TeamManagement />
    </div>
  );
}
