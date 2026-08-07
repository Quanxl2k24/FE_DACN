"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosClient from "@/core/api/axiosClient";
import { teamRolesQueryKey } from "@/features/team/hooks/queryKeys";

interface IDeleteRoleArgs {
  companyId: string;
  roleId: string;
}

export function useDeleteRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ companyId, roleId }: IDeleteRoleArgs) => {
      await axiosClient.delete(`/company/${companyId}/delete-roles/${roleId}`);
    },
    onSuccess: (_data, { companyId }) => {
      toast.success("Đã xóa chức danh");
      queryClient.invalidateQueries({ queryKey: teamRolesQueryKey(companyId) });
    },
    onError: () => {
      toast.error("Xóa chức danh thất bại, vui lòng thử lại.");
    },
  });
}
