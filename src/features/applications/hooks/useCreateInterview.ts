"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import axiosClient from "@/core/api/axiosClient";
import type { IApiResponse } from "@/features/auth/types";
import { candidatesBaseQueryKey } from "@/features/applications/hooks/queryKeys";
import type { ICreateInterviewPayload, IInterview } from "@/features/applications/types";
import { interviewsBaseQueryKey } from "@/features/interviews/hooks/queryKeys";

interface ICreateInterviewArgs {
  companyId: string;
  payload: ICreateInterviewPayload;
}

export function useCreateInterview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ companyId, payload }: ICreateInterviewArgs) => {
      const res = await axiosClient.post<IApiResponse<IInterview>>(
        `/candidates/manage/${companyId}/interviews`,
        payload,
      );
      return res.data.data;
    },
    onSuccess: (_data, { companyId }) => {
      toast.success("Đặt lịch phỏng vấn thành công");
      // Đặt lịch phỏng vấn tự động chuyển status đơn sang INTERVIEW ở BE.
      queryClient.invalidateQueries({ queryKey: candidatesBaseQueryKey(companyId) });
      queryClient.invalidateQueries({ queryKey: interviewsBaseQueryKey(companyId) });
    },
    onError: (error: AxiosError<IApiResponse>) => {
      const message =
        error.response?.data?.message ?? "Đặt lịch phỏng vấn thất bại, vui lòng thử lại.";
      toast.error(message);
    },
  });
}
