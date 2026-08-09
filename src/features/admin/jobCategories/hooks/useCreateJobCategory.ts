"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosClient from "@/core/api/axiosClient";
import type { AxiosError } from "axios";
import type { IApiResponse } from "@/features/auth/types";
import { JOB_CATEGORIES_QUERY_KEY } from "@/features/jobs/hooks/queryKeys";
import type { ICreateJobCategoryPayload, IJobCategory } from "@/features/jobs/types";

export function useCreateJobCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ICreateJobCategoryPayload) => {
      const res = await axiosClient.post<IApiResponse<IJobCategory>>(
        "/job-categories",
        payload,
      );
      return res.data.data;
    },
    onSuccess: () => {
      toast.success("Tạo danh mục ngành nghề thành công");
      queryClient.invalidateQueries({ queryKey: JOB_CATEGORIES_QUERY_KEY });
    },
    onError: (error: AxiosError<IApiResponse>) => {
      const message =
        error.response?.data?.message ?? "Tạo danh mục thất bại, vui lòng thử lại.";
      toast.error(message);
    },
  });
}
