"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosClient from "@/core/api/axiosClient";
import { IApiResponse } from "@/features/auth/types";
import type { IJob, IUpdateJobPayload } from "@/features/jobs/types";
import { jobsBaseQueryKey } from "@/features/jobs/hooks/queryKeys";

interface IUpdateJobArgs {
  id: string;
  payload: IUpdateJobPayload;
}

export function useUpdateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: IUpdateJobArgs) => {
      const res = await axiosClient.patch<IApiResponse<IJob>>(
        `/jobs/${id}`,
        payload,
      );
      return res.data.data;
    },
    onSuccess: (job) => {
      toast.success("Cập nhật tin tuyển dụng thành công");
      queryClient.invalidateQueries({
        queryKey: jobsBaseQueryKey(job.companyId),
      });
    },
    onError: () => {
      toast.error("Cập nhật tin tuyển dụng thất bại, vui lòng thử lại.");
    },
  });
}
