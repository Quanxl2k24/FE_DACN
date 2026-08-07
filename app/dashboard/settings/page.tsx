import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cài đặt | ATS Platform",
};

export default function DashboardSettingsPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 py-32 text-center">
      <h1 className="text-2xl font-semibold">Cài đặt tài khoản</h1>
      <p className="text-muted-foreground">Tính năng đang được xây dựng.</p>
    </div>
  );
}
