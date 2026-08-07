"use client";

import { RefreshCw } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  APPLICATION_STATUS_LABEL,
  APPLICATION_STATUS_TRANSITIONS,
} from "@/features/applications/constants";
import type { ApplicationStatus } from "@/features/applications/types";
import { cn } from "@/lib/utils";

interface CandidateStatusUpdateMenuProps {
  status: ApplicationStatus;
  onSelectStatus: (status: ApplicationStatus) => void;
}

export function CandidateStatusUpdateMenu({
  status,
  onSelectStatus,
}: CandidateStatusUpdateMenuProps) {
  const nextStatuses = APPLICATION_STATUS_TRANSITIONS[status];

  if (nextStatuses.length === 0) {
    return (
      <span
        className={cn(
          buttonVariants({ size: "sm", variant: "outline" }),
          "rounded-full gap-1.5 pointer-events-none opacity-50",
        )}
      >
        <RefreshCw />
        Đã kết thúc
      </span>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className={cn(buttonVariants({ size: "sm" }), "rounded-full gap-1.5")}
          />
        }
      >
        <RefreshCw />
        Cập nhật trạng thái
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {nextStatuses.map((option) => (
          <DropdownMenuItem key={option} onClick={() => onSelectStatus(option)}>
            {APPLICATION_STATUS_LABEL[option]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
