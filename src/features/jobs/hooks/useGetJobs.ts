import { useInfiniteQuery } from "@tanstack/react-query";
import axiosClient from "@/core/api/axiosClient";
import type { IJobFilters, IJobListItem, IPaginatedResponse } from "@/features/jobs/types";
import { jobsQueryKey } from "@/features/jobs/hooks/queryKeys";

export function useGetJobs(
  companyId: string | undefined,
  filters: IJobFilters = {},
) {
  return useInfiniteQuery({
    queryKey: jobsQueryKey(companyId ?? "", filters),
    queryFn: async ({ pageParam }: { pageParam: string | undefined }) => {
      const res = await axiosClient.get<IPaginatedResponse<IJobListItem>>(
        `/jobs/manage/${companyId}`,
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
