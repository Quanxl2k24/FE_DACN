"use client";

import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/core/api/axiosClient";
import type { IApiResponse } from "@/features/auth/types";
import { dashboardStatsQueryKey } from "@/features/dashboard/hooks/queryKeys";
import type { IRecruitmentDashboardStats } from "@/features/dashboard/types";

export function useGetDashboardStats(companyId: string | undefined) {
  return useQuery({
    queryKey: dashboardStatsQueryKey(companyId ?? ""),
    queryFn: async () => {
      const res = await axiosClient.get<IApiResponse<IRecruitmentDashboardStats>>(
        `/candidates/manage/${companyId}/dashboard`,
      );
      return res.data.data;
    },
    enabled: Boolean(companyId),
  });
}
