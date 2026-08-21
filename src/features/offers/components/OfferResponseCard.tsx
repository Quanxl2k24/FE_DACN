"use client";

import { useState } from "react";
import { CalendarClock, CheckCircle2, Loader2, Wallet, XCircle } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OFFER_STATUS_BADGE_CLASS, OFFER_STATUS_LABEL } from "@/features/offers/constants";
import { useRespondToOffer } from "@/features/offers/hooks/useRespondToOffer";
import type { IOffer, OfferDecision } from "@/features/offers/types";
import { formatOfferDate, formatOfferSalary } from "@/features/offers/utils";

interface OfferResponseCardProps {
  jobId: string;
  offer: IOffer;
}

export function OfferResponseCard({ jobId, offer }: OfferResponseCardProps) {
  const [confirming, setConfirming] = useState<OfferDecision | null>(null);
  const { mutate: respond, isPending } = useRespondToOffer();

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

        {offer.status === "PENDING" ? (
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <Button
              className="rounded-full"
              disabled={isPending}
              onClick={() => setConfirming("ACCEPTED")}
            >
              <CheckCircle2 /> Chấp nhận
            </Button>
            <Button
              variant="outline"
              className="rounded-full"
              disabled={isPending}
              onClick={() => setConfirming("DECLINED")}
            >
              <XCircle /> Từ chối
            </Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Bạn đã{" "}
            {offer.status === "ACCEPTED" ? "chấp nhận" : "từ chối"} lời mời này
            {offer.respondedAt ? ` vào ngày ${formatOfferDate(offer.respondedAt)}` : ""}.
          </p>
        )}
      </CardContent>

      <AlertDialog open={confirming !== null} onOpenChange={(open) => !open && setConfirming(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirming === "ACCEPTED" ? "Chấp nhận lời mời nhận việc?" : "Từ chối lời mời nhận việc?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirming === "ACCEPTED"
                ? "Đơn ứng tuyển của bạn sẽ chuyển sang trạng thái đã được tuyển dụng."
                : "Đơn ứng tuyển của bạn sẽ bị từ chối. Hành động này không thể hoàn tác."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Hủy</AlertDialogCancel>
            <AlertDialogAction
              variant={confirming === "DECLINED" ? "destructive" : "default"}
              disabled={isPending}
              onClick={() => {
                if (!confirming) return;
                respond(
                  { jobId, decision: confirming },
                  { onSuccess: () => setConfirming(null) },
                );
              }}
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Đang gửi...
                </>
              ) : confirming === "ACCEPTED" ? (
                "Chấp nhận"
              ) : (
                "Từ chối"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
