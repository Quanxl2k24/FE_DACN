import Link from "next/link";
import { ArrowRight, Briefcase, Building2, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { RegisterRole } from "@/features/auth/types";

interface RegisterRoleSelectProps {
  onSelect: (role: RegisterRole) => void;
}

const ROLE_OPTIONS: Array<{
  role: RegisterRole;
  icon: typeof UserRound;
  title: string;
  description: string;
  cta: string;
}> = [
  {
    role: "APPLICANT",
    icon: UserRound,
    title: "Ứng viên",
    description: "Tìm việc và ứng tuyển online.",
    cta: "Tiếp tục với tư cách Ứng viên",
  },
  {
    role: "RECRUITER",
    icon: Building2,
    title: "Nhà tuyển dụng",
    description: "Đăng tin tuyển dụng và quản lý hồ sơ.",
    cta: "Tiếp tục với tư cách Nhà tuyển dụng",
  },
];

export function RegisterRoleSelect({ onSelect }: RegisterRoleSelectProps) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-secondary px-4 py-16">
      <Link href="/" className="flex items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Briefcase className="size-5" />
        </span>
        <span className="text-lg font-semibold tracking-tight">
          ATS Platform
        </span>
      </Link>

      <div className="mt-10 flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Bạn muốn tham gia với vai trò gì?
        </h1>
        <p className="max-w-md text-sm text-muted-foreground sm:text-base">
          Chọn loại tài khoản phù hợp để bắt đầu đăng ký
        </p>
      </div>

      <div className="mt-10 grid w-full max-w-3xl gap-6 sm:grid-cols-2">
        {ROLE_OPTIONS.map((option) => (
          <div
            key={option.role}
            className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:p-8"
          >
            <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <option.icon className="size-7" />
            </span>
            <div>
              <p className="text-xl font-semibold text-foreground">
                {option.title}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {option.description}
              </p>
            </div>
            <Button
              className="mt-auto w-full gap-1.5"
              onClick={() => onSelect(option.role)}
            >
              {option.cta}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        Đã có tài khoản?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Đăng nhập
        </Link>
      </p>
    </div>
  );
}
