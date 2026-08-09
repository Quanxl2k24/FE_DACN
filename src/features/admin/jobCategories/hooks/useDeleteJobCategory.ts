"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import axiosClient from "@/core/api/axiosClient";
import type { IApiResponse } from "@/features/auth/types";
import { JOB_CATEGORIES_QUERY_KEY } from "@/features/jobs/hooks/queryKeys";

/** Xoá mềm — BE chỉ set active = false, dữ liệu vẫn còn trong DB. */
export function useDeleteJobCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await axiosClient.delete(`/job-categories/${id}`);
    },
    onSuccess: () => {
      toast.success("Xoá danh mục ngành nghề thành công");
      queryClient.invalidateQueries({ queryKey: JOB_CATEGORIES_QUERY_KEY });
    },
    onError: (error: AxiosError<IApiResponse>) => {
      const message =
        error.response?.data?.message ?? "Xoá danh mục thất bại, vui lòng thử lại.";
      toast.error(message);
    },
  });
}
