import { useInfiniteQuery } from "@tanstack/react-query";
import axiosClient from "@/core/api/axiosClient";
import type {
  ICandidate,
  ICandidateFilters,
  IPaginatedResponse,
} from "@/features/applications/types";
import { candidatesQueryKey } from "@/features/applications/hooks/queryKeys";

export function useGetCandidates(
  companyId: string | undefined,
  filters: ICandidateFilters = {},
) {
  return useInfiniteQuery({
    queryKey: candidatesQueryKey(companyId ?? "", filters),
    queryFn: async ({ pageParam }: { pageParam: string | undefined }) => {
      const res = await axiosClient.get<IPaginatedResponse<ICandidate>>(
        `/candidates/manage/${companyId}`,
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
