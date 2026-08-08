import type { Metadata } from "next";
import { LandingFooter } from "@/features/landing/components/LandingFooter";
import { LandingNavbar } from "@/features/landing/components/LandingNavbar";
import { JobDetailPage } from "@/features/jobSearch/components/JobDetailPage";

export const metadata: Metadata = {
  title: "Chi tiết tin tuyển dụng | ATS Platform",
};

export default async function JobDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <LandingNavbar />
      <main className="flex-1">
        <JobDetailPage jobId={id} />
      </main>
      <LandingFooter />
    </>
  );
}
