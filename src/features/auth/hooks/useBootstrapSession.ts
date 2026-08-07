"use client";

import { useEffect } from "react";
import { axiosClient } from "@/core/api/axiosClient";
import { useAuthStore } from "@/store/useAuthStore";
import type { IApiResponse, IUser } from "@/features/auth/types";

/**
 * Zustand chỉ sống trong memory (không lưu token/localStorage) nên sau mỗi
 * lần F5, `isAuthenticated` mất hết dù Cookie (refreshToken) vẫn còn hạn.
 * Hook này gọi `GET /auth/me` một lần khi app khởi động để hỏi lại BE
 * "ai đang đăng nhập dựa trên Cookie hiện có", rồi đồng bộ lại Zustand.
 *
 * Nếu accessToken đã hết hạn, response interceptor của axiosClient sẽ tự
 * refresh và phát lại request này trước khi trả kết quả về đây — không cần
 * xử lý refresh thủ công ở hook này.
 */
export function useBootstrapSession() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    if (isInitialized) return;

    let isMounted = true;

    axiosClient
      .get<IApiResponse<IUser>>("/user/profile")
      .then((response) => {
        if (isMounted) setAuth(response.data.data);
      })
      .catch(() => {
        if (isMounted) clearAuth();
      });

    return () => {
      isMounted = false;
    };
    // Chỉ chạy đúng 1 lần lúc mount, không phụ thuộc setAuth/clearAuth (đều
    // là action ổn định do zustand tạo ra).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isInitialized };
}
