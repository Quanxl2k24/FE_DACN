"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { axiosClient } from "@/core/api/axiosClient";
import { useAuthStore } from "@/store/useAuthStore";
import { ROLE_HOME_PATH } from "@/features/auth/constants";
import type {
  IApiResponse,
  ILoginApiResponse,
  ILoginPayload,
  IOtpChallenge,
} from "@/features/auth/types";

interface UseLoginOptions {
  /** Tài khoản bật MFA -> BE yêu cầu xác thực OTP trước khi đăng nhập hẳn. */
  onOtpRequired: (challenge: IOtpChallenge) => void;
}

export function useLogin({ onOtpRequired }: UseLoginOptions) {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (payload: ILoginPayload) => {
      // accessToken/refreshToken được BE set qua Set-Cookie, response body
      // chỉ chứa thông tin user (hoặc challenge OTP nếu tài khoản bật MFA).
      const response = await axiosClient.post<ILoginApiResponse>(
        "/auth/login",
        payload
      );
      return response.data;
    },
    onSuccess: (result) => {
      if (result.isVerify) {
        onOtpRequired(result.data);
        return;
      }
      const { user } = result.data;
      setAuth(user);
      toast.success("Đăng nhập thành công");
      router.push(ROLE_HOME_PATH[user.type]);
    },
    onError: (error: AxiosError<IApiResponse>) => {
      const message =
        error.response?.data?.message ?? "Đăng nhập thất bại, vui lòng thử lại.";
      toast.error(message);
    },
  });
}
