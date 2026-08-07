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

/**
 * Khi tài khoản bật MFA, `/auth/login` không trả `user` ngay mà trả về một
 * challenge yêu cầu xác thực OTP trước (xem `/auth/verify-otp`).
 */
export interface IOtpChallenge {
  pendingVerificationId: string;
}

export type ILoginApiResponse =
  | { isVerify?: false; data: ILoginResult; message: string }
  | { isVerify: true; data: IOtpChallenge; message: string };

export interface IVerifyOtpPayload extends IOtpChallenge {
  otp: string;
}

/** Role có thể tự đăng ký. `ADMIN` chỉ được tạo nội bộ, không qua form này. */
export type RegisterRole = Exclude<UserType, "ADMIN">;

export interface IRegisterPayload {
  fullName: string;
  email: string;
  password: string;
  type: RegisterRole;
}

export interface IRegisterResult {
  user: IUser;
}
