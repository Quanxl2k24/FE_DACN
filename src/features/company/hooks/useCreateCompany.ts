"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosClient from "@/core/api/axiosClient";
import type { ICompany, ICreateCompanyPayload } from "@/features/company/types";
import { COMPANY_QUERY_KEY } from "@/features/company/hooks/useGetCompanyProfile";

export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ICreateCompanyPayload) => {
      const res = await axiosClient.post<ICompany>(
        "/company/create-company",
        payload,
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Tạo công ty thành công");
      queryClient.invalidateQueries({ queryKey: COMPANY_QUERY_KEY });
    },
    onError: () => {
      toast.error("Tạo công ty thất bại, vui lòng thử lại.");
    },
  });
}
