import type { Metadata } from "next";
import { LoginFlow } from "@/features/auth/components/LoginFlow";

export const metadata: Metadata = {
  title: "Đăng nhập",
};

export default function LoginPage() {
  return <LoginFlow />;
}
