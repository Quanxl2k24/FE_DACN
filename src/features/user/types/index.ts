import type { UserType } from "@/features/auth/types";

/** Response thật của BE cho GET /user/profile (BE chưa trả `phone`). */
export interface IProfile {
  id: string;
  fullName: string | null;
  email: string;
  type: UserType;
  mfaEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

/** BE (`UpdateUserReqDTO`) chỉ chấp nhận 2 field này. */
export interface IUpdateProfilePayload {
  fullName?: string;
  phone?: string;
}

export interface IUpdateProfileResult {
  id: string;
  fullName: string | null;
  phone: string | null;
  email: string;
  type: UserType;
}
