import type { Metadata } from "next";
import { JobCategoriesManagement } from "@/features/admin/jobCategories/components/JobCategoriesManagement";

export const metadata: Metadata = {
  title: "Quản trị hệ thống",
};

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Quản lý danh mục ngành nghề
        </h1>
        <p className="text-sm text-muted-foreground">
          Thêm, chỉnh sửa và ẩn các danh mục ngành nghề dùng để phân loại tin
          tuyển dụng trên toàn hệ thống.
        </p>
      </div>
      <JobCategoriesManagement />
    </div>
  );
}
