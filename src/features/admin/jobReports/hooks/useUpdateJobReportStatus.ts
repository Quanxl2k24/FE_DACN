"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import axiosClient from "@/core/api/axiosClient";
import type { IApiResponse } from "@/features/auth/types";
import { JOB_REPORTS_QUERY_KEY } from "@/features/admin/jobReports/hooks/queryKeys";
import type { IUpdateJobReportStatusPayload } from "@/features/admin/jobReports/types";

interface IUpdateJobReportStatusArgs {
  id: string;
  payload: IUpdateJobReportStatusPayload;
}

export function useUpdateJobReportStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: IUpdateJobReportStatusArgs) => {
      // BE trả `data: null`, không có gì để bóc — chỉ cần biết request thành công.
      await axiosClient.patch(`/job-reports/${id}`, payload);
    },
    onSuccess: (_data, { payload }) => {
      toast.success(
        payload.status === "RESOLVED"
          ? "Đã duyệt báo cáo — tin tuyển dụng liên quan đã bị tạm khóa"
          : "Đã cập nhật báo cáo",
      );
      queryClient.invalidateQueries({ queryKey: JOB_REPORTS_QUERY_KEY });
    },
    onError: (error: AxiosError<IApiResponse>) => {
      const message =
        error.response?.data?.message ?? "Cập nhật báo cáo thất bại, vui lòng thử lại.";
      toast.error(message);
    },
  });
}
