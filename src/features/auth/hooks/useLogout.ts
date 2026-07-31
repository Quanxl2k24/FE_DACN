"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { axiosClient } from "@/core/api/axiosClient";
import { useAuthStore } from "@/store/useAuthStore";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  // Logout phải "thành công" ở phía client dù API lỗi (mất mạng, token đã
  // hết hạn sẵn...) — người dùng luôn phải thoát được khỏi phiên hiện tại.
  const cleanup = () => {
    clearAuth();
    queryClient.clear();
    router.push("/login");
  };

  return useMutation({
    mutationFn: () => axiosClient.post("/auth/logout"),
    onSuccess: cleanup,
    onError: cleanup,
  });
}
