import {
  Briefcase,
  Building2,
  CalendarClock,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface IDashboardNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const DASHBOARD_NAV_ITEMS: IDashboardNavItem[] = [
  { label: "Tổng quan", href: "/dashboard", icon: LayoutDashboard },
  { label: "Tin tuyển dụng", href: "/dashboard/jobs", icon: Briefcase },
  { label: "Ứng viên", href: "/dashboard/applications", icon: Users },
  { label: "Phỏng vấn", href: "/dashboard/interviews", icon: CalendarClock },
  { label: "Công ty", href: "/dashboard/company", icon: Building2 },
  { label: "Nhân sự & Phân quyền", href: "/dashboard/team", icon: ShieldCheck },
  { label: "Cài đặt", href: "/dashboard/settings", icon: Settings },
];
