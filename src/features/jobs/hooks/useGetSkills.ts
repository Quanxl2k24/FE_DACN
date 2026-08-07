import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/core/api/axiosClient";
import type { ISkill } from "@/features/jobs/types";

export const SKILLS_QUERY_KEY = ["skills", "list"] as const;

export function useGetSkills() {
  return useQuery({
    queryKey: SKILLS_QUERY_KEY,
    queryFn: async () => {
      const res = await axiosClient.get<{ data: ISkill[]; message: string }>(
        "/skills/list-skill",
      );
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000, // Danh mục skill gần như tĩnh, không cần refetch liên tục.
  });
}
