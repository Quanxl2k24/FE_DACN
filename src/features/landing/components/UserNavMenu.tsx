"use client";

import Link from "next/link";
import { Briefcase, LayoutDashboard, LogOut, User } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROLE_HOME_PATH } from "@/features/auth/constants";
import { useLogout } from "@/features/auth/hooks/useLogout";
import type { IUser } from "@/features/auth/types";

function getInitials(fullName: string) {
  return fullName
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function UserNavMenu({ user }: { user: IUser }) {
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  // Trang chủ ứng viên là "/" nên không cần link riêng; chỉ hiện khi role
  // khác đang ghé trang này (VD Recruiter/Admin bấm logo quay về trang chủ).
  const managementPath = ROLE_HOME_PATH[user.type];
  const showManagementLink = managementPath !== "/";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" className="h-auto gap-2 px-1.5 py-1" />}
      >
        <Avatar size="sm">
          <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
        </Avatar>
        <span className="hidden text-left sm:block">
          <span className="block text-sm font-medium leading-tight">
            {user.fullName}
          </span>
          <span className="block text-xs leading-tight text-muted-foreground">
            {user.email}
          </span>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuItem render={<Link href="/profile" />}>
          <User /> Thông tin cá nhân
        </DropdownMenuItem>
        {user.type === "APPLICANT" && (
          <DropdownMenuItem render={<Link href="/my-applications" />}>
            <Briefcase /> Việc làm đã ứng tuyển
          </DropdownMenuItem>
        )}
        {showManagementLink && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href={managementPath} />}>
              <LayoutDashboard /> Trang quản lý
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          disabled={isLoggingOut}
          onClick={() => logout()}
        >
          <LogOut /> Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
