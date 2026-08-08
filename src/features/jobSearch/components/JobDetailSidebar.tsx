import {
  Building2,
  CalendarClock,
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  Tag,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { IJob } from "@/features/jobs/types";
import { formatDate, formatExpiredAt, formatSalaryRange } from "@/features/jobs/utils";

function InfoStatRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>
      <div className="flex min-w-0 flex-col">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="truncate text-sm font-bold text-foreground">{value}</span>
      </div>
    </div>
  );
}

export function JobDetailSidebar({ job }: { job: IJob }) {
  const location = job.address
    ? `${job.address}, ${job.province ?? ""}`
    : (job.province ?? "—");

  return (
    <div className="flex flex-col gap-5">
      <Card className="rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarImage src={job.company.logoUrl ?? undefined} alt={job.company.name} />
            <AvatarFallback>
              <Building2 className="size-5" />
            </AvatarFallback>
          </Avatar>
          <p className="font-bold text-foreground">{job.company.name}</p>
        </div>

        <div className="mt-5 flex flex-col gap-4">
          {job.category && (
            <InfoStatRow icon={Tag} label="Lĩnh vực" value={job.category.name} />
          )}
          {job.company.address && (
            <InfoStatRow icon={MapPin} label="Địa chỉ" value={job.company.address} />
          )}
          {job.company.email && (
            <InfoStatRow icon={Mail} label="Email" value={job.company.email} />
          )}
          {job.company.phone && (
            <InfoStatRow icon={Phone} label="Điện thoại" value={job.company.phone} />
          )}
        </div>

        {job.company.website && (
          <Button
            variant="outline"
            className="mt-5 w-full rounded-full"
            nativeButton={false}
            render={
              <a href={job.company.website} target="_blank" rel="noopener noreferrer" />
            }
          >
            Xem website công ty
          </Button>
        )}
      </Card>

      <Card className="rounded-2xl p-6">
        <h2 className="text-base font-bold text-foreground">Thông tin chung</h2>
        <div className="mt-5 flex flex-col gap-4">
          <InfoStatRow
            icon={Wallet}
            label="Mức lương"
            value={formatSalaryRange(job.salaryMin, job.salaryMax)}
          />
          <InfoStatRow icon={MapPin} label="Địa điểm" value={location} />
          <InfoStatRow
            icon={CalendarClock}
            label="Hạn nộp"
            value={formatExpiredAt(job.expiredAt)}
          />
          <InfoStatRow icon={CalendarDays} label="Ngày đăng" value={formatDate(job.createdAt)} />
        </div>
      </Card>

      <Card className="rounded-2xl p-6">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Kỹ năng yêu cầu
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {job.jobSkills.length === 0 && (
            <span className="text-sm text-muted-foreground">
              Chưa yêu cầu kỹ năng cụ thể.
            </span>
          )}
          {job.jobSkills.map((jobSkill) => (
            <Badge key={jobSkill.skillId} variant="outline" className="rounded-full">
              {jobSkill.skill?.name ?? `Kỹ năng #${jobSkill.skillId}`}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
}
