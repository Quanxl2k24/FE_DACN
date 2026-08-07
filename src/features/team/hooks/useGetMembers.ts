import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/core/api/axiosClient";
import { IApiResponse } from "@/features/auth/types";
import { ITeamMember } from "@/features/team/types";
import { teamMembersQueryKey } from "@/features/team/hooks/queryKeys";

export function useGetMembers(companyId: string | undefined) {
  return useQuery({
    queryKey: teamMembersQueryKey(companyId ?? ""),
    queryFn: async () => {
      const res = await axiosClient.get<IApiResponse<ITeamMember[]>>(
        `/company/${companyId}/get-member`,
      );
      return res.data.data;
    },
    enabled: Boolean(companyId),
  });
}
