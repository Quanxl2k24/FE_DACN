"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import axiosClient from "@/core/api/axiosClient";
import type { IPaginatedResponse } from "@/features/jobs/types";
import type { IJobReport } from "@/features/admin/jobReports/types";
import { JOB_REPORTS_QUERY_KEY } from "@/features/admin/jobReports/hooks/queryKeys";

/** GET /job-reports (ADMIN) — cursor pagination, sắp theo createdAt giảm dần. */
export function useGetJobReports() {
  return useInfiniteQuery({
    queryKey: JOB_REPORTS_QUERY_KEY,
    queryFn: async ({ pageParam }: { pageParam: string | undefined }) => {
      const res = await axiosClient.get<IPaginatedResponse<IJobReport>>(
        "/job-reports",
        { params: { cursor: pageParam, take: 20 } },
      );
      return res.data;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasMore
        ? (lastPage.pagination.nextCursor ?? undefined)
        : undefined,
  });
}
