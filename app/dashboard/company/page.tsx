import type { Metadata } from "next";
import { CompanyProfileForm } from "@/features/company/components/CompanyProfileForm";

export const metadata: Metadata = {
  title: "Hồ sơ công ty | ATS Platform",
};

export default function DashboardCompanyPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Hồ sơ công ty
        </h1>
        <p className="text-sm text-muted-foreground">
          Cập nhật thông tin công ty hiển thị với ứng viên trên các tin tuyển
          dụng.
        </p>
      </div>
      <CompanyProfileForm />
    </div>
  );
}
