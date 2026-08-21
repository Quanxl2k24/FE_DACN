import type { Metadata } from "next";
import { LandingFooter } from "@/features/landing/components/LandingFooter";
import { LandingNavbar } from "@/features/landing/components/LandingNavbar";
import { MyApplicationsPage } from "@/features/myApplications/components/MyApplicationsPage";

export const metadata: Metadata = {
  title: "Việc làm đã ứng tuyển | ATS Platform",
};

export default function MyApplicationsRoute() {
  return (
    <>
      <LandingNavbar />
      <main className="flex-1">
        <MyApplicationsPage />
      </main>
      <LandingFooter />
    </>
  );
}
