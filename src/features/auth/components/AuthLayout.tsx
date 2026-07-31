import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

/**
 * Split layout dùng chung cho các trang auth (Login, Register...) theo
 * desgin.md: panel branding bên trái (ẩn trên mobile) + form bên phải.
 */
export function AuthLayout({ title, description, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-1">
      <div className="relative hidden flex-1 flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex">
        <span className="text-xl font-semibold">ATS Platform</span>
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl leading-tight font-semibold">
            Kết nối nhà tuyển dụng và ứng viên phù hợp
          </h2>
          <p className="text-primary-foreground/80">
            Quản lý tin tuyển dụng, hồ sơ ứng viên và quy trình phỏng vấn trên
            một nền tảng duy nhất.
          </p>
        </div>
        <p className="text-sm text-primary-foreground/70">
          © {new Date().getFullYear()} Enterprise ATS
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-6 flex flex-col gap-1.5 text-center lg:text-left">
            <h1 className="text-xl font-semibold">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
