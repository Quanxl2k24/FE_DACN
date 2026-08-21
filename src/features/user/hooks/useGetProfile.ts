"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/core/api/axiosClient";
import type { IApiResponse } from "@/features/auth/types";
import type { IProfile } from "@/features/user/types";

export const PROFILE_QUERY_KEY = ["user", "profile"] as const;

export function useGetProfile() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: async () => {
      const response = await axiosClient.get<IApiResponse<IProfile>>(
        "/user/profile"
      );
      return response.data.data;
    },
  });
}
