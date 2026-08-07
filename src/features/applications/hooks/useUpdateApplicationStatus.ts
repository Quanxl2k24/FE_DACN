"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import axiosClient from "@/core/api/axiosClient";
import type { IApiResponse } from "@/features/auth/types";
import { candidatesBaseQueryKey } from "@/features/applications/hooks/queryKeys";
import type {
  ICandidate,
  IUpdateApplicationStatusPayload,
} from "@/features/applications/types";

interface IUpdateApplicationStatusArgs {
  companyId: string;
  applicationId: string;
  payload: IUpdateApplicationStatusPayload;
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ companyId, applicationId, payload }: IUpdateApplicationStatusArgs) => {
      const res = await axiosClient.patch<IApiResponse<ICandidate>>(
        `/candidates/manage/${companyId}/${applicationId}/status`,
        payload,
      );
      return res.data.data;
    },
    onSuccess: (_data, { companyId }) => {
      toast.success("Cập nhật trạng thái thành công");
      queryClient.invalidateQueries({ queryKey: candidatesBaseQueryKey(companyId) });
    },
    onError: (error: AxiosError<IApiResponse>) => {
      const message =
        error.response?.data?.message ?? "Cập nhật trạng thái thất bại, vui lòng thử lại.";
      toast.error(message);
    },
  });
}
