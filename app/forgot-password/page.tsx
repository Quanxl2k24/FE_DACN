import type { Metadata } from "next";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Quên mật khẩu",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Quên mật khẩu"
      description="Nhập email đã đăng ký để nhận hướng dẫn đặt lại mật khẩu"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
