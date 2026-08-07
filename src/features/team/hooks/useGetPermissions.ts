import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/core/api/axiosClient";
import { IApiResponse } from "@/features/auth/types";
import { IPermission } from "@/features/team/types";
import { PERMISSIONS_QUERY_KEY } from "@/features/team/hooks/queryKeys";

export function useGetPermissions() {
  return useQuery({
    queryKey: PERMISSIONS_QUERY_KEY,
    queryFn: async () => {
      const res = await axiosClient.get<IApiResponse<IPermission[]>>(
        "/permissons/list-permissons",
      );
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000, // Danh mục permission gần như tĩnh, không cần refetch liên tục.
  });
}
