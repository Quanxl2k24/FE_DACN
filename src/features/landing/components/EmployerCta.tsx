import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";

const BENEFITS = [
  { icon: Zap, text: "Đăng tin tuyển dụng chỉ trong vài phút" },
  { icon: ShieldCheck, text: "Quản lý ứng viên & phỏng vấn tập trung" },
  { icon: Sparkles, text: "Tiếp cận hàng nghìn ứng viên tiềm năng" },
];

export function EmployerCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 text-primary-foreground sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -top-20 -right-10 size-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Bạn là nhà tuyển dụng?
            </h2>
            <p className="mt-3 text-primary-foreground/85">
              Đăng ký tài khoản doanh nghiệp để đăng tin tuyển dụng, quản lý
              quy trình ATS và tìm kiếm ứng viên phù hợp nhất.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {BENEFITS.map((benefit) => (
                <li
                  key={benefit.text}
                  className="flex items-center gap-2.5 text-sm text-primary-foreground/90"
                >
                  <span className="flex size-7 items-center justify-center rounded-lg bg-white/15">
                    <benefit.icon className="size-3.5" />
                  </span>
                  {benefit.text}
                </li>
              ))}
            </ul>
          </div>

          <Button
            size="lg"
            variant="secondary"
            className="h-12 gap-2 px-6 text-base"
            nativeButton={false}
            render={<Link href="/register">
              Đăng tin tuyển dụng ngay
              <ArrowRight className="size-4" />
            </Link>}
          />
        </div>
      </div>
    </section>
  );
}
