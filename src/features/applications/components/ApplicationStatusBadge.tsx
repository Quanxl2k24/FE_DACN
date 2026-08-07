import { Badge } from "@/components/ui/badge";
import {
  APPLICATION_STATUS_BADGE_CLASS,
  APPLICATION_STATUS_LABEL,
} from "@/features/applications/constants";
import type { ApplicationStatus } from "@/features/applications/types";
import { cn } from "@/lib/utils";

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
}

export function ApplicationStatusBadge({ status }: ApplicationStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(APPLICATION_STATUS_BADGE_CLASS[status])}
    >
      {APPLICATION_STATUS_LABEL[status]}
    </Badge>
  );
}
