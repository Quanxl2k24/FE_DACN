"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ApplicationStatusBadge } from "@/features/applications/components/ApplicationStatusBadge";
import { formatAppliedAt } from "@/features/applications/utils";
import { getCompanyGradientClass, getCompanyInitial } from "@/features/jobSearch/utils";
import type { IMyApplicationItem } from "@/features/myApplications/types";
import { cn } from "@/lib/utils";

interface MyApplicationCardProps {
  application: IMyApplicationItem;
}

export function MyApplicationCard({ application }: MyApplicationCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {application.companyLogoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={application.companyLogoUrl}
              alt={application.companyName}
              className="size-12 shrink-0 rounded-xl object-cover"
            />
          ) : (
            <span
              className={cn(
                "flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-base font-semibold text-white",
                getCompanyGradientClass(application.companyName),
              )}
            >
              {getCompanyInitial(application.companyName)}
            </span>
          )}
          <div>
            <Link
              href={`/jobs/${application.jobId}`}
              className="text-base font-bold text-foreground hover:text-primary hover:underline"
            >
              {application.jobTitle}
            </Link>
            <p className="text-sm text-muted-foreground">{application.companyName}</p>
          </div>
        </div>
        <ApplicationStatusBadge status={application.status} />
      </div>

      <div className="h-px bg-border" />

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Đã ứng tuyển ngày {formatAppliedAt(application.appliedAt)}
        </span>
        <Button
          variant="link"
          className="h-auto gap-1 p-0 font-semibold"
          nativeButton={false}
          render={
            <Link href={`/application-status/${application.jobId}`}>
              Xem trạng thái ứng tuyển <ArrowRight className="size-3.5" />
            </Link>
          }
        />
      </div>
    </div>
  );
}
