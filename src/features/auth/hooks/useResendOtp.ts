"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { axiosClient } from "@/core/api/axiosClient";
import type { IApiResponse } from "@/features/auth/types";

interface IResendOtpPayload {
  pendingVerificationId: string;
}

export function useResendOtp() {
  return useMutation({
    mutationFn: (payload: IResendOtpPayload) =>
      axiosClient.post("/auth/resend-otp", payload),
    onSuccess: () => {
      toast.success("Đã gửi lại mã OTP, vui lòng kiểm tra.");
    },
    onError: (error: AxiosError<IApiResponse>) => {
      const message =
        error.response?.data?.message ??
        "Gửi lại mã OTP thất bại, vui lòng thử lại.";
      toast.error(message);
    },
  });
}
