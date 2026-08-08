"use client";

import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UserNavMenu } from "@/features/landing/components/UserNavMenu";
import { useAuthStore } from "@/store/useAuthStore";

const NAV_LINKS = [
  { label: "Việc làm", href: "#featured-jobs" },
  { label: "Ngành nghề", href: "#categories" },
  { label: "Nhà tuyển dụng", href: "#employers" },
  { label: "Về chúng tôi", href: "#footer" },
];

export function LandingNavbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BriefcaseBusiness className="size-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">
            ATS Platform
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated && user ? (
            <UserNavMenu user={user} />
          ) : (
            <>
              <Button
                variant="ghost"
                size="lg"
                nativeButton={false}
                render={<Link href="/login">Đăng nhập</Link>}
              />
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href="/register">Đăng ký</Link>}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
