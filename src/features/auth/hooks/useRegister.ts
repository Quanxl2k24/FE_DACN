"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { axiosClient } from "@/core/api/axiosClient";
import type {
  IApiResponse,
  IRegisterPayload,
  IRegisterResult,
} from "@/features/auth/types";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: IRegisterPayload) => {
      const response = await axiosClient.post<IApiResponse<IRegisterResult>>(
        "/auth/register",
        payload
      );
      return response.data.data;
    },
    onSuccess: () => {
      toast.success("Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.");
      router.push("/login");
    },
    onError: (error: AxiosError<IApiResponse>) => {
      const message =
        error.response?.data?.message ?? "Đăng ký thất bại, vui lòng thử lại.";
      toast.error(message);
    },
  });
}
