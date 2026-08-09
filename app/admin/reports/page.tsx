import type { Metadata } from "next";
import { JobReportsManagement } from "@/features/admin/jobReports/components/JobReportsManagement";

export const metadata: Metadata = {
  title: "Báo cáo tin tuyển dụng | ATS Platform",
};

export default function AdminJobReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Báo cáo tin tuyển dụng
        </h1>
        <p className="text-sm text-muted-foreground">
          Xem xét các tin tuyển dụng bị người dùng báo cáo vi phạm và quyết
          định duyệt (tạm khóa tin) hoặc từ chối báo cáo.
        </p>
      </div>
      <JobReportsManagement />
    </div>
  );
}
