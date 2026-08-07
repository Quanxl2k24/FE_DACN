import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/core/api/axiosClient";
import { IApiResponse } from "@/features/auth/types";
import { IRole } from "@/features/team/types";
import { teamRolesQueryKey } from "@/features/team/hooks/queryKeys";

export function useGetRoles(companyId: string | undefined) {
  return useQuery({
    queryKey: teamRolesQueryKey(companyId ?? ""),
    queryFn: async () => {
      const res = await axiosClient.get<IApiResponse<IRole[]>>(
        `/company/${companyId}/list-roles`,
      );
      return res.data.data;
    },
    enabled: Boolean(companyId),
  });
}
