import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/core/api/axiosClient";
import type { IJobCategory } from "@/features/jobs/types";
import { JOB_CATEGORIES_QUERY_KEY } from "@/features/jobs/hooks/queryKeys";

/**
 * GET /job-categories yêu cầu có accessToken hợp lệ (AccessTokenGuard) dù
 * không giới hạn role — khách chưa đăng nhập sẽ nhận 401. `enabled` mặc định
 * true cho các trang đã nằm sau AuthGuard/RoleGuard; nơi nào dùng ở public
 * landing page (có cả khách vãng lai) phải tự truyền `enabled: isAuthenticated`.
 */
export function useGetJobCategories(enabled: boolean = true) {
  return useQuery({
    queryKey: JOB_CATEGORIES_QUERY_KEY,
    queryFn: async () => {
      const res = await axiosClient.get<{ data: IJobCategory[]; message: string }>(
        "/job-categories",
      );
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000, // Danh mục ngành nghề gần như tĩnh, không cần refetch liên tục.
    enabled,
  });
}
