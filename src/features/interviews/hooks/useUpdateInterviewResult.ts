"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import axiosClient from "@/core/api/axiosClient";
import type { IApiResponse } from "@/features/auth/types";
import { interviewsBaseQueryKey } from "@/features/interviews/hooks/queryKeys";
import { candidatesBaseQueryKey } from "@/features/applications/hooks/queryKeys";
import type { InterviewResultInput } from "@/features/interviews/types";

interface IUpdateInterviewResultArgs {
  companyId: string;
  interviewId: string;
  result: InterviewResultInput;
}

export function useUpdateInterviewResult() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ companyId, interviewId, result }: IUpdateInterviewResultArgs) => {
      const res = await axiosClient.patch<IApiResponse<unknown>>(
        `/candidates/manage/${companyId}/interviews/${interviewId}/result`,
        { result },
      );
      return res.data.data;
    },
    onSuccess: (_data, { companyId }) => {
      toast.success("Đã cập nhật kết quả phỏng vấn");
      // Kết quả phỏng vấn kéo theo đổi trạng thái đơn ứng tuyển (OFFERED/REJECTED)
      // nên phải làm mới cả 2 danh sách để trang xem lại ứng viên thấy đúng trạng thái.
      queryClient.invalidateQueries({ queryKey: interviewsBaseQueryKey(companyId) });
      queryClient.invalidateQueries({ queryKey: candidatesBaseQueryKey(companyId) });
    },
    onError: (error: AxiosError<IApiResponse>) => {
      const message =
        error.response?.data?.message ?? "Cập nhật kết quả thất bại, vui lòng thử lại.";
      toast.error(message);
    },
  });
}
