export type OfferStatus = "PENDING" | "ACCEPTED" | "DECLINED";

/** Bản ghi Offer gắn 1-1 với 1 đơn ứng tuyển. */
export interface IOffer {
  id: string;
  applicationId: string;
  salary: number;
  startDate: string | null;
  responseDeadline: string | null;
  note: string | null;
  status: OfferStatus;
  createdBy: string;
  respondedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Body PUT /candidates/manage/:companyId/:applicationId/offer. */
export interface ICreateOfferPayload {
  salary: number;
  startDate?: string;
  responseDeadline?: string;
  note?: string;
}

export type OfferDecision = "ACCEPTED" | "DECLINED";
