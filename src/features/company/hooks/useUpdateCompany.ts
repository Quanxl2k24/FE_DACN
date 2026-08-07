"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosClient from "@/core/api/axiosClient";
import type { ICompany, IUpdateCompanyPayload } from "@/features/company/types";
import { COMPANY_QUERY_KEY } from "@/features/company/hooks/useGetCompanyProfile";

interface IUpdateCompanyArgs {
  id: string;
  payload: IUpdateCompanyPayload;
}

export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: IUpdateCompanyArgs) => {
      const res = await axiosClient.patch<ICompany>(
        `/company/update-company/${id}`,
        payload,
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Đã lưu hồ sơ công ty");
      queryClient.invalidateQueries({ queryKey: COMPANY_QUERY_KEY });
    },
    onError: () => {
      toast.error("Lưu hồ sơ công ty thất bại, vui lòng thử lại.");
    },
  });
}
