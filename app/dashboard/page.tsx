import type { Metadata } from "next";
import { DashboardOverview } from "@/features/dashboard/components/DashboardOverview";

export const metadata: Metadata = {
  title: "Tổng quan | ATS Platform",
};

export default function DashboardPage() {
  return <DashboardOverview />;
}
