import { jobCategories } from "@/features/landing/data";

export function CategorySection() {
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

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {jobCategories.map((category) => (
          <button
            key={category.name}
            type="button"
            className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <category.icon className="size-5" />
            </span>
            <div>
              <p className="font-semibold text-foreground">{category.name}</p>
              <p className="text-sm text-muted-foreground">
                {category.jobCount.toLocaleString("vi-VN")} việc làm
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
