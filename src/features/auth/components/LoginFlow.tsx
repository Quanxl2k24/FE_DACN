"use client";

import { useState } from "react";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { OtpVerificationForm } from "@/features/auth/components/OtpVerificationForm";
import type { IOtpChallenge } from "@/features/auth/types";

export function LoginFlow() {
  const [challenge, setChallenge] = useState<IOtpChallenge | null>(null);

  if (challenge) {
    return (
      <AuthLayout
        title="Xác thực đăng nhập"
        description="Nhập mã OTP đã được gửi để hoàn tất đăng nhập."
      >
        <OtpVerificationForm
          challenge={challenge}
          onBack={() => setChallenge(null)}
        />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Đăng nhập"
      description="Đăng nhập để tiếp tục vào hệ thống tuyển dụng"
    >
      <LoginForm onOtpRequired={setChallenge} />
    </AuthLayout>
  );
}
