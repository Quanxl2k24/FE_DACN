import type { Metadata } from "next";
import { RegisterFlow } from "@/features/auth/components/RegisterFlow";

export const metadata: Metadata = {
  title: "Đăng ký",
};

export default function RegisterPage() {
  return <RegisterFlow />;
}
