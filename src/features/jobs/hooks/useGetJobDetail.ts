import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/core/api/axiosClient";
import type { IJob } from "@/features/jobs/types";
import { jobDetailQueryKey } from "@/features/jobs/hooks/queryKeys";

export function useGetJobDetail(jobId: string | undefined, enabled: boolean) {
  return useQuery({
    queryKey: jobDetailQueryKey(jobId ?? ""),
    queryFn: async () => {
      const res = await axiosClient.get<{ data: IJob }>(
        `/jobs/jobdetail/${jobId}`,
      );
      return res.data.data;
    },
    enabled: Boolean(jobId) && enabled,
  });
}
