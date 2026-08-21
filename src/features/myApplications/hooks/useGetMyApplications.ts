"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import axiosClient from "@/core/api/axiosClient";
import { myApplicationsQueryKey } from "@/features/myApplications/hooks/queryKeys";
import type {
  IMyApplicationFilters,
  IMyApplicationItem,
  IPaginatedResponse,
} from "@/features/myApplications/types";

export function useGetMyApplications(filters: IMyApplicationFilters = {}) {
  return useInfiniteQuery({
    queryKey: myApplicationsQueryKey(filters),
    queryFn: async ({ pageParam }: { pageParam: string | undefined }) => {
      const res = await axiosClient.get<IPaginatedResponse<IMyApplicationItem>>(
        "/jobs/applications/me",
        { params: { ...filters, cursor: pageParam } },
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
