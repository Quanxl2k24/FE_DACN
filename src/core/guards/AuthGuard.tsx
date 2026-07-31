"use client";

import { useEffect, type ComponentType } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

/**
 * HOC bảo vệ route yêu cầu đăng nhập. Chờ `isInitialized` (kết quả của lượt
 * bootstrap `/auth/me` trong SessionProvider) trước khi quyết định redirect,
 * để tránh đá nhầm về /login trong lúc vẫn đang xác thực lại session từ Cookie
 * sau khi F5 trang.
 */
export function withAuthGuard<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  function AuthGuarded(props: P) {
    const router = useRouter();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isInitialized = useAuthStore((state) => state.isInitialized);

    useEffect(() => {
      if (isInitialized && !isAuthenticated) {
        router.replace("/login");
      }
    }, [isInitialized, isAuthenticated, router]);

    if (!isInitialized) {
      return (
        <div className="flex flex-1 items-center justify-center py-32">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            Đang xác thực phiên đăng nhập...
          </span>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  }

  AuthGuarded.displayName = `withAuthGuard(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthGuarded;
}
