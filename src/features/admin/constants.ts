import { Flag, LayoutList, type LucideIcon } from "lucide-react";

export interface IAdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const ADMIN_NAV_ITEMS: IAdminNavItem[] = [
  { label: "Danh mục ngành nghề", href: "/admin", icon: LayoutList },
  { label: "Báo cáo tin tuyển dụng", href: "/admin/reports", icon: Flag },
];
