"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { axiosClient } from "@/core/api/axiosClient";
import { useAuthStore } from "@/store/useAuthStore";
import type { IApiResponse, IUser, IVerifyOtpPayload } from "@/features/auth/types";

interface UseVerifyOtpOptions {
  /** OTP sai/hết hạn -> quay lại màn đăng nhập để nhập lại từ đầu. */
  onVerifyFailed: () => void;
}

export function useVerifyOtp({ onVerifyFailed }: UseVerifyOtpOptions) {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (payload: IVerifyOtpPayload) => {
      // Response của verify-otp chỉ trả { id, email } rút gọn, nên sau khi
      // Cookie phiên đăng nhập được set, gọi lại /user/profile để lấy đủ
      // thông tin user (fullName, type...) giống luồng bootstrap session.
      await axiosClient.post("/auth/verify-otp", payload);
      const profileResponse = await axiosClient.get<IApiResponse<IUser>>(
        "/user/profile"
      );
      return profileResponse.data.data;
    },
    onSuccess: (user) => {
      setAuth(user);
      toast.success("Đăng nhập thành công");
      // Luôn về landing page sau khi đăng nhập; chuyển sang khu vực quản lý
      // theo role là hành động chủ động của user (nút "Trang quản lý" ở navbar).
      router.push("/");
    },
    onError: () => {
      toast.error("Đăng nhập thất bại, vui lòng thử lại.");
      onVerifyFailed();
    },
  });
}
