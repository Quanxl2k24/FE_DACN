"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import axiosClient from "@/core/api/axiosClient";
import type { IApiResponse } from "@/features/auth/types";
import type {
  ICreateJobReportPayload,
  ICreateJobReportResult,
} from "@/features/jobReports/types";

export function useCreateJobReport() {
  return useMutation({
    mutationFn: async (payload: ICreateJobReportPayload) => {
      const res = await axiosClient.post<IApiResponse<ICreateJobReportResult>>(
        "/job-reports",
        payload,
      );
      return res.data.data;
    },
    onSuccess: () => {
      toast.success("Đã gửi báo cáo. Cảm ơn bạn đã phản hồi để cải thiện chất lượng tin đăng!");
    },
    onError: (error: AxiosError<IApiResponse>) => {
      // BE trả 409 kèm message "Bạn đã báo cáo tin tuyển dụng này rồi" khi báo cáo trùng.
      const message =
        error.response?.data?.message ?? "Gửi báo cáo thất bại, vui lòng thử lại.";
      toast.error(message);
    },
  });
}
