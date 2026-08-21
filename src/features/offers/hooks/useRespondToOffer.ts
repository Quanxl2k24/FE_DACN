"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import axiosClient from "@/core/api/axiosClient";
import type { IApiResponse } from "@/features/auth/types";
import type { OfferDecision } from "@/features/offers/types";

interface IRespondToOfferArgs {
  jobId: string;
  decision: OfferDecision;
}

export function useRespondToOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ jobId, decision }: IRespondToOfferArgs) => {
      const res = await axiosClient.patch<IApiResponse<unknown>>(
        `/jobs/${jobId}/offer/respond`,
        { decision },
      );
      return res.data.data;
    },
    onSuccess: (_data, { jobId }) => {
      toast.success("Đã ghi nhận phản hồi của bạn");
      queryClient.invalidateQueries({ queryKey: ["application-status", jobId] });
    },
    onError: (error: AxiosError<IApiResponse>) => {
      const message =
        error.response?.data?.message ?? "Gửi phản hồi thất bại, vui lòng thử lại.";
      toast.error(message);
    },
  });
}
