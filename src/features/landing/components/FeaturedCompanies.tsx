import { featuredCompanies } from "@/features/landing/data";

export function FeaturedCompanies() {
  return (
    <section id="employers" className="bg-secondary py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Nhà tuyển dụng hàng đầu
          </h2>
          <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
            Hàng nghìn doanh nghiệp đang tin tưởng tìm kiếm nhân tài trên nền
            tảng của chúng tôi
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {featuredCompanies.map((company) => (
            <div
              key={company.name}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-5 text-center shadow-sm"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-base font-semibold text-primary">
                {company.initial}
              </span>
              <p className="text-sm font-medium text-foreground">
                {company.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
