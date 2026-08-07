"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosClient from "@/core/api/axiosClient";
import { IApiResponse } from "@/features/auth/types";
import type { ICreateRolePayload, IRole } from "@/features/team/types";
import { teamRolesQueryKey } from "@/features/team/hooks/queryKeys";

interface ICreateRoleArgs {
  companyId: string;
  payload: ICreateRolePayload;
}

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ companyId, payload }: ICreateRoleArgs) => {
      const res = await axiosClient.post<IApiResponse<IRole>>(
        `/company/${companyId}/roles`,
        payload,
      );
      return res.data.data;
    },
    onSuccess: (_data, { companyId }) => {
      toast.success("Tạo chức danh thành công");
      queryClient.invalidateQueries({ queryKey: teamRolesQueryKey(companyId) });
    },
    onError: () => {
      toast.error("Tạo chức danh thất bại, vui lòng thử lại.");
    },
  });
}
