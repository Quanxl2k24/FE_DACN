import type { Metadata } from "next";
import { InterviewsManagement } from "@/features/interviews/components/InterviewsManagement";

export const metadata: Metadata = {
  title: "Phỏng vấn | ATS Platform",
};

export default function DashboardInterviewsPage() {
  return <InterviewsManagement />;
}
