import { useInfiniteQuery } from "@tanstack/react-query";
import axiosClient from "@/core/api/axiosClient";
import type {
  IPaginatedResponse,
  IPublicJobFilters,
  IPublicJobListItem,
} from "@/features/jobs/types";
import { publicJobsQueryKey } from "@/features/jobs/hooks/queryKeys";

/** GET /jobs (public, không cần đăng nhập) — luôn chỉ trả tin PUBLISHED còn hạn. */
export function useGetPublicJobs(filters: IPublicJobFilters = {}) {
  return useInfiniteQuery({
    queryKey: publicJobsQueryKey(filters),
    queryFn: async ({ pageParam }: { pageParam: string | undefined }) => {
      const res = await axiosClient.get<IPaginatedResponse<IPublicJobListItem>>(
        "/jobs",
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
