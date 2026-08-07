"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import axiosClient from "@/core/api/axiosClient";
import type {
  IInterviewFilters,
  IInterviewListItem,
  IPaginatedResponse,
} from "@/features/interviews/types";
import { interviewsQueryKey } from "@/features/interviews/hooks/queryKeys";

export function useGetInterviews(
  companyId: string | undefined,
  filters: IInterviewFilters = {},
) {
  return useInfiniteQuery({
    queryKey: interviewsQueryKey(companyId ?? "", filters),
    queryFn: async ({ pageParam }: { pageParam: string | undefined }) => {
      const res = await axiosClient.get<IPaginatedResponse<IInterviewListItem>>(
        `/candidates/manage/${companyId}/interviews`,
        { params: { ...filters, cursor: pageParam } },
      );
      return res.data;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasMore
        ? (lastPage.pagination.nextCursor ?? undefined)
        : undefined,
    enabled: Boolean(companyId),
  });
}
