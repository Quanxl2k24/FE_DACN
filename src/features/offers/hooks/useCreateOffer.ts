"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import axiosClient from "@/core/api/axiosClient";
import type { IApiResponse } from "@/features/auth/types";
import { candidatesBaseQueryKey } from "@/features/applications/hooks/queryKeys";
import { offerQueryKey } from "@/features/offers/hooks/queryKeys";
import type { ICreateOfferPayload, IOffer } from "@/features/offers/types";

interface ICreateOfferArgs {
  companyId: string;
  applicationId: string;
  payload: ICreateOfferPayload;
}

export function useCreateOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ companyId, applicationId, payload }: ICreateOfferArgs) => {
      const res = await axiosClient.put<IApiResponse<IOffer>>(
        `/candidates/manage/${companyId}/${applicationId}/offer`,
        payload,
      );
      return res.data.data;
    },
    onSuccess: (_data, { companyId, applicationId }) => {
      toast.success("Gửi lời mời thành công");
      queryClient.invalidateQueries({ queryKey: offerQueryKey(companyId, applicationId) });
      queryClient.invalidateQueries({ queryKey: candidatesBaseQueryKey(companyId) });
    },
    onError: (error: AxiosError<IApiResponse>) => {
      const message =
        error.response?.data?.message ?? "Gửi lời mời thất bại, vui lòng thử lại.";
      toast.error(message);
    },
  });
}
