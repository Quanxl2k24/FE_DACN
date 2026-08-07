"use client";

import type { ReactNode } from "react";
import { withRoleGuard } from "@/core/guards/RoleGuard";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";

function DashboardShellBase({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col lg:pl-64">
        <DashboardHeader />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

export const DashboardShell = withRoleGuard(DashboardShellBase, ["RECRUITER"]);
