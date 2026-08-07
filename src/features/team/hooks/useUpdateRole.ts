"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosClient from "@/core/api/axiosClient";
import { IApiResponse } from "@/features/auth/types";
import type { IRole, IUpdateRolePayload } from "@/features/team/types";
import { teamRolesQueryKey } from "@/features/team/hooks/queryKeys";

interface IUpdateRoleArgs {
  companyId: string;
  roleId: string;
  payload: IUpdateRolePayload;
}

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ companyId, roleId, payload }: IUpdateRoleArgs) => {
      const res = await axiosClient.patch<IApiResponse<IRole>>(
        `/company/${companyId}/update-roles/${roleId}`,
        payload,
      );
      return res.data.data;
    },
    onSuccess: (_data, { companyId }) => {
      toast.success("Cập nhật chức danh thành công");
      queryClient.invalidateQueries({ queryKey: teamRolesQueryKey(companyId) });
    },
    onError: () => {
      toast.error("Cập nhật chức danh thất bại, vui lòng thử lại.");
    },
  });
}
