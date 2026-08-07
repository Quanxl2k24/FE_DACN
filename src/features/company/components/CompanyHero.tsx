"use client";

import { Building2, Camera, Globe, Loader2, MapPin, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Company {
  id: string;
  name: string;
  logoUrl: string;
  bannerUrl: string;
  companyType: string;
  employeeCount: string;
  location: string;
  website: string;
  badges: string[];
}

interface CompanyHeroProps {
  company: Company;
  className?: string;
  editable?: boolean;
  onEditLogo?: () => void;
  isUploadingLogo?: boolean;
}

// Luân phiên 2 tông màu (success/primary) cho badge, không phụ thuộc nội dung
// cụ thể để component vẫn tái sử dụng được với badge bất kỳ từ dữ liệu thật.
const BADGE_PALETTE = [
  "bg-success/10 text-success",
  "bg-primary/10 text-primary",
];

function InfoItem({
  icon: Icon,
  children,
}: {
  icon: typeof Building2;
  children: React.ReactNode;
}) {
  return (
    <span className="flex items-center gap-1.5">
      <Icon className="size-4 shrink-0" />
      {children}
    </span>
  );
}

export function CompanyHero({
  company,
  className,
  editable,
  onEditLogo,
  isUploadingLogo,
}: CompanyHeroProps) {
  const hasBanner = Boolean(company.bannerUrl);

  return (
    <Card className={cn("gap-0 overflow-hidden py-0", className)}>
      <div
        className="relative h-45 w-full bg-cover bg-center sm:h-65"
        style={{
          backgroundImage: hasBanner
            ? `url(${company.bannerUrl})`
            : "linear-gradient(135deg, color-mix(in oklab, var(--color-primary) 25%, transparent), color-mix(in oklab, var(--color-primary) 5%, transparent))",
        }}
      >
        <div className="absolute -bottom-10 left-6 sm:-bottom-16 sm:left-10">
          <div className="relative size-30 overflow-hidden rounded-2xl border-[5px] border-card bg-muted shadow-lg sm:size-42.5">
            {company.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={company.logoUrl}
                alt={company.name}
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center bg-muted">
                <Building2 className="size-10 text-muted-foreground sm:size-14" />
              </div>
            )}
            {isUploadingLogo ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                <Loader2 className="size-6 animate-spin" />
              </div>
            ) : (
              editable && (
                <button
                  type="button"
                  onClick={onEditLogo}
                  className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition-all hover:bg-black/40 hover:opacity-100 focus-visible:opacity-100 focus-visible:bg-black/40 focus-visible:outline-none"
                  aria-label="Đổi logo công ty"
                >
                  <Camera className="size-6" />
                </button>
              )
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-6 pt-14 pb-8 sm:px-10 sm:pt-20 sm:pb-10">
        <h1 className="text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-[40px]">
          {company.name || "Chưa đặt tên công ty"}
        </h1>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <InfoItem icon={Building2}>{company.companyType || "Chưa cập nhật ngành nghề"}</InfoItem>
          <InfoItem icon={Users}>{company.employeeCount || "Chưa cập nhật quy mô"}</InfoItem>
          <InfoItem icon={MapPin}>{company.location || "Chưa cập nhật địa chỉ"}</InfoItem>
          {company.website ? (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-primary hover:underline"
            >
              <Globe className="size-4 shrink-0" />
              {company.website}
            </a>
          ) : (
            <InfoItem icon={Globe}>Chưa cập nhật website</InfoItem>
          )}
        </div>

        {company.badges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {company.badges.map((badge, index) => (
              <span
                key={badge}
                className={cn(
                  "cursor-default rounded-full px-3 py-1 text-xs font-medium transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm",
                  BADGE_PALETTE[index % BADGE_PALETTE.length]
                )}
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
