"use client";

import { LandingFooter } from "@/features/landing/components/LandingFooter";
import { LandingNavbar } from "@/features/landing/components/LandingNavbar";
import { ProfileInfoCard } from "@/features/user/components/ProfileInfoCard";
import { withAuthGuard } from "@/core/guards/AuthGuard";

function ProfilePageContent() {
  return (
    <>
      <LandingNavbar />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Thông tin cá nhân</h1>
            <p className="text-sm text-muted-foreground">
              Xem và cập nhật thông tin tài khoản của bạn.
            </p>
          </div>
          <ProfileInfoCard />
        </div>
      </main>
      <LandingFooter />
    </>
  );
}

export default withAuthGuard(ProfilePageContent);
