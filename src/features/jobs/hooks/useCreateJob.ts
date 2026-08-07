"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosClient from "@/core/api/axiosClient";
import { IApiResponse } from "@/features/auth/types";
import type { ICreateJobPayload, IJob } from "@/features/jobs/types";
import { jobsBaseQueryKey } from "@/features/jobs/hooks/queryKeys";

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ICreateJobPayload) => {
      const res = await axiosClient.post<IApiResponse<IJob>>(
        "/jobs",
        payload,
      );
      return res.data.data;
    },
    onSuccess: (job) => {
      toast.success("Tạo tin tuyển dụng thành công");
      queryClient.invalidateQueries({
        queryKey: jobsBaseQueryKey(job.companyId),
      });
    },
    onError: () => {
      toast.error("Tạo tin tuyển dụng thất bại, vui lòng thử lại.");
    },
  });
}
