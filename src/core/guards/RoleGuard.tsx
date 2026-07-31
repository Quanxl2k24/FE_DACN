"use client";

import { useEffect, type ComponentType } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import type { UserType } from "@/features/auth/types";

/**
 * HOC bảo vệ route theo Role (RBAC). Yêu cầu đã đăng nhập VÀ `type` của
 * user nằm trong `allowedTypes`, ngược lại điều hướng sang /403.
 */
export function withRoleGuard<P extends object>(
  WrappedComponent: ComponentType<P>,
  allowedTypes: UserType[]
) {
  function RoleGuarded(props: P) {
    const router = useRouter();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isInitialized = useAuthStore((state) => state.isInitialized);
    const userType = useAuthStore((state) => state.user?.type);

    const isAllowed = !!userType && allowedTypes.includes(userType);

    useEffect(() => {
      if (!isInitialized) return;
      if (!isAuthenticated) {
        router.replace("/login");
        return;
      }
      if (!isAllowed) {
        router.replace("/403");
      }
    }, [isInitialized, isAuthenticated, isAllowed, router]);

    if (!isInitialized) {
      return (
        <div className="flex flex-1 items-center justify-center py-32">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            Đang xác thực phiên đăng nhập...
          </span>
        </div>
      );
    }

    if (!isAuthenticated || !isAllowed) {
      return null;
    }

    return <WrappedComponent {...props} />;
  }

  RoleGuarded.displayName = `withRoleGuard(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return RoleGuarded;
}
