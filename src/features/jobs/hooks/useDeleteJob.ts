"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosClient from "@/core/api/axiosClient";
import { jobsBaseQueryKey } from "@/features/jobs/hooks/queryKeys";

interface IDeleteJobArgs {
  id: string;
  /** Không gửi lên API, chỉ dùng để invalidate đúng cache danh sách job. */
  companyId: string;
}

export function useDeleteJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: IDeleteJobArgs) => {
      await axiosClient.delete(`/jobs/${id}`);
    },
    onSuccess: (_data, { companyId }) => {
      toast.success("Đã xóa tin tuyển dụng");
      queryClient.invalidateQueries({ queryKey: jobsBaseQueryKey(companyId) });
    },
    onError: () => {
      toast.error("Xóa tin tuyển dụng thất bại, vui lòng thử lại.");
    },
  });
}
