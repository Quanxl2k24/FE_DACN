"use client";

import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/core/api/axiosClient";
import type { IApplicationStatusTimeline } from "@/features/applicationStatus/types";

export function useGetApplicationStatus(jobId: string) {
  return useQuery({
    queryKey: ["application-status", jobId] as const,
    queryFn: async () => {
      const res = await axiosClient.get<{ data: IApplicationStatusTimeline }>(
        `/jobs/${jobId}/application-status`,
      );
      return res.data.data;
    },
    enabled: Boolean(jobId),
    // 404 nghĩa là "chưa ứng tuyển vào tin này" — không phải lỗi tạm thời, retry vô nghĩa.
    retry: false,
  });
}
