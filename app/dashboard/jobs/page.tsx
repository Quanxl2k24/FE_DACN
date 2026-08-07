import type { Metadata } from "next";
import { JobsManagement } from "@/features/jobs/components/JobsManagement";

export const metadata: Metadata = {
  title: "Tin tuyển dụng | ATS Platform",
};

export default function DashboardJobsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Quản lý tin tuyển dụng
        </h1>
        <p className="text-sm text-muted-foreground">
          Đăng tin, chỉnh sửa và theo dõi trạng thái các vị trí đang tuyển
          dụng của công ty.
        </p>
      </div>
      <JobsManagement />
    </div>
  );
}
