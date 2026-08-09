"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import axiosClient from "@/core/api/axiosClient";
import type { IApiResponse } from "@/features/auth/types";
import { JOB_CATEGORIES_QUERY_KEY } from "@/features/jobs/hooks/queryKeys";
import type { IJobCategory, IUpdateJobCategoryPayload } from "@/features/jobs/types";

interface IUpdateJobCategoryArgs {
  id: number;
  payload: IUpdateJobCategoryPayload;
}

export function useUpdateJobCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: IUpdateJobCategoryArgs) => {
      const res = await axiosClient.patch<IApiResponse<IJobCategory>>(
        `/job-categories/${id}`,
        payload,
      );
      return res.data.data;
    },
    onSuccess: () => {
      toast.success("Cập nhật danh mục ngành nghề thành công");
      queryClient.invalidateQueries({ queryKey: JOB_CATEGORIES_QUERY_KEY });
    },
    onError: (error: AxiosError<IApiResponse>) => {
      const message =
        error.response?.data?.message ??
        "Cập nhật danh mục thất bại, vui lòng thử lại.";
      toast.error(message);
    },
  });
}
