import type { Metadata } from "next";
import { LandingFooter } from "@/features/landing/components/LandingFooter";
import { LandingNavbar } from "@/features/landing/components/LandingNavbar";
import { ApplicationStatusPage } from "@/features/applicationStatus/components/ApplicationStatusPage";

export const metadata: Metadata = {
  title: "Trạng thái ứng tuyển | ATS Platform",
};

export default async function ApplicationStatusRoute({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;

  return (
    <>
      <LandingNavbar />
      <main className="flex-1">
        <ApplicationStatusPage jobId={jobId} />
      </main>
      <LandingFooter />
    </>
  );
}
