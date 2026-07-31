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
  ILoginPayload,
  ILoginResult,
} from "@/features/auth/types";

export function useLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (payload: ILoginPayload) => {
      // accessToken/refreshToken được BE set qua Set-Cookie, response body
      // chỉ chứa thông tin user.
      const response = await axiosClient.post<IApiResponse<ILoginResult>>(
        "/auth/login",
        payload
      );
      return response.data.data;
    },
    onSuccess: ({ user }) => {
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
