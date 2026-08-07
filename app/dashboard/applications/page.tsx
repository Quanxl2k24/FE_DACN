import type { Metadata } from "next";
import { ApplicationsManagement } from "@/features/applications/components/ApplicationsManagement";

export const metadata: Metadata = {
  title: "Ứng viên | ATS Platform",
};

export default function DashboardApplicationsPage() {
  return <ApplicationsManagement />;
}
