"use client";

import { useState } from "react";

import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { RegisterRoleSelect } from "@/features/auth/components/RegisterRoleSelect";
import type { RegisterRole } from "@/features/auth/types";

const ROLE_COPY: Record<RegisterRole, { title: string; description: string }> = {
  APPLICANT: {
    title: "Đăng ký tài khoản Ứng viên",
    description: "Tạo hồ sơ để tìm kiếm và ứng tuyển việc làm phù hợp.",
  },
  RECRUITER: {
    title: "Đăng ký tài khoản Nhà tuyển dụng",
    description: "Tạo tài khoản doanh nghiệp để đăng tin và quản lý ứng viên.",
  },
};

export function RegisterFlow() {
  const [role, setRole] = useState<RegisterRole | null>(null);

  if (!role) {
    return <RegisterRoleSelect onSelect={setRole} />;
  }

  return (
    <AuthLayout title={ROLE_COPY[role].title} description={ROLE_COPY[role].description}>
      <RegisterForm role={role} onBack={() => setRole(null)} />
    </AuthLayout>
  );
}
