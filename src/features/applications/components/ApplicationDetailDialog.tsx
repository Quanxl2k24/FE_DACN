"use client";

import { useState } from "react";
import { Briefcase, Download, Gift } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ApplicationStatusBadge } from "@/features/applications/components/ApplicationStatusBadge";
import type { ICandidate } from "@/features/applications/types";
import { formatAppliedAt, getInitials } from "@/features/applications/utils";
import { OfferFormDialog } from "@/features/offers/components/OfferFormDialog";
import { OfferSummaryCard } from "@/features/offers/components/OfferSummaryCard";
import { useGetOffer } from "@/features/offers/hooks/useGetOffer";

interface ApplicationDetailDialogProps {
  companyId: string;
  candidate: ICandidate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApplicationDetailDialog({
  companyId,
  candidate,
  open,
  onOpenChange,
}: ApplicationDetailDialogProps) {
  const [offerFormOpen, setOfferFormOpen] = useState(false);
  const { data: offer } = useGetOffer(companyId, candidate?.applicationId, open);

  if (!candidate) return null;

  const canSendOffer = candidate.status === "OFFERED" && !offer;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Avatar size="lg">
                <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle>{candidate.name}</DialogTitle>
                <p className="text-xs text-muted-foreground">
                  Ứng tuyển {candidate.jobTitle}
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="flex items-center justify-between rounded-xl bg-muted/50 p-3">
            <span className="text-sm text-muted-foreground">Trạng thái</span>
            <ApplicationStatusBadge status={candidate.status} />
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Briefcase className="size-3.5" />
              {candidate.jobTitle}
            </span>
          </div>

          {offer && <OfferSummaryCard offer={offer} onEdit={() => setOfferFormOpen(true)} />}

          {canSendOffer && (
            <Button
              variant="outline"
              size="sm"
              className="w-fit"
              onClick={() => setOfferFormOpen(true)}
            >
              <Gift /> Gửi lời mời nhận việc
            </Button>
          )}

          <Separator />

          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Nộp hồ sơ ngày {formatAppliedAt(candidate.appliedAt)}
            </p>
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={
                <a href={candidate.cvUrl} target="_blank" rel="noopener noreferrer" />
              }
            >
              <Download /> Tải CV
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <OfferFormDialog
        companyId={companyId}
        candidate={candidate}
        offer={offer ?? null}
        open={offerFormOpen}
        onOpenChange={setOfferFormOpen}
      />
    </>
  );
}
