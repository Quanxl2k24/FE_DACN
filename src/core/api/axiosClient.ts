import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { queryClient } from "@/core/api/queryClient";

/**
 * =====================================================================
 * CƠ CHẾ COOKIE-BASED AUTHENTICATION
 * =====================================================================
 * Backend (NestJS) phát hành `accessToken`, `refreshToken`, `deviceId`
 * dưới dạng HttpOnly Cookie qua header Set-Cookie — KHÔNG trả về trong
 * JSON body. Vì vậy phía Frontend:
 *
 *  1. `withCredentials: true` là BẮT BUỘC trên mọi request, để trình
 *     duyệt tự động đính kèm Cookie hiện có và lưu lại Cookie mới mà
 *     server trả về (Set-Cookie).
 *  2. TUYỆT ĐỐI không gán header `Authorization: Bearer <token>` theo
 *     cách thủ công — vì token là HttpOnly, JavaScript không thể (và
 *     không nên) đọc được nó. Đây là lớp phòng thủ chống XSS đánh cắp
 *     token; mọi việc đính kèm token được giao hoàn toàn cho trình duyệt.
 *  3. Khi accessToken hết hạn (15p), API trả 401 → interceptor bên dưới
 *     tự động gọi `/auth/refresh` (browser gửi kèm refreshToken cookie)
 *     để xoay vòng (rotate) cặp token mới, rồi phát lại request gốc.
 * =====================================================================
 */

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1";

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Cho phép gửi/nhận Cookie (accessToken, refreshToken, deviceId)
  headers: {
    "Content-Type": "application/json",
  },
});

// Instance riêng biệt, KHÔNG gắn interceptor, dùng để gọi /auth/refresh.
// Tách riêng để tránh việc chính lời gọi refresh bị bắt lại bởi
// response interceptor của axiosClient, gây đệ quy/vòng lặp vô hạn.
const refreshClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

interface IRetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Các endpoint auth không được phép tự kích hoạt luồng refresh (401 ở đây
// nghĩa là sai thông tin đăng nhập / đã đăng xuất, không phải hết hạn token).
const AUTH_EXCLUDED_PATHS = ["/auth/login", "/auth/refresh"];

// Cờ đánh dấu đang có một lượt gọi /auth/refresh chạy dở, tránh gọi trùng lặp
// khi nhiều request cùng 401 một lúc.
let isRefreshing = false;

// Hàng đợi các request bị 401 trong lúc đang refresh, sẽ được "giải phóng"
// (resolve/reject) ngay sau khi biết kết quả refresh.
let requestQueue: Array<{
  resolve: () => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown = null) {
  requestQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
  requestQueue = [];
}

/**
 * Refresh thất bại: dọn state client-side. CHỈ hard-redirect về /login nếu
 * trước đó thực sự đang có phiên đăng nhập (isAuthenticated === true).
 *
 * Lý do: hàm này còn được gọi bởi lượt bootstrap `/auth/me` lúc app khởi
 * động (xem useBootstrapSession) để kiểm tra "có Cookie hợp lệ hay không".
 * Với khách vãng lai chưa từng đăng nhập, request đó cũng 401 -> refresh
 * cũng 401 (không có refreshToken) một cách hoàn toàn bình thường; nếu cứ
 * redirect vô điều kiện thì mọi khách ghé trang public đều bị đá về /login.
 */
function forceLogout(error: unknown) {
  processQueue(error);
  const wasAuthenticated = useAuthStore.getState().isAuthenticated;
  useAuthStore.getState().clearAuth();
  queryClient.clear();
  if (wasAuthenticated && typeof window !== "undefined") {
    window.location.href = "/login";
  }
}

// ---- Request Interceptor ----
// Không cần gán Authorization header (xem giải thích Cookie-based Auth ở trên).
// Chỗ này chỉ dành để mở rộng sau này (VD: gắn header ngôn ngữ, request-id...).
axiosClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// BE bọc mọi response trong một envelope chuẩn của NestJS
// (interceptor toàn cục): { success, statusCode, message, data, timestamp, path }.
// Phần `data` bên trong envelope này mới là payload thật sự mà các
// hook/feature ở FE thao tác (vd: { data: { user }, message }), nên cần
// bóc lớp envelope ra ngay tại đây để phía trên không phải quan tâm tới nó.
interface IBackendEnvelope<T = unknown> {
  success: boolean;
  statusCode: number;
  data: T;
  timestamp: string;
  path: string;
}

function isBackendEnvelope(data: unknown): data is IBackendEnvelope {
  return (
    typeof data === "object" &&
    data !== null &&
    "success" in data &&
    "data" in data
  );
}

// ---- Response Interceptor: Refresh Token Rotation ----
axiosClient.interceptors.response.use(
  (response) => {
    if (isBackendEnvelope(response.data)) {
      response.data = response.data.data;
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as IRetryableRequestConfig | undefined;
    const status = error.response?.status;

    if (!originalRequest || status !== 401) {
      return Promise.reject(error);
    }

    const isAuthEndpoint = AUTH_EXCLUDED_PATHS.some((path) =>
      originalRequest.url?.includes(path)
    );

    // Không tự refresh cho chính endpoint auth, và không retry quá 1 lần
    // cho cùng một request (tránh vòng lặp vô hạn nếu vẫn 401 sau khi refresh).
    if (isAuthEndpoint || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      // Đã có một luồng refresh khác đang chạy -> xếp hàng chờ kết quả.
      return new Promise<void>((resolve, reject) => {
        requestQueue.push({ resolve, reject });
      }).then(() => axiosClient(originalRequest));
    }

    isRefreshing = true;

    try {
      await refreshClient.post("/auth/refresh");
      processQueue();
      return axiosClient(originalRequest);
    } catch (refreshError) {
      // Refresh thất bại (401/403) -> refreshToken cũng đã hết hạn/không hợp lệ.
      forceLogout(refreshError);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosClient;
