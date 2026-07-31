import { create } from "zustand";
import type { IUser } from "@/features/auth/types";

interface IAuthState {
  /** Thông tin User hiện tại. KHÔNG chứa accessToken/refreshToken. */
  user: IUser | null;
  isAuthenticated: boolean;
  /**
   * true khi đã có kết quả (thành công hoặc thất bại) của lượt kiểm tra
   * session đầu tiên (`/auth/me` lúc app khởi động). Guard phải chờ cờ này
   * trước khi quyết định redirect, vì `isAuthenticated` mặc định là false
   * ngay cả khi user thực ra vẫn còn phiên hợp lệ qua Cookie.
   */
  isInitialized: boolean;
  setAuth: (user: IUser) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<IAuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  setAuth: (user) => set({ user, isAuthenticated: true, isInitialized: true }),
  clearAuth: () =>
    set({ user: null, isAuthenticated: false, isInitialized: true }),
}));
