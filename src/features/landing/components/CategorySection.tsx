"use client";

import { useRouter } from "next/navigation";
import {
  Briefcase,
  Calculator,
  Code2,
  Headset,
  LineChart,
  Megaphone,
  Palette,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetJobCategories } from "@/features/jobs/hooks/useGetJobCategories";
import { useAuthStore } from "@/store/useAuthStore";

// BE không trả icon riêng cho từng category — xoay vòng một bộ icon cố định
// chỉ để trang trí, không mang ý nghĩa dữ liệu.
const CATEGORY_ICONS: LucideIcon[] = [
  Code2,
  LineChart,
  Megaphone,
  Calculator,
  UsersRound,
  Palette,
  Headset,
  Briefcase,
];

export function CategorySection() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();
  const { data: categories, isLoading } = useGetJobCategories(isAuthenticated);

  // GET /job-categories yêu cầu đăng nhập — khách vãng lai chưa có gì để hiện,
  // ẩn hẳn mục này thay vì hiện danh mục giả không có thật.
  if (!isAuthenticated) return null;

  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Khám phá theo ngành nghề
        </h2>
        <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
          Duyệt qua các lĩnh vực đang có nhu cầu tuyển dụng cao nhất trên nền
          tảng
        </p>
      </div>

      {isLoading && (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
      )}

      {!isLoading && categories && categories.length > 0 && (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, index) => {
            const Icon = CATEGORY_ICONS[index % CATEGORY_ICONS.length];
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => router.push(`/jobs?categoryId=${category.id}`)}
                className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" />
                </span>
                <p className="font-semibold text-foreground">{category.name}</p>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
