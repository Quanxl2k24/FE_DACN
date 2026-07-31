import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản trị hệ thống",
};

export default function AdminPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 py-32 text-center">
      <h1 className="text-2xl font-semibold">Trang quản trị hệ thống</h1>
      <p className="text-muted-foreground">
        Khu vực dành cho System Admin đang được xây dựng.
      </p>
    </div>
  );
}
