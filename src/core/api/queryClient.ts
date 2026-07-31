import { QueryClient } from "@tanstack/react-query";

/**
 * Singleton QueryClient dùng chung cho toàn bộ app.
 * Cần export riêng (thay vì chỉ lấy qua useQueryClient()) vì axiosClient's
 * response interceptor chạy ngoài React tree (không thể gọi hook) nhưng vẫn
 * phải gọi được `queryClient.clear()` khi phiên đăng nhập hết hạn.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});
