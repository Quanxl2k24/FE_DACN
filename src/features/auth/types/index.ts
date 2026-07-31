/**
 * Enum `type` của User theo AGENTS.md, dùng làm cơ sở cho RBAC.
 */
export type UserType = "APPLICANT" | "RECRUITER" | "ADMIN";

export interface IUser {
  id: string;
  email: string;
  fullName: string;
  type: UserType;
  avatarUrl?: string | null;
}

/**
 * Format response chuẩn của Backend (NestJS). Token KHÔNG nằm trong `data`,
 * chúng được BE set qua Set-Cookie (accessToken, refreshToken, deviceId).
 */
export interface IApiResponse<T = unknown> {
  data: T;
  message: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
  /** "Ghi nhớ đăng nhập" — BE có thể dùng để quyết định thời hạn refreshToken cookie. */
}

export interface ILoginResult {
  user: IUser;
}

/** Role có thể tự đăng ký. `ADMIN` chỉ được tạo nội bộ, không qua form này. */
export type RegisterRole = Exclude<UserType, "ADMIN">;

export interface IRegisterPayload {
  fullName: string;
  email: string;
  username: string;
  password: string;
  type: RegisterRole;
  /** Bắt buộc khi `type` là `RECRUITER`. */
  companyName?: string;
}

export interface IRegisterResult {
  user: IUser;
}
