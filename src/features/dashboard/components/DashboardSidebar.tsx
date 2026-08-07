import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";
import { DashboardNav } from "@/features/dashboard/components/DashboardNav";

export function DashboardSidebar() {
  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-border lg:bg-sidebar">
      <div className="flex h-16 items-center gap-2 border-b border-border px-5">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BriefcaseBusiness className="size-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">
            ATS Platform
          </span>
        </Link>
      </div>
      <DashboardNav />
    </aside>
  );
}
