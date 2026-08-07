"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosClient from "@/core/api/axiosClient";
import { IApiResponse } from "@/features/auth/types";
import type { IInvitationResult, IInviteMemberPayload } from "@/features/team/types";
import { teamMembersQueryKey } from "@/features/team/hooks/queryKeys";

interface IInviteMemberArgs {
  companyId: string;
  payload: IInviteMemberPayload;
}

export function useInviteMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ companyId, payload }: IInviteMemberArgs) => {
      const res = await axiosClient.post<IApiResponse<IInvitationResult>>(
        `/company/${companyId}/invitations`,
        payload,
      );
      return res.data.data;
    },
    onSuccess: (_data, { companyId }) => {
      toast.success("Đã gửi lời mời tham gia công ty");
      queryClient.invalidateQueries({ queryKey: teamMembersQueryKey(companyId) });
    },
    onError: () => {
      toast.error("Mời thành viên thất bại, vui lòng thử lại.");
    },
  });
}
