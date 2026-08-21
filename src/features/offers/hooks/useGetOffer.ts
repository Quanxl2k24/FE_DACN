"use client";

import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/core/api/axiosClient";
import type { IApiResponse } from "@/features/auth/types";
import { offerQueryKey } from "@/features/offers/hooks/queryKeys";
import type { IOffer } from "@/features/offers/types";

export function useGetOffer(
  companyId: string | undefined,
  applicationId: string | undefined,
  enabled = true,
) {
  return useQuery({
    queryKey: offerQueryKey(companyId ?? "", applicationId ?? ""),
    queryFn: async () => {
      const res = await axiosClient.get<IApiResponse<IOffer | null>>(
        `/candidates/manage/${companyId}/${applicationId}/offer`,
      );
      return res.data.data;
    },
    enabled: enabled && Boolean(companyId) && Boolean(applicationId),
  });
}
