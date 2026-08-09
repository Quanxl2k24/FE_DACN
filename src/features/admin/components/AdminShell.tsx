"use client";

import type { ReactNode } from "react";
import { withRoleGuard } from "@/core/guards/RoleGuard";
import { AdminHeader } from "@/features/admin/components/AdminHeader";
import { AdminSidebar } from "@/features/admin/components/AdminSidebar";

function AdminShellBase({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1">
      <AdminSidebar />
      <div className="flex flex-1 flex-col lg:pl-64">
        <AdminHeader />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

export const AdminShell = withRoleGuard(AdminShellBase, ["ADMIN"]);
