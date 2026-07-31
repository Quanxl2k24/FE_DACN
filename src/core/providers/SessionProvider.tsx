"use client";

import type { ReactNode } from "react";
import { useBootstrapSession } from "@/features/auth/hooks/useBootstrapSession";

/**
 * Kích hoạt `useBootstrapSession` một lần ở gốc app. Không chặn render —
 * các trang public vẫn hiển thị ngay lập tức trong lúc request /auth/me
 * chạy nền; chỉ các route được bọc bởi AuthGuard/RoleGuard mới chờ
 * `isInitialized` trước khi quyết định redirect.
 */
export function SessionProvider({ children }: { children: ReactNode }) {
  useBootstrapSession();
  return <>{children}</>;
}
