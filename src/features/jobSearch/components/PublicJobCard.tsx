"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, MapPin, Tag } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { formatSalaryRange } from "@/features/jobs/utils";
import type { IPublicJobListItem } from "@/features/jobs/types";
import {
  formatPostedAgo,
  getCompanyGradientClass,
  getCompanyInitial,
} from "@/features/jobSearch/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";

interface PublicJobCardProps {
  job: IPublicJobListItem;
}

export function PublicJobCard({ job }: PublicJobCardProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleSave = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    toast.info("Tính năng lưu tin đang được phát triển.");
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {job.company.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={job.company.logoUrl}
              alt={job.company.name}
              className="size-12 shrink-0 rounded-xl object-cover"
            />
          ) : (
            <span
              className={cn(
                "flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-base font-semibold text-white",
                getCompanyGradientClass(job.company.name),
              )}
            >
              {getCompanyInitial(job.company.name)}
            </span>
          )}
          <div>
            <Link
              href={`/jobs/${job.id}`}
              className="text-lg font-bold text-foreground hover:text-primary hover:underline"
            >
              {job.title}
            </Link>
            <p className="text-sm text-muted-foreground">{job.company.name}</p>
          </div>
        </div>
        {/* <button
          type="button"
          aria-label="Lưu tin"
          onClick={handleSave}
          className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
        >
          <Heart className="size-5" />
        </button> */}
      </div>

      <p className="text-lg font-bold text-success">
        {formatSalaryRange(job.salaryMin, job.salaryMax)}
      </p>

      <div className="flex flex-wrap gap-2">
        <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          <MapPin className="size-3.5" />
          {job.province ?? job.address ?? "Chưa cập nhật"}
        </span>
        {job.category && (
          <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            <Tag className="size-3.5" />
            {job.category.name}
          </span>
        )}
      </div>

      <div className="h-px bg-border" />

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {formatPostedAgo(job.createdAt)}
        </span>
        <Button
          variant="link"
          className="h-auto gap-1 p-0 font-semibold"
          nativeButton={false}
          render={<Link href={`/jobs/${job.id}`}>Ứng tuyển →</Link>}
        />
      </div>
    </div>
  );
}
