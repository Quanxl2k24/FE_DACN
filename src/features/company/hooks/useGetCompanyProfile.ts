import axiosClient from "@/core/api/axiosClient";
import { IApiResponse } from "@/features/auth/types";
import { useQuery } from "@tanstack/react-query";
import { ICompany } from "../types";

export const COMPANY_QUERY_KEY = ["company"] as const;

export function useGetCompany() {
    return useQuery({
        queryKey: COMPANY_QUERY_KEY,
        queryFn: async () => {
            const res = await axiosClient.get<IApiResponse<ICompany[] | null>>("/company/info");
            // return res.data.data; // interceptor bóc envelope ngoài → payload nằm ở .data
            return res.data.data;
        },
    });
}