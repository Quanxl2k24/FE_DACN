"use client";

import { CalendarClock, Pencil, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OFFER_STATUS_BADGE_CLASS, OFFER_STATUS_LABEL } from "@/features/offers/constants";
import type { IOffer } from "@/features/offers/types";
import { formatOfferDate, formatOfferSalary } from "@/features/offers/utils";

interface OfferSummaryCardProps {
  offer: IOffer;
  onEdit: () => void;
}

export function OfferSummaryCard({ offer, onEdit }: OfferSummaryCardProps) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-base">Lời mời nhận việc</CardTitle>
          <Badge variant="outline" className={OFFER_STATUS_BADGE_CLASS[offer.status]}>
            {OFFER_STATUS_LABEL[offer.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success">
            <Wallet className="size-4.5" />
          </div>
          <p className="text-sm font-medium text-foreground">
            {formatOfferSalary(offer.salary)}
          </p>
        </div>

        {(offer.startDate || offer.responseDeadline) && (
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <CalendarClock className="size-4.5" />
            </div>
            <p className="text-sm text-foreground">
              {offer.startDate && <>Bắt đầu: {formatOfferDate(offer.startDate)}</>}
              {offer.startDate && offer.responseDeadline && " · "}
              {offer.responseDeadline && <>Hạn phản hồi: {formatOfferDate(offer.responseDeadline)}</>}
            </p>
          </div>
        )}

        {offer.note && <p className="text-sm text-muted-foreground">{offer.note}</p>}

        {offer.status === "PENDING" && (
          <Button variant="outline" size="sm" className="w-fit" onClick={onEdit}>
            <Pencil /> Chỉnh sửa lời mời
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
