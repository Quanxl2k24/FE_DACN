"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { axiosClient } from "@/core/api/axiosClient";
import { useAuthStore } from "@/store/useAuthStore";
import { PROFILE_QUERY_KEY } from "@/features/user/hooks/useGetProfile";
import type { IApiResponse } from "@/features/auth/types";
import type {
  IUpdateProfilePayload,
  IUpdateProfileResult,
} from "@/features/user/types";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.setAuth);
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: async (payload: IUpdateProfilePayload) => {
      const response = await axiosClient.patch<
        IApiResponse<IUpdateProfileResult>
      >("/user/update-user", payload);
      return response.data.data;
    },
    onSuccess: (result) => {
      // Đồng bộ lại tên hiển thị ở navbar (Zustand chỉ giữ id/email/fullName/type).
      if (user) {
        setAuth({ ...user, fullName: result.fullName ?? user.fullName });
      }
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
      toast.success("Cập nhật thông tin thành công");
    },
    onError: (error: AxiosError<IApiResponse>) => {
      const message =
        error.response?.data?.message ??
        "Cập nhật thông tin thất bại, vui lòng thử lại.";
      toast.error(message);
    },
  });
}
