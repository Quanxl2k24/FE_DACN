import type { Metadata } from "next";
import { LandingFooter } from "@/features/landing/components/LandingFooter";
import { LandingNavbar } from "@/features/landing/components/LandingNavbar";
import { JobSearchPage } from "@/features/jobSearch/components/JobSearchPage";

export const metadata: Metadata = {
  title: "Tìm việc làm | ATS Platform",
};

export default function JobsPage() {
  return (
    <>
      <LandingNavbar />
      <main className="flex-1">
        <JobSearchPage />
      </main>
      <LandingFooter />
    </>
  );
}
