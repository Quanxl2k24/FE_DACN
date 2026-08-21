"use client";

import { CalendarDays, Download, Eye, Gift } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ApplicationStatusBadge } from "@/features/applications/components/ApplicationStatusBadge";
import { CandidateStatusUpdateMenu } from "@/features/applications/components/CandidateStatusUpdateMenu";
import type { ApplicationStatus, ICandidate } from "@/features/applications/types";
import {
  formatAppliedAt,
  getAvatarColorClass,
  getInitials,
} from "@/features/applications/utils";
import { OFFER_STATUS_LABEL } from "@/features/offers/constants";
import { useGetOffer } from "@/features/offers/hooks/useGetOffer";

interface CandidateCardProps {
  companyId: string;
  candidate: ICandidate;
  onView: (candidate: ICandidate) => void;
  onSelectStatus: (candidate: ICandidate, status: ApplicationStatus) => void;
  onSendOffer: (candidate: ICandidate) => void;
}

export function CandidateCard({
  companyId,
  candidate,
  onView,
  onSelectStatus,
  onSendOffer,
}: CandidateCardProps) {
  const isOffered = candidate.status === "OFFERED";
  const { data: offer } = useGetOffer(companyId, candidate.applicationId, isOffered);

  return (
    <Card className="gap-4 rounded-2xl px-5 [--card-spacing:--spacing(5)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarFallback className={getAvatarColorClass(candidate.name)}>
              {getInitials(candidate.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{candidate.name}</p>
            <button
              type="button"
              onClick={() => onView(candidate)}
              className="text-sm text-primary hover:underline"
            >
              {candidate.jobTitle}
            </button>
          </div>
        </div>
        <ApplicationStatusBadge status={candidate.status} />
      </div>

      {isOffered && (
        <Button
          size="sm"
          className="w-full rounded-full"
          onClick={() => onSendOffer(candidate)}
        >
          <Gift />
          {offer
            ? offer.status === "PENDING"
              ? "Chỉnh sửa lời mời (chờ phản hồi)"
              : `Lời mời: ${OFFER_STATUS_LABEL[offer.status]}`
            : "Gửi lời mời nhận việc"}
        </Button>
      )}

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CalendarDays className="size-3.5" />
        Nộp hồ sơ ngày {formatAppliedAt(candidate.appliedAt)}
      </div>

      <Separator />

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => onView(candidate)}
          >
            <Eye /> Xem hồ sơ
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            nativeButton={false}
            render={
              <a href={candidate.cvUrl} target="_blank" rel="noopener noreferrer" />
            }
          >
            <Download /> Tải CV
          </Button>
        </div>
        <CandidateStatusUpdateMenu
          status={candidate.status}
          onSelectStatus={(next) => onSelectStatus(candidate, next)}
        />
      </div>
    </Card>
  );
}
