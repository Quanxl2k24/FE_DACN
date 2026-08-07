import type { UserType } from "@/features/auth/types";

// Trang chủ theo role (RBAC) sau khi đăng nhập / khi user đã đăng nhập sẵn.
export const ROLE_HOME_PATH: Record<UserType, string> = {
  APPLICANT: "/",
  RECRUITER: "/dashboard",
  ADMIN: "/admin",
};
