import type { OfferStatus } from "@/features/offers/types";

export const OFFER_STATUS_LABEL: Record<OfferStatus, string> = {
  PENDING: "Chờ phản hồi",
  ACCEPTED: "Đã chấp nhận",
  DECLINED: "Đã từ chối",
};

export const OFFER_STATUS_BADGE_CLASS: Record<OfferStatus, string> = {
  PENDING: "border-transparent bg-warning/10 text-warning",
  ACCEPTED: "border-transparent bg-success/10 text-success",
  DECLINED: "border-transparent bg-destructive/10 text-destructive",
};
