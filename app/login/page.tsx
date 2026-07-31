import type { Metadata } from "next";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Đăng nhập",
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="Đăng nhập"
      description="Đăng nhập để tiếp tục vào hệ thống tuyển dụng"
    >
      <LoginForm />
    </AuthLayout>
  );
}
