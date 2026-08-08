"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  Search,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthStore";

const STATS = [
  { label: "Việc làm đang tuyển", value: "12.400+", icon: BriefcaseBusiness },
  { label: "Doanh nghiệp tin dùng", value: "3.200+", icon: Building2 },
  { label: "Ứng viên đã kết nối", value: "85.000+", icon: Users },
];

const TRENDING_KEYWORDS = [
  "Frontend Developer",
  "Kế toán",
  "Digital Marketing",
  "Nhân sự",
];

export function HeroSection() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const isLoggedInApplicant = isAuthenticated && user?.type === "APPLICANT";

  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [province, setProvince] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("keyword", keyword.trim());
    if (province.trim()) params.set("province", province.trim());
    const query = params.toString();
    router.push(`/jobs${query ? `?${query}` : ""}`);
  };

  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-24 size-72 rounded-full bg-success/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {isLoggedInApplicant
              ? "Chào mừng bạn quay trở lại"
              : "Nền tảng tuyển dụng dành cho doanh nghiệp Việt"}
          </span>
          {isLoggedInApplicant ? (
            <>
              <h1 className="mt-5 text-4xl leading-tight font-bold tracking-tight text-foreground sm:text-5xl">
                Chào {user.fullName},
                <br />
                <span className="text-primary">cơ hội tiếp theo</span> đang chờ bạn
              </h1>
              <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
                Tiếp tục tìm kiếm công việc phù hợp từ hàng nghìn tin tuyển dụng
                của các doanh nghiệp uy tín trên khắp Việt Nam.
              </p>
            </>
          ) : (
            <>
              <h1 className="mt-5 text-4xl leading-tight font-bold tracking-tight text-foreground sm:text-5xl">
                Tìm việc mơ ước,
                <br />
                <span className="text-primary">kết nối sự nghiệp</span> của bạn
              </h1>
              <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
                Hàng nghìn cơ hội việc làm từ các doanh nghiệp uy tín trên khắp
                Việt Nam. Ứng tuyển nhanh chóng, theo dõi trạng thái minh bạch.
              </p>
            </>
          )}

          <form
            onSubmit={handleSearch}
            className="mt-8 flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm sm:flex-row sm:items-center sm:gap-2"
          >
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-border px-3 py-1">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <Input
                placeholder="Vị trí, từ khoá kỹ năng..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="h-9 border-none px-0 shadow-none focus-visible:ring-0"
              />
            </div>
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-border px-3 py-1 sm:max-w-48">
              <MapPin className="size-4 shrink-0 text-muted-foreground" />
              <Input
                placeholder="Hà Nội, TP.HCM..."
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="h-9 border-none px-0 shadow-none focus-visible:ring-0"
              />
            </div>
            <Button type="submit" size="lg" className="h-11 gap-2 sm:px-6">
              <Search className="size-4" />
              Tìm kiếm
            </Button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>Từ khoá phổ biến:</span>
            {TRENDING_KEYWORDS.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => router.push(`/jobs?keyword=${encodeURIComponent(term)}`)}
                className="rounded-full bg-background px-3 py-1 text-xs font-medium text-foreground ring-1 ring-border transition-colors hover:border-primary/40 hover:text-primary"
              >
                {term}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-primary">
                  <stat.icon className="size-4" />
                  <span className="text-xl font-bold text-foreground sm:text-2xl">
                    {stat.value}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground sm:text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative mx-auto w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
                SV
              </span>
              <div>
                <p className="font-semibold text-foreground">
                  Frontend Developer (ReactJS)
                </p>
                <p className="text-sm text-muted-foreground">
                  Công ty CP Giải pháp Công nghệ Sao Việt
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["ReactJS", "TypeScript", "TailwindCSS"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm font-semibold text-success">
                18 - 28 triệu
              </span>
              <span className="text-xs text-muted-foreground">
                Hà Nội · Toàn thời gian
              </span>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-8 w-64 rounded-xl border border-border bg-card p-4 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-lg bg-success/10 text-success">
                <Users className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  +248 ứng viên mới
                </p>
                <p className="text-xs text-muted-foreground">
                  đã ứng tuyển hôm nay
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
